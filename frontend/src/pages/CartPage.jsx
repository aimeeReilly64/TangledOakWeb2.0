import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../css/styles.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [fulfillmentMethod, setFulfillmentMethod] = useState("Pickup");

  const deliveryFee = fulfillmentMethod === "Delivery" ? 15 : 0;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = (subtotal + deliveryFee).toFixed(2);

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, fulfillmentMethod }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert("Checkout failed: No URL returned.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: "1rem" }}>
                <strong>{item.name}</strong> — ${item.price.toFixed(2)} × {item.quantity}
                <br />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="checkout-button"
                  style={{ marginTop: "0.25rem", background: "#ccc", color: "#000" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <hr />

          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          {deliveryFee > 0 && (
            <p><strong>Shipping:</strong> ${deliveryFee.toFixed(2)} (Flat Rate)</p>
          )}
          <p><strong>Total:</strong> ${total}</p>

          <div style={{ marginTop: "1rem" }}>
            <label>
              <strong>How would you like to receive your order?</strong>
              <br />
              <select
                value={fulfillmentMethod}
                onChange={(e) => setFulfillmentMethod(e.target.value)}
                style={{ marginTop: "0.5rem" }}
              >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
              </select>
            </label>
          </div>

          <button onClick={handleCheckout} className="checkout-button" style={{ marginTop: "1rem" }}>
            Proceed to Checkout
          </button>

          <br />

          <button
            onClick={clearCart}
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              padding: "0.5rem 1rem",
              borderRadius: "5px"
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
