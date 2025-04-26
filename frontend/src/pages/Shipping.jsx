import React from "react";
import { Helmet } from "react-helmet";
import "../css/styles.css";

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping & Returns | Tangled Oak</title>
        <meta name="description" content="Learn about our shipping and return policies at Tangled Oak. Flat-rate shipping, free local pickup, and more." />
      </Helmet>

      <div className="home-container">
        <div className="main-content">
          
          {/* Shipping Policy */}
          <div className="context-box">
            <h2>Shipping Policy</h2>
          
              <li>Orders are typically processed within 2–3 business days. Handmade items may take additional time depending on the artisan.</li><br/>
              <li>We offer flat-rate shipping of <strong>$15</strong> anywhere in Canada. All orders are shipped via tracked Canada Post service.</li><br/>    
              <li><strong>Free local pickup</strong> is available in North Bay, ON. Select the pickup option at checkout and we’ll email you when your order is ready with pickup details.</li><br/>
              <li>At this time, we only ship within Canada. If you’re outside Canada and would like to order, please contact us directly.</li><br/>
              <li>We are not responsible for lost or stolen packages. If your package is lost in transit, please contact Canada Post directly.</li><br/>
          </div>

          {/* Returns & Exchanges */}
          <div className="context-box">
            <h2>Returns & Exchanges</h2>
           
              <li>Because Tangled Oak features many independent vendors, <strong>most items are final sale</strong> unless otherwise noted in the product listing.</li><br/>
              <li>If your order arrives damaged or incorrect, contact us within 7 days of delivery. Include your order number and a photo if possible.</li><br/>
              <li>We’ll coordinate with the vendor to find a solution and do our best to resolve the issue through replacement or exchange.</li><br/>
              <li>Email us at <a href="mailto:support@tangledoak.ca" className="text-blue-600 underline">support@tangledoak.ca</a>.</li>
  
          </div>

          {/* Important Notes */}
          <div className="context-box">
            <h2>Important Notes</h2>
              <li>Custom and personalized items are non-refundable.</li><br/>
              <li>Return requests are subject to vendor approval. Some vendors may offer additional guarantees or exchange policies — these will be listed on the product page if available.</li><br/>
              <li>Returned items must be unused and in original condition.</li><br/>
              <li>Buyers are responsible for return shipping unless the item arrived damaged or incorrect.</li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
