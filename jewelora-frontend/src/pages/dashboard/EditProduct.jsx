import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditProduct() {
  const { productId } = useParams();
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
        const res = await axiosInstance.get(`${CATEGORY_BASE_URL}/get-all-category`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };

    const loadProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `${PRODUCT_BASE_URL}/get-product/${productId}`
        );
        setForm(res.data);
      } catch (err) {
        console.error("Error loading product", err);
      }
    };

    loadCategories();
    loadProduct();
  }, [CATEGORY_BASE_URL, PRODUCT_BASE_URL, productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`${PRODUCT_BASE_URL}/update-product/${productId}`, form);

      Swal.fire({
        title: "Updated!",
        text: "Product updated successfully!",
        icon: "success",
        confirmButtonColor: "#DAA425",
      });

      navigate("/dashboard/products");
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to update the product.",
        icon: "error",
        confirmButtonColor: "#DAA425",
      });
    }
  };

  return (
    <div className="dashboard-content">
      <Typography variant="h4" fontWeight="Bold" sx={{ color: "#DAA425", mb: 2 }}>
        Jewelora | Update Product
      </Typography>
      <Paper
        sx={{
          padding: 4,
          overflowX: "auto"
        }}
      >
        <Grid container spacing={2}>
          {/* PRODUCT NAME */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={form.productName}
              onChange={handleChange}
            />
          </Grid>

          {/* CATEGORY */}
          <Grid item xs={12}>
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

          {/* PRICE */}
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

          {/* DISCOUNT */}
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

          {/* STOCK */}
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

          {/* MATERIAL */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Material"
              name="material"
              value={form.material}
              onChange={handleChange}
            />
          </Grid>

          {/* COLOR */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </Grid>

          {/* IMAGE URL */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          {/* SUBMIT BUTTON */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleUpdate}
              sx={{
                backgroundColor: "#DAA425",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#F2CA46" },
              }}
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
