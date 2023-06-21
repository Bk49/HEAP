import GrabFoodImg from "../../../assets/logo/food-delivery/grabfood.jpg";
import FoodPandaImg from "../../../assets/logo/food-delivery/foodpanda.png";
import DeliverooImg from "../../../assets/logo/food-delivery/deliveroo.png";
import WhyQImg from "../../../assets/logo/food-delivery/whyq.png";
import OddleImg from "../../../assets/logo/food-delivery/oddle.png";
import FoodDeliveryMarketplaceCard from "../card/FoodDeliveryMarketplaceCard";
import { Controller, useFormContext } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import { Fragment } from "react";

const FoodDeliveryMarketplaceCardGroup = () => {
    const cards = [
        {
            deliverer: "GrabFood",
            image: GrabFoodImg,
        },
        {
            deliverer: "FoodPanda",
            image: FoodPandaImg,
        },
        {
            deliverer: "Deliveroo",
            image: DeliverooImg,
        },
        {
            deliverer: "WhyQ",
            image: WhyQImg,
        },
        {
            deliverer: "Oddle",
            image: OddleImg,
        },
    ];

    const {
        control,
    } = useFormContext();

    return (
        <Controller
            control={control}
            name="marketplace"
            defaultValue="GrabFood"
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
                        <FoodDeliveryMarketplaceCard key={index} {...item} />
                    ))}
                </Fragment>
            )}
        />
    );
};

export default FoodDeliveryMarketplaceCardGroup;
