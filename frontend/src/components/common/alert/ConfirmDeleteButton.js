import Button from "@mui/material/Button";
import { smallButtonStyles as style } from "../../../constants/buttonStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const ConfirmDeleteButton = ({
    children = "Button Text",
    type = "default",
    onClick = () => {
        console.log("Button pressed");
    },
}) => {
    return (
        <Grid item>
            <IconButton onClick={onClick}>
                {children}
            </IconButton>
        </Grid>
            
    
    );
};

export default ConfirmDeleteButton;