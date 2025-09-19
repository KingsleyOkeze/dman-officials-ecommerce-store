import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/ReturnsPolicyPage.css';
import { Helmet } from "react-helmet-async";



function ReturnsPolicyPage () {
  return (
    <div className="returns-container">
      <Helmet>
        <title>Returns Policy | Dman Officials Store</title>
        <meta name="description" content="Read Dman Officials Store's returns policy for details on eligibility, how to initiate a return, and the refund process." />
      </Helmet>
      <h1>Return Policy</h1>
      
      <div className="returns-section">
        <h2>Eligibility for Returns</h2>
        {/* <p>Items can be returned within 30 days of purchase if they are in original, unused condition with all tags attached.</p> */}
        <p>You have 7 days to return your order after the delivery. Orders must be returned 
          unused and in the original packaging still attached. Furthermore, items have to be 
          unwashed and with all labels still attached. Return costs are not covered by D.MAN.
        </p>
      </div>

      <div className="returns-section">
        <h2>How to Initiate a Return</h2>
        <p>To initiate a return, please contact our support team. They will provide you with 
          a return label and instructions. You have 7 days to return your order after the delivery. 
          Orders must be returned unused and in the original packaging still attached. 
          Furthermore, items have to be unwashed and with all labels still attached. Return costs 
          are not covered by D.MAN
        </p>
      </div>

      <div className="returns-section">
        <h2>Refund Process</h2>
        <p>Refunds are processed within 5-7 business days after the returned item is received. The amount will be credited back to your original payment method.</p>
      </div>

      <div className="returns-section">
        <h2>Exchanges</h2>
        {/* <p>If you'd like to exchange an item, please initiate a return for the original item and place a new order for the item you want.</p> */}
        <p>At D.MAN, we want you to be completely satisfied with your purchase. If for any reason 
          you're not delighted with your order due to: Incorrect shipment, faulty or damaged items
          or sizing issues, we are happy to provide a refund, exchange, or store credit. You can 
          open the parcel and check the contents. Once, we've received your returned item(s), we 
          will refund the purchase amount as soon as possible. Returns will only be accepted when 
          items are unused, unworn, unwashed, with all original D.MAN labels attached and in the 
          original packaging.
        </p>
      </div>

      <div className="returns-section">
        <h2>Contact Us</h2>
        <p>If you have any questions about returns, please reach out to our customer support team at <strong>{process.env.REACT_APP_CUSTOMER_SUPPORT_EMAIL}</strong>.</p>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
