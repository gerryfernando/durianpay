import { CancelRounded, CheckCircleRounded, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import TypographyCom from "../TypographyCom";

const ModalCom = ({
  open,
  onClose,
  title,
  size = "md",
  isConfirm = false,
  okText,
  cancelText,
  children,
  onConfirm,
  confirmColor,
  isIcon = false,
  loading,
  error,
  disableOkButton = false,
}) => {
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
          boxShadow: "1px 1px 8px rgb(0,0,0,0.5)",
          padding: "20px",
          maxHeight: "85vh",
        },
      }}
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") return;
        onClose();
      }}
      maxWidth={size}
      fullWidth
      hideBackdrop
    >
      <DialogTitle mb={title ? "40px" : "0px"}>
        {title && <TypographyCom title>{title}</TypographyCom>}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 18,
              top: 18,
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Grid container columnSpacing={1} mt="40px">
          <Grid item xs={12} sx={{ textAlign: "right", py: 1, pr: 2 }}>
            <Button
              loading={loading}
              variant="outlined"
              size="medium"
              sx={{ mr: 1, borderRadius: "10px", paddingX: 4 }}
              startIcon={isIcon && <CancelRounded />}
              onClick={onClose}
              type="button"
            >
              <span> {cancelText || "Cancel"}</span>
            </Button>

            <Button
              loading={loading}
              startIcon={isIcon && <CheckCircleRounded />}
              loadingPosition="start"
              type="button"
              fontcolor="#fff"
              sx={{
                mr: 1,
                borderRadius: "10px",
                paddingX: 4,
              }}
              variant="contained"
              onClick={onConfirm}
              disabled={disableOkButton}
            >
              {okText || "OK"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCom;
