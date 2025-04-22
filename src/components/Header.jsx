// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/">
          <img
            src="/views/images/wordsLogo2.png"
            height="125"
            width="300"
            alt="Tangled Oak Word Logo"
            style={{ boxShadow: "none", border: "none" }}
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </nav>
      {/* Search Bar */}
      <div className="nav-search-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          className="nav-search"
        />
      </div>
      {/* Cart + Auth */}
      <div className="nav-auth">
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </div>
    </header>
  );
};

export default Header;
