import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import FileInput from "../../../common/form/FileInput";
import TextField from "../../../common/form/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import LocationRow from "../../datarow/LocationRow";

const PosterNBannerMkForm = () => {
    return (
        <Fragment>
            <CommonFieldArray
                name="location"
                heading="Location to Place"
                Component={LocationRow}
            />
            <HeadingThree>Other Posts and Banner Details</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <FileInput
                        icon={<AttachFileIcon />}
                        rules={{ required: true }}
                        label="Poster Design (File)"
                        name="posterDesign"
                    />
                    <TextField
                        type="number"
                        rules={{ required: true, min: 0 }}
                        label="Cost/piece"
                        name="posterCost"
                    />
                    <TextField
                        type="number"
                        rules={{ required: true, min: 0 }}
                        label="Quantity"
                        name="posterQuantity"
                    />
                </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default PosterNBannerMkForm;
