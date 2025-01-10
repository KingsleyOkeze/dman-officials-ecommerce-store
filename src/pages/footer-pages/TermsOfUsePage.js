import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/TermsOfUsePage.css';

function TermsOfUsePage () {
  return (
    <div className="terms-of-use-container">
      <h1>Terms of Use</h1>

      <section>
        <h2>Acceptance of Terms</h2>
        <p>
          By using this website, you agree to comply with these terms of use. If you do not agree, please refrain from using the site.
        </p>
      </section>

      <section>
        <h2>User Responsibilities</h2>
        <p>
          Users must provide accurate information and refrain from unlawful activities on the site. Failure to comply may result in restricted access.
        </p>
      </section>

      <section>
        <h2>Prohibited Activities</h2>
        <p>
          Activities such as hacking, distributing malware, and violating others' rights are strictly prohibited.
        </p>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          All content on this site is the property of our company and protected by copyright and trademark laws.
        </p>
      </section>

      <section>
        <h2>Termination of Access</h2>
        <p>
          We reserve the right to terminate or suspend access to the site at our discretion, without prior notice.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUsePage;
