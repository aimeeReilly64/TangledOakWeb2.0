// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="context-box">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Tangled Oak + Craft Collective values your privacy. This policy explains how we collect, use, and protect your personal information when you visit our website or make a purchase.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
      
        <li>Personal details like name, email address, shipping address, and payment information.</li>
        <li>Order history and account preferences (if you create an account).</li>
        <li>Basic device/browser data collected through cookies or analytics tools (e.g., Google Analytics).</li>
   <br/>

      <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
    
        <li>To process and fulfill your orders.</li>
        <li>To communicate with you about your purchases or pickup details.</li>
        <li>To improve our website experience and service quality.</li>
        <li>To send occasional updates or announcements (you can opt out anytime).</li>
    
<br/>
      <h2 className="text-xl font-semibold mb-2">3. How Your Data Is Stored</h2>
      <p className="mb-4">
        We use secure services like Firebase for authentication and data storage, and Square for processing payments. Your data is protected by industry-standard encryption and access controls.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may share necessary information with trusted third parties to complete your order (e.g., Canada Post for delivery). These services have their own privacy practices that align with industry standards.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can request to view, update, or delete your personal information at any time by contacting us at <a href="mailto:support@tangledoak.ca" className="text-blue-600 underline">support@tangledoak.ca</a>.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. Any changes will be posted here with a revised date.
      </p>

      <p>Last updated: April 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
