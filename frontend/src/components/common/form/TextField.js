import MUITextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const TextField = ({
    icon,
    label = "Label Text",
    type = "text",
    size = "small",
}) => {
    return (
        <MUITextField
            label={label}
            type={type}
            InputProps={
                icon && {
                    startAdornment: (
                        <InputAdornment position="start">{icon}</InputAdornment>
                    ),
                }
            }
            sx={{ width: size === "small" ? "20rem" : "40rem" }}
            variant="filled"
        />
    );
};

export default TextField;
