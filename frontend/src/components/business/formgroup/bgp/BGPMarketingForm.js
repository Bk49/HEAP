import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import MarketingMethodCardGroup from "../../cardgroup/MarketingMethodCardGroup";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import TextField from "../../../common/form/TextField";
import DatePicker from "../../../common/form/DatePicker";
import TextArea from "../../../common/form/TextArea";
import { useFormContext } from "react-hook-form";
import SocialMediaMkForm from "../marketing/SocialMediaMkForm";
import PosterNBannerMkForm from "../marketing/PosterNBannerMkForm";
import FlyerDistributionMkForm from "../marketing/FlyerDistributionMkForm";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import InfluencerCollaborationRow from "../../datarow/InfluencerCollaborationRow";

const BGPMarketingForm = () => {
    const {
        watch,
        formState: { errors },
    } = useFormContext();
    const currentMethod = watch("method");

    return (
        <Fragment>
            <HeadingThree>Method of Marketing</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <MarketingMethodCardGroup />
                </FieldsRow>
            </FieldsColumn>
            {currentMethod === "FD" ? (
                <FlyerDistributionMkForm />
            ) : currentMethod === "PB" ? (
                <PosterNBannerMkForm />
            ) : (
                <SocialMediaMkForm />
            )}
            <HeadingThree>Promotions Associated</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <TextField
                        rules={{ required: true }}
                        name="promotion.name"
                        label="Promotion Name"
                        nestedError={errors.promotion?.name}
                    />
                    <DatePicker
                        rules={{ required: true, disablePast: true }}
                        name="promotion.startDate"
                        label="Start Date"
                        nestedError={errors.promotion?.startDate}
                    />
                    <DatePicker
                        rules={{ required: true, disablePast: true }}
                        name="promotion.endDate"
                        label="End Date"
                        nestedError={errors.promotion?.endDate}
                    />
                </FieldsRow>
                <FieldsRow>
                    <TextArea
                        rules={{ required: true }}
                        label="Description"
                        name="promotion.description"
                        nestedError={errors.promotion?.description}
                    />
                </FieldsRow>
                <FieldsRow>
                    <TextArea
                        rules={{ required: true }}
                        label="Terms and Conditions"
                        name="promotion.tnc"
                        nestedError={errors.promotion?.tnc}
                    />
                </FieldsRow>
            </FieldsColumn>
            <CommonFieldArray
                name="influencer"
                appendObj={{ name: "", email: "", phone: "", price: 0 }}
                heading="Influencers Collaboration"
                Component={InfluencerCollaborationRow}
            />
        </Fragment>
    );
};

export default BGPMarketingForm;
