import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItemStyle = {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#daa425",
      color: "#000",
      "& i": {
        color: "#000",
      },
    },
  };

  const iconStyle = {
    minWidth: "36px",
    color: "#fff",
    fontSize: "18px",
  };

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        top: "80px",
        width: "240px",
        height: "calc(100vh - 80px)",
        backgroundColor: "#2d2a30",
        color: "#fff",
        paddingTop: "50px",
        overflowY: "auto",
        borderRight: "2px solid #000",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/analytics" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-chart-line"></i>
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/products" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-box-open"></i>
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/getOrders" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-cart-shopping"></i>
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/customers" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-users"></i>
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/inventory-managers" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-warehouse"></i>
            </ListItemIcon>
            <ListItemText primary="Inventory Managers" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/deliveryPeople" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-motorcycle"></i>
            </ListItemIcon>
            <ListItemText primary="Delivery People" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/reports" sx={menuItemStyle}>
            <ListItemIcon sx={iconStyle}>
              <i className="fa-solid fa-file-invoice"></i>
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ margin: "80px 0", borderColor: "#ccc" }} />

      {/* Logout */}
      <List>
        <ListItem>
          <Button
            onClick={handleLogout}
            startIcon={<i className="fa-solid fa-right-from-bracket"></i>}
            sx={{
              color: "#f44336",
              fontWeight: "bold",
              justifyContent: "flex-start",
              textTransform: "none",
              padding: "10px 15px",
              width: "100%",
            }}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
