import { Fragment } from "react";
import { useForm, FormProvider } from "react-hook-form";
import BasicDetailsSection from "../business/section/BasicDetailsSection";
import HeadingTwo from "../common/heading/HeadingTwo";
import BGPFoodDeliveryForm from "./formgroup/bgp/BGPFoodDeliveryForm";
import BGPOutletExpansionForm from "./formgroup/bgp/BGPOutletExpansionForm";
import BGPMarketingForm from "./formgroup/bgp/BGPMarketingForm";
import SubmitFormGroup from "../common/form/SubmitFormGroup";

const CommonBusinessGrowthPlanForm = ({ isCreate = true, loaderData }) => {
    const formMethods = useForm({
        values: !isCreate && loaderData ? loaderData : {},
    });
    const { watch } = formMethods;
    const currentPlan = watch("planType");

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <BasicDetailsSection
                    defaultPlan={isCreate ? "" : currentPlan}
                />
                <HeadingTwo>Additional Details</HeadingTwo>
                {currentPlan === "FD" ? (
                    <BGPFoodDeliveryForm isCreate={isCreate} />
                ) : currentPlan === "OE" ? (
                    <BGPOutletExpansionForm isCreate={isCreate} />
                ) : currentPlan === "MK" ? (
                    <BGPMarketingForm isCreate={isCreate} />
                ) : (
                    <Fragment />
                )}
                <SubmitFormGroup
                    submitErrorText={`${
                        isCreate ? "Creation" : "Update"
                    } of business growth plan is unsuccessful, please check your input`}
                />
            </FormProvider>
        </Fragment>
    );
};

export default CommonBusinessGrowthPlanForm;
