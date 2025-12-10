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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const ORDER_BASE_URL = import.meta.env.VITE_ORDER_URL;
  const CUSTOMER_BASE_URL = import.meta.env.VITE_CUSTOMER_URL;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");

  const STATUS_COLORS = {
    PENDING: "#fbc02d",
    PROCESSED: "#1976d2",
    DISPATCHED: "#517891",
    DELIVERED: "#2d7a2d",
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
        const res = await axiosInstance.get(`${ORDER_BASE_URL}/get-all-order`);
        const orderList = res.data;

        // Fetch customer names for each order
        const ordersWithCustomerNames = await Promise.all(
          orderList.map(async (order) => {
            try {
              const customerRes = await axiosInstance.get(
                `${CUSTOMER_BASE_URL}/get/${order.customerId}`
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      search === "" ||
      order.customerName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || order.orderStatus === statusFilter;

    const matchesDelivery =
      deliveryFilter === "" ||
      (deliveryFilter === "assigned" && order.deliveryPersonId) ||
      (deliveryFilter === "unassigned" && !order.deliveryPersonId);

    const orderDate = new Date(order.createdAt);
    const matchesDateFrom = dateFrom === "" || orderDate >= new Date(dateFrom);
    const matchesDateTo = dateTo === "" || orderDate <= new Date(dateTo);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDelivery &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  return (
    <div className="dashboard-content">
      <Box mb={2}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#DAA425",
          }}
        >
          Jewelora | Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography variant="h6" textAlign="center">
            No orders found.
          </Typography>
        ) : (
          <>
            <Paper
              sx={{
                p: 2,
                mb: 2,
                mt: 2,
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              {/* Search */}
              <TextField
                label="Search Customer"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  width: 220,
                  backgroundColor: "white",
                  input: { color: "black" },
                  label: { color: "black" },
                }}
              />

              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel sx={{ color: "black" }}>Order Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Order Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="PROCESSED">PROCESSED</MenuItem>
                  <MenuItem value="DISPATCHED">DISPATCHED</MenuItem>
                  <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                  <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Date From"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  label: { color: "black" },
                }}
              />

              <TextField
                label="Date To"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "white",
                  input: { color: "black" },
                  label: { color: "black" },
                }}
              />

              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel sx={{ color: "black" }}>Delivery Status</InputLabel>
                <Select
                  value={deliveryFilter}
                  label="Delivery Status"
                  onChange={(e) => setDeliveryFilter(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  <MenuItem value="">All Delivery</MenuItem>
                  <MenuItem value="assigned">Assigned</MenuItem>
                  <MenuItem value="unassigned">Not Assigned</MenuItem>
                </Select>
              </FormControl>
            </Paper>

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
                      <strong>Shipping Address</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Order Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Delivery Assigned</strong>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredOrders.map((order) => (
                    <>
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>

                        <TableCell>
                          Rs. {order.totalAmount.toFixed(2)}
                        </TableCell>
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
                          <Box
                            sx={{
                              backgroundColor: order.deliveryPersonId
                                ? "#c8f7c5"
                                : "#ffdad6",
                              color: order.deliveryPersonId
                                ? "#2d7a2d"
                                : "#a32c2c",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "6px",
                              fontWeight: "bold",
                              display: "inline-block",
                            }}
                          >
                            {order.deliveryPersonId
                              ? "Assigned"
                              : "Not Assigned"}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() =>
                              navigate(`/dashboard/getOrderDetails/${order.id}`)
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
          </>
        )}
      </Box>
    </div>
  );
};

export default Orders;
