import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext, Controller } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import { FormHelperText } from "@mui/material";

const SingleItemDropdown = ({
    rules = {},
    name = "singledropdown",
    label = "Single Dropdown",
    size = "small",
    choices = [{ text: "No Choices", value: "" }],
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const error = errors[name];

    return (
        <Controller
            control={control}
            name={name}
            rules={generateRules({ name: label, ...rules })}
            render={({ field }) => (
                <FormControl
                    error={error}
                    variant="filled"
                    sx={{ width: size === "small" ? "20rem" : "40rem" }}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select {...field} value={field.value || ""}>
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
