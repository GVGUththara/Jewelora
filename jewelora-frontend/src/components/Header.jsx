import "./../styles/main.css";
import logo from "./../assets/logo.png";
import axiosInstance from "../api/axiosInstance";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaTruck,
  FaClipboardCheck,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NavItem = ({
  href,
  icon: Icon,
  children,
  onClick,
  setMobileMenuOpen,
}) => (
  <a
    href={href}
    className="nav-item"
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
      if (setMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }}
  >
    {Icon && <Icon className="nav-item-icon" />}
    <span className="nav-item-text">{children}</span>
  </a>
);

export default function Header() {
  const role = localStorage.getItem("role");
  const isCustomer = role === "CUSTOMER";
  const isDeliveryPerson = role === "DELIVERY_PERSON";

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [cartCount, setCartCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cart functionality
  useEffect(() => {
    const handleCartUpdate = async () => {
      const CUSTOMER_ID = localStorage.getItem("userId");
      if (!CUSTOMER_ID) return;

      try {
        const cartRes = await axiosInstance.get(
          `${BASE_URL}/cart/customer/${CUSTOMER_ID}`
        );
        const cartId = cartRes.data.cartId;
        const itemsRes = await axiosInstance.get(
          `${BASE_URL}/cart-item/get-cart-item/${cartId}`
        );
        const items = itemsRes.data;
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
    <header className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-brand">
          <div className="logo-wrapper">
            <img src={logo} alt="Jewelora Logo" className="modern-logo" />
            <div className="brand-text">
              <h1 className="modern-brand-name">Jewelora</h1>
              <span className="modern-brand-tagline">
                Elegance in Every Detail
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="modern-nav desktop-nav">
          {isCustomer && (
            <>
              <NavItem href="/browseProducts" icon={FaHome}>
                Products
              </NavItem>
              <NavItem href="/about" icon={FaInfoCircle}>
                About
              </NavItem>
              <NavItem href="/contact" icon={FaPhone}>
                Contact
              </NavItem>

              <div className="nav-actions">
                <a href="/cart" className="cart-button">
                  <FaShoppingCart className="cart-icon" />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                  <span className="cart-text">Cart</span>
                </a>

                <div className="profile-dropdown" ref={dropdownRef}>
                  <button
                    className="profile-button"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <FaUser className="profile-icon" />
                    <span className="profile-text">Account</span>
                  </button>

                  {profileOpen && (
                    <div className="dropdown-menu">
                      <a href="/profile" className="dropdown-item">
                        <FaUser className="dropdown-icon" />
                        My Profile
                      </a>
                      <a href="/myOrders" className="dropdown-item">
                        <FaClipboardCheck className="dropdown-icon" />
                        My Orders
                      </a>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {isDeliveryPerson && (
            <>
              <NavItem href="/delivery/assignedOrders" icon={FaTruck}>
                Assigned
              </NavItem>
              <NavItem href="/delivery/completedOrders" icon={FaClipboardCheck}>
                Completed
              </NavItem>

              <div className="profile-dropdown" ref={dropdownRef}>
                <button
                  className="profile-button"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <FaUser className="profile-icon" />
                  <span className="profile-text">Account</span>
                </button>

                {profileOpen && (
                  <div className="dropdown-menu">
                    <a href="/profile" className="dropdown-item">
                      <FaUser className="dropdown-icon" />
                      My Profile
                    </a>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}
        >
          {isCustomer && (
            <div className="mobile-nav-content">
              <NavItem href="/browseProducts" icon={FaHome}>
                Products
              </NavItem>
              <NavItem href="/about" icon={FaInfoCircle}>
                About Us
              </NavItem>
              <NavItem href="/contact" icon={FaPhone}>
                Contact Us
              </NavItem>
              <NavItem href="/cart" icon={FaShoppingCart}>
                Shopping Cart
                {cartCount > 0 && (
                  <span className="mobile-cart-badge">{cartCount}</span>
                )}
              </NavItem>
              <NavItem href="/profile" icon={FaUser}>
                My Profile
              </NavItem>
              <NavItem href="/myOrders" icon={FaClipboardCheck}>
                My Orders
              </NavItem>
              <button className="mobile-logout" onClick={handleLogout}>
                <FaUser className="logout-icon" />
                Logout
              </button>
            </div>
          )}

          {isDeliveryPerson && (
            <div className="mobile-nav-content">
              <NavItem href="/delivery/assignedOrders" icon={FaTruck}>
                Assigned Orders
              </NavItem>
              <NavItem href="/delivery/completedOrders" icon={FaClipboardCheck}>
                Completed Orders
              </NavItem>
              <NavItem href="/profile" icon={FaUser}>
                My Profile
              </NavItem>
              <button className="mobile-logout" onClick={handleLogout}>
                <FaUser className="logout-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
