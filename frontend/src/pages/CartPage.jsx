import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
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
                <button onClick={() => removeFromCart(item.id)} style={{ marginTop: "0.25rem" }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>Total:</strong>{" "}
            ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </p>
          <button onClick={handleCheckout} className="checkout-button" style={{ marginTop: "1rem" }}>
            Proceed to Checkout
          </button>
          <br />
          <button onClick={clearCart} style={{ marginTop: "0.5rem", color: "red" }}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
