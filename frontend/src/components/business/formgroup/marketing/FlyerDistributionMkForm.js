import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import FileInput from "../../../common/form/FileInput";
import TextField from "../../../common/form/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import LocationRow from "../../datarow/LocationRow";
import { useFormContext } from "react-hook-form";

const FlyerDistributionMkForm = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <Fragment>
            <CommonFieldArray
                name="flyer.location"
                heading="Location to Distribute"
                Component={LocationRow}
            />
            <HeadingThree>Other Flyer Distribution Details</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <FileInput
                        icon={<AttachFileIcon />}
                        rules={{ required: false }}
                        label="Flyer Design (File)"
                        name="flyer.design"
                    />
                    <TextField
                        type="number"
                        rules={{ required: false, min: 0 }}
                        label="Cost/piece"
                        name="flyer.cost"
                        nestedError={errors.flyer?.cost}
                    />
                    <TextField
                        type="number"
                        rules={{ required: false, min: 0 }}
                        label="Quantity"
                        name="flyer.quantity"
                        nestedError={errors.flyer?.quantity}
                    />
                </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default FlyerDistributionMkForm;
