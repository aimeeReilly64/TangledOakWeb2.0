import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setToast("");
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setToast("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError("Signup failed. " + err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Optional: reuse your logo here */}
      <img src="/logo.svg" alt="MapleMade logo" style={{ width: "60px", margin: "0 auto 1rem" }} />

      <h2 className="login-title">Join MapleMade</h2>
      <p className="login-subtitle">Create your account to list or shop handmade</p>

      <form onSubmit={handleSignup} className="login-form">
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
          placeholder="Password (6+ characters)"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>

      {toast && <p style={{ color: "#4A3F35", marginTop: "1rem" }}>{toast}</p>}
      {error && <p className="error-message">{error}</p>}

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#4A3F35" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#C98B6A", fontWeight: "bold" }}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
