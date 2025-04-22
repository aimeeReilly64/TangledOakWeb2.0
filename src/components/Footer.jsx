import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Media */}
        <div className="footer-section social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61556577491923" target="_blank" rel="noopener noreferrer">
              <img src="/views/images/facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/tangledoakcraft/" target="_blank" rel="noopener noreferrer">
              <img src="/views/images/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.pinterest.com/tangledoakcraft" target="_blank" rel="noopener noreferrer">
              <img src="/views/images/pinterest.png" alt="Pinterest" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/shipping-policy">Shipping & Returns</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
    
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section legal">
          <h2>Legal</h2>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li>
              <Link
                to="/vendor-login"
                className="nav-link"
                style={{ fontSize: "0.8rem", opacity: 0.6 }}
              >
                Vendor Portal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="copyright" >
        <p style={{ fontSize: "8px" }}>&copy; 2024 The Tangled Oak + Craft Collective. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
