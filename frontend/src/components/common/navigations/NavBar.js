import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppLogo from "../../../assets/logo/app-logo-white.png";
import Typography from "@mui/material/Typography";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";

const NavBar = ({ authenticated = false }) => {
    return (
        <AppBar
            sx={{
                backgroundColor: "#163172",
                minHeight: "50px",
                height: "50px",
            }}
            position="sticky"
        >
            <Toolbar variant="dense">
                <Toolbar disableGutters>
                    <Link
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            textDecoration: "none",
                        }}
                        to={authenticated ? "/summary" : "/"}
                    >
                        <img
                            style={{
                                height: "2rem",
                                width: "2rem",
                            }}
                            src={AppLogo}
                            alt="App Logo"
                        />
                        <Typography
                            noWrap
                            component="span"
                            sx={{
                                color: "white",
                                fontWeight: 700,
                                textDecoration: "none",
                                marginLeft: "1rem",
                                marginRight: "2rem",
                                fontSize: "25px",
                            }}
                        >
                            F-XCEL
                        </Typography>
                    </Link>
                </Toolbar>
                <NavItems authenticated={authenticated} />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
