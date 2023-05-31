export const queueError = (
    message = "An unknown error has occured",
    enqueueSnackbar = () => {}
) => {
    enqueueSnackbar(message, {
        variant: "customError",
    });
};