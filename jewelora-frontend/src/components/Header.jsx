import "./../styles/main.css";
import logo from "./../assets/logo.png";
import axiosInstance from "../api/axiosInstance";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const role = localStorage.getItem("role");
  const isCustomer = role === "CUSTOMER";
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleCartUpdate = async () => {
      const CUSTOMER_ID = localStorage.getItem("userId");
      if (!CUSTOMER_ID) return;

      try {
        // Fetch cart
        const cartRes = await axiosInstance.get(
          `${import.meta.env.VITE_CART_URL}/customer/${CUSTOMER_ID}`
        );

        const cartId = cartRes.data.cartId;

        // Fetch items of cart
        const itemsRes = await axiosInstance.get(
          `${import.meta.env.VITE_CART_ITEM_URL}/get-cart-item/${cartId}`
        );

        const items = itemsRes.data;

        // Update badge count
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    };

    handleCartUpdate();

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-section">
          <img src={logo} alt="Jewelora Logo" className="logo-img" />
          <h1 className="brand-name">Jewelora | </h1>
          <span className="brand-tagline">Elegance in Every Detail</span>
        </div>

        <nav className="navbar-menu">
          <a href="/">Home</a>
          {isCustomer && (
            <>
              <a href="/browseProducts" className="nav-icon">
                Products
              </a>
            </>
          )}
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          {isCustomer && (
            <>
              <a
                href="/cart"
                className="nav-icon"
                style={{ position: "relative" }}
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -10,
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </a>
              <div
                className="nav-icon"
                style={{ position: "relative", cursor: "pointer" }}
                ref={dropdownRef}
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <FaUser size={20} />

                {profileOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: 0,
                      background: "white",
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                      borderRadius: "6px",
                      overflow: "hidden",
                      zIndex: 1000,
                    }}
                  >
                    <a
                      href="/profile"
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        textDecoration: "none",
                        color: "#333",
                        whiteSpace: "nowrap",
                      }}
                    >
                      My Profile
                    </a>
                    <a
                      href="/myOrders"
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        textDecoration: "none",
                        color: "#333",
                        whiteSpace: "nowrap",
                      }}
                    >
                      My Orders
                    </a>
                    <div
                      onClick={handleLogout}
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        cursor: "pointer",
                        color: "#333",
                        borderTop: "1px solid #eee",
                      }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
