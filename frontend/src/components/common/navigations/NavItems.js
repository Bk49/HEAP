import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const publicPages = [
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
];
const authenticatedPages = [
    { text: "Summary", path: "/my-summary" },
    { text: "My Business Growth Plans", path: "/my-plans" },
    { text: "My Menus", path: "/my-menus" },
    { text: "My Recipes", path: "/my-recipes" },
];

const NavItems = ({ authenticated = false }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: authenticated ? "flex-start" : "flex-end",
                    width: "100%",
                }}
            >
                {(authenticated ? authenticatedPages : publicPages).map(
                    (item, index) => (
                        <NavItem key={index} {...item} />
                    )
                )}
            </div>
            {authenticated && (
                <div>
                    <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <AccountCircleIcon sx={{ fontSize: "2rem" }} />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavItems;
