import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";

import BrowseProducts from "./pages/customer/BrowseProducts";
import ProductDetails from "./pages/customer/ProductDetails";
import Signup from "./pages/customer/Signup";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import MyOrders from "./pages/customer/MyOrders";

import AssignedOrders from "./pages/delivery/AssignedOrders";
import DeliveredOrders from "./pages/delivery/DeliveredOrders";
import OrderInfo from "./pages/delivery/OrderInfo";

import DashboardLayout from "./layouts/DashboardLayout";
import Analytics from "./pages/dashboard/Analytics";
import ProductsPage from "./pages/dashboard/Products";
import EditProduct from "./pages/dashboard/EditProduct";
import AddProduct from "./pages/dashboard/AddProduct";
import Orders from "./pages/dashboard/Orders";
import OrderDetails from "./pages/dashboard/OrderDetails";
import Customer from "./pages/dashboard/Customers";
import DeliveryPeople from "./pages/dashboard/DeliveryPeople.JSX";
import AddDeliveryPerson from "./pages/dashboard/AddDeliveryPerson";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  // Check if we are inside dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/browseProducts" element={<BrowseProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/myOrders" element={<MyOrders />} />
        <Route path="/delivery/assignedOrders" element={<AssignedOrders />} />
        <Route path="/delivery/completedOrders" element={<DeliveredOrders />} />
        <Route path="/delivery/getOrderInfo/:orderId" element={<OrderInfo />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="editProduct/:productId" element={<EditProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="getOrders" element={<Orders />} />
          <Route path="getOrderDetails/:orderId" element={<OrderDetails />} />
          <Route path="customers" element={<Customer />} />
          <Route path="deliveryPeople" element={<DeliveryPeople />} />
          <Route path="addDeliveryPerson" element={<AddDeliveryPerson />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
