import "../css/styles.css";
import React, { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
   
          console.log(data); // Check if the categories are there
          setProducts(data.products);
        })
    
      .catch((error) => {
        console.error('❌ Fetch error:', error);
        setError('Failed to load products. Please try again later.');
      });
  }, [];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory
      ? product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
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
      <head>
        <title>Shop Handmade Crafts | Tangled Oak + Craft Collective</title>
        <meta
          name="description"
          content="Discover a wide range of handmade crafts from local artisans at Tangled Oak + Craft Collective. Explore products like jewelry, accessories, home decor, and more!"
        />
        <meta name="keywords" content="handmade crafts, local artisans, jewelry, accessories, home decor, Tangled Oak + Craft Collective, buy handmade products" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Shop Handmade Crafts | Tangled Oak + Craft Collective" />
        <meta
          property="og:description"
          content="Discover a wide range of handmade crafts from local artisans at Tangled Oak + Craft Collective. Explore products like jewelry, accessories, home decor, and more!"
        />
        <meta property="og:url" content="https://www.tangledoak.ca/shop" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Shop Handmade Crafts | Tangled Oak + Craft Collective" />
        <meta
          name="twitter:description"
          content="Discover a wide range of handmade crafts from local artisans at Tangled Oak + Craft Collective. Explore products like jewelry, accessories, home decor, and more!"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

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
              setSelectedCategory(""); // Reset category when vendor selected
            }}
            style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "6px", minWidth: "200px" }}
          >
            <option value="">All Vendors</option>
            {vendors.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

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
                  Buy on Square
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
