import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import TextField from "../../../common/form/TextField";
import ContentsTobeUploadedFieldArray from "../../datarow/content/ContentsToBeUploadedFieldArray";
import SocialMediaPlatformsCardGroup from "../../cardgroup/SocialMediaPlatformsCardGroup";

const SocialMediaMkForm = () => {
    return (
        <Fragment>
            <HeadingThree>Targeted Platform</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <SocialMediaPlatformsCardGroup />
                </FieldsRow>
            </FieldsColumn>
            <ContentsTobeUploadedFieldArray />
            <HeadingThree>Additional Advertising Costs</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <TextField
                        rules={{ required: true, min: 0 }}
                        type="number"
                        name="platformCost"
                        label="Platform Cost"
                    />
                    <TextField
                        rules={{ required: true, min: 0 }}
                        type="number"
                        name="platformRate"
                        label="Rate (Price/hour)"
                    />
                    <TextField
                        rules={{ required: true, min: 0 }}
                        type="number"
                        name="platformDuration"
                        label="Duration"
                    />
                </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default SocialMediaMkForm;
