import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/TermsOfUsePage.css';

function TermsOfUsePage() {
  return (
    <div className="terms-of-use-container">
      <h1 className="terms-of-use-title">Terms of Use</h1>

      <section className="terms-of-use-section">
        <h2 className="terms-of-use-heading">Acceptance of Terms</h2>
        <p className="terms-of-use-paragraph">
          By using this website, you agree to comply with these terms of use. If you do not agree, please refrain from using the site.
        </p>
      </section>

      <section className="terms-of-use-section">
        <h2 className="terms-of-use-heading">User Responsibilities</h2>
        <p className="terms-of-use-paragraph">
          Users must provide accurate information and refrain from unlawful activities on the site. Failure to comply may result in restricted access.
        </p>
      </section>

      <section className="terms-of-use-section">
        <h2 className="terms-of-use-heading">Prohibited Activities</h2>
        <p className="terms-of-use-paragraph">
          Activities such as hacking, distributing malware, and violating others' rights are strictly prohibited.
        </p>
      </section>

      <section className="terms-of-use-section">
        <h2 className="terms-of-use-heading">Intellectual Property</h2>
        <p className="terms-of-use-paragraph">
          All content on this site is the property of our company and protected by copyright and trademark laws.
        </p>
      </section>

      <section className="terms-of-use-section">
        <h2 className="terms-of-use-heading">Termination of Access</h2>
        <p className="terms-of-use-paragraph">
          We reserve the right to terminate or suspend access to the site at our discretion, without prior notice.
        </p>
      </section>
    </div>
  );
}

export default TermsOfUsePage;
