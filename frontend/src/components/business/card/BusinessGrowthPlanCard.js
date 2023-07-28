import AvTimerIcon from "@mui/icons-material/AvTimer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import OutletExpansionIllustration from "../../../assets/illustrations/business/outlet-expansion-illustration.jpg";
import MarketingIllustration from "../../../assets/illustrations/business/marketing-illustration.jpg";
import FoodDeliveryIllustration from "../../../assets/illustrations/business/food-delivery-illustration.jpg";
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

const formatDate = (inputDate) => {
    const dateParts = inputDate.split("/");
    const day = parseInt(dateParts[0], 10);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    if (day && monthIndex >= 0 && monthIndex < 12 && year) {
        return `${day} ${monthNames[monthIndex]} ${year}`;
    } else {
        return "Invalid Date";
    }
};

const formatPrice = (number) => {
    return number.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const mapPriorityToLabel = (number) => {
    switch (number) {
        case 1:
            return "Very Low Priority";
        case 2:
            return "Low Priority";
        case 3:
            return "Medium Priority";
        case 4:
            return "High Priority";
        case 5:
            return "Very High Priority";
        default:
            return "Unknown";
    }
};

const BusinessGrowthPlanCard = ({ card, onDelete }) => {
    const {
        id,
        planName,
        startDate,
        endDate,
        budget,
        priority,
        planType,
    } = card;
    const navigate = useNavigate();

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const formattedBudget = formatPrice(budget);
    const formattedPriority = mapPriorityToLabel(priority);

    return (
        <Grid
            sx={{
                width: "100%",
            }}
            container
        >
            <Paper
                elevation={4}
                sx={{
                    margin: "1rem 2rem 1rem",
                    width: "100%",
                    height: "10rem",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "left",
                    gap: "1rem",
                    justifyContent: "left",
                }}
            >
                <Grid item xs={11} container direction="row" alignItems="top">
                    <img
                        src={
                            planType === "FD"
                                ? FoodDeliveryIllustration
                                : planType === "MK"
                                ? MarketingIllustration
                                : planType === "OE"
                                ? OutletExpansionIllustration
                                : FoodDeliveryIllustration
                        }
                        alt="FoodDeliveryIllustration"
                        style={{ height: "90%" }}
                    />
                    <div style={{ marginTop: "2rem" }}>
                        <span
                            style={{
                                fontFamily: "Roboto",
                                fontWeight: "bold",
                                fontSize: "15px",
                            }}
                        >
                            {planName}
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
                                {formattedStartDate} - {formattedEndDate}{" "}
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
                                {formattedBudget}
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
                                {formattedPriority}
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
                        <div style={{ margin: "0.5rem" }}>
                            <IconButton
                                onClick={() => navigate("/create-plan")}
                            >
                                <EditIcon style={{fontSize: "1.3rem"}}/>
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{ margin: "0.5rem" }}>
                            <IconButton onClick={onDelete}>
                                <DeleteIcon style={{fontSize: "1.4rem"}}/>
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default BusinessGrowthPlanCard;
