import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem("user-token");
        if (!userToken || userToken == undefined) {
            setIsLoggedIn(false);
            return navigate("/auth/login");
        }
        return setIsLoggedIn(true);
    }, [isLoggedIn]);

    return <Fragment>{isLoggedIn && children}</Fragment>;
};

export default { ProtectedRoute };
