import React, { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/user-account-page-styles/UserOverviewPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import axios from "axios";
import Alert from "../../components/Alert";
import { Helmet } from 'react-helmet-async';


function UserOverviewPage() {
    const navigate = useNavigate();
    const { accessToken, customerId } = useContext(AuthContext); 
    const { customAlert, showAlert } = useContext(AlertContext);
    const [userDetails, setUserDetails] = useState([]);

    const handleFetchUserDetails = async () => {
        try {
            const response = await axios.get("/customer/fetch-customer-details", 
                {
                    params: {
                        customerId: customerId
                    },
                    headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                    },
            });

            if (response.status === 200) {
                setUserDetails(response.data.customer);
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }
    useEffect(() => {
        handleFetchUserDetails();
    }, []);

    if (!userDetails) {
        return (
            <div className="loading-container">
                <Helmet>
                    <title>Account Overview | Dman Officials Store</title>
                    <meta name="description" content="Loading your account overview at Dman Officials Store." />
                </Helmet>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="user-overview-container">
        <Helmet>
            <title>Account Overview | Dman Officials Store</title>
            <meta
                name="description"
                content={`View your account overview${userDetails.firstName || userDetails.lastName ? ` for ${userDetails.firstName} ${userDetails.lastName}` : ''} at Dman Officials Store, including account details and shipping address.`}
            />
        </Helmet>
        <h3 className="user-overview-header">User Overview</h3>
        <div className="user-overview-boxes">
            {/* Box 1: Account Details */}
            <div className="user-overview-account-details-box">
                <div className="user-overview-account-details-header">
                <p>Account Details</p>
                <button className="user-overview-see-details-button"
                onClick={() => {
                    navigate("/account/user-details")
                }}>See Details</button>
            </div>
            <div className="user-overview-account-details-content">
                <p 
                    className="user-overview-account-details-item"
                >
                    Name: {userDetails.firstName} {userDetails.lastName}
                </p>
                <p 
                    className="user-overview-account-details-item"
                >
                    Email: {userDetails.email}
                </p>
            </div>
        </div>

        {/* Box 2: Address */}
        <div className="user-overview-address-box">
            <div className="user-overview-address-header">
                <h4>Address</h4>
                {/* <button className="user-overview-change-button">change</button> */}
            </div>
            <p className="user-overview-address-subheader">Your default shipping address:</p>
            <ul className="user-overview-address-list">
                <li>Name: {userDetails?.firstName} {userDetails?.lastName}</li>
                {/* <li>Address: {userDetails.address.address}</li> */}
                <li>City: {userDetails ? userDetails?.address?.city : "N\A"}</li>
                <li>State: {userDetails ? userDetails?.address?.state : "N\A"}</li>
                <li>ZIP: {userDetails ? userDetails?.address?.postalCode : "N\A"}</li>
                <li>Country: {userDetails ? userDetails?.country : "N\A"}</li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default UserOverviewPage;
