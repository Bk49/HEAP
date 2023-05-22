import { Fragment } from "react";
import NavBar from "../../components/common/navigations/NavBar";

const PublicRoute = ({ children }) => {
    return (
        <Fragment>
            <NavBar authenticated={false} />
            <div style={{ margin: "1.5rem" }}>{children}</div>
        </Fragment>
    );
};

export default PublicRoute;
