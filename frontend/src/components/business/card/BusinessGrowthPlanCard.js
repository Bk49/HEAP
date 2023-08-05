import EditIcon from "@mui/icons-material/Edit";
import OutletExpansionIllustration from "../../../assets/illustrations/business/outlet-expansion-illustration.jpg";
import MarketingIllustration from "../../../assets/illustrations/business/marketing-illustration.jpg";
import FoodDeliveryIllustration from "../../../assets/illustrations/business/food-delivery-illustration.jpg";
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import BusinessCardIconButton from "../button/BusinessCardIconButton";
import BGPCardDetails from "./BGPCard/BGPCardDetails";
import ConfirmDeleteDialog from "../../common/dialog/ConfirmDeleteDialog";

const BusinessGrowthPlanCard = ({ card }) => {
    const { id, planType, planName, ...other } = card;
    const navigate = useNavigate();

    return (
        <Paper
            elevation={4}
            sx={{
                padding: "0.5rem",
            }}
        >
            <Grid container direction="row" alignItems="left">
                <Grid item xs={11}>
                    <Grid container alignItems="center">
                        <Grid item xs={2}>
                            <div
                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                            >
                                <img
                                    style={{
                                        display: "block",
                                        height: "auto",
                                        maxWidth: "100%",
                                    }}
                                    src={
                                        planType === "FD"
                                            ? FoodDeliveryIllustration
                                            : planType === "MK"
                                            ? MarketingIllustration
                                            : planType === "OE"
                                            ? OutletExpansionIllustration
                                            : FoodDeliveryIllustration
                                    }
                                    alt="illustration"
                                />
                            </div>
                        </Grid>
                        <BGPCardDetails card={other} planName={planName} />
                    </Grid>
                </Grid>

                <Grid item xs={1}>
                    <Grid
                        container
                        direction="column"
                        alignItems="end"
                        height="100%"
                        justifyContent="space-between"
                    >
                        <BusinessCardIconButton
                            onClick={() => navigate(`/edit-plan/${id}`)}
                        >
                            <EditIcon fontSize="1.4rem" />
                        </BusinessCardIconButton>
                        <ConfirmDeleteDialog
                            id={id}
                            type="business"
                            name={planName}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BusinessGrowthPlanCard;
