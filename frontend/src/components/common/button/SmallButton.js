import Button from "@mui/material/Button";
import { smallButtonStyles as style } from "../../../constants/buttonStyles";

const SmallButton = ({
    children = "Button Text",
    type = "default",
    onClick = () => {
        console.log("Button pressed");
    },
}) => {
    return (
        <Button
            sx={{
                backgroundColor: style[type].backgroundColor,
                color: "white",
                boxShadow: "2",
                "&:hover": {
                    backgroundColor: style[type].hoverColor,
                },
            }}
            variant="contain"
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default SmallButton;
