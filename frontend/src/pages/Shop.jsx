// src/pages/Shop.jsx

import "../css/styles.css";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const navigate = useNavigate();

  const openModal = (product) => {
    setActiveProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setActiveProduct(null);
    setModalIsOpen(false);
  };

  const isNewProduct = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
    return daysDiff <= 30;
  };

  useEffect(() => {
    fetch("/products")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const enriched = data.products.map((product) => ({
          ...product,
          category_name: product.category_name || "Uncategorized",
          created_at: product.created_at || new Date().toISOString(),
        }));

        enriched.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProducts(enriched);
      })
      .catch((error) => {
        console.error("❌ Fetch error:", error);
        setError("Failed to load products. Please try again later.");
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory
      ? product.category_name.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const vendorMatch = selectedVendor
      ? product.description.toLowerCase().includes(selectedVendor.toLowerCase())
      : true;
    return categoryMatch && vendorMatch;
  });

  const categories = [
    "Jewelry", "Clothing", "Accessories", "Bath + Beauty", "Home Decor",
    "Food & Pantry", "Crafting", "Crystals", "Pets", "Music + Art",
    "Knives + Axes", "Baby + Kids", "Cards + Gifting Supplies", "Home + Office"
  ];

  const vendors = [
    "Bohemian Heart Crafts", "Knit with Love by Carol", "Peddie Pieces", "The Knotty Celt",
    "Candys Dandy Crafts", "Mos Craftworks", "Spoons & Stuff", "Tags & Tropics",
    "Cosmically Connected", "Soap & Seed", "Knit's by Marsha Ann", "Cheese & Stuffs",
    "Muddy Paws Raw", "Top to Toe Knits", "She Keeps Bees"
  ];

  return (
    <>
      <Helmet>
        <title>Shop Handmade Crafts | Tangled Oak + Craft Collective</title>
        <meta name="description" content="Discover handmade crafts from local artisans." />
      </Helmet>

      <div className="shop-page">
        <div className="shop-header">
          <h1>Shop Our Collection</h1>
          <p>Browse products from local artisans and makers. Tap a product to check out via our secure Square store.</p>
        </div>

        <div className="shop-filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={selectedVendor !== ""}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedVendor}
            onChange={(e) => {
              setSelectedVendor(e.target.value);
              setSelectedCategory("");
            }}
          >
            <option value="">All Vendors</option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="products-container">
          {filteredProducts.filter((p) => p.product_url && p.product_url !== "#").length === 0 ? (
            <p style={{ textAlign: "center" }}>No available products found.</p>
          ) : (
            filteredProducts
              .filter((p) => p.product_url && p.product_url !== "#")
              .map((product) => (
                <div className="product-card" key={product.id}>
                  {isNewProduct(product.created_at) && <div className="new-badge">New!</div>}
                  <img src={product.image_url} alt={product.name} className="product-image" />
                  <h3 className="product-name">
                    {product.name.replace(/^New!\s*/i, "")}
                  </h3>
                  <p className="product-price">${product.price.toFixed(2)} {product.currency}</p>
                  <button onClick={() => navigate(`/product/${product.id}`)} className="checkout-button">
                    View Product
                  </button>
                </div>
              ))
          )}
        </div>
      </div>

      <ProductModal
        isOpen={modalIsOpen}
        product={activeProduct}
        onClose={closeModal}
      />
    </>
  );
};

export default Shop;
