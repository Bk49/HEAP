import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const StrategyItem = ({ image, title, paragraph }) => {
    return (
        <Grid item xs={3}>
            <Grid
                container
                flexDirection="column"
                gap="2rem"
                alignItems="center"
            >
                <Grid item>
                    <img
                        src={image}
                        alt={title}
                        style={{ width: "15vw", height: "15vw" }}
                    />
                </Grid>
                <Grid item>
                    <Grid
                        container
                        flexDirection="column"
                        gap="1.2rem"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                fontFamily="Cocogoose"
                                color="#163172"
                                fontSize="1.6rem"
                                textAlign="center"
                            >
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                textAlign="center"
                                fontFamily="Helvetica"
                                fontSize="1rem"
                                color="#1E56A0"
                                letterSpacing="0.5px"
                            >
                                {paragraph}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StrategyItem;
