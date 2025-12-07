import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Collapse,
  Chip,
  CardMedia,
} from "@mui/material";

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

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);

  const PRODUCT_BASE_URL = import.meta.env.VITE_PRODUCT_API;
  const ORDER_URL = import.meta.env.VITE_ORDER_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;
  const DELIVERY_BASE_API = import.meta.env.VITE_DELIVERY_API;

  const customerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrdersWithImages = async () => {
      try {
        const res = await axiosInstance.get(
          `${ORDER_URL}/get-order-customer/${customerId}`
        );

        const ordersData = res.data;

        const ordersWithImages = await Promise.all(
          ordersData.map(async (order) => {
            // Fetch Delivery Person for THIS order
            let deliveryPersonName = "";
            let deliveryPersonContact = "";

            if (order.deliveryPersonId) {
              try {
                const dpRes = await axiosInstance.get(
                  `${DELIVERY_BASE_API}/get-delivery-person/${order.deliveryPersonId}`
                );
                const dp = dpRes.data;
                deliveryPersonName = `${dp.firstName} ${dp.lastName}`;
                deliveryPersonContact = dp.contactNo;
              } catch (err) {
                console.error("Failed fetching delivery person", err);
              }
            }

            // Fetch product images
            const itemsWithImages = await Promise.all(
              order.orderItems.map(async (item) => {
                try {
                  const productRes = await axiosInstance.get(
                    `${PRODUCT_BASE_URL}/get-product/${item.productId}`
                  );
                  const product = productRes.data;
                  return { ...item, imageUrl: product.imageUrl || "" };
                } catch (err) {
                  console.error("Failed fetching product", err);
                  return { ...item, imageUrl: "" };
                }
              })
            );

            return {
              ...order,
              deliveryPersonName,
              deliveryPersonContact,
              orderItems: itemsWithImages,
            };
          })
        );

        setOrders(ordersWithImages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrdersWithImages();
  }, []);

  return (
    <Box sx={{ mt: 15, padding: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          color: "#DAA425",
        }}
      >
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          You have no past orders.
        </Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Shipping Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Delivery Person</strong>
                </TableCell>
                <TableCell>
                  <strong>Delivery Contact</strong>
                </TableCell>
                <TableCell>
                  <strong>Delivered Date</strong>
                </TableCell>
                <TableCell>
                  <strong></strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <>
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>Rs. {order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusChip status={order.orderStatus} />
                    </TableCell>
                    <TableCell>
                      {order.streetNumber}, {order.streetName1},{" "}
                      {order.streetName2 && order.streetName2 + ", "}
                      {order.city}, {order.postalCode}
                    </TableCell>
                    {order.deliveryPersonId ? (
                      <>
                        <TableCell>{order.deliveryPersonName}</TableCell>
                        <TableCell>{order.deliveryPersonContact}</TableCell>
                      </>
                    ) : (
                      <em>Not Assigned</em>
                    )}

                    <TableCell>
                      {order.orderStatus === "DELIVERED" && order.deliveredDate
                        ? new Date(order.deliveredDate).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setOpenOrder(openOrder === order.id ? null : order.id)
                        }
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
                        {openOrder === order.id ? "Hide Items" : "View Items"}
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Items Section */}
                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0, border: 0 }}>
                      <Collapse in={openOrder === order.id} timeout="auto">
                        <Box sx={{ m: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 2 }}
                          >
                            Order Items
                          </Typography>

                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <strong>Product Image</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Product Name</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Quantity</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Unit Price</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Discount</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Final Price</strong>
                                </TableCell>
                              </TableRow>
                            </TableHead>

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
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>Rs. {item.unitPrice}</TableCell>
                                  <TableCell>{item.productDiscount}%</TableCell>
                                  <TableCell>
                                    Rs. {item.finalPrice.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
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
        </Paper>
      )}
    </Box>
  );
};

export default MyOrders;
