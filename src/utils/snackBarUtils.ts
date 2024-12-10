let snackbarRef;

export const setSnackbarRef = (enqueueSnackbar) => {
    snackbarRef = enqueueSnackbar;
};

export const showSnackbar = (message, options = {}) => {
    if (snackbarRef) {
        snackbarRef(message, options);
    } else {
        console.error("Snackbar not initialized");
    }
};
