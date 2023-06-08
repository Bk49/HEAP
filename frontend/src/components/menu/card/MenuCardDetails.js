import Grid from "@mui/material/Grid";
import TocIcon from "@mui/icons-material/Toc";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Typography } from "@mui/material";

const MenuCardDetails = ({ type = "sections", children = "text here" }) => {
    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item color="gray">
                {type === "sections" ? <TocIcon /> : <LocalDiningIcon />}
            </Grid>
            <Grid item>
                <Typography color="GrayText" variant="body1">
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default MenuCardDetails;
