import FacebookImg from "../../../assets/logo/social-media/facebook.jpg";
import InstagramImg from "../../../assets/logo/social-media/instagram.jpg";
import TiktokImg from "../../../assets/logo/social-media/tiktok.jpg";
import YoutubeImg from "../../../assets/logo/social-media/youtube.jpg";
import LinkedInImg from "../../../assets/logo/social-media/linkedin.jpg";
import PinterestImg from "../../../assets/logo/social-media/pinterest.jpg";
import WhatsappImg from "../../../assets/logo/social-media/whatsapp.jpg";
import SocialMediaPlatformsCard from "../card/SocialMediaPlatformsCard";
import { Controller, useFormContext } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import { Fragment } from "react";

const SocialMediaPlatformsCardGroup = () => {
    const cards = [
        {
            platform: "Facebook",
            image: FacebookImg,
        },
        {
            platform: "Instagram",
            image: InstagramImg,
        },
        {
            platform: "TikTok",
            image: TiktokImg,
        },
        {
            platform: "Youtube",
            image: YoutubeImg,
        },
        {
            platform: "LinkedIn",
            image: LinkedInImg,
        },
        {
            platform: "Pinterest",
            image: PinterestImg,
        },
        {
            platform: "WhatsApp",
            image: WhatsappImg,
        },
    ];

    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="platform"
            defaultValue="Facebook"
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
                        <SocialMediaPlatformsCard key={index} {...item} />
                    ))}
                </Fragment>
            )}
        />
    );
};

export default SocialMediaPlatformsCardGroup;
