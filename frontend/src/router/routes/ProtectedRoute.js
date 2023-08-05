import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import BaseRoute from "./BaseRoute";
import NavBar from "../../components/common/navigations/NavBar";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const token = Cookies.get("token");
            const { sub, exp } = jwtDecode(token);
            if (sub.length <= 0) {
                return navigate("/login", {
                    state: { error: "Invalid session, please relogin" },
                });
            } else if (new Date(exp * 1000) <= new Date()) {
                return navigate("/login", {
                    state: { info: "Session expired, please relogin" },
                });
            }
        } catch (e) {
            return navigate("/login", {
                state: { error: "Invalid token, please relogin" },
            });
        }
    }, [navigate]);

    return (
        <BaseRoute>
            <NavBar authenticated={true} />
            <div style={{ margin: "1.5rem" }}>{children}</div>
        </BaseRoute>
    );
};

export default ProtectedRoute;
