import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";
import { convertDateToObject } from "../../functions/convertDate";

const getBusiness = async ({ params: { id } }) => {
    try {
        const result = await instance.get(`/user/findBGP/${id}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            // headers: {
            //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcmljbmd5b25nd2VpMkBnbWFpbC5jb20iLCJpYXQiOjE2OTEwNzM0ODYsImV4cCI6MTY5MTE1OTg4Nn0.0tmCdpMy52dK1MtaQ0QjYbubKzhpBBFC_MTluZVrGtQ"}`,
            // },
        });
        const business = result.data.businessGrowthPlan;
        const { planType, startDate, endDate, ...other } = business;
        let toReturn = {
            ...other,
            planType: planType,
            startDate: convertDateToObject(startDate),
            endDate: convertDateToObject(endDate),
        };

        if (planType !== "MK") {
            return toReturn;
        } else {
            const { method, promotion } = toReturn;

            if (promotion) {
                const {
                    startDate: promoStartDate,
                    endDate: promoEndDate,
                    ...otherPromoFields
                } = promotion;
                toReturn = {
                    ...toReturn,
                    promotion: {
                        ...otherPromoFields,
                        startDate: convertDateToObject(promoStartDate),
                        endDate: convertDateToObject(promoEndDate),
                    },
                };
            }

            if (method === "SM") {
                const { socialMedia, ...otherToReturnFields } = toReturn;
                const { contents, ...otherSocialMediaFields } = socialMedia;
                if (contents.length > 0) {
                    const newContents = contents.map(
                        ({ date, ...otherContentFields }) => ({
                            ...otherContentFields,
                            date: convertDateToObject(date),
                        })
                    );
                    toReturn = {
                        ...otherToReturnFields,
                        socialMedia: {
                            ...otherSocialMediaFields,
                            contents: newContents,
                        },
                    };
                }
            }

            return toReturn;
        }
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Get business growth plan unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default getBusiness;
