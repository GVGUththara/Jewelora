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

export default function DeliveryPeople() {
  const [deliveryPeople, setDeliveryPeople] = useState([]);
  const navigate = useNavigate();

  const DELIVERY_BASE_URL = import.meta.env.VITE_DELIVERY_API;

  useEffect(() => {
    const loadDeliveryPeople = async () => {
      try {
        const res = await axiosInstance.get(
          `${DELIVERY_BASE_URL}/get-all-delivery-people`
        );
        console.log("Delivery API Response:", res.data);
        setDeliveryPeople(res.data);
      } catch (err) {
        console.error("Error loading delivery people", err);
      }
    };

    loadDeliveryPeople();
  }, []);

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
        `${DELIVERY_BASE_URL}/delete-delivery-person/${deliveryId}`
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
            </TableRow>
          </TableHead>

          <TableBody>
            {deliveryPeople.map((d) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
