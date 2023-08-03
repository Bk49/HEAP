import { useState } from "react";
import Grid from "@mui/material/Grid";
import HeadingOne from "../../components/common/heading/HeadingOne";
import SortingButton from "../../components/common/button/SortingButton";
import { useNavigate } from "react-router-dom";
import TextIconButton from "../../components/common/button/TextIconButton";
import BusinessGrowthPlanCard from "../../components/business/card/BusinessGrowthPlanCard";

const MyBusinessGrowthPlan = () => {
    const navigate = useNavigate();
    const [sort, setSort] = useState({
        sortBy: "default",
        order: "descending",
    });
    const [cards, setCards] = useState([
        {
            id: "64bdef6b6b5d992c941e82ca",
            planName: "MK 2",
            startDate: "25/07/2023",
            endDate: "27/07/2023",
            budget: 20000,
            priority: 5,
            planType: "MK",
        },
        {
            id: "64bdefaa6b5d992c941e82cb",
            planName: "Flyer Dist 1",
            startDate: "24/07/2023",
            endDate: "25/07/2023",
            budget: 10020,
            priority: 1,
            planType: "FD",
        },

        {
            id: "64bdefaa6b5d992c941e82cc",
            planName: "Flyer Dist 2",
            startDate: "01/12/2023",
            endDate: "16/12/2023",
            budget: 3003.43,
            priority: 3,
            planType: "OE",
        },
        {
            id: "64bdefaa6b5d992c941e82cd",
            planName: "Flyer Dist 1",
            startDate: "24/07/2023",
            endDate: "25/07/2023",
            budget: 10020,
            priority: 1,
            planType: "FD",
        },
    ]);

    const handleDelete = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    return (
        <div>
            <HeadingOne divider={true}> My Business Growth Plans </HeadingOne>
            <Grid
                container
                direction="row-reverse"
                gap="1rem"
                marginBottom="2rem"
            >
                <TextIconButton
                    type="primary"
                    onClick={() => navigate("/create-plan")}
                >
                    Create
                </TextIconButton>
                <SortingButton name="priority" sort={sort} setSort={setSort}>
                    PRIORITY
                </SortingButton>
                <SortingButton name="urgency" sort={sort} setSort={setSort}>
                    URGENCY
                </SortingButton>
            </Grid>

            <Grid
                container
                alignItems="center"
                justifyContent="center"
                gap="2rem"
            >
                {cards.map((card, index) => (
                    <Grid key={index} item xs={11}>
                        <BusinessGrowthPlanCard
                            card={card}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MyBusinessGrowthPlan;
