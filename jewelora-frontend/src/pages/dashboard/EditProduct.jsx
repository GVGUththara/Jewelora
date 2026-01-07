import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    productCategory: "",
    unitPrice: "",
    productDiscount: "",
    stockQuantity: "",
    material: "",
    color: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  // VALIDATION LOGIC (same as AddProduct)
  const validateField = (name, value) => {
    let error = "";

    if (!value) error = "This field is required";
    else {
      if (name === "unitPrice" || name === "productDiscount") {
        if (!/^\d+(\.\d{1,2})?$/.test(value)) error = "Enter a valid number";
      }

      if (name === "stockQuantity") {
        if (!/^[0-9]+$/.test(value)) error = "Quantity must be a whole number";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return (
      Object.values(form).every((v) => v !== "") &&
      Object.values(errors).every((e) => e === "")
    );
  };

  // LOAD CATEGORIES & PRODUCT
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/product-category/get-all-category`
        );
        setCategories(res.data);
      } catch {
        console.error("Error loading categories");
      }
    };

    const loadProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/product/get-product/${productId}`
        );
        setForm(res.data);
      } catch {
        console.error("Error loading product");
      }
    };

    loadCategories();
    loadProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `${BASE_URL}/product/update-product/${productId}`,
        form
      );

      Swal.fire({
        title: "Updated!",
        text: "Product updated successfully!",
        icon: "success",
        confirmButtonColor: "#DAA425",
      });

      navigate("/dashboard/products");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to update the product",
        icon: "error",
        confirmButtonColor: "#DAA425",
      });
    }
  };

  return (
    <div className="dashboard-content">
      <Typography
        variant="h4"
        fontWeight="Bold"
        sx={{ color: "#DAA425", mb: 3 }}
      >
        Jewelora | Update Product
      </Typography>

      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: 1200,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          Product Information
        </Typography>

        {/* ROW 1 */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            error={!!errors.productName}
            helperText={errors.productName}
          />

          <TextField
            fullWidth
            select
            label="Category"
            name="productCategory"
            value={form.productCategory}
            onChange={handleChange}
            error={!!errors.productCategory}
            helperText={errors.productCategory}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* ROW 2 */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="Unit Price"
            name="unitPrice"
            type="number"
            value={form.unitPrice}
            onChange={handleChange}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice}
          />

          <TextField
            fullWidth
            label="Discount (%)"
            name="productDiscount"
            type="number"
            value={form.productDiscount}
            onChange={handleChange}
            error={!!errors.productDiscount}
            helperText={errors.productDiscount}
          />
        </Box>

        {/* ROW 3 */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={form.stockQuantity}
            onChange={handleChange}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity}
          />

          <TextField
            fullWidth
            label="Material"
            name="material"
            value={form.material}
            onChange={handleChange}
            error={!!errors.material}
            helperText={errors.material}
          />
        </Box>

        {/* ROW 4 */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={form.color}
            onChange={handleChange}
            error={!!errors.color}
            helperText={errors.color}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
          />
        </Box>

        {/* BUTTONS */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
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
            onClick={() => navigate("/dashboard/products")}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!isFormValid()}
            sx={{
              backgroundColor: isFormValid() ? "#DAA425" : "#c9c1a4",
              fontWeight: "bold",
              px: 4,
              py: 1.3,
              borderRadius: 2,
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#b88a1e" },
            }}
            onClick={handleUpdate}
          >
            Update Product
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
