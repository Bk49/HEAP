import TextField from "@mui/material/TextField";

const TextArea = ({ label = "Text Area" }) => {
    return (
        <TextField
            label={label}
            sx={{ width: "40rem" }}
            rows={7}
            multiline
            variant="filled"
        />
    );
};

export default TextArea;