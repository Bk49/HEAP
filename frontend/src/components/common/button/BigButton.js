import { Button } from "@mui/material";
import { bigButtonStyles as style } from "../../../constants/buttonStyles";

const BigButton = ({ isPrimary = true, children = "Button Text" }) => {
    return (
        <Button
            sx={{
                backgroundColor:
                    style[isPrimary ? "primary" : "secondary"].backgroundColor,
                color: "white",
                width: "20rem",
                boxShadow: "2",
                "&:hover": {
                    backgroundColor:
                        style[isPrimary ? "primary" : "secondary"].hoverColor,
                },
            }}
            variant="contain"
            size="large"
        >
            {children}
        </Button>
    );
};

export default BigButton;
