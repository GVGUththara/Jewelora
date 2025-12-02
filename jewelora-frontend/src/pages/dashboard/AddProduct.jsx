import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";

export default function AddProduct() {
  const navigate = useNavigate();

  const PRODUCT_BASE_URL = import.meta.env.VITE_PRODUCT_API;
  const CATEGORY_BASE_URL = import.meta.env.VITE_CATEGORY_API;

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

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axiosInstance.get(
          `${CATEGORY_BASE_URL}/get-all-category`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`${PRODUCT_BASE_URL}/create-product`, form);

      Swal.fire({
        title: "Success!",
        text: "Product added successfully!",
        icon: "success",
        confirmButtonColor: "#DAA425",
      });

      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to add product",
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
        Jewelora | Add New Product
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

        <Grid container spacing={3}>
          {/* ROW 1 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={form.productName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              name="productCategory"
              value={form.productCategory}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* ROW 2 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Unit Price"
              name="unitPrice"
              value={form.unitPrice}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Discount (%)"
              name="productDiscount"
              value={form.productDiscount}
              onChange={handleChange}
            />
          </Grid>

          {/* ROW 3 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Stock Quantity"
              name="stockQuantity"
              value={form.stockQuantity}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Material"
              name="material"
              value={form.material}
              onChange={handleChange}
            />
          </Grid>

          {/* ROW 4 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          {/* BUTTON — RIGHT BOTTOM */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#DAA425",
                fontWeight: "bold",
                px: 4,
                py: 1.3,
                borderRadius: 2,
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#b88a1e" },
              }}
              onClick={handleSubmit}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
