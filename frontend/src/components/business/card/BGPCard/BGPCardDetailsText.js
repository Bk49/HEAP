import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const BGPCardDetailsText = ({ children, Icon }) => {
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            columnGap="0.6rem"
            sx={{
                fontSize: "1rem",
                opacity: "0.6",
            }}
        >
            <Icon />
            <Typography>{children}</Typography>
        </Grid>
    );
};

export default BGPCardDetailsText;
