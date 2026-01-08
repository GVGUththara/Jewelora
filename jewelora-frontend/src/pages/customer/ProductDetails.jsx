import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/product/get-product/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product)
    return (
      <Typography
        variant="h5"
        sx={{ textAlign: "center", mt: 10, fontWeight: "bold" }}
      >
        Loading product...
      </Typography>
    );

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

      await axiosInstance.post(
        `${BASE_URL}/cart-item/add-cart-item`,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        text: `${product.productName} has been added to your cart.`,
        timer: 1200,
        showConfirmButton: false,
      });

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add item to cart.",
      });
    }
  };

  return (
    <Box sx={{ padding: 5, mt: 10 }}>
      <Card
        sx={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: 4,
          display: "flex",
          gap: 4,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 400,
            height: 400,
            borderRadius: 3,
            objectFit: "cover",
          }}
          image={IMAGE_BASE_URL + product.imageUrl}
          alt={product.productName}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            {product.productName}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Rs. {product.unitPrice}
          </Typography>

          {product.productDiscount > 0 && (
            <Typography
              variant="h6"
              sx={{ color: "#DAA425", fontWeight: "bold", mb: 2 }}
            >
              {product.productDiscount}% Discount
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 2 }}>
            <b>Material:</b> {product.material}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <b>Color:</b> {product.color || "-"}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <b>Sold Count:</b> {product.soldCount}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <b>Rating:</b> ⭐ {product.rating}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<FaShoppingCart />}
              sx={{
                backgroundColor: "#DAA425",
                "&:hover": { backgroundColor: "#b88a1e" },
                paddingX: 3,
                fontWeight: "bold",
              }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              color="success"
              sx={{ paddingX: 3, fontWeight: "bold" }}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
