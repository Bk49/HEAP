import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError;
    console.error(error);

    return (
        <>
            <span>The page you have requested is not found</span>
        </>
    );
};

export default ErrorPage;
