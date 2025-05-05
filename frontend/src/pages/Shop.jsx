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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const openModal = (product) => {
    setActiveProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setActiveProduct(null);
    setModalIsOpen(false);
  };

  const categorizeProduct = (product) => {
    const name = (product.name || "").toLowerCase();
    const desc = (product.description || "").toLowerCase();

    if (name.includes("earring") || name.includes("necklace") || name.includes("bracelet") || name.includes("ring"))
      return "Jewelry";
    if (name.includes("hat") || name.includes("shirt") || name.includes("sweater") || name.includes("shawl") || name.includes("scarf") || name.includes("tank") || name.includes("mitten") || name.includes("sock") || name.includes("slipper"))
      return "Clothing + Wearables";
    if (name.includes("bag") || name.includes("purse") || name.includes("tote"))
      return "Bags";
    if (name.includes("baby") || name.includes("kids") || desc.includes("child"))
      return "Baby + Kids";
    if (name.includes("soap") || name.includes("bath") || name.includes("scrub") || name.includes("beard") || name.includes("lotion") || name.includes("bomb"))
      return "Bath + Body";
    if (name.includes("crystal") || name.includes("gem") || name.includes("stone"))
      return "Crystals + Healing";
    if (name.includes("mug") || name.includes("glass"))
      return "Kitchen";
    if (name.includes("biscotti") || name.includes("cheese") || name.includes("maple") || name.includes("snack"))
      return "Pantry + Snacks";
    if (name.includes("pet") || name.includes("treat") || desc.includes("dog") || desc.includes("cat"))
      return "Pets";
    if (name.includes("knife") || name.includes("blade") || name.includes("dagger") || name.includes("axe"))
      return "Knives + Blades";
    if (name.includes("craft") || name.includes("kit") || name.includes("supply") || name.includes("bead") || name.includes("wire") || name.includes("pom"))
      return "DIY Crafts + Supplies";
    if (name.includes("card") || name.includes("tag") || name.includes("paper") || name.includes("gift"))
      return "Gift Accessories & Paper Goods";
    if (name.includes("pottery") || name.includes("dish") || name.includes("serving"))
      return "Serving Dishes";
    if (desc.includes("music") || name.includes("lynn blunt"))
      return "Music";
    if (name.includes("home") || desc.includes("decor") || name.includes("sign") || name.includes("pillow"))
      return "Home Decor";

    return "Uncategorized";
  };

  const isNewProduct = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
    return daysDiff <= 30;
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const enriched = data.products.map((product) => ({
          ...product,
          category_name: categorizeProduct(product),
          created_at: product.created_at || new Date("2024-04-01"),
        }));
        enriched.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProducts(enriched);
      })
      .catch((error) => {
        console.error("❌ Fetch error:", error);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
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
    "Jewelry", "Clothing + Wearables", "Bags", "Baby + Kids", "Bath + Body",
    "Crystals + Healing", "Kitchen", "Pantry + Snacks", "Pets",
    "Knives + Blades", "DIY Crafts + Supplies", "Home Decor",
    "Gift Accessories & Paper Goods", "Pottery", "Music"
  ];

  const vendors = [
    "Ocean Soul Clay", "Spoons and Stuff by Christine", "Candy Dandy Crafts", "Cosmically Connected",
    "Mo's Craftworks", "She Keeps Bees", "Bohemian Heart Crafts", "Gravelle",
    "Little Barn Homestead", "Old Soul Soap Company", "Soap & Seed",
    "Muddy Paws Raw", "Top to Toe Hand Knits", "Knits by Marsha Ann",
    "Knit With Love", "Lahaie Hats", "Tags & Tropics", "Peddie Pieces",
    "Lynn Blunt", "A&S Crystals", "Sleeping Giant Biscotti", "Cheese and Stuffs",
    "Maple Syrup", "The Knotty Celt"
  ];

  return (
    <>
      <Helmet>
        <title>Shop Handmade Crafts | Tangled Oak + Craft Collective</title>
        <meta name="description" content="Discover handmade crafts from local artisans." />
        <meta name="p:domain_verify" content="6452806078603ed37e07237d4002c6ef"/>
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

        {loading ? (
          <div className="spinner"></div>
        ) : (
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
        )}
      </div>

      <ProductModal isOpen={modalIsOpen} product={activeProduct} onClose={closeModal} />
    </>
  );
};

export default Shop;
