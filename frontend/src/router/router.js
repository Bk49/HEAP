import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";

export default createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
]);