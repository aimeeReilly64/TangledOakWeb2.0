import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
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
      setToast("Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1000);
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
      setToast("Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Logo Placeholder */}
      <img src="/logo.svg" alt="MapleMade logo" style={{ width: "60px", margin: "0 auto 1rem" }} />

      <h2 className="login-title">Login to MapleMade</h2>
      <p className="login-subtitle">A community space for Canadian creators</p>

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

      {/* Google Sign-In Button */}
      <button onClick={handleGoogleSignIn} className="login-button" style={{ marginTop: "1rem" }}>
        Sign in with Google
      </button>

      {/* Toasts & Messages */}
      {toast && <p style={{ color: "#4A3F35", marginTop: "1rem" }}>{toast}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Sign-up Link */}
      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#4A3F35" }}>
        Don’t have an account?{" "}
        <Link to="/signup" style={{ color: "#C98B6A", fontWeight: "bold" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
