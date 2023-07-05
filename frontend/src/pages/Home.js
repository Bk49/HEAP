import MainImage from "../assets/illustrations/business-growth-illustration.png";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SignUpNowIllustration from "../assets/illustrations/sign-up-now-illustration.jpg";
import SmallButton from "../components/common/button/SmallButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import StrategySection from "../components/home/StrategySection";
import HeadingOne from "../components/common/heading/HeadingOne";
import AlreadyHaveAccountText from "../components/home/AlreadyHaveAccountText";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ width: "calc(100% + 3rem)", margin: "-1.5rem" }}>
            <Grid
                sx={{
                    width: "100%",
                    backgroundColor: "#D6E4F0",
                }}
                container
                flexDirection="column"
                alignItems="center"
                padding="1rem 3rem"
            >
                <Grid item>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Grid
                                height="100%"
                                container
                                flexDirection="column"
                                justifyContent="space-between"
                            >
                                <Grid width="100%" item>
                                    <Grid
                                        justifyContent="space-evenly"
                                        gap="2rem"
                                        container
                                    >
                                        <Grid item xs={12}>
                                            <span
                                                style={{
                                                    fontFamily: "CocogooseBold",
                                                    color: "#163172",
                                                    fontSize: "2rem",
                                                }}
                                            >
                                                F-XCEL
                                            </span>
                                            <p
                                                style={{
                                                    fontFamily:
                                                        "CocogooseLight",
                                                    fontSize: "1rem",
                                                    color: "#1E56A0",
                                                }}
                                            >
                                                All-in-one platform to guarantee
                                                your F&B business growth
                                                <div
                                                    style={{ height: "2rem" }}
                                                />
                                                Start Planning and grow with us
                                                today!
                                            </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <SmallButton type="primary">
                                                Create an Account Now
                                            </SmallButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid width="100%" item>
                                    <AlreadyHaveAccountText />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <img
                                style={{ width: "80%" }}
                                src={MainImage}
                                alt="MainImg"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography
                        color="#1E56A0"
                        style={{
                            fontFamily: "CocogooseLight",
                            fontSize: "0.7rem",
                        }}
                    >
                        Scroll down to discover more
                    </Typography>
                </Grid>
                <Grid item>
                    <ExpandMoreIcon style={{ opacity: "0.54" }} />
                </Grid>
            </Grid>

            <StrategySection />
            <div style={{ width: "96%", padding: "2%" }}>
                <Divider />
                <Grid
                    container
                    flexDirection="row"
                    gap="5rem"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <img
                            style={{ width: "30vw", height: "30vw" }}
                            src={SignUpNowIllustration}
                            alt="SignUpNowIllustration"
                        />
                    </Grid>
                    <Grid item>
                        <Grid
                            flexDirection="column"
                            height="100%"
                            gap="5rem"
                            container
                        >
                            <div>
                                <HeadingOne>Ready to Plan?</HeadingOne>
                                <div style={{ height: "2rem" }} />
                                <SmallButton
                                    type="primary"
                                    onClick={() => navigate("/register")}
                                >
                                    Sign Up Now!
                                </SmallButton>
                            </div>
                            <AlreadyHaveAccountText />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Home;
