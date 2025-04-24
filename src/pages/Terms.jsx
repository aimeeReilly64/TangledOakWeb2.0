// src/pages/Terms.jsx
import React from "react";

const Terms = () => {
  return (
    <>
      <head>
        <title>Terms & Conditions | Tangled Oak + Craft Collective</title>
        <meta
          name="description"
          content="Review the terms and conditions of Tangled Oak + Craft Collective. Understand your rights and responsibilities when using our website for shopping or browsing."
        />
        <meta name="keywords" content="terms and conditions, Tangled Oak, craft collective, shopping terms, website terms, policies" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Terms & Conditions | Tangled Oak + Craft Collective" />
        <meta
          property="og:description"
          content="Review the terms and conditions of Tangled Oak + Craft Collective. Understand your rights and responsibilities when using our website for shopping or browsing."
        />
        <meta property="og:url" content="https://www.tangledoak.ca/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Terms & Conditions | Tangled Oak + Craft Collective" />
        <meta
          name="twitter:description"
          content="Review the terms and conditions of Tangled Oak + Craft Collective. Understand your rights and responsibilities when using our website for shopping or browsing."
        />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <div className="context-box">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-4">
          By using the Tangled Oak + Craft Collective website, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. General Use</h2>
        <p className="mb-4">
          Our site is intended for personal, non-commercial use. You agree not to misuse the website, attempt to breach its security, or interfere with its functionality.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Product Listings</h2>
        <p className="mb-4">
          Each vendor is responsible for the accuracy of their listings, including descriptions, prices, and availability. We do our best to ensure quality and accuracy, but Tangled Oak is not liable for vendor errors.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. Orders & Payment</h2>
        <p className="mb-4">
          All purchases are processed securely through Square. Orders are subject to acceptance and availability. You will receive an order confirmation once payment is complete.
        </p>

        <h2 className="text-xl font-semibold mb-2">4. Returns & Refunds</h2>
        <p className="mb-4">
          Return policies vary by vendor. Please refer to our <a href="/shipping-policy" className="text-blue-600 underline">Shipping & Returns</a> page for more details. Most items are final sale unless noted otherwise.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All site content, including text, logos, and imagery, is owned by Tangled Oak or its contributing vendors. You may not reuse, reproduce, or distribute this content without permission.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
        <p className="mb-4">
          We do our best to ensure a smooth experience, but Tangled Oak is not liable for indirect damages, delays, or issues beyond our control (e.g., delivery delays, vendor mistakes).
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
        <p className="mb-4">
          These terms are governed by the laws of Ontario, Canada. Any disputes will be handled in the appropriate courts within Ontario.
        </p>

        <p>Last updated: April 2025</p>
      </div>
    </>
  );
};

export default Terms;
