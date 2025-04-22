// src/App.jsx
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Shipping from "./pages/Shipping";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import VendorLogin from "./pages/VendorLogin"; // Optional, only if you have this page

import Header from "./components/Header";
import Footer from "./components/Footer";

import './css/styles.css';

const App = () => {
  return (
    <Router>
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/vendor-login" element={<VendorLogin />} /> {/* Optional */}
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
