import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [selectedVariation, setSelectedVariation] = useState("");

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

  const handleVariationChange = (e) => {
    setSelectedVariation(e.target.value);
  };


    return (
      <div className="product-page">
         <div className="product-image">
            <img
              src={product.image_url}
              alt={product.name}
            />
          </div>
        <div className="context-box product-box">
    
    
          <div className="product-header">
            <h1>{product.name}</h1>
            <p className="product-price">${product.price.toFixed(2)} {product.currency}</p>
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
                onChange={(e) => setSelectedVariation(e.target.value)}
              >
                {product.variations.map((variation, index) => (
                  <option key={index} value={variation.name}>
                    {variation.name}
                  </option>
                ))}
              </select>
            </div>
          )}
    
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="checkout-button"
          >
            Buy Now
          </a>
        </div>
      </div>
  );
};

export default ProductPage;
