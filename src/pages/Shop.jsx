import React, { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => console.error("❌ Failed to fetch products:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory
      ? product.name.toLowerCase().includes(selectedCategory.toLowerCase())
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
    "Candy's Dandy Crafts", "Mo's Craftworks", "Spoons & Stuff", "Tags & Tropics",
    "Cosmically Connected", "Soap & Seed", "Knit's by Marsha Ann", "Cheese & Stuffs",
    "Muddy Paws Raw", "Top to Toe Knits", "She Keeps Bees"
  ];

  return (
    <div className="shop-page">
      <h1>Shop Our Collection</h1>
      <p>Browse products from local artisans and makers. Tap a product to check out via our secure Square store.</p>

      <div className="shop-filters" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={selectedVendor !== ""}
          style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "6px", minWidth: "200px" }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedVendor}
          onChange={(e) => {
            setSelectedVendor(e.target.value);
            setSelectedCategory(""); // reset category
          }}
          style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "6px", minWidth: "200px" }}
        >
          <option value="">All Vendors</option>
          {vendors.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)} {product.currency}</p>
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="checkout-button"
              >
                View or Buy on Square
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
