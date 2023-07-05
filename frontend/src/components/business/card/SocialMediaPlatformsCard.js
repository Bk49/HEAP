import { useFormContext } from "react-hook-form";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";

const SocialMediaPlatformsCard = ({ platform, image }) => {
    const { watch, setValue } = useFormContext();
    const currentPlatform = watch("platform");

    return (
        <Paper
            sx={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                width: currentPlatform === platform ? "9.9rem" : "10rem",
                height: currentPlatform === platform ? "9.9rem" : "10rem",
                border:
                    currentPlatform === platform
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
                onClick={() => setValue("platform", platform)}
            >
                {currentPlatform === platform && (
                    <CheckIcon color="primary" sx={{ margin: "0.5rem" }} />
                )}
            </div>
        </Paper>
    );
};

export default SocialMediaPlatformsCard;
