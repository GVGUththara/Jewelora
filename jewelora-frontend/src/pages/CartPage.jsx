import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
  Divider,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CartPage() {
  const navigate = useNavigate();
  
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const customerId = localStorage.getItem("userId");

  // Load cart & items
  const loadCart = async () => {
    try {
      const cartRes = await axiosInstance.get(
        `${BASE_URL}/cart/customer/${customerId}`
      );
      setCart(cartRes.data);

      const itemsRes = await axiosInstance.get(
        `${BASE_URL}/cart-item/get-cart-item/${cartRes.data.cartId}`
      );
      setCartItems(itemsRes.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCart();
    };

    fetchData();
  }, []);

  const handleQuantityChange = async (item, delta) => {
    try {
      const newQty = item.quantity + delta;
      if (newQty < 1) return;

      await axiosInstance.put(
        `${BASE_URL}/cart-item/update-cart-item/${item.cartItemId}`,
        {
          quantity: newQty,
        }
      );

      loadCart();

      window.dispatchEvent(new Event("cartUpdated"));
      
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axiosInstance.delete(`${BASE_URL}/cart-item/delete-cart-item/${itemId}`);
      Swal.fire({
        icon: "success",
        title: "Item removed",
        timer: 1000,
        showConfirmButton: false,
      });
      loadCart();

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await axiosInstance.delete(`${BASE_URL}/cart/${cart.cartId}/clear`);
      Swal.fire({
        icon: "success",
        title: "Cart cleared",
        timer: 1000,
        showConfirmButton: false,
      });
      loadCart();
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);

  return (
    <Box sx={{ mt: 15, padding: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#DAA425",
          textAlign: "center",
        }}
      >
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
          >
            Your cart is empty.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/browseProducts")}
            sx={{
              fontWeight: "bold",
              backgroundColor: "#DAA425",
              "&:hover": { backgroundColor: "#b88a1e" },
            }}
          >
            Go to Shop
          </Button>
        </Box>
      ) : (
        <>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Product Image</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Product Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Unit Price</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Discount (%)</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Quantity</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Final Price</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.cartItemId}>
                    <TableCell>
                      <CardMedia
                        component="img"
                        image={IMAGE_BASE_URL + item.productImage}
                        alt={item.productName}
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 2,
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>

                    <TableCell>{item.productName}</TableCell>
                    <TableCell>Rs. {item.unitPrice}</TableCell>
                    <TableCell>{item.productDiscount || 0}%</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          <FaMinus />
                        </IconButton>

                        <Typography>{item.quantity}</Typography>

                        <IconButton
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          <FaPlus />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteItem(item.cartItemId)}
                      >
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                    <TableCell>Rs. {item.finalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rs. {totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/browseProducts")}
              sx={{
                borderColor: "#DAA425",
                color: "#DAA425",
                fontWeight: "bold",
                "&:hover": {
                  color: "white",
                  borderColor: "#DAA425",
                  backgroundColor: "#DAA425",
                },
              }}
            >
              Shop More
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/checkout")}
              sx={{
                fontWeight: "bold",
                backgroundColor: "#DAA425",
                "&:hover": { backgroundColor: "#b88a1e" },
              }}
            >
              Checkout
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClearCart}
              sx={{ fontWeight: "bold" }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
