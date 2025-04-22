// src/pages/Shipping.jsx
import React from "react";

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shipping & Returns</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📦 Shipping Policy</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Orders are typically processed within 2–3 business days. Handmade items may take additional time depending on the artisan.</li>
          <li>We offer flat-rate shipping of <strong>$15</strong> anywhere in Canada. All orders are shipped via tracked Canada Post service.</li>
          <li>You’ll receive an email with a tracking number once your order ships.</li>
          <li><strong>Free local pickup</strong> is available in North Bay, ON. Select the pickup option at checkout and we’ll email you when your order is ready with pickup details.</li>
          <li>At this time, we only ship within Canada. If you’re outside Canada and would like to order, please contact us directly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔁 Returns & Exchanges</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Because Tangled Oak features many independent vendors, <strong>most items are final sale</strong> unless otherwise noted in the product listing.</li>
          <li>If your order arrives damaged or incorrect, contact us within 7 days of delivery. Include your order number and a photo if possible.</li>
          <li>We’ll coordinate with the vendor to find a solution and do our best to resolve the issue through replacement or exchange.</li>
          <li>Email us at <a href="mailto:support@tangledoak.ca" className="text-blue-600 underline">support@tangledoak.ca</a>.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📌 Important Notes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom and personalized items are non-refundable.</li>
          <li>Return requests are subject to vendor approval. Some vendors may offer additional guarantees or exchange policies — these will be listed on the product page if available.</li>
          <li>Returned items must be unused and in original condition.</li>
          <li>Buyers are responsible for return shipping unless the item arrived damaged or incorrect.</li>
        </ul>
      </section>
    </div>
  );
};

export default Shipping;
