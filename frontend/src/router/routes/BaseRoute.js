import { Fragment } from "react";
import { SnackbarProvider } from "notistack";
import ErrorMessage from "../../components/common/message/ErrorMessage";
import InformationMessage from "../../components/common/message/InformationMessage";
import SuccessMessage from "../../components/common/message/SuccessMessage";
import { useEffect } from "react";
import {
    queueError,
    queueInfo,
    queueSuccess,
} from "../../functions/formHandling";
import { useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const BaseRoute = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { error, info, success } = location.state;
            if (error) {
                queueError(error, enqueueSnackbar);
                delete location.state.error;
            }
            if (info) {
                queueInfo(info, enqueueSnackbar);
                delete location.state.info;
            }
            if (success) {
                queueSuccess(success, enqueueSnackbar);
                delete location.state.success;
            }
        }
    }, [location]);

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
