import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { SnackbarProvider, closeSnackbar } from "notistack";

export default function SnackBarProvider({ children }) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      action={(snackbarId) => (
        <IconButton onClick={() => closeSnackbar(snackbarId)}>
          <Close sx={{ color: "white" }} />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
