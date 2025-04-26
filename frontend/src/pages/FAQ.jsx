// src/pages/FAQ.jsx
import React from "react";

const FAQ = () => {
  return (
    <div className="context-box">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      {/* How to place an order */}
      <h2 className="text-xl font-semibold">How do I place an order?</h2>
      <p className="mt-2">
        Browse our curated collection and add your favorite items to your cart.
        When you’re ready, proceed to checkout and follow the secure payment prompts.
      </p>

      {/* Payment methods */}
      <h2 className="text-xl font-semibold">What payment methods are accepted?</h2>
      <p className="mt-2">
        We accept major credit and debit cards along with select online payment options.
        The available options will be clearly listed at checkout.
      </p>

      {/* Shipping time */}
      <h2 className="text-xl font-semibold">How long does shipping take?</h2>
      <p className="mt-2">
        Orders are typically processed within 2–3 business days.
        For local pickup in North Bay, ON, you will receive an email with instructions once your order is ready.
        For shipped orders within Canada, delivery usually takes 7–10 business days.
      </p>

      {/* Damaged or wrong items */}
      <h2 className="text-xl font-semibold">What if my item arrives damaged or incorrect?</h2>
      <p className="mt-2">
        If there is an issue with your order, please contact us within 7 days of receiving it.
        Include your order number and photos, and we’ll work with the vendor to resolve the issue.
      </p>

      {/* Returns policy */}
      <h2 className="text-xl font-semibold">Are returns accepted?</h2>
      <p className="mt-2">
        Since most items are handmade by independent artisans and considered final sale,
        returns are limited. However, if there’s a problem with your order, we’ll review your case on an individual basis
        and coordinate with the vendor to find a satisfactory solution.
      </p>

      {/* International shipping */}
      <h2 className="text-xl font-semibold">Do you ship internationally?</h2>
      <p className="mt-2">
        Currently, we only ship within Canada.
        If you’re outside of Canada and are interested in a specific item, please contact us directly.
      </p>

      {/* Customer support */}
      <h2 className="text-xl font-semibold">How can I contact customer support?</h2>
      <p className="mt-2">
        You can reach out to us via email at{" "}
        <a href="mailto:store@tangledoak.ca" className="text-blue-600 underline">
          store@tangledoak.ca
        </a>{" "}
        or use our contact form. We’re here to help with any questions or concerns.
      </p>
    </div>
  );
};

export default FAQ;
