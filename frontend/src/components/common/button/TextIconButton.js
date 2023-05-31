import { Button } from "@mui/material";
import { textIconButtonStyles as style } from "../../../constants/buttonStyles";
import AddIcon from "@mui/icons-material/Add";
const TextIconButton = ({
    children = "Button Text",
    type = "default",
    icon = <AddIcon />,
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
                "&:hover": { backgroundColor: style[type].hoverColor },
            }}
            variant="contain"
            onClick={onClick}
            startIcon={icon}
        >
            {children}
        </Button>
    );
};

export default TextIconButton;
