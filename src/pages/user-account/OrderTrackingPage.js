import "../../styles/pages-styles/user-account-page-styles/OrderTrackingPage.css"
import { BsCartCheck, BsTruck, BsXCircle, BsArchive } from "react-icons/bs";
import { FaCircle, FaBox } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from 'react-helmet-async';


function OrderTrackingPage () {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const { accessToken, customerId } = useContext(AuthContext); 
    const { showAlert } = useContext(AlertContext);

    const statusMap = [
        { status: "Pending", icon: BsCartCheck, title: "Order Placed", description: "Your order has been successfully placed and is awaiting confirmation." },
        { status: "Processing", icon: FaCircle, title: "Order Confirmed", description: "We are confirming the details of your order and preparing it for dispatch." },
        { status: "Shipped", icon: BsTruck, title: "Product Shipped", description: "Your order is on its way. A tracking number will be provided shortly." },
        { status: "Delivered", icon: FaBox, title: "Product Delivered", description: "Your order has been successfully delivered. Thank you for your purchase!" },
    ];
    
    useEffect(() => {
        const fetchOrderTrackingStatus = async () => { 
            setLoading(true);
            try {
                const response = await axios.get(
                    `/customer/fetch-purchased-order-details/${orderId}`,
                    {
                        params: {
                            customerId: customerId
                        },
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
            
                if (response.status === 200) {
                    setOrder(response.data.order);
                }
            } catch(err) {
                if (err.response) {
                    const status = err.response.status;
                    const errMessage = err.response.data.error;
                    if (status === 400 || status === 403 || status === 404 || status === 500) {
                        showAlert(status, errMessage);
                    } 
                } else {
                    showAlert("Error", "An Unknown Error Occurred!");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrderTrackingStatus();

    }, [orderId, accessToken, customerId, showAlert]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const currentStatusIndex = statusMap.findIndex(s => s.status === order.orderStatus);
    const isCancelledOrDeleted = order.orderStatus === "Cancelled" || order.orderStatus === "Deleted";

    // Create a lookup map for timestamps from the statusHistory array
    const statusTimestamps = {};
    if (order.statusHistory) {
        order.statusHistory.forEach(history => {
            statusTimestamps[history.status] = history.timestamp;
        });
    }

    if (loading) {
        return (
            <div className="loading-container">
                <Helmet>
                    <title>Order Tracking | Dman Officials Store</title>
                    <meta name="description" content="Loading order tracking details for your purchase at Dman Officials Store." />
                </Helmet>
                Loading order details...
            </div>
        );
    }

    return(
        <div className="order-tracking-page-container">
            <Helmet>
                <title>Order Tracking {orderId} | Dman Officials Store</title>
                <meta
                name="description"
                content={`Track the status of your order ${orderId}${order.orderStatus ? ` (${order.orderStatus})` : ''} at Dman Officials Store.`}
                />
            </Helmet>
            <div className="order-tracking-header-container">
                <div className="order-tracking-header-icon-container" onClick={handleGoBack}>
                   <IoMdArrowBack className="order-tracking-header-icon"/>
                </div>
                <h3>Order History</h3>
            </div>
            <div className="order-tracking-details">
                {isCancelledOrDeleted ? (
                    <div className="product-status cancelled">
                        <BsXCircle className="order-tracking-icon cancelled-icon" />
                        <p className="product-status-title">Order {order.orderStatus}</p>
                        <div className="product-status-description">
                            <p>This order has been {order.orderStatus.toLowerCase()} and will not be fulfilled.</p>
                            <p>Date: {new Date(statusTimestamps[order.orderStatus] || order.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    statusMap.map((step, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        const icon = step.icon;
                        const timestamp = statusTimestamps[step.status]; // Use the timestamp from the new history array

                        return (
                            <div 
                                key={index} 
                                className={`product-status ${isCompleted ? 'completed' : ''}`}
                            >
                                <div className="icon-container">
                                    {isCompleted && <span className="completed-line"></span>}
                                    {icon({ 
                                        className: "order-tracking-icon",
                                        style: {
                                            background: isCompleted ? "#000000" : "#e0e0e0",
                                            color: isCompleted ? "#ffffff" : "#9e9e9e",
                                        }
                                    })}
                                </div>
                                <div className="text-content">
                                    <p className="product-status-title">{step.title}</p>
                                    <div className="product-status-description">
                                        <p>{step.description}</p>
                                        {isCompleted && timestamp && <p>Date: {new Date(timestamp).toLocaleString()}</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default OrderTrackingPage;