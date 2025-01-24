import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/CookiePolicyPage.css';

function CookiePolicyPage() {
  return (
    <div className="cookie-policy-container">
      <h1 className="cookie-policy-title">Cookie Policy</h1>

      <section className="cookie-policy-section">
        <h2 className="cookie-policy-heading">What Are Cookies?</h2>
        <p className="cookie-policy-paragraph">
          Cookies are small text files that websites place on your device to improve your experience and remember your preferences.
        </p>
      </section>

      <section className="cookie-policy-section">
        <h2 className="cookie-policy-heading">How We Use Cookies</h2>
        <p className="cookie-policy-paragraph">
          We use cookies to enhance your browsing experience, analyze site traffic, and understand user interactions with our content.
        </p>
      </section>

      <section className="cookie-policy-section">
        <h2 className="cookie-policy-heading">Types of Cookies We Use</h2>
        <p className="cookie-policy-paragraph">
          Our site uses both session and persistent cookies for functionality and analytics. These cookies do not store personal information.
        </p>
      </section>

      <section className="cookie-policy-section">
        <h2 className="cookie-policy-heading">Managing Cookies</h2>
        <p className="cookie-policy-paragraph">
          You can manage your cookie preferences in your browser settings. Note that disabling cookies may affect site functionality.
        </p>
      </section>
    </div>
  );
}

export default CookiePolicyPage;
