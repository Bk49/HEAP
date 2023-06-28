export const queueError = (
    message = "An unknown error has occured",
    enqueueSnackbar = () => {}
) => {
    enqueueSnackbar(message, {
        variant: "customError",
    });
};

export const queueInfo = (
    message = "This is an information message",
    enqueueSnackbar = () => {}
) => {
    enqueueSnackbar(message, { variant: "customInfo" });
};

export const queueSuccess = (
    message = "Operation successful",
    enqueueSnackbar = () => {}
) => {
    enqueueSnackbar(message, { variant: "customSuccess" });
};
