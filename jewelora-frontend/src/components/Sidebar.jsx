import { Link, useNavigate } from "react-router-dom";
import "./../styles/main.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.clear();
    navigate("/login");
  };
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <i className="fa-solid fa-chart-line"></i>
            Analytics
          </Link>
        </li>

        <li>
          <Link to="/dashboard/products">
            <i className="fa-solid fa-box-open"></i>
            Products
          </Link>
        </li>

        <li>
          <Link to="/dashboard/getOrders">
            <i className="fa-solid fa-cart-shopping"></i>
            Orders
          </Link>
        </li>

        <li>
          <Link to="/dashboard/customers">
            <i className="fa-solid fa-users"></i>
            Customers
          </Link>
        </li>

        <li>
          <Link to="/dashboard/inventory-managers">
            <i className="fa-solid fa-warehouse"></i>
            Inventory Managers
          </Link>
        </li>

        <li>
          <Link to="/dashboard/delivery-people">
            <i className="fa-solid fa-motorcycle"></i>
            Delivery People
          </Link>
        </li>

        <li>
          <Link to="/dashboard/reports">
            <i className="fa-solid fa-file-invoice"></i>
            Reports
          </Link>
        </li>
      </ul>

      <hr style={{ margin: "20px 0", borderColor: "#ccc" }} />

      {/* Logout */}
      <ul className="sidebar-menu">
        <li>
          <button
            onClick={handleLogout}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 15px",
              color: "#f44336",
              fontWeight: "bold",
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
