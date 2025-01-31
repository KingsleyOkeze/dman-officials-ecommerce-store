import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/ReturnsPolicyPage.css';


function ReturnsPolicyPage () {
  return (
    <div className="returns-container">
      <h1>Return Policy</h1>
      
      <div className="returns-section">
        <h2>Eligibility for Returns</h2>
        <p>Items can be returned within 30 days of purchase if they are in original, unused condition with all tags attached.</p>
      </div>

      <div className="returns-section">
        <h2>How to Initiate a Return</h2>
        <p>To initiate a return, please contact our support team. They will provide you with a return label and instructions.</p>
      </div>

      <div className="returns-section">
        <h2>Refund Process</h2>
        <p>Refunds are processed within 5-7 business days after the returned item is received. The amount will be credited back to your original payment method.</p>
      </div>

      <div className="returns-section">
        <h2>Exchanges</h2>
        <p>If you'd like to exchange an item, please initiate a return for the original item and place a new order for the item you want.</p>
      </div>

      <div className="returns-section">
        <h2>Contact Us</h2>
        <p>If you have any questions about returns, please reach out to our customer support team at support@example.com.</p>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
