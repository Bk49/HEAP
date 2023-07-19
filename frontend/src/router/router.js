import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Error400 from "../pages/Error400";
import Error403 from "../pages/Error403";
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
import getAllRecipes from "../axios/recipe/getAllRecipesAPI";
import getRecipe from "../axios/recipe/getRecipeAPI";
import getMenu from "../axios/menu/getMenuAPI";
import getAllMenus from "../axios/menu/getAllMenusAPI";

export default createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <Home />
            </PublicRoute>
        ),
        errorElement: <Error404 />,
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
        path: "edit-recipe/:id",
        element: (
            <ProtectedRoute>
                <EditRecipe />
            </ProtectedRoute>
        ),
        loader: getRecipe,
        errorElement: (
            <Error400 msg="The requested recipe is not in the database" />
        ),
    },
    {
        path: "my-recipes",
        element: (
            <ProtectedRoute>
                <MyRecipes />
            </ProtectedRoute>
        ),
        loader: getAllRecipes,
        errorElement: (
            <Error403 msg="There seems to be an error trying to access the page, try to relogin!" />
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
        path: "edit-menu/:id",
        element: (
            <ProtectedRoute>
                <EditMenu />
            </ProtectedRoute>
        ),
        loader: getMenu,
        errorElement: (
            <Error403 msg="The requested menu is not in the database" />
        ),
    },
    {
        path: "my-menus",
        element: (
            <ProtectedRoute>
                <MyMenus />
            </ProtectedRoute>
        ),
        loader: getAllMenus,
        errorElement: (
            <Error403 msg="There seems to be an error trying to access the page, try to relogin!" />
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
