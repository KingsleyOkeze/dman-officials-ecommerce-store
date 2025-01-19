import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/pages-styles/order-pages-styles/OrderReviewPage.css'; // Include your custom styles here
import axios from 'axios';

function OrderReviewPage ({  onRetryPayment, onContactSupport }) {
    const { orderId } = useParams(); // Extract orderId from the URL
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        const handleFetchPurchasedOrderDetails = async () => {
            let data = localStorage.getItem("customerId");

            // if (!data) return alert('No user found!');
    
            try {
                const response = await axios.post(`/customer/fetch-purchased-order-details/${orderId}`, {
                    customerId: data
                })
    
                if (response.status === 200) {
                    setOrderDetails(response.data.order);
                    console.log('OrderDetails message', response.data.order);
                }
            } catch (err) {
                console.log('err OrderDetails', err)
            }
        }

        handleFetchPurchasedOrderDetails();
    }, []);


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

  const handleContactSupport = () => {
    onContactSupport(orderDetails.orderId);
  };

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
        >
          Retry Payment
        </button>
        <button className="order-review-page-contact-button" 
            // onClick={handleContactSupport}
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
