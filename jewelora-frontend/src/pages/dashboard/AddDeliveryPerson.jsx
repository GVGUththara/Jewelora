import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AddDeliveryPerson() {
  const navigate = useNavigate();
  const DELIVERY_BASE_URL = import.meta.env.VITE_DELIVERY_API;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  // REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sriLankaPhoneRegex = /^(?:0)?7[0-9]{8}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateField = (field, value) => {
    let msg = "";

    switch (field) {
      case "firstName":
        if (!value.trim()) msg = "First name is required";
        break;

      case "lastName":
        if (!value.trim()) msg = "Last name is required";
        break;

      case "email":
        if (!value.trim()) msg = "Email is required";
        else if (!emailRegex.test(value)) msg = "Invalid email format";
        break;

      case "contactNo":
        if (!value.trim()) msg = "Contact number is required";
        else if (!sriLankaPhoneRegex.test(value))
          msg = "Enter a valid Sri Lankan mobile number (07XXXXXXXX)";
        break;

      case "password":
        if (!value.trim()) msg = "Password is required";
        else if (!passwordRegex.test(value))
          msg =
            "Password must be 8+ chars, include uppercase, lowercase, number & special character";
        break;

      case "confirmPassword":
        if (!value.trim()) msg = "Confirm password is required";
        else if (value !== formData.password) msg = "Passwords do not match";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    validateField(name, value);

    // Revalidate confirm password when password changes
    if (name === "password") {
      validateField("confirmPassword", formData.confirmPassword);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((val) => val.trim() !== "") &&
      Object.values(errors).every((err) => err === "")
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Form",
        text: "Please fix all errors before submitting.",
      });
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNo: formData.contactNo,
        password: formData.password,
      };

      const res = await axiosInstance.post(
        `${DELIVERY_BASE_URL}/register-delivery-person`,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Delivery Person Added!",
        text: `${res.data.firstName} ${res.data.lastName} has been registered.`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/deliveryPeople");
    } catch (err) {
      console.error("Error registering delivery person", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.message || "Unable to register delivery person.",
        confirmButtonColor: "#DAA425",
      });
    }
  };

  return (
    <div className="dashboard-content">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#DAA425" }}
        mb={3}
      >
        Jewelora | Add Delivery Person
      </Typography>

      <Paper
        sx={{
          width: 1200,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          {/* First Name */}
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />

          {/* Last Name */}
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />

          {/* Email */}
          <TextField
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          {/* Contact No */}
          <TextField
            name="contactNo"
            label="Contact Number"
            value={formData.contactNo}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.contactNo)}
            helperText={errors.contactNo}
          />

          {/* Password */}
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.password)}
            helperText={errors.password}
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

          {/* Confirm Password */}
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    sx={{ "&:focus": { outline: "none" } }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate("/dashboard/deliveryPeople")}
              sx={{
                borderColor: "#DAA425",
                color: "#DAA425",
                fontWeight: "bold",
                px: 4,
                borderRadius: 2,
                fontSize: "1rem",
                "&:hover": {
                  color: "white",
                  borderColor: "#DAA425",
                  backgroundColor: "#DAA425",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              sx={{
                backgroundColor: "#DAA425",
                fontWeight: "bold",
                px: 4,
                borderRadius: 2,
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#b88a1e" },
              }}
            >
              Register Delivery Person
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
