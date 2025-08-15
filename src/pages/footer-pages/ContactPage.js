import React from 'react';
import '../../styles/pages-styles/footer-pages-styles/ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-text">
        We’re here to help! If you have any questions, concerns, or feedback, feel free to reach out to us. 
        You can contact our customer support team by email at <strong>{process.env.REACT_APP_CUSTOMER_SUPPORT_EMAIL}</strong> or by 
        phone at <strong>{process.env.REACT_APP_CUSTOMER_SUPPORT_PHONE_NUMBER}</strong>. Our team is available Monday to Friday, 9am - 5pm (WAT).
        We’re also active on social media, so follow us on Facebook, Instagram, and WhatsApp for updates 
        and quick responses to your inquiries.
      </p>
    </div>
  );
}

export default ContactPage;
