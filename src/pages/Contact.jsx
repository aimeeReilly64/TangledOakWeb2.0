// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/styles.css"; // Adjust path if needed

const Shop = () => {
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Sample mockup fetch functions — replace with Firebase or actual API calls
  useEffect(() => {
    fetchVendors();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchVendors = async () => {
    // Replace this with Firestore call later
    setVendors(["Vendor A", "Vendor B", "Vendor C"]);
  };

  const fetchCategories = async () => {
    // Replace this with Firestore call later
    setCategories(["Jewelry", "Home Decor", "Apparel"]);
  };

  const fetchProducts = async () => {
    // Replace this with Firestore call later
    setProducts([
      { id: 1, name: "Handmade Necklace", price: "$30" },
      { id: 2, name: "Crochet Basket", price: "$25" },
    ]);
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <Link to="/">
          <img src="/views/images/wordsLogo2.png" height="105" alt="Tangled Oak Word Logo" />
        </Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact</Link>

        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Search" id="search-input" />
        </form>

        <Link to="/cart">
          <img src="/views/images/cart.png" height="40" alt="Cart" />
        </Link>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <li><Link to="/" className="side-nav-link">Home</Link></li>
        <h2>Shop by Vendor</h2>
        <div className="vendors-container">
          {vendors.length ? vendors.map((vendor, idx) => (
            <div key={idx}>{vendor}</div>
          )) : "Loading vendors..."}
        </div>
        <li><Link to="/shop" className="side-nav-link">Shop</Link></li>
        <li><Link to="/about" className="side-nav-link">About Us</Link></li>
        <li><Link to="/contact" className="side-nav-link">Contact</Link></li>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>The Tangled Oak Shop</h1>

        <div className="context-box">
          <h2>Shop by Category</h2>
          <div className="categories-container">
            {categories.length ? categories.map((cat, idx) => (
              <div key={idx}>{cat}</div>
            )) : "Loading categories..."}
          </div>

          <h2>Newest Products</h2>
          <div className="products-container">
            {products.length ? products.map((product) => (
              <div key={product.id}>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            )) : "Loading products..."}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section social-media">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61556577491923">
                <img src="/views/images/facebook.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/tangledoakcraft/">
                <img src="/views/images/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.pinterest.com/tangledoakcraft">
                <img src="/views/images/pinterest.png" alt="Pinterest" />
              </a>
            </div>
          </div>
          <p style={{ fontSize: "8px" }}>&copy; 2024 The Tangled Oak + Craft Collective. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Shop;
