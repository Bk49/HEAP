import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import CommonBusinessGrowthPlanForm from "../../components/business/CommonBusinessGrowthPlanForm";

const EditBusinessGrowthPlan = () => {
    return (
        <Fragment>
            <HeadingOne>Edit Business Growth Plan</HeadingOne>
            <CommonBusinessGrowthPlanForm isCreate={false} />
        </Fragment>
    );
};

export default EditBusinessGrowthPlan;