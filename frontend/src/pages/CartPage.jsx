import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../css/styles.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [fulfillmentMethod, setFulfillmentMethod] = useState("Pickup");

  const shippingFee = fulfillmentMethod === "Delivery" ? 15 : 0;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

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
              <li key={item.id} className="cart-item">
                <strong>{item.name}</strong>
                ${item.price.toFixed(2)} × {item.quantity}
                <br />
                <button onClick={() => removeFromCart(item.id)} className="checkout-button" style={{ backgroundColor: "#ddd", color: "#000", marginTop: "0.5rem" }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            {fulfillmentMethod === "Delivery" && <p>Shipping: $15.00</p>}
            <p>Total: ${total.toFixed(2)}</p>
          </div>

          <div className="cart-select">
            <label htmlFor="fulfillment">How would you like to receive your order?</label>
            <select
              id="fulfillment"
              value={fulfillmentMethod}
              onChange={(e) => setFulfillmentMethod(e.target.value)}
            >
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          <button onClick={handleCheckout} className="checkout-button">
            Proceed to Checkout
          </button>

          <button onClick={clearCart} className="clear-cart">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
