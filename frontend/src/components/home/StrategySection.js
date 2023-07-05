import Grid from "@mui/material/Grid";
import StrategyItem from "./StrategyItem";
import FoodDeliveryIllustration from "../../assets/illustrations/business/food-delivery-illustration.jpg";
import MarketingIllustration from "../../assets/illustrations/business/marketing-illustration.jpg";
import OutletExpansionIllustration from "../../assets/illustrations/business/outlet-expansion-illustration.jpg";
import { Fragment } from "react";

const data = [
    {
        image: FoodDeliveryIllustration,
        title: "Food Delivery Marketplace Strategy",
        paragraph: (
            <Fragment>
                Draft out the perfect plan to expand your F&B business to the
                food delivery marketplace.
                <div style={{ height: "1.2rem" }} />
                Explore various marketplaces such as GrabFood, FoodPanda and
                Deliveroo and define a concrete plan to venture your F&B
                business to food delivery marketplaces
            </Fragment>
        ),
    },
    {
        image: OutletExpansionIllustration,
        title: "Outlet Expansion Strategy",
        paragraph: (
            <Fragment>
                Want to expand your business to other areas of Singapore? Time
                to plan and expansion for your business with out outlet
                expansion strategy plan.
                <div style={{ height: "1.2rem" }} />
                Select a location to expand and while planning various factors
                such as rental prices and staff management for the new outlet
            </Fragment>
        ),
    },
    {
        image: MarketingIllustration,
        title: "Marketing Strategy",
        paragraph: (
            <Fragment>
                Always wonder how did some F&B businesses seem to excel and have
                infinite customers? Perhaps it is time to reconsider your
                marketing strategy!
                <div style={{ height: "1.2rem" }} />
                Create specific marketing promotions through various methods
                such as social media, posters and flyers distribution with our
                marketing strategy plan
            </Fragment>
        ),
    },
];

const StrategySection = () => {
    return (
        <Grid
            marginTop="1.5rem"
            flexDirection="row"
            gap="3%"
            justifyContent="center"
            container
        >
            {data.map((strat, index) => (
                <StrategyItem key={index} {...strat} />
            ))}
        </Grid>
    );
};

export default StrategySection;
