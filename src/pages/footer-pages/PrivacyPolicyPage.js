import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/PrivacyPolicyPage.css';

function PrivacyPolicyPage () {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>

      <section>
        <h2>Information Collection</h2>
        <p>
          We collect personal information such as name, email, and payment details to improve our services and process orders.
        </p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>
          Your information is used to fulfill orders, communicate with you, and personalize your shopping experience.
        </p>
      </section>

      <section>
        <h2>Data Sharing and Security</h2>
        <p>
          We do not share your information with third parties, except as necessary for payment processing and shipping. Your data is stored securely.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.
        </p>
      </section>

      <section>
        <h2>Changes to Privacy Policy</h2>
        <p>
          We may update this policy periodically. Changes will be posted on this page with the latest revision date.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
