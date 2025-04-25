import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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

  const extractVendorName = (desc) => {
    const match = desc?.match(/made by ([^\.\n]+)/i);
    return match ? match[1] : null;
  };

  if (!product) return <p style={{ textAlign: "center" }}>Loading product details...</p>;

  return (
    <div className="product-page soft-background">
      <div className="product-header">
        <div className="product-image-wrapper">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-page-image"
            style={{ maxWidth: "400px", borderRadius: "8px" }}
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">
            ${product.price.toFixed(2)} {product.currency}
          </p>

          <div className="quantity-control">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "60px", marginLeft: "0.5rem" }}
            />
          </div>

          <div className="product-buttons">
            <button
              onClick={handleAddToCart}
              className="checkout-button"
              style={{ marginTop: "1rem" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <button
          onClick={() => setActiveTab("details")}
          className={activeTab === "details" ? "active" : ""}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={activeTab === "shipping" ? "active" : ""}
        >
          Shipping Info
        </button>
        <button
          onClick={() => setActiveTab("vendor")}
          className={activeTab === "vendor" ? "active" : ""}
        >
          Vendor Info
        </button>
      </div>

      <div className="tab-content soft-box">
        {activeTab === "details" && <p>{product.description}</p>}

        {activeTab === "shipping" && (
          <p>
            We offer local pickup and Canada Post shipping. Items typically
            ship within 3–5 business days.
          </p>
        )}

        {activeTab === "vendor" && (
          <p>
            {product.vendor_name
              ? `This item was made by ${product.vendor_name}.`
              : extractVendorName(product.description)
              ? `This item was made by ${extractVendorName(product.description)}.`
              : "Vendor information is currently unavailable."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
