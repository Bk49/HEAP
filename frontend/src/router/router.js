import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import PublicRoute from "./routes/PublicRoute";
import Login from "../pages/user/Login";
import RegistrationOne from "../pages/user/RegistrationOne";
import RegistrationTwo from "../pages/user/RegistrationTwo";
import Profile from "../pages/user/Profile";
import CreateRecipe from "../pages/recipe/CreateRecipe";
import EditRecipe from "../pages/recipe/EditRecipe";

export default createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <Home />
            </PublicRoute>
        ),
        errorElement: (
            <PublicRoute>
                <Error />
            </PublicRoute>
        ),
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
    {
        path: "register-2",
        element: (
            <PublicRoute>
                <RegistrationTwo />
            </PublicRoute>
        ),
    },
    {
        path: "profile",
        element: (
            <PublicRoute>
                <Profile />
            </PublicRoute>
        ),
    },
    {
        path: "create-recipe",
        element: (
            <PublicRoute>
                <CreateRecipe />
            </PublicRoute>
        ),
    },
    {
        path: "edit-recipe",
        element: (
            <PublicRoute>
                <EditRecipe />
            </PublicRoute>
        ),
    },
]);
