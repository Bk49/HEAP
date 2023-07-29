import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const BusinessCardIconButton = ({ children, onClick }) => {
    return (
        <Grid item>
            <IconButton onClick={onClick}>
                {children}
            </IconButton>
        </Grid>
    );
};

export default BusinessCardIconButton;
