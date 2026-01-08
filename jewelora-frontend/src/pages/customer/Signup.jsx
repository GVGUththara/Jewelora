import "../../styles/main.css";
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
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cusPassword, setCusPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cusPassword: "",
    confirmPassword: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateField = (field, value) => {
    let message = "";

    switch (field) {
      case "firstName":
        if (!value.trim()) message = "First name is required";
        break;

      case "lastName":
        if (!value.trim()) message = "Last name is required";
        break;

      case "email":
        if (!value.trim()) message = "Email is required";
        else if (!emailRegex.test(value)) message = "Invalid email format";
        break;

      case "cusPassword":
        if (!value.trim()) message = "Password is required";
        else if (!passwordRegex.test(value))
          message =
            "Password must be 8+ chars, include uppercase, lowercase, number & special character";
        break;

      case "confirmPassword":
        if (!value.trim()) message = "Confirm password is required";
        else if (value !== cusPassword) message = "Passwords do not match";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSignup = async () => {
    if (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.cusPassword ||
      errors.confirmPassword
    ) {
      Swal.fire("Error", "Please fix the errors before continuing", "error");
      return;
    }

    if (!firstName || !lastName || !email || !cusPassword || !confirmPassword) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/customer/register-customer`, {
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
        mt: 10,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 2, mt: 10, mb: 10 }}
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
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={firstName}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateField("firstName", e.target.value);
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={lastName}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateField("lastName", e.target.value);
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          value={email}
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField("email", e.target.value);
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={cusPassword}
          error={Boolean(errors.cusPassword)}
          helperText={errors.cusPassword}
          onChange={(e) => {
            setCusPassword(e.target.value);
            validateField("cusPassword", e.target.value);
            validateField("confirmPassword", confirmPassword);
          }}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ "&:focus": { outline: "none" } }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          value={confirmPassword}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateField("confirmPassword", e.target.value);
          }}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ "&:focus": { outline: "none" } }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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

        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <span style={{ color: "#DAA425", fontWeight: "bold" }}>Login</span>
        </Typography>
      </Paper>
    </Box>
  );
}
