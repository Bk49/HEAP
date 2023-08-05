import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import FileInput from "../../../common/form/FileInput";
import TextField from "../../../common/form/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import { useFormContext } from "react-hook-form";
import PosterNBannerLocationRow from "../../datarow/posterNbanner/PosterNBannerLocationRow";

const PosterNBannerMkForm = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <Fragment>
            <CommonFieldArray
                name="posterBanner.location"
                appendObj={""}
                heading="Location to Place"
                Component={PosterNBannerLocationRow}
            />
            <HeadingThree>Other Posts and Banner Details</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <FileInput
                        icon={<AttachFileIcon />}
                        rules={{ required: false }}
                        label="Poster Design (File)"
                        name="posterBanner.design"
                        nestedError={errors.posterBanner?.design}
                    />
                    <TextField
                        type="number"
                        rules={{ required: false, min: 0 }}
                        label="Cost/piece"
                        name="posterBanner.cost"
                        nestedError={errors.posterBanner?.cost}
                    />
                    <TextField
                        type="number"
                        rules={{ required: false, min: 0 }}
                        label="Quantity"
                        name="posterBanner.quantity"
                        nestedError={errors.posterBanner?.quantity}
                    />
                </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default PosterNBannerMkForm;
