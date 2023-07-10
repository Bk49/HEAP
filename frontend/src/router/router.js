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
import MyRecipes from "../pages/recipe/MyRecipes";
import CreateMenu from "../pages/menu/CreateMenu";
import EditMenu from "../pages/menu/EditMenu";
import MyMenus from "../pages/menu/MyMenus";
import CreateBusinessGrowthPlan from "../pages/business/CreateBusinessGrowthPlan";
import EditBusinessGrowthPlan from "../pages/business/EditBusinessGrowthPlan";
import MySummary from "../pages/business/MySummary";
import ProtectedRoute from "./routes/ProtectedRoute";

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
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "create-recipe",
        element: (
            <ProtectedRoute>
                <CreateRecipe />
            </ProtectedRoute>
        ),
    },
    {
        path: "edit-recipe",
        element: (
            <ProtectedRoute>
                <EditRecipe />
            </ProtectedRoute>
        ),
    },
    {
        path: "my-recipes",
        element: (
            <ProtectedRoute>
                <MyRecipes />
            </ProtectedRoute>
        ),
    },
    {
        path: "create-menu",
        element: (
            <ProtectedRoute>
                <CreateMenu />
            </ProtectedRoute>
        ),
    },
    {
        path: "edit-menu",
        element: (
            <ProtectedRoute>
                <EditMenu />
            </ProtectedRoute>
        ),
    },
    {
        path: "my-menus",
        element: (
            <ProtectedRoute>
                <MyMenus />
            </ProtectedRoute>
        ),
    },
    {
        path: "create-plan",
        element: (
            <ProtectedRoute>
                <CreateBusinessGrowthPlan />
            </ProtectedRoute>
        ),
    },
    {
        path: "edit-plan",
        element: (
            <ProtectedRoute>
                <EditBusinessGrowthPlan />
            </ProtectedRoute>
        ),
    },
    {
        path: "my-summary",
        element: (
            <ProtectedRoute>
                <MySummary />
            </ProtectedRoute>
        ),
    },
]);
