import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/WarrantyAndReturnsPolicyPage.css';
import { Helmet } from "react-helmet-async";


function WarrantyAndReturnsPolicyPage() {
  return (
    <div className="warranty-policy-container">
      <Helmet>
        <title>Warranty and Returns Policy | Dman Officials Store</title>
        <meta name="description" content="Read our official warranty and returns policy for Dman Officials Store products." />
      </Helmet>
      <h1 className="warranty-policy-title">Warranty and Returns</h1>

      <section className="warranty-policy-section">
        <h2 className="warranty-policy-subtitle">Product Warranty</h2>
        <p className="warranty-policy-text">
          All products come with a standard 1-year warranty covering manufacturing defects. Extended warranties may be available for certain products.
        </p>
      </section>

      <section className="warranty-policy-section">
        <h2 className="warranty-policy-subtitle">Return Policy</h2>
        <p className="warranty-policy-text">
          We accept returns within 7 days of purchase. Returned items must be in their original condition with all packaging intact.
        </p>
      </section>

      <section className="warranty-policy-section">
        <h2 className="warranty-policy-subtitle">How to Initiate a Return</h2>
        <p className="warranty-policy-text">
          To initiate a return, please contact our customer service team with your order number and reason for return.
        </p>
      </section>

      <section className="warranty-policy-section">
        <h2 className="warranty-policy-subtitle">Exchanges and Refunds</h2>
        <p className="warranty-policy-text">
          Once your return is received, we will process an exchange or refund within 5-7 business days. Refunds are issued to the original payment method.
        </p>
      </section>
    </div>
  );
}

export default WarrantyAndReturnsPolicyPage;
