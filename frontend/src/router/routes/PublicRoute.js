import NavBar from "../../components/common/navigations/NavBar";
import BaseRoute from "./BaseRoute";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // const token = Cookies.get("token");

        // if (token) {
        //     try {
        //         const {sub, exp} = jwtDecode(token)
        //         if(sub.length > 0 && new Date(exp * 1000) > new Date()){
        //             return navigate("/my-summary", {state: {info: "Session found, redirect to Summary Page"}})
        //         }
        //     } catch (e) {
        //         console.log("Invalid/ Expired token found, removing token")
        //         Cookies.set("token", null);
        //     }
        // }
    }, [navigate]);

    return (
        <BaseRoute>
            <NavBar authenticated={false} />
            <div style={{ margin: "1.5rem" }}>{children}</div>
        </BaseRoute>
    );
};

export default PublicRoute;
