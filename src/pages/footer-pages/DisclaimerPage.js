import React from 'react';
import "../../styles/pages-styles/footer-pages-styles/DisclaimerPage.css";

function DisclaimerPage() {
  return (
    <div className="disclaimer-container">
      <h1 className="disclaimer-title">Disclaimer</h1>

      <section className="disclaimer-section">
        <h2 className="disclaimer-heading">General Information</h2>
        <p className="disclaimer-paragraph">
          The information provided on this website is for general informational purposes only. We make no guarantees about the accuracy or completeness of this information.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2 className="disclaimer-heading">Accuracy of Information</h2>
        <p className="disclaimer-paragraph">
          While we strive to ensure that the content on our site is current, we are not responsible for inaccuracies or outdated information. Please verify details independently.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2 className="disclaimer-heading">Third-Party Links</h2>
        <p className="disclaimer-paragraph">
          Our website may contain links to third-party sites. We are not responsible for the content or practices of these external sites.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2 className="disclaimer-heading">Liability</h2>
        <p className="disclaimer-paragraph">
          We shall not be held liable for any damages arising from the use of this site. Your use of the site is at your own risk.
        </p>
      </section>
    </div>
  );
}

export default DisclaimerPage;
