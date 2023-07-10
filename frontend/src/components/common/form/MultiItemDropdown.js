import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useFormContext, Controller } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import FormHelperText from "@mui/material/FormHelperText";

const MultiItemDropdown = ({
    rules = {},
    defaultValue = [],
    name = "multidropdown",
    label = "Multi Dropdown",
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
            defaultValue={defaultValue}
            rules={generateRules({ name: label, ...rules })}
            render={({ field }) => (
                <FormControl
                    error={error}
                    variant="filled"
                    sx={{ width: size === "small" ? "20rem" : "40rem" }}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        value={field.value || []}
                        variant="filled"
                        multiple
                        defaultValue={[]}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {choices.map(({ text, value }) => (
                            <MenuItem key={text} value={value}>
                                {text}
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

export default MultiItemDropdown;
