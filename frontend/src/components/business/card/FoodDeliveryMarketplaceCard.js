import { useFormContext } from "react-hook-form";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";

const FoodDeliveryMarketplaceCard = ({ deliverer, image }) => {
    const { watch, setValue } = useFormContext();
    const currentMarketplace = watch("marketplace");

    return (
        <Paper
            sx={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                width: currentMarketplace === deliverer ? "9.9rem" : "10rem",
                height: currentMarketplace === deliverer ? "9.9rem" : "10rem",
                border:
                    currentMarketplace === deliverer
                        ? "0.1rem solid #007DFF"
                        : "none",
                borderRadius: "7px",
            }}
            elevation={4}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                }}
                onClick={() => {
                    setValue("marketplace", deliverer);
                }}
            >
                {currentMarketplace === deliverer && (
                    <CheckIcon color="primary" sx={{ margin: "0.5rem" }} />
                )}
            </div>
        </Paper>
    );
};

export default FoodDeliveryMarketplaceCard;
