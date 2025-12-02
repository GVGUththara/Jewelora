import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import "../../styles/main.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const CUSTOMER_BASE_URL = import.meta.env.VITE_CUSTOMER_URL;

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await axiosInstance.get(`${CUSTOMER_BASE_URL}/get-all`);
        setCustomers(res.data);
      } catch (err) {
        console.error("Error loading customers", err);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div className="dashboard-content">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="Bold" sx={{ color: "#DAA425" }}>
          Jewelora | Customers
        </Typography>
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
                <b>Contact Number</b>
              </TableCell>
              <TableCell>
                <b>Address</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.customerId} hover>
                <TableCell>{c.firstName}</TableCell>
                <TableCell>{c.lastName}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.contactNumber}</TableCell>
                <TableCell>
                  {" "}
                  {c.streetNumber}, {c.streetName1},{" "}
                  {c.streetName2 && c.streetName2 + ", "}
                  {c.city}, {c.postalCode}
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: c.isActive ? "#c8f7c5" : "#ffdad6",
                      color: c.isActive ? "#2d7a2d" : "#a32c2c",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    {c.isActive ? "Active" : "Inactive"}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
