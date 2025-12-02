import "./../styles/main.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;

  const handleLogin = async () => {
    setErrorMsg("");

    if (!identifier || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${AUTH_BASE_URL}/login`, {
        identifier,
        password,
      });

      const data = res.data;

      // Save login data
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("tokenType", data.tokenType);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("expiresInMs", data.expiresIn);

      console.log("Login successful ", data);
      window.dispatchEvent(new Event("cartUpdated"));

      if (data.role === "CUSTOMER") navigate("/browseProducts");
      else if (data.role === "ADMIN") navigate("/dashboard/");
    } catch (err) {
      console.log(err);
      setErrorMsg(
        err.response?.data?.error || "Something went wrong. Try again!"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 2 }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: "center",
            color: "#DAA425",
            fontWeight: "Bold",
          }}
        >
          Login
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username or Email"
          variant="outlined"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#DAA425",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#F2CA46" },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
