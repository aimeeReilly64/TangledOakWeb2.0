// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import VendorLogin from "./pages/VendorLogin";
import VendorRegister from "./pages/VendorRegister";
import ApproveVendor from "./pages/ApproveVendor";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails";

import OrderConfirmation from "./pages/OrderConfirmation";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import CraftIdeas from "./pages/CraftIdeas";

// Shared UI
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App = () => {
  return (
    <Router>
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route
            path="/admin/approvals"
            element={
              <ProtectedRoute requiredRole="vendor">
                <ApproveVendor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings/new"
            element={
              <ProtectedRoute requiredRole="vendor">
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute requiredRole="vendor">
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route path="/listing/:listingId" element={<ListingDetails />} />
     
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<Post />} />
          <Route path="/craft-ideas" element={<CraftIdeas />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
