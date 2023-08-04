import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import HeadingOne from "../../components/common/heading/HeadingOne";
import SortingButton from "../../components/common/button/SortingButton";
import { useLocation, useNavigate } from "react-router-dom";
import TextIconButton from "../../components/common/button/TextIconButton";
import BusinessGrowthPlanCard from "../../components/business/card/BusinessGrowthPlanCard";
import getAllBusiness from "../../axios/business/getAllBusinessAPI";

const MyBusinessGrowthPlan = () => {
    const navigate = useNavigate();
    const [sort, setSort] = useState({
        sortBy: "default",
        order: "descending",
    });
    const [cards, setCards] = useState([]);
    const location = useLocation();

    useEffect(() => {
        (async () => {
            const { businessGrowthPlans } = await getAllBusiness(sort);
            setCards(businessGrowthPlans);
        })();
    }, [sort, location.state]);

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
                        <BusinessGrowthPlanCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MyBusinessGrowthPlan;
