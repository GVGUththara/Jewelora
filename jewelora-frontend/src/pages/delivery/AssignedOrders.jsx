import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const deliverPersonId = localStorage.getItem("userId");

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

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/orders/get-assigned-orders/${deliverPersonId}`
        );
        const orderList = res.data;

        // Fetch customer names for each order
        const ordersWithCustomerNames = await Promise.all(
          orderList.map(async (order) => {
            try {
              const customerRes = await axiosInstance.get(
                `${BASE_URL}/customer/get/${order.customerId}`
              );
              const customer = customerRes.data;

              return {
                ...order,
                customerName: `${customer.firstName} ${customer.lastName}`,
              };
            } catch (err) {
              console.error("Failed fetching customer", err);
              return {
                ...order,
                customerName: "Unknown",
              };
            }
          })
        );

        setOrders(ordersWithCustomerNames);
      } catch (err) {
        console.error("Failed loading orders", err);
      }
    };

    loadOrders();
  }, []);

  return (
    <Box sx={{ mb: 2, mt: 10, padding: 10 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#DAA425",
        }}
      >
        Jewelora | Assigned Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No orders found.
        </Typography>
      ) : (
        <Paper sx={{ maxHeight: 600, overflowX: "auto", mt: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Date</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <>
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>

                    <TableCell>Rs. {order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <StatusChip status={order.orderStatus} />
                    </TableCell>
                    <TableCell>
                      {order.streetNumber}, {order.streetName1},{" "}
                      {order.streetName2 && order.streetName2 + ", "}
                      {order.city}, {order.postalCode}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          navigate(`/delivery/getOrderInfo/${order.id}`)
                        }
                        sx={{
                          "&:focus": {
                            outline: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                          },
                          color: "#DAA425",
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default AssignedOrders;
