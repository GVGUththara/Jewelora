import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Avatar,
  AvatarGroup,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  Inventory,
  AttachMoney,
  Refresh,
  MoreVert,
  ArrowForward,
} from "@mui/icons-material";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../api/axiosInstance";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [timeRange, setTimeRange] = useState("week");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Status colors
  const STATUS_COLORS = {
    PENDING: "#fbc02d",
    PROCESSED: "#1976d2",
    DISPATCHED: "#517891",
    DELIVERED: "#2d7a2d",
    CANCELLED: "#d32f2f",
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch all data
      const [ordersRes, customersRes, productsRes, categoriesRes] =
        await Promise.all([
          axiosInstance.get(`${BASE_URL}/orders/get-all-order`),
          axiosInstance.get(`${BASE_URL}/customer/get-all`),
          axiosInstance.get(`${BASE_URL}/product/get-all-product`),
          axiosInstance.get(`${BASE_URL}/product-category/get-all-category`),
        ]);

      const orders = ordersRes.data || [];
      const customers = customersRes.data || [];
      const products = productsRes.data || [];
      const categories = categoriesRes.data || [];

      // Process analytics
      const processedData = processAnalytics(
        orders,
        customers,
        products,
        categories
      );
      setAnalyticsData(processedData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalytics = (orders, customers, products, categories) => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Revenue calculations
    const totalRevenue = orders
      .filter(
        (o) => o.orderStatus === "DELIVERED" || o.orderStatus === "DISPATCHED"
      )
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const weeklyRevenue = orders
      .filter(
        (o) =>
          (o.orderStatus === "DELIVERED" || o.orderStatus === "DISPATCHED") &&
          new Date(o.createdAt) > lastWeek
      )
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const monthlyRevenue = orders
      .filter(
        (o) =>
          (o.orderStatus === "DELIVERED" || o.orderStatus === "DISPATCHED") &&
          new Date(o.createdAt) > lastMonth
      )
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Order status distribution
    const orderStatusCounts = orders.reduce((acc, order) => {
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
      return acc;
    }, {});

    // Top selling products
    const topProducts = products
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 5);

    // Active customers
    const activeCustomers = customers.filter(
      (c) => c.isActive !== false
    ).length;

    // Low stock products
    const lowStockProducts = products.filter((p) => p.stockQuantity < 10);

    // Revenue trend data
    const revenueTrend = Array.from({ length: 12 }, (_, i) => {
      const monthOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return (
          orderDate.getMonth() === i &&
          (o.orderStatus === "DELIVERED" || o.orderStatus === "DISPATCHED")
        );
      });
      return monthOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    });

    // Category distribution
    const categoryDistribution = categories.reduce((acc, category) => {
      const categoryProducts = products.filter(
        (p) => p.productCategory === category.categoryId
      );
      acc[category.categoryName] = categoryProducts.length;
      return acc;
    }, {});

    return {
      summary: {
        totalRevenue,
        weeklyRevenue,
        monthlyRevenue,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        totalProducts: products.length,
        activeCustomers,
        pendingOrders: orderStatusCounts.PENDING || 0,
        deliveredOrders: orderStatusCounts.DELIVERED || 0,
      },
      trends: {
        revenueTrend,
        orderStatusCounts,
        categoryDistribution,
      },
      topProducts,
      lowStockProducts,
      recentOrders: orders.slice(0, 5),
      metrics: {
        conversionRate: ((orders.length / customers.length) * 100).toFixed(1),
        avgOrderValue:
          totalRevenue /
          (orders.filter(
            (o) =>
              o.orderStatus === "DELIVERED" || o.orderStatus === "DISPATCHED"
          ).length || 1),
      },
    };
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress sx={{ color: "#DAA425" }} />
      </Box>
    );
  }

  // Chart configurations
  const revenueChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue (LKR)",
        data: analyticsData?.trends.revenueTrend || [],
        borderColor: "#DAA425",
        backgroundColor: "rgba(218, 164, 37, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const orderStatusChartData = {
    labels: Object.keys(analyticsData?.trends.orderStatusCounts || {}),
    datasets: [
      {
        data: Object.values(analyticsData?.trends.orderStatusCounts || {}),
        backgroundColor: [
          STATUS_COLORS.PENDING,
          STATUS_COLORS.PROCESSED,
          STATUS_COLORS.DISPATCHED,
          STATUS_COLORS.DELIVERED,
          STATUS_COLORS.CANCELLED,
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(analyticsData?.trends.categoryDistribution || {}),
    datasets: [
      {
        label: "Products per Category",
        data: Object.values(analyticsData?.trends.categoryDistribution || {}),
        backgroundColor: [
          "rgba(218, 164, 37, 0.8)",
          "rgba(33, 150, 243, 0.8)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(255, 193, 7, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const StatCard = ({
    title,
    value,
    icon: IconComponent,
    trend,
    subtitle,
    color = "#DAA425",
  }) => (
    <Card sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color }}>
              {typeof value === "number" && title.includes("Revenue")
                ? `LKR ${value.toLocaleString()}`
                : value.toLocaleString()}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: "12px",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent sx={{ fontSize: 32, color }} />
          </Box>
        </Box>
        {trend && (
          <Box display="flex" alignItems="center" mt={2}>
            {trend > 0 ? (
              <TrendingUp sx={{ color: "#4caf50", mr: 0.5 }} />
            ) : (
              <TrendingDown sx={{ color: "#f44336", mr: 0.5 }} />
            )}
            <Typography
              variant="body2"
              color={trend > 0 ? "#4caf50" : "#f44336"}
            >
              {trend > 0 ? "+" : ""}
              {trend}% from last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const MetricBox = ({ label, value, color }) => (
    <Box
      textAlign="center"
      p={2}
      sx={{
        backgroundColor: `${color}15`,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" fontWeight={700} color={color}>
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
    </Box>
  );

  return (
    <div className="dashboard-content">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#DAA425" }}>
          Jewelora | Analytics
        </Typography>
        <IconButton onClick={fetchAnalytics} sx={{ color: "#DAA425" }}>
          <Refresh />
        </IconButton>
      </Box>

      {/* ================= SUMMARY CARDS ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Revenue"
          value={analyticsData?.summary.totalRevenue || 0}
          icon={AttachMoney}
          trend={12.5}
          color="#DAA425"
        />
        <StatCard
          title="Total Orders"
          value={analyticsData?.summary.totalOrders || 0}
          icon={ShoppingCart}
          trend={8.2}
          subtitle={`${analyticsData?.summary.deliveredOrders || 0} delivered`}
          color="#1976d2"
        />
        <StatCard
          title="Total Customers"
          value={analyticsData?.summary.totalCustomers || 0}
          icon={People}
          trend={15.3}
          subtitle={`${analyticsData?.summary.activeCustomers || 0} active`}
          color="#4caf50"
        />
        <StatCard
          title="Total Products"
          value={analyticsData?.summary.totalProducts || 0}
          icon={Inventory}
          trend={5.7}
          color="#9c27b0"
        />
      </Box>

      {/* ================= CHARTS ROW ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "3fr 1fr",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Revenue Trend
          </Typography>
          <Box sx={{ height: { xs: 250, md: 320 } }}>
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (v) => `LKR ${v.toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Order Status Distribution
          </Typography>
          <Box sx={{ height: { xs: 250, md: 320 } }}>
            <Pie
              data={orderStatusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "right" } },
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* ================= SECOND ROW ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1.5fr 1fr",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Category Distribution */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Category Distribution
          </Typography>
          <Box sx={{ height: 260 }}>
            <Bar
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </Box>
        </Paper>

        {/* Top Products */}
        <Paper sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight={600}>
              Top Selling Products
            </Typography>
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>

          {analyticsData?.topProducts.map((product, index) => (
            <Box key={product.productId} mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" fontWeight={500}>
                  {index + 1}. {product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.soldCount || 0} sold
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={
                  (product.soldCount /
                    (analyticsData.topProducts[0]?.soldCount || 1)) *
                  100
                }
                sx={{
                  height: 6,
                  borderRadius: 3,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#DAA425",
                  },
                }}
              />
            </Box>
          ))}
        </Paper>

        {/* Key Metrics */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Key Metrics
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <MetricBox
              label="Conversion Rate"
              value={`${analyticsData?.metrics.conversionRate || 0}%`}
              color="#DAA425"
            />
            <MetricBox
              label="Avg Order Value"
              value={`LKR ${
                analyticsData?.metrics.avgOrderValue?.toFixed(2) || 0
              }`}
              color="#1976d2"
            />
            <MetricBox
              label="Pending Orders"
              value={analyticsData?.summary.pendingOrders || 0}
              color="#4caf50"
            />
            <MetricBox
              label="Low Stock Items"
              value={analyticsData?.lowStockProducts?.length || 0}
              color="#9c27b0"
            />
          </Box>
        </Paper>
      </Box>

      {/* ================= RECENT ORDERS ================= */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recent Orders
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analyticsData?.recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id.slice(0, 8)}...</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>LKR {order.totalAmount?.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.orderStatus}
                    size="small"
                    sx={{
                      backgroundColor: STATUS_COLORS[order.orderStatus],
                      color: "#fff",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Analytics;
