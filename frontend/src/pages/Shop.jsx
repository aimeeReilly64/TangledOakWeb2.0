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
  
    if (name.includes("earring") || name.includes("necklace") || name.includes("bracelet") || name.includes("ring") || name.includes("anklet") || name.includes("brooch") || name.includes("pin"))
      return "Jewelry";
  
    if (name.includes("hat") || name.includes("shirt") || name.includes("sweater") || name.includes("shawl") || name.includes("scarf") || name.includes("tank") || name.includes("mitten") || name.includes("sock") || name.includes("slipper") || name.includes("glove") || name.includes("poncho"))
      return "Clothing + Wearables";
  
    if (name.includes("bag") || name.includes("purse") || name.includes("tote") || name.includes("wallet") || name.includes("pouch") || name.includes("clutch"))
      return "Bags";
  
    if (name.includes("baby") || name.includes("kids") || desc.includes("child") || name.includes("toddler") || name.includes("infant"))
      return "Baby + Kids";
  
    if (name.includes("soap") || name.includes("bath") || name.includes("scrub") || name.includes("beard") || name.includes("lotion") || name.includes("bomb") || name.includes("balm") || name.includes("cream") || name.includes("serum") || name.includes("oil"))
      return "Bath + Body";
  
    if (name.includes("crystal") || name.includes("gem") || name.includes("stone") || name.includes("healing") || name.includes("chakra"))
      return "Crystals + Healing";
  
    if (name.includes("mug") || name.includes("glass") || name.includes("plate") || name.includes("bowl") || name.includes("utensil") || name.includes("cutting board"))
      return "Kitchen + Serveware";
  
    if (name.includes("biscotti") || name.includes("cheese") || name.includes("maple") || name.includes("snack") || name.includes("jam") || name.includes("honey") || name.includes("syrup") || name.includes("tea") || name.includes("coffee"))
      return "Pantry + Snacks";
  
    if (name.includes("pet") || name.includes("treat") || desc.includes("dog") || desc.includes("cat") || name.includes("leash") || name.includes("collar"))
      return "Pets";
  
    if (name.includes("knife") || name.includes("blade") || name.includes("dagger") || name.includes("axe"))
      return "Knives + Blades";
  
    if (name.includes("craft") || name.includes("kit") || name.includes("supply") || name.includes("bead") || name.includes("wire") || name.includes("pom") || name.includes("fabric") || name.includes("pattern") || name.includes("sticker"))
      return "DIY Crafts + Supplies";
  
    if (name.includes("card") || name.includes("tag") || name.includes("paper") || name.includes("gift") || name.includes("wrapping") || name.includes("stationery"))
      return "Gift Accessories & Paper Goods";
  
    if (name.includes("pottery") || name.includes("dish") || name.includes("serving"))
      return "Kitchen + Serveware";
  
    if (desc.includes("music") || name.includes("lynn blunt") || name.includes("album") || name.includes("cd") || name.includes("record") || name.includes("vinyl"))
      return "Music";
  
    if (name.includes("home") || desc.includes("home") || name.includes("sign") || name.includes("pillow") || name.includes("blanket") || name.includes("frame") || name.includes("lamp") || name.includes("light") || name.includes("lantern") || name.includes("decor"))
      return "Home Decor";
  
    if (name.includes("christmas") || name.includes("easter") || name.includes("halloween") || name.includes("holiday") || name.includes("valentine") || name.includes("seasonal"))
      return "Holiday + Seasonal";
  
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
          created_at: product.created_at || new Date("2025-05-01"),
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
    "Jewelry", "Necklaces", "Earrings", "Bracelets", "Rings", "Clothing + Wearables","Hats", "Bags", "Shirts + Sweaters", "Slippers + Socks", "Mitts", "Scarves + Shawls", "Baby + Kids", "Bath + Body",
    ,"Soap", "Hair", "Bath", "Face", "Crystals + Healing", "Stone Towers", "Kitchen", "Pantry + Snacks", "Mugs", "Platters","Pets",
    "Knives + Blades", "DIY Crafts + Supplies", "Home Decor", "Photography", "Art", "Home", "Decor", "Kitchen + Serveware", "Plants",
    "Pantry + Snacks", "Pet Supplies", "Pet Treats",
    "Gift Accessories & Paper Goods", "Pottery", "Music", "Seasonal"
  ];

  const vendors = [
    "Knit With Love by Carol", "Ocean Soul Clay", "Peddie Pieces", "The Knotty Celt",  "Candy Dandy Crafts", "Spoons + Stuff", "Cosmically Connected",
    "Mo's Craftworks", "She Keeps Bees", "Cheese and Stuffs","Muddy Paws Raw", "Top to Toe Hand Knits", "Knits by Marsha Ann",
     "Lahaie Hats", "Tags & Tropics", "Lynn Blunt", "A&S Crystals", "Sleeping Giant Biscotti", "DIY + Craft Supplies", "Letichat Creations"
    ,"Maple Syrup"
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
