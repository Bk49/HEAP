import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import PublicRoute from "./routes/PublicRoute";
import Login from "../pages/user/Login";
import RegistrationOne from "../pages/user/RegistrationOne";

export default createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <Home />
            </PublicRoute>
        ),
        errorElement: <Error />,
    },
    {
        path: "login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: "register",
        element: (
            <PublicRoute>
                <RegistrationOne />
            </PublicRoute>
        ),
    },
]);
