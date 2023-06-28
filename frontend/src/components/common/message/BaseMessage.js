import Alert from "@mui/material/Alert";
import { useEffect, useState, forwardRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { onScreenDuration } from "../../../constants/snackBar";
import { useSnackbar } from "notistack";

const BaseMessage = forwardRef(({ message, id, icon, type }, ref) => {
    const [progress, setProgress] = useState(0);
    const { closeSnackbar } = useSnackbar();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                return oldProgress === 100 ? oldProgress : oldProgress + 1;
            });
        }, (onScreenDuration - 500) / 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box ref={ref} sx={{ width: "100%", maxWidth: "500px", boxShadow: 5 }}>
            <Alert
                icon={icon}
                sx={{ borderRadius: "4px 4px 0 0", whiteSpace: "pre-wrap" }}
                severity={type}
                onClose={() => closeSnackbar(id)}
            >
                {message}
            </Alert>
            <LinearProgress
                color={type}
                variant="determinate"
                value={progress}
            />
        </Box>
    );
});

export default BaseMessage;
