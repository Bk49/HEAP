import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "../../../common/form/TextField";
import { useFormContext } from "react-hook-form";
import DatePicker from "../../../common/form/DatePicker";
import FileInput from "../../../common/form/FileInput";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const ContentsToBeUploadedRow = ({ index = -1, removeFn = () => {} }) => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <IconButton>
                <RemoveIcon onClick={removeFn} />
            </IconButton>
            <TextField
                rules={{ required: true }}
                name={`contents.${index}.name`}
                label="Name"
                nestedError={errors.contents?.[index].name}
            />
            <FileInput
                icon={<AttachFileIcon />}
                rules={{ required: true }}
                name={`contents.${index}.file`}
                label="File"
                nestedError={errors.contents?.[index].file}
            />
            <DatePicker
                rules={{ required: true }}
                name={`contents.${index}.date`}
                label="Date of Posting"
                nestedError={errors.contents?.[index].date}
            />
        </div>
    );
};

export default ContentsToBeUploadedRow;
