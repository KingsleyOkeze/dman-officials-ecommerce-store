import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/PaymentPolicyPage.css';

function PaymentPolicyPage () {
  return (
    <div className="payment-container">
      <h1>Payment Information</h1>

      <div className="payment-section">
        <h2>Debit and Credit Card</h2>
        <p>
          We accept all major debit and credit cards, including Visa, MasterCard, and American Express.
          During checkout, you can enter your card details securely. All transactions are encrypted for your protection.
        </p>
      </div>

      <div className="payment-section">
        <h2>Bank Transfers</h2>
        <p>
          For bank transfers, please select this option during checkout. You will receive our banking details to complete the transaction.
          Note that it may take up to 3 business days to confirm a bank transfer payment.
        </p>
      </div>

      <div className="payment-section">
        <h2>Adding or Changing Payment Method</h2>
        <p>
          You can add or change your preferred payment method in your account settings. Simply go to “Payment Methods,” select “Add New,” and enter your new payment details.
          For security, you may be asked to verify any changes made.
        </p>
      </div>

      <div className="payment-section">
        <h2>Vouchers</h2>
        <p>
          If you have a voucher, you can apply it at checkout. Just enter your voucher code in the designated field, and the discount will be applied automatically.
          Note that vouchers are one-time use and cannot be combined with other promotions.
        </p>
      </div>

      <div className="payment-section">
        <h2>Further Information</h2>
        <p>
          If you need more details or have specific questions about payments, feel free to reach out to our support team at <strong>support@example.com</strong> or by phone at <strong>(123) 456-7890</strong>.
          We’re here to help!
        </p>
      </div>
    </div>
  );
};

export default PaymentPolicyPage;
