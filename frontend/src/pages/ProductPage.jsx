// src/pages/ProductPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

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
          setProduct(foundProduct);
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product.");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <div className="product-page"><p>{error}</p></div>;
  }

  if (!product) {
    return <div className="product-page"><p>Loading...</p></div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} style={{ maxWidth: "300px" }} />
      <p><strong>Price:</strong> ${product.price.toFixed(2)} {product.currency}</p>
      <p>{product.description}</p>
      <a href={product.product_url} target="_blank" rel="noopener noreferrer" className="checkout-button">
        Buy Now
      </a>
    </div>
  );
};

export default ProductPage;
