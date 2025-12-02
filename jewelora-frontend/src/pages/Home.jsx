import "./../styles/main.css";
import bg from "./../assets/background.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="hero-content">
        <h2>Welcome To</h2>
        <h1>Jewelora</h1>
        <p>Crafting timeless beauty with elegance and pride.</p>

        <div className="hero-buttons">
          <button className="btn login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="btn signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
