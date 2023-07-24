import { Grid, Paper } from "@mui/material";
import HeadingOne from "../../components/common/heading/HeadingOne";
import SortingButton from "../../components/common/button/SortingButton";
import Divider from "@mui/material/Divider";
import FoodDeliveryIllustration from "../../assets/illustrations/business/food-delivery-illustration.jpg";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const MyBusinessGrowthPlan = () => {
    const navigate = useNavigate();

    return (
        <div>
            <HeadingOne> My Business Growth Plans </HeadingOne>
            <div style={{ marginTop: "1rem" }}></div>
            <Divider />
            <Grid
                sx={{
                    width: "100%",
                }}
                container
                flexDirection="row-reverse"
                alignItems="end"
                padding="1rem"
                gap="1rem"
                justifyContent="flex-start"
            >
                <SortingButton
                    type="primary"
                    onClick={() => navigate("/register")}
                >
                    + CREATE{" "}
                </SortingButton>
                <SortingButton type="secondary"> PRIORITY </SortingButton>
                <SortingButton type="secondary"> URGENCY </SortingButton>
            </Grid>

            <Grid
                sx={{
                    width: "100%",
                }}
                container
            >
                <Paper
                    elevation={4}
                    sx={{
                        margin: "1rem 2rem 2rem",
                        width: "100%",
                        height: "12rem",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "left",
                        gap: "1rem",
                        justifyContent: "left",
                    }}
                >
                    <Grid
                        item
                        xs={11}
                        container
                        direction="row"
                        alignItems="top"
                    >
                        <img
                            src={FoodDeliveryIllustration}
                            alt="FoodDeliveryIllustration"
                            style={{ height: "90%" }}
                        />
                        <div style={{ marginTop: "2rem" }}>
                            <span
                                style={{
                                    fontFamily: "Cocogoose",
                                    fontSize: "13px",
                                }}
                            >
                                GrabFood MktPlace
                            </span>
                            <div
                                style={{
                                    fontSize: "13px",
                                    opacity: "0.6",
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <AvTimerIcon />{" "}
                                <span style={{ marginLeft: "0.5rem" }}>
                                    {" "}
                                    1 May 2023 - 2 June 2023{" "}
                                </span>
                            </div>
                            <div
                                style={{
                                    fontSize: "13px",
                                    opacity: "0.6",
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                }}
                            >
                                <AttachMoneyIcon />{" "}
                                <span style={{ marginLeft: "0.5rem" }}>
                                    20,000.00
                                </span>
                            </div>
                            <div
                                style={{
                                    fontSize: "13px",
                                    opacity: "0.6",
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                }}
                            >
                                <PriorityHighIcon />{" "}
                                <span style={{ marginLeft: "0.5rem" }}>
                                    Very High Priority
                                </span>
                            </div>
                        </div>
                    </Grid>

                    <Grid
                        item
                        xs={1}
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="end"
                    >
                        <Grid item>
                            <div style={{ margin: "1rem", opacity: "0.6" }}>
                                <IconButton
                                    onClick={() => navigate("/create-plan")}
                                >
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ margin: "1rem" }}>
                                <IconButton onClick={() => {}}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
};

export default MyBusinessGrowthPlan;
