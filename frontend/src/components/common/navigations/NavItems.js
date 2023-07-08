import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavItem from "./NavItem";
import IconButton from "@mui/material/IconButton";

const publicPages = [
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
];
const authenticatedPages = [
    { text: "Summary", path: "/summary" },
    { text: "My Business Growth Plan", path: "/my-business-growth-plans" },
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
                    (item) => (
                        <NavItem {...item} />
                    )
                )}
            </div>
            {authenticated && (
                <div>
                    <Link to="/profile">
                        <AccountCircleIcon sx={{ fontSize: "2rem" }} />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavItems;
