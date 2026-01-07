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
  Chip,
  Collapse
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../styles/main.css";

export default function DeliveryPeople() {
  const [deliveryPeople, setDeliveryPeople] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [ordersByPerson, setOrdersByPerson] = useState({});

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    const loadDeliveryPeople = async () => {
      try {
        const res = await axiosInstance.get(
          `${BASE_URL}/delivery/get-all-delivery-people`
        );
        console.log("Delivery API Response:", res.data);
        setDeliveryPeople(res.data);
      } catch (err) {
        console.error("Error loading delivery people", err);
      }
    };

    loadDeliveryPeople();
  }, []);

  const loadOrders = async (deliveryPersonId) => {
    try {
      const res = await axiosInstance.get(
        `${BASE_URL}/orders/get-orders-by-delivery-person/${deliveryPersonId}`
      );

      const orderList = res.data || [];

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
          } catch {
            return { ...order, customerName: "Unknown" };
          }
        })
      );

      setOrdersByPerson((prev) => ({
        ...prev,
        [deliveryPersonId]: ordersWithCustomerNames,
      }));
    } catch (err) {
      console.error("Error loading assigned orders", err);
    }
  };

  const toggleRow = (deliveryPersonId) => {
    const newOpen = openRow === deliveryPersonId ? null : deliveryPersonId;
    setOpenRow(newOpen);

    if (newOpen) loadOrders(deliveryPersonId);
  };

  const handleEdit = (deliveryId) => {
    navigate(`/dashboard/editDelivery/${deliveryId}`);
  };

  const handleAddUser = () => {
    navigate("/dashboard/addDeliveryPerson");
  };

  const handleDelete = async (deliveryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This delivery person will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DAA425",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(
        `${BASE_URL}/delivery/delete-delivery-person/${deliveryId}`
      );

      setDeliveryPeople(
        deliveryPeople.filter((d) => d.deliveryPersonId !== deliveryId)
      );

      Swal.fire({
        title: "Deleted!",
        text: "The delivery person has been removed.",
        icon: "success",
        confirmButtonColor: "#DAA425",
      });
    } catch (err) {
      console.error("Error deleting delivery person", err);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete the delivery person.",
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
          Jewelora | Delivery People
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
          onClick={handleAddUser}
        >
          Add New Delivery Person
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto", width: 1200 }}>
        <Table stickyHeader>
          <TableHead sx={{ background: "#DAA425" }}>
            <TableRow>
              <TableCell>
                <b>First Name</b>
              </TableCell>
              <TableCell>
                <b>Last Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Contact No</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {deliveryPeople.map((d) => (
              <>
                <TableRow key={d.deliveryPersonId} hover>
                  <TableCell>{d.firstName}</TableCell>
                  <TableCell>{d.lastName}</TableCell>
                  <TableCell>{d.email}</TableCell>
                  <TableCell>{d.contactNo}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: d.isActive ? "#c8f7c5" : "#ffdad6",
                        color: d.isActive ? "#2d7a2d" : "#a32c2c",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "6px",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      {d.isActive ? "Active" : "Inactive"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      sx={{
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                      }}
                      onClick={() => handleEdit(d.deliveryPersonId)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                      }}
                      onClick={() => handleDelete(d.deliveryPersonId)}
                    >
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => toggleRow(d.deliveryPersonId)}
                      sx={{ "&:focus": {
                                outline: "none",
                              },
                              "&:focus-visible": {
                                outline: "none",
                              },color: "#DAA425" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>

                {/* COLLAPSIBLE ORDER TABLE */}
                <TableRow>
                  <TableCell colSpan={7} sx={{ p: 0, border: 0 }}>
                    <Collapse
                      in={openRow === d.deliveryPersonId}
                      timeout="auto"
                    >
                      <Box sx={{ m: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          Assigned Orders
                        </Typography>

                        <Table size="small">
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
                                <strong>Order Created</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {(ordersByPerson[d.deliveryPersonId] || []).map(
                              (order) => (
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
                                    {order.streetName2 &&
                                      order.streetName2 + ", "}
                                    {order.city}, {order.postalCode}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString()}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
