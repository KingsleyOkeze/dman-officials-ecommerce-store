import React from "react";
import "../../styles/pages-styles/user-account-page-styles/UserOverviewPage.css";

function UserOverviewPage() {
  return (
    <div className="user-overview-container">
      <h3 className="user-overview-header">User Overview</h3>
      <div className="user-overview-boxes">
        {/* Box 1: Account Details */}
        <div className="user-overview-account-details-box">
          <div className="user-overview-account-details-header">
            <p>Account Details</p>
            <button className="user-overview-see-details-button">See Details</button>
          </div>
          <div className="user-overview-account-details-content">
            <p className="user-overview-account-details-item">Name: John Doe</p>
            <p className="user-overview-account-details-item">Email: email@email.com</p>
          </div>
        </div>

        {/* Box 2: Address */}
        <div className="user-overview-address-box">
          <div className="user-overview-address-header">
            <h4>Address</h4>
            <button className="user-overview-change-button">change</button>
          </div>
          <p className="user-overview-address-subheader">Your default shipping address:</p>
          <ul className="user-overview-address-list">
            <li>Name: John Doe</li>
            <li>Address: 123 Main Street</li>
            <li>City: New York</li>
            <li>State: NY</li>
            <li>ZIP: 10001</li>
            <li>Country: USA</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserOverviewPage;
