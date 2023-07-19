import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext, Controller } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import FormHelperText from "@mui/material/FormHelperText";

const SingleItemDropdown = ({
    rules = { required: false },
    name = "singledropdown",
    label = "Single Dropdown",
    size = "small",
    choices = [{ text: "No Choices", value: "" }],
    nestedError = null,
    defaultValue = "",
    disabled = false,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const error = nestedError ? nestedError : errors[name];

    return (
        <Controller
            control={control}
            name={name}
            rules={generateRules({ name: label, ...rules })}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormControl
                    error={nestedError ? nestedError : error}
                    variant="filled"
                    sx={{ width: size === "small" ? "20rem" : "40rem" }}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        value={field.value || ""}
                        disabled={disabled}
                    >
                        {choices.map(({ text, value }) => (
                            <MenuItem key={text} value={value}>
                                {value === "" ? <em>{text}</em> : text}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && error.message && (
                        <FormHelperText>{error.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default SingleItemDropdown;
