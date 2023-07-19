import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import CommonBusinessGrowthPlanForm from "../../components/business/CommonBusinessGrowthPlanForm";
import { useLoaderData } from "react-router-dom";

const EditBusinessGrowthPlan = () => {
    const { business } = useLoaderData();

    return (
        <Fragment>
            <HeadingOne>Edit Business Growth Plan</HeadingOne>
            <CommonBusinessGrowthPlanForm loaderData={business} />
        </Fragment>
    );
};

export default EditBusinessGrowthPlan;
