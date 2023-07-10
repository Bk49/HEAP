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
import InfluencerCollaborationRow from "../../datarow/influencer/InfluencerCollaborationRow";

const BGPMarketingForm = () => {
    const { watch } = useFormContext();
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
                        name="promotionName"
                        label="Promotion Name"
                    />
                    <DatePicker
                        rules={{ required: true, disablePast: true }}
                        name="promoStartDate"
                        label="Start Date"
                    />
                    <DatePicker
                        rules={{ required: true, disablePast: true }}
                        name="promoEndDate"
                        label="End Date"
                    />
                </FieldsRow>
                <FieldsRow>
                    <TextArea
                        rules={{ required: true }}
                        label="Description"
                        name="promoDescription"
                    />
                </FieldsRow>
                <FieldsRow>
                    <TextArea
                        rules={{ required: true }}
                        label="Terms and Conditions"
                        name="promoTnC"
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
