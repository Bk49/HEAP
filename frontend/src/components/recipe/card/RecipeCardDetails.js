import Grid from "@mui/material/Grid";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Typography } from "@mui/material";

const RecipeCardDetails = ({ type = "category", children = "text here" }) => {
    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item color="gray">
                {type === "category" ? (
                    <CategoryIcon />
                ) : type === "price" ? (
                    <AttachMoneyIcon />
                ) : (
                    <FormatListNumberedIcon />
                )}
            </Grid>
            <Grid item>
                <Typography color="GrayText" variant="body1">
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default RecipeCardDetails;
