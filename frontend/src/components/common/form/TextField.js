import MUITextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormContext, Controller } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";

const TextField = ({
    rules = {},
    name = "textfield",
    icon,
    label = "Label Text",
    type = "text",
    size = "small",
    nestedError = null
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
                <MUITextField
                    {...field}
                    error={nestedError ? nestedError : error}
                    helperText={nestedError ? nestedError.message : error ? error.message : ""}
                    label={label}
                    type={type}
                    InputProps={
                        icon && {
                            startAdornment: (
                                <InputAdornment position="start">
                                    {icon}
                                </InputAdornment>
                            ),
                        }
                    }
                    sx={{
                        width:
                            size === "small"
                                ? "20rem"
                                : size === "tiny"
                                ? "10rem"
                                : "40rem",
                    }}
                    variant="filled"
                />
            )}
        />
    );
};

export default TextField;
