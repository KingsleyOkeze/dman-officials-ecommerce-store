import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/ShippingPolicyPage.css';
import { Helmet } from "react-helmet-async";


function ShippingPolicyPage () {
  return (
    <div className="shipping-container">
      <Helmet>
        <title>Shipping Policy | Dman Officials Store</title>
        <meta name="description" content="Read Dman Officials Store's shipping policy, including delivery options, costs, and estimated delivery times." />
      </Helmet>
      <h1>Shipping Information</h1>
      
      <div className="shipping-section">
        <h2>Delivery Options</h2>
        <p>We offer standard and express delivery options. Choose the one that best suits your needs at checkout.</p>
      </div>

      <div className="shipping-section">
        <h2>Shipping Costs</h2>
        <p>Shipping costs vary depending on your location and chosen delivery option. The exact cost will be displayed at checkout.</p>
      </div>

      <div className="shipping-section">
        <h2>Estimated Delivery Times</h2>
        <p>Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days. Delivery times may vary depending on your location.</p>
      </div>

      <div className="shipping-section">
        <h2>International Shipping</h2>
        <p>We offer international shipping to select countries. Delivery times and costs vary by destination, and import duties may apply.</p>
      </div>

      <div className="shipping-section">
        <h2>Order Tracking</h2>
        <p>Once your order is shipped, you will receive a tracking number via email. You can use it to monitor the status of your delivery.</p>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
