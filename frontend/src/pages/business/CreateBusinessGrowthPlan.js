import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import CommonBusinessGrowthPlanForm from "../../components/business/CommonBusinessGrowthPlanForm";

const CreateBusinessGrowthPlan = () => {
    return (
        <Fragment>
            <HeadingOne>Create Business Growth Plan</HeadingOne>
            <CommonBusinessGrowthPlanForm />
        </Fragment>
    );
};

export default CreateBusinessGrowthPlan;
