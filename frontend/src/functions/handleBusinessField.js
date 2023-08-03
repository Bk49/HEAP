import { convertDateToString } from "./convertDate";
import handleImageUpload from "./uploadImage";

const handleBusinessField = async (data) => {
    const {
        id,
        planType,
        budget,
        startDate,
        endDate,
        priority,
        planName,
        createDateTime,
        ...other
    } = data;

    // Inject common fields to payload first
    let payload = {
        planName: planName,
        startDate: convertDateToString(startDate),
        endDate: convertDateToString(endDate),
        budget: budget,
        priority: priority,
        planType: planType,
    };

    // Inject createDateTime for update cases
    if (createDateTime) {
        payload = {
            ...payload,
            createDateTime: createDateTime,
        };
    }

    // Inject additional fields to payload based on planType (Filtering unnecessary data from other forms)
    if (planType === "FD") {
        const { marketplace, containers, menuId } = other;
        return {
            ...payload,
            marketplace: marketplace,
            containers: containers,
            menuId: menuId,
        };
    } else if (planType === "OE") {
        const { address, renovation, rentalPrice, staffs } = other;
        return {
            ...payload,
            address: address,
            renovation: renovation,
            rentalPrice: rentalPrice,
            staffs: staffs,
        };
    } else if (planType === "MK") {
        // Inject common marketing fields first
        const { method, promotion, influencer, ...otherMKFields } = other;
        payload = {
            ...payload,
            promotion: {
                name: promotion.name,
                startDate: convertDateToString(promotion.startDate),
                endDate: convertDateToString(promotion.endDate),
                description: promotion.description,
                tnc: promotion.tnc,
            },
            influencer: influencer,
            method: method,
        };

        // Inject additional marketing specific fields
        if (method === "SM") {
            const { socialMedia } = otherMKFields;
            return {
                ...payload,
                socialMedia: {
                    name: socialMedia.name,
                    contents: await socialMedia.contents.map(
                        async (content) => ({
                            name: content.name,
                            file: await handleImageUpload(content.file),
                            date: convertDateToString(content.date),
                        })
                    ),
                },
            };
        } else if (method === "PB") {
            const { posterBanner } = otherMKFields;
            return {
                ...payload,
                posterBanner: {
                    ...posterBanner,
                    design: await handleImageUpload(posterBanner.design),
                },
            };
        } else if (method === "FD") {
            const { flyer } = otherMKFields;
            return {
                ...payload,
                flyer: {
                    ...flyer,
                    design: await handleImageUpload(flyer.design),
                },
            };
        } else {
            throw new Error({
                response: {
                    data: {
                        error: "Invalid marketing method",
                        message: "The input marketing method is invalid!",
                    },
                },
            });
        }
    } else {
        throw new Error({
            response: {
                data: {
                    error: "Invalid plan type",
                    message: "The input plan type is invalid!",
                },
            },
        });
    }
};

export default handleBusinessField;
