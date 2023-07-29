import Grid from "@mui/material/Grid";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import BGPCardDetailsText from "./BGPCardDetailsText";
import bgpCardFormat from "../../../../functions/bgpcardFormat";
import Typography from "@mui/material/Typography";

const { formatDate, formatPrice, formatPriority } = bgpCardFormat;

const BGPCardDetails = ({ card }) => {
    const { planName, startDate, endDate, budget, priority } = card;

    return (
        <Grid item>
            <Grid container direction="column" height="100%" rowGap="0.2rem">
                <Grid item>
                    <Typography fontWeight={700}>{planName}</Typography>
                </Grid>
                <Grid item>
                    <BGPCardDetailsText Icon={AvTimerIcon}>
                        {formatDate(startDate)} - {formatDate(endDate)}
                    </BGPCardDetailsText>
                </Grid>
                <Grid item>
                    <BGPCardDetailsText Icon={AttachMoneyIcon}>
                        {formatPrice(budget)}
                    </BGPCardDetailsText>
                </Grid>
                <Grid item>
                    <BGPCardDetailsText Icon={PriorityHighIcon}>
                        {formatPriority(priority)}
                    </BGPCardDetailsText>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BGPCardDetails;
