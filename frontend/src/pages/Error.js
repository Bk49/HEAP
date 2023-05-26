import { useRouteError } from "react-router-dom";
import Container from "@mui/material/Container";
import Error404Illustration from "../assets/illustrations/error404-illustration.jpg";

const Error = () => {
    const error = useRouteError;
    console.log(error);

    return (
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
                src={Error404Illustration}
                alt="Error404 Illustration"
            />
            <span style={{fontFamily:"Cocogoose"}}>The page you have requested is not found</span>
        </Container>
    );
};

export default Error;
