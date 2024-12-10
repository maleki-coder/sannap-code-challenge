import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { setSnackbarRef } from "./snackBarUtils";

export const InitSnackbar = () => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // Store the reference globally on mount
        setSnackbarRef(enqueueSnackbar);
    }, [enqueueSnackbar]);

    return null; // No UI, just initializing snackbar
};
