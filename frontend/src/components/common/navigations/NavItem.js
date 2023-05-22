import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavItem = ({text, path}) => {
    return (
        <Link key={text} to={path}>
            <Button
                sx={{
                    color: "white",
                    textTransform: "none",
                    fontFamily: "Roboto",
                    fontWeight: 400,
                }}
            >
                {text}
            </Button>
        </Link>
    );
};

export default NavItem;
