import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/CookiePolicyPage.css';

function CookiePolicyPage () {
  return (
    <div className="policy-container">
      <h1>Cookie Policy</h1>

      <section>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that websites place on your device to improve your experience and remember your preferences.
        </p>
      </section>

      <section>
        <h2>How We Use Cookies</h2>
        <p>
          We use cookies to enhance your browsing experience, analyze site traffic, and understand user interactions with our content.
        </p>
      </section>

      <section>
        <h2>Types of Cookies We Use</h2>
        <p>
          Our site uses both session and persistent cookies for functionality and analytics. These cookies do not store personal information.
        </p>
      </section>

      <section>
        <h2>Managing Cookies</h2>
        <p>
          You can manage your cookie preferences in your browser settings. Note that disabling cookies may affect site functionality.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicyPage;
