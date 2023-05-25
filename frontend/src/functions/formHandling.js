export const enqueueError = (
    message = "An unknown error has occured",
    errors = {},
    enqueueSnackbar = () => {}
) => {
    if (Object.keys(errors).length > 0) {
        console.log(errors)
        enqueueSnackbar(message, {
            variant: "customError",
        });
    }
};

export const queueError = (
    message = "An unknown error has occured",
    enqueueSnackbar = () => {}
) => {
    enqueueSnackbar(message, {
        variant: "customError",
    });
};
