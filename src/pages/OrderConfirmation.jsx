import React from "react";

const OrderConfirmation = () => {
  return (
    <div className="confirmation-page">
      <h1>🎉 Thank You!</h1>
      <p>Your order has been placed successfully.</p>
      <p>We'll reach out when it's ready for pickup or shipment.</p>
      <a href="/shop" className="button" style={{ marginTop: "1rem" }}>
        Back to Shop
      </a>
    </div>
  );
};

export default OrderConfirmation;
