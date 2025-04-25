// src/components/ProductModal.jsx
import React from "react";
import Modal from "react-modal";
import "../css/styles.css"; // Make sure this has your modal styles

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, product, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Checkout"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>{product.name}</h2>
        <img
          src={product.image_url}
          alt={product.name}
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <p style={{ margin: "1rem 0" }}>{product.description}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)} {product.currency}</p>
        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="checkout-button"
          style={{ marginTop: "1rem" }}
        >
          Complete Secure Checkout
        </a>
        <br />
        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ProductModal;
