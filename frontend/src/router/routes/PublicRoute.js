import NavBar from "../../components/common/navigations/NavBar";
import BaseRoute from "./BaseRoute";

const PublicRoute = ({ children }) => {
    return (
        <BaseRoute>
            <NavBar authenticated={false} />
            <div style={{ margin: "1.5rem" }}>{children}</div>
        </BaseRoute>
    );
};

export default PublicRoute;
