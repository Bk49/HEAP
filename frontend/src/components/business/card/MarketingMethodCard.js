import { useFormContext } from "react-hook-form";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";

const MarketingMethodCard = ({ method, image, label }) => {
    const { watch, setValue } = useFormContext();
    const currentMethod = watch("method");

    return (
        <div style={{ width: "10rem"}}>
            <Paper
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    width: currentMethod === method ? "9.9rem" : "10rem",
                    height: currentMethod === method ? "9.9rem" : "10rem",
                    border:
                        currentMethod === method
                            ? "0.1rem solid #007DFF"
                            : "none",
                    borderRadius: "7px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
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
                        setValue("method", method);
                    }}
                >
                    {currentMethod === method && (
                        <CheckIcon color="primary" sx={{ margin: "0.5rem" }} />
                    )}
                </div>
            </Paper>
            <Typography
                sx={{
                    fontWeight: 700,
                    color: currentMethod === method ? "primary" : "black",
                }}
            >
                {label}
            </Typography>
        </div>
    );
};

export default MarketingMethodCard;
