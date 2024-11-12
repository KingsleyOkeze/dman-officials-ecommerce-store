import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/DisclaimerPage.css';

function DisclaimerPage () {
  return (
    <div className="policy-container">
      <h1>Disclaimer</h1>

      <section>
        <h2>General Information</h2>
        <p>
          The information provided on this website is for general informational purposes only. We make no guarantees about the accuracy or completeness of this information.
        </p>
      </section>

      <section>
        <h2>Accuracy of Information</h2>
        <p>
          While we strive to ensure that the content on our site is current, we are not responsible for inaccuracies or outdated information. Please verify details independently.
        </p>
      </section>

      <section>
        <h2>Third-Party Links</h2>
        <p>
          Our website may contain links to third-party sites. We are not responsible for the content or practices of these external sites.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          We shall not be held liable for any damages arising from the use of this site. Your use of the site is at your own risk.
        </p>
      </section>
    </div>
  );
};

export default DisclaimerPage;
