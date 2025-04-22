// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Leaf animation layer ABOVE everything but BELOW content */}
      <div className="leaf-container" id="leaf-container">
        {[...Array(10)].map((_, i) => (
          <img
            key={i}
            src={`/views/images/${(i % 5) + 1}.png`}
            className="leaf"
            style={{
              left: `${[5, 20, 35, 60, 80, 95, 5, 70, 100, 25][i]}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 6}s`,
            }}
            alt={`Leaf ${i + 1}`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="framed-container">
        <Header />
      </div>

      {/* Page content */}
      <div className="main-content">{children}</div>

      {/* Footer */}
      <div className="framed-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

