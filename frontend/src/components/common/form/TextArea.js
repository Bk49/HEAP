import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";

const TextArea = ({
    rules = {},
    name = "textarea",
    label = "Text Area",
    nestedError = null,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const error = nestedError ? nestedError : errors[name];

    return (
        <Controller
            name={name}
            control={control}
            rules={generateRules({ name: label, ...rules })}
            render={({ field }) => (
                <TextField
                    {...field}
                    error={nestedError ? nestedError : error}
                    helperText={nestedError ? nestedError.message : error ? error.message : ""}
                    label={label}
                    sx={{ width: "40rem" }}
                    rows={7}
                    multiline
                    variant="filled"
                />
            )}
        />
    );
};

export default TextArea;
