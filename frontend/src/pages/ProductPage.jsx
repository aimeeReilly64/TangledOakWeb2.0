import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCart } from "../context/CartContext";
import "../css/styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [selectedVariation, setSelectedVariation] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch product details.");
        const data = await response.json();
        const foundProduct = data.products.find((p) => p.id === productId);

        if (!foundProduct) {
          setError("Product not found.");
        } else {
          foundProduct.created_at ||= new Date("2024-04-01");
          setProduct(foundProduct);
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleVariationChange = (e) => {
    setSelectedVariation(e.target.value);
  };

  const handleAddToCart = () => {
    if (product.variations?.length > 0 && !selectedVariation) {
      setConfirmation("Please select a variation.");
      setTimeout(() => setConfirmation(""), 2000);
      return;
    }

    const variationData = product.variations?.find(
      (v) => v.name === selectedVariation
    );

    addToCart({
      id: `${product.id}-${variationData?.sku || selectedVariation}`,
      name: `${product.name}${variationData ? ` - ${variationData.name}` : ""}`,
      price: variationData?.price || product.price,
      currency: product.currency,
      image_url: product.image_url,
      variation: variationData?.name || null,
      quantity: 1,
    });

    setConfirmation("Added to cart!");
    setTimeout(() => setConfirmation(""), 2000);
  };

  if (error) return <div className="product-page"><p>{error}</p></div>;
  if (!product) return <div className="product-page"><p>Loading...</p></div>;

  return (
    <div className="product-page">
      <Helmet>
        <title>{product.name} | Tangled Oak</title>
        <meta name="description" content={product.description.slice(0, 150)} />
      </Helmet>

      <div className="main-content product-card">
        <div className="product-header">
          <h1>{product.name}</h1>
          <p className="product-price">
            ${selectedVariation && product.variations?.length
              ? product.variations.find((v) => v.name === selectedVariation)?.price.toFixed(2)
              : product.price.toFixed(2)} {product.currency}
          </p>
        </div>

        <div className="product-description">
          <p>{product.description}</p>
        </div>

        <div className="product-image2">
          <img
            src={product.image_url || "/fallback.jpg"}
            alt={product.name}
            className="product-page-image"
          />
        </div>

        {product.variations?.length > 0 && (
          <div className="product-variations">
            <label htmlFor="variation-select">Choose Variation:</label>
            <select
              id="variation-select"
              value={selectedVariation}
              onChange={handleVariationChange}
            >
              <option value="">Select</option>
              {product.variations.map((variation, index) => (
                <option key={index} value={variation.name}>
                  {variation.name} {variation.stock === 0 ? " (Sold Out)" : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleAddToCart} className="checkout-button">
          Add to Cart
        </button>

        {confirmation && (
          <p style={{ color: "#2D5C47", marginTop: "1rem", fontWeight: "bold" }}>
            {confirmation}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
