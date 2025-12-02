import "./../styles/main.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cusPassword, setCusPassword] = useState("");

  const API_BASE_URL = import.meta.env.VITE_CUSTOMER_URL;

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !cusPassword) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/register-customer`, {
        firstName,
        lastName,
        email,
        cusPassword,
      });

      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: "#DAA425",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Registration failed",
        "error"
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
        sx={{ p: 4, maxWidth: 450, width: "100%", borderRadius: 2 }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#DAA425", fontWeight: "Bold" }}
        >
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={cusPassword}
          onChange={(e) => setCusPassword(e.target.value)}
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
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
}
