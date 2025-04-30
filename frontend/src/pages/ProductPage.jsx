import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "../css/styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [selectedVariation, setSelectedVariation] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        const foundProduct = data.products.find((p) => p.id === productId);

        if (!foundProduct) {
          setError("Product not found.");
        } else {
          if (!foundProduct.created_at) {
            foundProduct.created_at = new Date("2024-04-01");
          }
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

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image_url: product.image_url,
      variation: selectedVariation || null,
      quantity: 1,
    };

    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === itemToAdd.id &&
        item.variation === itemToAdd.variation
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(itemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setConfirmation("Added to cart!");
    setTimeout(() => setConfirmation(""), 2000);
  };

  if (error) {
    return <div className="product-page"><p>{error}</p></div>;
  }

  if (!product) {
    return <div className="product-page"><p>Loading...</p></div>;
  }

  return (
    <div className="product-page">
      <Helmet>
        <title>{product.name} | Tangled Oak</title>
        <meta name="description" content={product.description.slice(0, 150)} />
      </Helmet>

      <div className="context-box product-box">

        <div className="product-image">
          <img
            src={product.image_url || "/fallback.jpg"}
            alt={product.name}
          />
        </div>

        <div className="product-header">
          <h1>{product.name}</h1>
          <p className="product-price">
            ${product.price.toFixed(2)} {product.currency}
          </p>
        </div>

        <div className="product-description">
          <p>{product.description}</p>
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
                  {variation.name}
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
