import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";

import Swal from "sweetalert2";

export default function BrowseProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/product/get-all-product`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    loadProducts();
  }, []);

  const goToDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (product) => {
    try {
      const CUSTOMER_ID = localStorage.getItem("userId");
      const cartRes = await axiosInstance.get(
        `${BASE_URL}/cart/customer/${CUSTOMER_ID}`
      );

      const cartId = cartRes.data.cartId;

      const payload = {
        cartId: cartId,
        productId: product.productId,
        productName: product.productName,
        productImage: product.imageUrl,
        quantity: 1,
        unitPrice: product.unitPrice,
        productDiscount: product.productDiscount ?? 0,
      };

      await axiosInstance.post(`${BASE_URL}/cart-item/add-cart-item`, payload);

      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        text: `${product.productName} added to cart.`,
        timer: 1200,
        showConfirmButton: false,
      });

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add to cart.",
      });
    }
  };

  return (
    <Box sx={{ padding: 4, overflowX: "auto", mt: 15 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#DAA425",
          textAlign: "center",
        }}
      >
        Browse Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={p.productId}>
            <Card
              sx={{
                height: 350,
                width: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: 4,
                cursor: "pointer",
                position: "relative",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={IMAGE_BASE_URL + p.imageUrl}
                alt={p.productName}
                onClick={() => goToDetails(p.productId)}
                sx={{ objectFit: "cover" }}
              />

              {p.productDiscount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "#DAA425",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {p.productDiscount}% OFF
                </Box>
              )}

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {p.productName}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Rs. {p.unitPrice}
                </Typography>

                <IconButton
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    mb: 1,
                    color: "#DAA425",
                  }}
                  onClick={() => handleAddToCart(p)}
                >
                  <FaShoppingCart size={20} />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
