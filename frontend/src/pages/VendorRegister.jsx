// src/pages/VendorRegister.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Ensure db is from firebase/firestore
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const VendorRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setToast("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store vendor request in Firestore
      await setDoc(doc(db, "vendorRequests", user.uid), {
        uid: user.uid,
        email,
        businessName,
        approved: false,
        createdAt: new Date()
      });

      setToast("Registration successful! Awaiting admin approval.");
      setTimeout(() => navigate("/vendor-login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try a different email or check your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src="/logo.svg" alt="Tangled Oak logo" style={{ width: "60px", margin: "0 auto 1rem" }} />
      <h2 className="login-title">Vendor Registration</h2>
      <p className="login-subtitle">Apply for a vendor account</p>

      <form onSubmit={handleRegister} className="login-form">
        <input
          type="text"
          placeholder="Business Name"
          className="login-input"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {toast && <p style={{ color: "#4A3F35", marginTop: "1rem" }}>{toast}</p>}
      {error && <p className="error-message">{error}</p>}

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#4A3F35" }}>
        Already have a vendor account?{" "}
        <Link to="/vendor-login" style={{ color: "#C98B6A", fontWeight: "bold" }}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default VendorRegister;
