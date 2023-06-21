import { Fragment, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import BasicDetailsSection from "../business/section/BasicDetailsSection";
import HeadingTwo from "../common/heading/HeadingTwo";
import BGPFoodDeliveryForm from "./BGPFoodDeliveryForm";
import BGPOutletExpansionForm from "./BGPOutletExpansionForm";
import BGPMarketingForm from "./BGPMarketingForm";

const CommonBusinessGrowthPlanForm = ({ isCreate = true }) => {
    const formMethods = useForm();
    const { watch, setValue } = formMethods;
    const currentPlan = watch("planType");

    useEffect(() => {
        setValue("planType", isCreate ? "" : "FD");
    }, [setValue, isCreate]);

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <BasicDetailsSection defaultPlan={isCreate ? "" : "FD"} />
                <HeadingTwo>Additional Details</HeadingTwo>
                {currentPlan === "FD" ? (
                    <BGPFoodDeliveryForm isCreate={isCreate} />
                ) : currentPlan === "OE" ? (
                    <BGPOutletExpansionForm isCreate={isCreate} />
                ) : (
                    <BGPMarketingForm isCreate={isCreate} />
                )}
            </FormProvider>
        </Fragment>
    );
};

export default CommonBusinessGrowthPlanForm;
