import { ErrorRounded } from "@mui/icons-material";
import { Box, Button, Container, Grid, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import TypographyCom from "../TypographyCom";

const AlertCom = ({
  title = "",
  message = "",
  open = false,
  width = "460px",
  type = "success",
  cancelText,
  onConfirm,
  okText,
  confirmColor,
  onClose = () => {},
  loading = false,
  duration = 500,
  sx,
}) => {
  const [timer, setTimer] = useState(duration);

  useEffect(() => {
    if (open) {
      setTimer(duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    let interval = 0;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((seconds) => seconds - 1);
      }, 1000);
    }
    if (timer === 0) {
      onClose();
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const colors = {
    error: "#FC0005",
    info: "#A1A3A5",
    success: "#4FCB09",
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") return;
        onClose();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width,
          bgcolor: "#ffffff",
          borderRadius: "10px",
          border: "none",
          ...sx,
        }}
      >
        <Container>
          <Grid container textAlign={"center"} py={2}>
            <Grid item xs={12} mt={2} mb="20px">
              <ErrorRounded sx={{ color: colors[type], fontSize: 100 }} />
            </Grid>
            <Grid item xs={12}>
              <TypographyCom sx={{ marginBottom: "10px" }} bold fontSize="20px">
                {title}
              </TypographyCom>
              <TypographyCom px={2} fontSize="15px">
                {message}
              </TypographyCom>
            </Grid>
            <Grid item xs={12} sx={{ margin: "30px 0" }} px={2}>
              <Grid spacing={1} justifyContent="center" container px={1}>
                <Grid xs={!onConfirm ? 12 : 6} item>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    color="secondary"
                    loading={loading}
                  >
                    {cancelText || "Cancel"}
                  </Button>
                </Grid>
                {!!onConfirm && (
                  <Grid xs={6} item>
                    <Button
                      loading={loading}
                      fullWidth
                      variant="contained"
                      fontcolor="#fff"
                      color="secondary"
                      bgcolor={
                        type === "error"
                          ? "#FC0005"
                          : type === "success"
                          ? "#4FCB09"
                          : confirmColor
                      }
                      onClick={onConfirm}
                    >
                      {okText || "Yes"}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Modal>
  );
};

export default AlertCom;
