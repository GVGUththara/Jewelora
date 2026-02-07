import logo from "./../assets/logo.png";
import axiosInstance from "../api/axiosInstance";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Drawer,
  Stack,
} from "@mui/material";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaGem,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const role = localStorage.getItem("role");
  const isCustomer = role === "CUSTOMER";
  const isDeliveryPerson = role === "DELIVERY_PERSON";
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [cartCount, setCartCount] = useState(0);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const id = localStorage.getItem("userId");
      if (!id) return;

      const cart = await axiosInstance.get(`${BASE_URL}/cart/customer/${id}`);
      const items = await axiosInstance.get(
        `${BASE_URL}/cart-item/get-cart-item/${cart.data.cartId}`
      );
      setCartCount(items.data.reduce((s, i) => s + i.quantity, 0));
    };
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navButton = {
    color: "rgba(255,255,255,0.9)",
    textTransform: "uppercase",
    fontSize: "15px",
    px: 2,
    "&:hover": {
      color: "#daa425",
      background: "rgba(218,164,37,0.1)",
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? "rgba(26,26,26,0.98)" : "rgba(45,42,48,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(218,164,37,0.2)",
          transition: "0.3s",
        }}
      >
        <Toolbar sx={{ height: 80, px: 4 }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            <img src={logo} height={60} />
            <Box>
              <Typography
                fontSize={28}
                fontWeight={700}
                sx={{
                  background: "linear-gradient(135deg,#fff 0%,#daa425 100%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Jewelora
              </Typography>
              <Typography fontSize={12} color="rgba(255,255,255,0.7)">
                Elegance in Every Detail
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={2}
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
          >
            {isCustomer && (
              <>
                <Button
                  sx={navButton}
                  href="/browseProducts"
                  startIcon={<FaGem />}
                >
                  Products
                </Button>
                <Button
                  sx={navButton}
                  href="/about"
                  startIcon={<FaInfoCircle />}
                >
                  About
                </Button>
                <Button sx={navButton} href="/contact" startIcon={<FaPhone />}>
                  Contact
                </Button>

                <Button
                  href="/cart"
                  sx={{
                    color: "#fff",
                    border: "1px solid rgba(218,164,37,0.3)",
                    borderRadius: "25px",
                    px: 3,
                    "&:hover": {
                      background: "rgba(218, 164, 37, 0.2)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(218, 164, 37, 0.2)",
                      color: "#fff",
                    },
                  }}
                  startIcon={
                    <Badge badgeContent={cartCount} color="error">
                      <FaShoppingCart color="#daa425" />
                    </Badge>
                  }
                >
                  Cart
                </Button>
                <Button
                  onClick={(e) => setProfileAnchor(e.currentTarget)}
                  sx={{
                    color: "#fff",
                    border: "1px solid rgba(218,164,37,0.3)",
                    borderRadius: "25px",
                    px: 3,
                    "&:hover": {
                      background: "rgba(218, 164, 37, 0.2)",
                      border: "1px solid rgba(218, 164, 37, 0.3)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(218, 164, 37, 0.2)",
                      color: "#fff",
                    },
                  }}
                  startIcon={<FaUser color="#daa425" />}
                >
                  My Account
                </Button>

                <Menu
                  anchorEl={profileAnchor}
                  open={Boolean(profileAnchor)}
                  onClose={() => setProfileAnchor(null)}
                  PaperProps={{
                    sx: {
                      background: "rgba(26,26,26,0.98)",
                      border: "1px solid rgba(218,164,37,0.3)",
                      color: "#fff",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setProfileAnchor(null);
                      navigate("/profile");
                    }}
                  >
                    MY PROFILE
                  </MenuItem>
                  {isCustomer && (
                    <MenuItem
                      onClick={() => {
                        setProfileAnchor(null);
                        navigate("/myOrders");
                      }}
                    >
                      MY ORDERS
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "#ff6b6b" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
            {isDeliveryPerson && (
              <>
                <Button
                  sx={navButton}
                  onClick={() => navigate("/delivery/assignedOrders")}
                >
                  Assigned Orders
                </Button>

                <Button
                  sx={navButton}
                  onClick={() => navigate("/delivery/completedOrders")}
                >
                  Completed Orders
                </Button>
                <Button
                  sx={navButton}
                  onClick={(e) => setProfileAnchor(e.currentTarget)}
                  startIcon={<FaUser />}
                >
                  My Profile
                </Button>
                <Menu
                  anchorEl={profileAnchor}
                  open={Boolean(profileAnchor)}
                  onClose={() => setProfileAnchor(null)}
                  PaperProps={{
                    sx: {
                      background: "rgba(26,26,26,0.98)",
                      border: "1px solid rgba(218,164,37,0.3)",
                      color: "#fff",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setProfileAnchor(null);
                      navigate("/profile");
                    }}
                  >
                    MY PROFILE
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "#ff6b6b" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>

          {/* Mobile Toggle */}
          <IconButton
            sx={{ color: "#fff", display: { md: "none" } }}
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
            background: "rgba(26,26,26,0.98)",
            p: 3,
          }}
        >
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "#fff" }}
          >
            <FaTimes />
          </IconButton>

          <Stack spacing={2} mt={4}>
            {isCustomer && (
              <>
                <Button href="/browseProducts" sx={navButton}>
                  Products
                </Button>
                <Button href="/about" sx={navButton}>
                  About
                </Button>
                <Button href="/contact" sx={navButton}>
                  Contact
                </Button>
                <Button href="/cart" sx={navButton}>
                  Cart ({cartCount})
                </Button>
                <Button href="/profile" sx={navButton}>
                  My Profile
                </Button>
                <Button href="/myOrders" sx={navButton}>
                  My Orders
                </Button>
              </>
            )}

            {isDeliveryPerson && (
              <>
                <Button href="/delivery/assignedOrders" sx={navButton}>
                  Assigned Orders
                </Button>
                <Button href="/delivery/completedOrders" sx={navButton}>
                  Completed Orders
                </Button>
                <Button href="/profile" sx={navButton}>
                  My Profile
                </Button>
              </>
            )}

            <Button
              onClick={handleLogout}
              sx={{
                color: "#ff6b6b",
                border: "1px solid rgba(255,107,107,0.3)",
                "&:hover": { background: "rgba(255,107,107,0.2)" },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
