import "./../styles/main.css";
import logo from "./../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>Jewelora | Elegance in Every Detail</h3>
        <img src={logo} alt="logo" className="footer-logo" />
        <p className="footer-company-name">
          © 2025 <strong>Jewelora</strong> | All rights reserved
        </p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa-solid fa-location-dot"></i>
          <p>
            <span>21, Main Street, Colombo, Sri Lanka</span>
          </p>
        </div>

        <div>
          <i className="fa-solid fa-phone"></i>
          <p>+94 77 123 4567</p>
        </div>

        <div>
          <i className="fa-solid fa-envelope"></i>
          <p>
            <a href="mailto:info@jewelora.com">info@jewelora.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-icons">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
