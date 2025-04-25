import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart(); // ✅ must be inside the component

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p) => p.id === productId);
        setProduct(found);
      });
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} of "${product.name}" to cart.`);
  };

  if (!product) return <p style={{ textAlign: "center" }}>Loading product details...</p>;

  return (
    <div className="product-page">
      <div className="product-header">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-page-image"
          style={{ maxWidth: "400px", borderRadius: "8px" }}
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)} {product.currency}</p>
          <div className="quantity-control">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "60px", marginLeft: "0.5rem" }}
            />
          </div>
          <button onClick={handleAddToCart} className="checkout-button" style={{ marginTop: "1rem" }}>
            Add to Cart
          </button>
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="checkout-button"
            style={{ marginTop: "0.5rem", backgroundColor: "#666" }}
          >
            Buy on Square
          </a>
        </div>
      </div>

      <div className="product-tabs">
        <button onClick={() => setActiveTab("details")} className={activeTab === "details" ? "active" : ""}>
          Details
        </button>
        <button onClick={() => setActiveTab("shipping")} className={activeTab === "shipping" ? "active" : ""}>
          Shipping Info
        </button>
        <button onClick={() => setActiveTab("vendor")} className={activeTab === "vendor" ? "active" : ""}>
          Vendor Info
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "details" && <p>{product.description}</p>}
        {activeTab === "shipping" && (
          <p>We offer local pickup and Canada Post shipping. Items typically ship within 3–5 business days.</p>
        )}
        {activeTab === "vendor" && (
          <p>Made with care by one of our talented vendors. Description may include vendor name or contact in future.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
