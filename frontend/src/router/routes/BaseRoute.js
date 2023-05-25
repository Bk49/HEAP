import { Fragment } from "react";
import { SnackbarProvider } from "notistack";
import ErrorMessage from "../../components/common/message/ErrorMessage";
import InformationMessage from "../../components/common/message/InformationMessage";
import SuccessMessage from "../../components/common/message/SuccessMessage";

const BaseRoute = ({ children }) => {
    return (
        <Fragment>
            <SnackbarProvider
                maxSnack={5}
                Components={{
                    customError: ErrorMessage,
                    customInfo: InformationMessage,
                    customSuccess: SuccessMessage,
                }}
            >
                {children}
            </SnackbarProvider>
        </Fragment>
    );
};

export default BaseRoute;
