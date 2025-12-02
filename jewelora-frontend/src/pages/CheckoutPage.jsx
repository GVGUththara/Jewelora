import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const CART_URL = import.meta.env.VITE_CART_URL;
  const CART_ITEM_URL = import.meta.env.VITE_CART_ITEM_URL;
  const ORDER_URL = import.meta.env.VITE_ORDER_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;
  const CUSTOMER_URL = import.meta.env.VITE_CUSTOMER_URL;

  const customerId = localStorage.getItem("userId");

  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    customerContact: "",
    streetNumber: "",
    streetName1: "",
    streetName2: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartRes = await axiosInstance.get(
          `${CART_URL}/customer/${customerId}`
        );
        setCart(cartRes.data);

        const itemsRes = await axiosInstance.get(
          `${CART_ITEM_URL}/get-cart-item/${cartRes.data.cartId}`
        );
        setCartItems(itemsRes.data);

        const customerRes = await axiosInstance.get(
          `${CUSTOMER_URL}/get/${customerId}`
        );

        const c = customerRes.data;

        // Pre-fill form (if fields exist)
        setForm({
          customerContact: c.contactNumber || "",
          streetNumber: c.streetNumber || "",
          streetName1: c.streetName1 || "",
          streetName2: c.streetName2 || "",
          city: c.city || "",
          postalCode: c.postalCode || "",
        });
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    loadCart();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);

  const handleCheckout = async () => {
    if (
      !form.customerContact ||
      !form.streetNumber ||
      !form.streetName1 ||
      !form.city ||
      !form.postalCode
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Info",
        text: "Please fill in all required fields",
      });
      return;
    }

    const payload = {
      customerId,
      ...form,
      items: cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        productDiscount: item.productDiscount || 0,
      })),
    };

    try {
      await axiosInstance.post(`${ORDER_URL}/create-order`, payload);

      localStorage.removeItem("cart");
      await axiosInstance.delete(`${CART_URL}/${cart.cartId}/clear`);
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Your order has been successfully placed!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/myOrders");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: "Something went wrong. Try again!",
      });
    }
  };

  if (!cart) return <Typography sx={{ mt: 10 }}>Loading...</Typography>;

  return (
    <Box sx={{ padding: 5, mt: 10 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#DAA425",
          textAlign: "center",
        }}
      >
        Order Details
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Image</strong>
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
                <strong>Final Price</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.cartItemId}>
                <TableCell>
                  <img
                    src={IMAGE_BASE_URL + item.productImage}
                    alt={item.productName}
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>Rs. {item.unitPrice}</TableCell>
                <TableCell>{item.productDiscount || 0}%</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>Rs. {item.finalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="right" sx={{ fontWeight: "bold" }}>
                Total Amount
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Rs. {totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Shipping & Contact Information
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 1200,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Contact Number"
            name="customerContact"
            value={form.customerContact}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Street Number"
            name="streetNumber"
            value={form.streetNumber}
            onChange={handleInputChange}
            required
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Street Name 1"
            name="streetName1"
            value={form.streetName1}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Street Name 2"
            name="streetName2"
            value={form.streetName2}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleInputChange}
            required
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          sx={{
            fontWeight: "bold",
            paddingX: 5,
            backgroundColor: "#DAA425",
            "&:hover": { backgroundColor: "#b88a1e" },
          }}
          onClick={handleCheckout}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
}
