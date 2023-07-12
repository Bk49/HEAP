import Container from "@mui/material/Container";
import Error400Illustration from "../assets/illustrations/error400-illustration.png";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import BaseRoute from "../router/routes/BaseRoute";
import NavBar from "../components/common/navigations/NavBar";

const Error404 = ({ msg }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        try {
            jwtDecode(Cookies.get("token"));
            setAuthenticated(true);
        } catch (e) {
            setAuthenticated(false);
        }
    }, []);

    return (
        <BaseRoute>
            <NavBar authenticated={authenticated} />
            <Container
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    style={{ height: "30vw", width: "30vw" }}
                    src={Error400Illustration}
                    alt="Error400 Illustration"
                />
                <span style={{ fontFamily: "Cocogoose" }}>{msg} </span>
            </Container>
        </BaseRoute>
    );
};

export default Error404;
