import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/PrivacyPolicyPage.css';
import { Helmet } from "react-helmet-async";


function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-container">
      <Helmet>
        <title>Privacy Policy | Dman Officials Store</title>
        <meta name="description" content="Read our privacy policy to learn how Dman Officials Store collects, uses, and protects your personal information." />
      </Helmet>
      <h1 className="privacy-policy-title">Privacy Policy</h1>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Information Collection</h2>
        <p className="privacy-policy-text">
          We collect personal information such as name, email, and payment details to improve our services and process orders.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">How We Use Your Information</h2>
        <p className="privacy-policy-text">
          Your information is used to fulfill orders, communicate with you, and personalize your shopping experience.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Data Sharing and Security</h2>
        <p className="privacy-policy-text">
          We do not share your information with third parties, except as necessary for payment processing and shipping. Your data is stored securely.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Your Rights</h2>
        <p className="privacy-policy-text">
          You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Changes to Privacy Policy</h2>
        <p className="privacy-policy-text">
          We may update this policy periodically. Changes will be posted on this page with the latest revision date.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;

