import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import FileInput from "../../../common/form/FileInput";
import TextField from "../../../common/form/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import LocationRow from "../../datarow/LocationRow";

const FlyerDistributionMkForm = () => {
    return (
        <Fragment>
            <CommonFieldArray
                name="location"
                heading="Location to Distribute"
                Component={LocationRow}
            />
            <HeadingThree>Other Flyer Distribution Details</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <FileInput
                        icon={<AttachFileIcon />}
                        rules={{ required: true }}
                        label="Flyer Design (File)"
                        name="flyerDesign"
                    />
                    <TextField
                        type="number"
                        rules={{ required: true, min: 0 }}
                        label="Cost/piece"
                        name="flyerCost"
                    />
                    <TextField
                        type="number"
                        rules={{ required: true, min: 0 }}
                        label="Quantity"
                        name="flyerQuantity"
                    />
                </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default FlyerDistributionMkForm;
