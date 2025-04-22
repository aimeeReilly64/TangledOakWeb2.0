// src/pages/VendorLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";



const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setToast("");
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToast("Login successful! Redirecting to your dashboard...");
      setTimeout(() => navigate("/vendor-dashboard"), 1000); // Adjust destination as needed
    } catch (err) {
      setError("Invalid login. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setToast("");
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setToast("Login successful! Redirecting to your dashboard...");
      setTimeout(() => navigate("/vendor-dashboard"), 1000); // Adjust destination as needed
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Logo Placeholder */}
      <img src="/logo.svg" alt="Tangled Oak logo" style={{ width: "60px", margin: "0 auto 1rem" }} />

      <h2 className="login-title">Vendor Login</h2>
      <p className="login-subtitle">Access your Tangled Oak dashboard</p>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`login-button ${loading ? "login-button-disabled" : ""}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button onClick={handleGoogleSignIn} className="login-button" style={{ marginTop: "1rem" }}>
        Sign in with Google
      </button>

      {toast && <p style={{ color: "#4A3F35", marginTop: "1rem" }}>{toast}</p>}
      {error && <p className="error-message">{error}</p>}

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#4A3F35" }}>
        Don’t have a vendor account?{" "}
        <Link to="/vendor-register" style={{ color: "#C98B6A", fontWeight: "bold" }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default VendorLogin;
