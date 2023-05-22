import MUITextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const TextField = ({ icon, label = "Label Text", type = "text" }) => {
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
            sx={{ width: "20rem" }}
            variant="filled"
        />
    );
};

export default TextField;
