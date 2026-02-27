import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import API from "../../service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("dashboard/v1/auth/login", data);

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);

      enqueueSnackbar("Login Success", { variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      enqueueSnackbar("Login Failed, Check your email or password", {
        variant: "error",
      });
    }
  };

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
