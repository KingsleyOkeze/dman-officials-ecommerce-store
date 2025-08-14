import "../../styles/pages-styles/user-account-page-styles/OrderTrackingPage.css"
import { BsCartCheck } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { PiPackageLight } from "react-icons/pi";
import { IoMdArrowBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";

function OrderTrackingPage () {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    const { accessToken, customerId } = useContext(AuthContext); 
    const { showAlert } = useContext(AlertContext);

    // Define possible statuses in the order they should progress.
    const statusArr = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];


    useEffect(() => {
        const fetchOrderTrackingStatus = async () => { 
            try {
                const response = await axios.get(
                    `/customer/fetch-purchased-order-details/${orderId}`,
                    {
                        params: {
                            customerId: customerId
                        },
                        headers: {
                          Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                        },
                })
            
                if (response.status === 200) {
                    setOrder(response.data.order);

                }

            } catch(err) {
                console.error("Error fetching product:", err);
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
            };
        }

        fetchOrderTrackingStatus();

    }, [orderId]);

    // Calculate the index of the current order status.
    const currentStatusIndex = order.orderStatus ? statusArr.indexOf(order.orderStatus) : -1;
    const isCancelled = order.orderStatus === "Cancelled";

    return(
        <div className="order-tracking-page-container">
            <div className="order-tracking-header-container">
                <div className="order-tracking-header-icon-container">
                   <IoMdArrowBack className="order-tracking-header-icon"/>
                </div>
                <h3>Product History</h3>
            </div>
            <div className="order-tracking-details">
                <div className="product-status">
                    <BsCartCheck 
                        className="order-tracking-icon"
                        style={{
                            background: isCancelled
                              ? "#cc0000" // red for cancellation
                              : currentStatusIndex >= 0
                              ? "#000000"
                              : "#e0e0e0",
                            color: isCancelled ? "#ffffff" : currentStatusIndex >= 0 ? "#ffffff" : "#9e9e9e",
                        }}
              
                    />
                    <p className="product-status-title">Order Placed</p>
                    <div className="product-status-description">
                        <p>Your order has been successfully placed and is being processed</p>
                        <p>2024-10-23 7:30am</p>
                    </div>
                </div>
                <div className="product-status">
                    <FaCircle className="order-tracking-circle-icon"
                        style={{
                            background: isCancelled
                              ? "#cc0000"
                              : currentStatusIndex >= 1
                              ? "#000000"
                              : "#e0e0e0",
                            color: isCancelled ? "#ffffff" : currentStatusIndex >= 1 ? "#ffffff" : "#9e9e9e",
                        }}              
                    />
                    <p className="product-status-title">Confirmation in progress</p>
                    <div className="product-status-description">
                        <p>We are confirming the details of your order. This may take few minutes</p>
                        <p>2024-10-23 7:30am</p>
                    </div>
                </div>
                <div className="product-status">
                    <FaCircle className="order-tracking-circle-icon"
                        style={{
                            background: isCancelled
                              ? "#cc0000"
                              : currentStatusIndex >= 2
                              ? "#000000"
                              : "#e0e0e0",
                            color: isCancelled ? "#ffffff" : currentStatusIndex >= 2 ? "#ffffff" : "#9e9e9e",
                        }}
                    />
                    <p className="product-status-title">Shipping in progress</p>
                    <div className="product-status-description">
                        <p>Your order has been prepared for shipping.</p>
                        <p>2024-10-23 7:30am</p>
                    </div>
                </div>
                <div className="product-status">
                    <BsTruck className="order-tracking-icon"
                        style={{
                            background: isCancelled
                              ? "#cc0000"
                              : currentStatusIndex >= 3
                              ? "#000000"
                              : "#e0e0e0",
                            color: isCancelled ? "#ffffff" : currentStatusIndex >= 3 ? "#ffffff" : "#9e9e9e",
                        }}
                    />
                    <p className="product-status-title">Product shipped</p>
                    <div className="product-status-description">
                        <p>Your order has been shipped. A tracking number will be provided.</p>
                        <p>2024-10-23 7:30am</p>
                    </div>
                </div>
                <div className="product-status">
                    <PiPackageLight className="order-tracking-icon"
                        style={{
                            background: isCancelled
                              ? "#cc0000"
                              : currentStatusIndex >= 4
                              ? "#000000"
                              : "#e0e0e0",
                            color: isCancelled ? "#ffffff" : currentStatusIndex >= 4 ? "#ffffff" : "#9e9e9e",
                        }}
                    />
                    <p className="product-status-title">Product delivered</p>
                    <div className="product-status-description">
                        <p>Your order has been delivered.</p>
                        <p>2024-10-23 7:30am</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTrackingPage;