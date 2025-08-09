import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/pages-styles/order-pages-styles/OrderReviewPage.css'; // Include your custom styles here
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

function OrderReviewPage({ onRetryPayment, onContactSupport }) {
    const { orderId } = useParams(); // Extract orderId from the URL
    const navigate = useNavigate();
    const { accessToken, customerId } = useContext(AuthContext);
    const [orderDetails, setOrderDetails] = useState({});


    const handleFetchPurchasedOrderDetails = async () => {
        try {
            const response = await axios.get(`/customer/fetch-purchased-order-details/${orderId}`, {
                params: {
                    customerId: customerId
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            })

            if (response.status === 200) {
                setOrderDetails(response.data.order);
                console.log('OrderDetails message', response.data.order);
            }
        } catch (err) {
            console.log('err OrderDetails', err)
        }
    }

    useEffect(() => {
        handleFetchPurchasedOrderDetails();
    }, [accessToken, customerId, orderId]);


    if (!orderDetails) {
        return (
            <div className="order-review-page-container">
                <p>Loading order details...</p>
            </div>
        );
    }

    const handleRetryPayment = () => {
        onRetryPayment(orderDetails.orderId);
    };

    const handleContactSupportClick = () => {
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const email = process.env.REACT_APP_EMAIL_LINK
    const subject = "Payment Mismatch Issue!"; // Optional subject for the email
    const body = `
        Hello there! I recently placed an order with an id of ${orderDetails._id} on your website
        on ${new Date(orderDetails?.createdAt)?.toLocaleDateString()} with a
        total of ₦${orderDetails?.orderTotalAmount?.toLocaleString()} but I
        noticed that my account was charged ₦${(orderDetails?.amountCustomerPaid / 100)?.toLocaleString()}
        instead. My transaction reference is ${orderDetails?.paymentReference}
        I believe there is a mismatch in my payment. The amount charged to my account does not
        match the total amount on my order, and I am concerned there may have been an error.
        Could you please review my transaction details and let me know how this can be resolved?
        Thank you for your prompt assistance.`
        ;
        
    return (
        <div className="order-review-page-container">
            <h1>Order Review</h1>
            {orderDetails && (

                <>
                    <p className="order-review-page-discrepancy-message">
                        <strong>Payment Issue Detected:</strong> There was a mismatch between your payment and the order total.
                    </p>

                    <div className="order-review-page-details">
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> {orderDetails._id}</p>
                        <p><strong>Total Amount:</strong> ₦{orderDetails?.orderTotalAmount?.toLocaleString()}</p>
                        <p><strong>Amount Paid:</strong> ₦{(orderDetails?.amountCustomerPaid / 100)?.toLocaleString()}</p>
                        <p><strong>Amount Expected:</strong> ₦{orderDetails?.orderTotalAmount?.toLocaleString()}</p>
                        <p><strong>Order Date:</strong> {new Date(orderDetails?.createdAt)?.toLocaleDateString()}</p>
                        <h3>Items Purchased:</h3>
                        <ul>
                            {orderDetails?.orderedItems?.map((item, index) => (
                                <li key={index}>
                                    {item?.productRef?.productName} - {item?.quantity} x ₦{item?.price?.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="order-review-page-actions">
                        <button className="order-review-page-retry-button"
                            // onClick={handleRetryPayment}
                            onClick={() => navigate(-1)}
                        >
                            Go back
                        </button>
                        <button
                            className="order-review-page-contact-button"
                            onClick={handleContactSupportClick} // Call the new handler
                        >
                            Contact Support
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderReviewPage;