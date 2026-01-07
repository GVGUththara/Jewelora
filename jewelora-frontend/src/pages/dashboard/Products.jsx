import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import "../../styles/main.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/product-category/get-all-category`
        );

        const catMap = {};
        res.data.forEach((cat) => {
          catMap[cat.categoryId] = cat.categoryName;
        });
        setCategories(catMap);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };

    const loadProducts = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/product/get-all-product`
        );
        console.log("API Response:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products", err);
      }
    };

    loadCategories();
    loadProducts();
  });

  const handleEdit = (productId) => {
    navigate(`/dashboard/editProduct/${productId}`);
  };

  const handleAddProduct = () => {
    navigate("/dashboard/addProduct");
  };

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DAA425",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(
        `${BASE_URL}/product/delete-product/${productId}`
      );

      setProducts(products.filter((p) => p.productId !== productId));

      Swal.fire({
        title: "Deleted!",
        text: "The product has been removed.",
        icon: "success",
        confirmButtonColor: "#DAA425",
      });
    } catch (err) {
      console.error("Error deleting product", err);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete the product.",
        icon: "error",
        confirmButtonColor: "#DAA425",
      });
    }
  };

  return (
    <div className="dashboard-content">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="Bold" sx={{ color: "#DAA425" }}>
          Jewelora | Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          sx={{
            backgroundColor: "#DAA425",
            fontWeight: "bold",
            px: 4,
            borderRadius: 2,
            fontSize: "1rem",
            "&:hover": { backgroundColor: "#b88a1e" },
          }}
          onClick={handleAddProduct}
        >
          Add New Product
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead sx={{ background: "#DAA425" }}>
            <TableRow>
              <TableCell>
                <b>Product Image</b>
              </TableCell>
              <TableCell>
                <b>Product Name</b>
              </TableCell>
              <TableCell>
                <b>Category</b>
              </TableCell>
              <TableCell>
                <b>Unit Price</b>
              </TableCell>
              <TableCell>
                <b>Discount</b>
              </TableCell>
              <TableCell>
                <b>Stock</b>
              </TableCell>
              <TableCell>
                <b>Material</b>
              </TableCell>
              <TableCell>
                <b>Color</b>
              </TableCell>
              <TableCell>
                <b>Rating</b>
              </TableCell>
              <TableCell>
                <b>Sold Count</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.productId} hover>
                <TableCell>
                  <img
                    src={IMAGE_BASE_URL + p.imageUrl}
                    alt={p.productName}
                    width={60}
                    height={60}
                    style={{ borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell>{p.productName}</TableCell>
                <TableCell>
                  {categories[p.productCategory] || p.productCategory}
                </TableCell>
                <TableCell>Rs.{p.unitPrice}</TableCell>
                <TableCell>{p.productDiscount}%</TableCell>
                <TableCell>{p.stockQuantity}</TableCell>
                <TableCell>{p.material}</TableCell>
                <TableCell>{p.color || "-"}</TableCell>
                <TableCell>{p.rating}</TableCell>
                <TableCell>{p.soldCount}</TableCell>

                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: p.isActive ? "#c8f7c5" : "#ffdad6",
                      color: p.isActive ? "#2d7a2d" : "#a32c2c",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </Box>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
                    }}
                    onClick={() => handleEdit(p.productId)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
                    }}
                    onClick={() => handleDelete(p.productId)}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
