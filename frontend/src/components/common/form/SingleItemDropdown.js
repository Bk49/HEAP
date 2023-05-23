import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SingleItemDropdown = ({
    label = "Single Dropdown",
    size = "small",
    choices = [{ text: "No Choices", value: "" }],
}) => {
    return (
        <FormControl
            variant="filled"
            sx={{ width: size === "small" ? "20rem" : "40rem" }}
        >
            <InputLabel>{label}</InputLabel>
            <Select>
                {choices.map(({ text, value }) => (
                    <MenuItem key={text} value={value}>
                        {value === "" ? <em>{text}</em> : text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SingleItemDropdown;
