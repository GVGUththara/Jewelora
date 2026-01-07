import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  Button,
  CardMedia,
  Chip,
} from "@mui/material";

import Swal from "sweetalert2";

const STATUS_COLORS = {
  PENDING: "#fbc02d",
  PROCESSED: "#1976d2",
  DISPATCHED: "#517891",
  DELIVERED: "#0b7f11ff",
  CANCELLED: "#d32f2f",
};

const StatusChip = ({ status }) => {
  const color = STATUS_COLORS[status] || "#000";

  return (
    <Chip
      label={status}
      sx={{
        backgroundColor: color,
        color: "#fff",
        fontWeight: "bold",
        px: 1.5,
        py: 0.5,
        fontSize: "0.85rem",
      }}
    />
  );
};

const OrderInfo = () => {
  const { orderId } = useParams();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const role = localStorage.getItem("role");

  const loadOrder = async () => {
    try {
      // Fetch order
      const res = await axiosInstance.get(
        `${BASE_URL}/orders/get-order/${orderId}`
      );
      const orderData = res.data;

      // Fetch customer details
      let customerName = "Unknown";
      try {
        const customerRes = await axiosInstance.get(
          `${BASE_URL}/customer/get/${orderData.customerId}`
        );
        const customer = customerRes.data;
        customerName = `${customer.firstName} ${customer.lastName}`;
      } catch (err) {
        console.error("Failed fetching customer", err);
      }

      // Fetch delivery person details (if assigned)
      let deliveryPersonName = "";
      let deliveryPersonContact = "";
      if (orderData.deliveryPersonId) {
        try {
          const dpRes = await axiosInstance.get(
            `${BASE_URL}/delivery/get-delivery-person/${orderData.deliveryPersonId}`
          );
          const dp = dpRes.data;
          deliveryPersonName = `${dp.firstName} ${dp.lastName}`;
          deliveryPersonContact = dp.contactNo;
        } catch (err) {
          console.error("Failed fetching delivery person", err);
        }
      }

      // Fetch product details for each order item
      const orderItemsWithImages = await Promise.all(
        orderData.orderItems.map(async (item) => {
          try {
            const productRes = await axiosInstance.get(
              `${BASE_URL}/delivery/product/get-product/${item.productId}`
            );
            const product = productRes.data;
            return { ...item, imageUrl: product.imageUrl || "" };
          } catch (err) {
            console.error("Failed fetching product", err);
            return { ...item, imageUrl: "" };
          }
        })
      );

      setOrder({
        ...orderData,
        customerName,
        deliveryPersonName,
        deliveryPersonContact,
        deliveredDate: orderData.deliveredDate,
        orderItems: orderItemsWithImages,
      });
    } catch (err) {
      console.error("Failed to load order", err);
    }
  };

  useEffect(() => {
    const run = async () => {
      await loadOrder();
    };

    run();
  }, [orderId]);

  if (!order) {
    return (
      <Typography textAlign="center" mt={5}>
        Loading order details...
      </Typography>
    );
  }

  const getAllowedStatuses = () => {
    const current = order.orderStatus;
    if (role === "ADMIN" || role === "INVENTORY_MANAGER") {
      switch (current) {
        case "PENDING":
          return ["PROCESSED"];
        case "PROCESSED":
          if (!order.deliveryPersonId) return [];
          return ["DISPATCHED"];
        default:
          return [];
      }
    } else if (role === "DELIVERY_PERSON") {
      if (current === "DISPATCHED") return ["DELIVERED"];
    }
    return [];
  };

  const handleUpdateStatus = async () => {
    try {
      const res = await axiosInstance.put(
        `${BASE_URL}/orders/update-order-status/${order.id}/status`,
        { newStatus }
      );

      setOrder({ ...order, orderStatus: res.data.orderStatus });
      setNewStatus("");

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Order status changed to ${res.data.orderStatus}.`,
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          err.response?.data?.message ||
          "Failed to update the order status. Please try again.",
      });
    }
  };

  return (
    <Box sx={{ mb: 2, mt: 10, padding: 10 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#DAA425",
        }}
      >
        Jewelora | Order Information
      </Typography>

      {/* ============ ORDER DETAILS SECTION ============ */}
      <Paper
        sx={{
          overflowX: "auto",
          mt: 2,
          width: 1200,
          p: 3,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
          mb: 4,
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Order ID</strong>
              </TableCell>
              <TableCell>{order.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Customer Name</strong>
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Contact Number</strong>
              </TableCell>
              <TableCell>{order.customerContact}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Total Amount</strong>
              </TableCell>
              <TableCell>Rs. {order.totalAmount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Order Status</strong>
              </TableCell>
              <TableCell>
                <StatusChip status={order.orderStatus} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Order Date</strong>
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Delivery Person Name</strong>
              </TableCell>
              <TableCell>{order.deliveryPersonName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Delivery Person Contact</strong>
              </TableCell>
              <TableCell>{order.deliveryPersonContact}</TableCell>
            </TableRow>
            {order.orderStatus === "DELIVERED" && order.deliveredDate && (
              <TableRow>
                <TableCell>
                  <strong>Delivered Date</strong>
                </TableCell>
                <TableCell>
                  {new Date(order.deliveredDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* ============ ORDER ITEM SECTION ============ */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight="bold">
          Order Items
        </Typography>

        <Table>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.orderItemId}>
                <TableCell>
                  <CardMedia
                    component="img"
                    image={IMAGE_BASE_URL + item.imageUrl}
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
                <TableCell>Qty: {item.quantity}</TableCell>
                <TableCell>Rs. {item.unitPrice}</TableCell>
                <TableCell>Discount: {item.productDiscount}%</TableCell>
                <TableCell>
                  <strong>Rs. {item.finalPrice.toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ============ SHIPPING ADDRESS SECTION ============ */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight="bold">
          Shipping Address
        </Typography>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                {order.streetNumber}, {order.streetName1},{" "}
                {order.streetName2 && order.streetName2 + ", "}
                {order.city}, {order.postalCode}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* ============ UPDATE STATUS SECTION ============ */}
        {order.orderStatus !== "DELIVERED" && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" fontWeight="bold">
              Update Order Status
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                displayEmpty
                sx={{ width: 250 }}
              >
                <MenuItem value="">Select Status</MenuItem>
                {getAllowedStatuses().map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#DAA425",
                  "&:hover": { backgroundColor: "#b88a1e" },
                }}
                onClick={handleUpdateStatus}
                disabled={!newStatus || getAllowedStatuses().length === 0}
              >
                Update Order Status
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default OrderInfo;
