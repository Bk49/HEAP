import SocialMediaImg from "../../../assets/illustrations/marketing-methods/social-media-marketing-illustration.jpg";
import PosterBannerImg from "../../../assets/illustrations/marketing-methods/poster-and-banner-illustration.jpg";
import FlyerDistributionImg from "../../../assets/illustrations/marketing-methods/flyer-distribution-illustration.jpg";
import { Controller, useFormContext } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import { Fragment } from "react";
import MarketingMethodCard from "../card/MarketingMethodCard";

const MarketingMethodCardGroup = () => {
    const cards = [
        { method: "SM",label: "Social Media", image: SocialMediaImg },
        { method: "PB",label: "Poster and Banner", image: PosterBannerImg },
        { method: "FD",label: "Flyer Distribution", image: FlyerDistributionImg },
    ];

    const {
        control,
    } = useFormContext()

    return (
        <Controller
            control={control}
            name="method"
            defaultValue="SM"
            rules={generateRules({ required: true })}
            style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1rem",
                gap: "2rem",
            }}
            render={() => (
                <Fragment>
                    {cards.map((item, index) => (
                        <MarketingMethodCard key={index} {...item} />
                    ))}
                </Fragment>
            )}
        />
    )
};

export default MarketingMethodCardGroup