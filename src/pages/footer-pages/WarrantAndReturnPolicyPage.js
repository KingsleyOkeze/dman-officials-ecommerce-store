import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/WarrantyAndReturnsPolicyPage.css';

function WarrantyAndReturnsPolicyPage () {
  return (
    <div className="policy-container">
      <h1>Warranty and Returns</h1>

      <section>
        <h2>Product Warranty</h2>
        <p>
          All products come with a standard 1-year warranty covering manufacturing defects. Extended warranties may be available for certain products.
        </p>
      </section>

      <section>
        <h2>Return Policy</h2>
        <p>
          We accept returns within 30 days of purchase. Returned items must be in their original condition with all packaging intact.
        </p>
      </section>

      <section>
        <h2>How to Initiate a Return</h2>
        <p>
          To initiate a return, please contact our customer service team with your order number and reason for return.
        </p>
      </section>

      <section>
        <h2>Exchanges and Refunds</h2>
        <p>
          Once your return is received, we will process an exchange or refund within 5-7 business days. Refunds are issued to the original payment method.
        </p>
      </section>
    </div>
  );
};

export default WarrantyAndReturnsPolicyPage;
