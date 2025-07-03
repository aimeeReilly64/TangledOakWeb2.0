// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/">
          <img
            src="/views/images/wordsLogo2.png"
            height="130"
            width="380"
            alt="Tangled Oak Word Logo"
            style={{ boxShadow: "none", border: "none" }}
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
         <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/VendorInfo" className="nav-link">Vendor Info</Link>
      
  </div>
    </header>
  );
};

export default Header;
