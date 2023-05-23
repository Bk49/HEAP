import FormControlLabel from "@mui/material/FormControlLabel";
import MUICheckbox from "@mui/material/Checkbox";

const Checkbox = ({ label = "" }) => {
    return (
        <FormControlLabel
            control={
                <MUICheckbox
                    sx={{
                        "&.Mui-checked": {
                            color: "#163172",
                        },
                    }}
                />
            }
            label={label}
        />
    );
};

export default Checkbox;
