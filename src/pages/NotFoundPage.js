// NotFoundPage.jsx
import React from 'react';
// import '../styles/NotFoundPage.css'; 
import "../styles/pages-styles/NotFoundPage.css";
import { Helmet } from 'react-helmet-async';


function NotFoundPage() {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Page Not Found | Dman Officials Store</title>
        <meta
          name="description"
          content="The page you are looking for does not exist at Dman Officials Store. Return to the homepage or dashboard to continue shopping."
        />
      </Helmet>
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Page Not Found</p>
        <p className="error-description">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/admin" className="back-link">Go back to Dashboard</a>
      </div>
    </div>
  );
}


export default NotFoundPage;
