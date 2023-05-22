import { Button } from "@mui/material";

const BigButton = ({ isPrimary = true, children = "Button Text" }) => {
    return (
        <Button
            sx={{
                backgroundColor: isPrimary ? "#163172" : "#43ACD9",
                color: "white",
                width: "20rem",
                boxShadow: "2",
                "&:hover": {
                    backgroundColor: isPrimary ? "#0E1E43" : "#398DB0",
                },
            }}
            variant="contain"
            size="large"
        >{children}</Button>
    );
};

export default BigButton;
