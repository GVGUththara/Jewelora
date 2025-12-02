import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/main.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <Sidebar />

        <div className="dashboard-content">
          {/* Nested dashboard pages render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
