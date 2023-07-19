import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import TextField from "../../../common/form/TextField";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import SocialMediaPlatformsCardGroup from "../../cardgroup/SocialMediaPlatformsCardGroup";
import ContentsToBeUploadedRow from "../../datarow/ContentsToBeUploadedRow";
import { useFormContext } from "react-hook-form";

const SocialMediaMkForm = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <Fragment>
            <HeadingThree>Targeted Platform</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <SocialMediaPlatformsCardGroup />
                </FieldsRow>
            </FieldsColumn>
            <CommonFieldArray
                name="socialMedia.contents"
                appendObj={{ name: "", file: null, date: "" }}
                heading="Contents to be Uploaded"
                Component={ContentsToBeUploadedRow}
            />
            <HeadingThree>Additional Advertising Costs</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <TextField
                        rules={{ required: false, min: 0 }}
                        type="number"
                        name="socialMedia.platform.cost"
                        label="Platform Cost"
                        nestedError={errors.socialMedia?.platform?.cost}
                    />
                    <TextField
                        rules={{ required: false, min: 0 }}
                        type="number"
                        name="socialMedia.platform.rate"
                        label="Rate (Price/hour)"
                        nestedError={errors.socialMedia?.platform?.rate}
                    />
                    <TextField
                        rules={{ required: false, min: 0 }}
                        type="number"
                        name="socialMedia.platform.duration"
                        label="Duration"
                        nestedError={errors.socialMedia?.platform?.duration}
                    />
                </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default SocialMediaMkForm;
