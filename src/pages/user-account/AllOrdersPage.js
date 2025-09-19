import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/user-account-page-styles/AllOrdersPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import { IoMdArrowBack } from "react-icons/io";
import {formatDate} from "../../utils/dateFormatter";
import { Helmet } from 'react-helmet-async';


function AllOrdersPage() {
    const navigate = useNavigate();
    const { accessToken, customerId } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const [orders, setOrders] = useState([]);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleFetchOrders = async () => {
        try {
            const response = await axios.get(
                `/customer/fetch-all-customer-orders?page=${paginationIndex}&limit=5`,
                {
                    params: {
                        customerId: customerId
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log(response.data.result)
                setOrders(response.data.result);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage);
                }
            } else {
                showAlert("Error", "An Unknown Error Occured!");
            }
        }
    };

    useEffect(() => {
        handleFetchOrders();
    }, [paginationIndex]);

    const handlePreviousFunction = () => {
        if (paginationIndex > 0) {
            setPaginationIndex(paginationIndex - 1);
        }
    };

    const handleNextFunction = () => {
        if (paginationIndex < totalPages - 1) {
            setPaginationIndex(paginationIndex + 1);
        }
    };

    useEffect(() => {
        if (accessToken) {
            handleFetchOrders();
        }
    }, [accessToken, customerId]);


    return (
        <div className="all-order-page-container">
            <Helmet>
                <title>Orders | Dman Officials Store</title>
                <meta
                name="description"
                content={`View your ${orders.length} order${orders.length !== 1 ? 's' : ''} at Dman Officials Store. Track order status and review purchase details.`}
                />
            </Helmet>
            <div className="all-order-page-header-container">
                <div className="all-order-page-header-icon-container"
                    onClick={() => navigate(-1)}>
                    <IoMdArrowBack className="all-order-page-header-icon" />
                </div>
                <h3>Orders</h3>
            </div>
            <div className="all-order-page-main-content">
                <div className="all-order-page-title">
                    <p>IN PROGRESS/DELIVERED</p>
                </div>
                <div className="all-order-page-card-container">
                    {
                        orders?.map((order, index) => (
                            <div className="all-order-page-card" key={index}>
                                <div className="all-order-page-card-img-container">
                                    <img
                                        className="all-order-page-card-image"
                                        src={order?.image}
                                    />
                                </div>
                                <div className="all-order-page-card-description-container">
                                    <div className="all-order-page-card-name-and-order-id-container">
                                        <p className="all-order-page-card-name">{order.name}</p>
                                        <p className="all-order-page-card-order-id">Order ID: <span>{order?.orderId}</span></p>
                                    </div>
                                    <div className="all-order-page-card-status-and-date-container">
                                        <p
                                            className="all-order-page-card-status"
                                            style={{
                                                background: order.status.includes("delivered") ? "#008C00" :
                                                    order.status.includes("cancelled") ? "#808080" : "#FFA500"
                                            }}> {order.status}</p>
                                        <p className="all-order-page-card-deliveryDate">{formatDate(order.lastUpdated)}</p>
                                    </div>
                                </div>
                                <div className="all-order-page-card-see-details">
                                    <p 
                                        onClick={() => {
                                            navigate(`/account/purchase-details/${order.orderId}`);
                                        }}
                                    >
                                        See Details
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Conditionally render the pagination container */}
                {orders?.length > 0 && (
                    <div className="all-order-page-bottom-pagination-container">
                        <button
                            className="all-order-page-pagination-button pagination-prev"
                            onClick={handlePreviousFunction}
                            disabled={paginationIndex === 0}
                        >
                            <IoIosArrowBack />
                            <span>Previous</span>
                        </button>
                        <span className="all-order-page-pagination-status">
                            {totalPages ? paginationIndex + 1 : 0} / {totalPages ? totalPages : 0}
                        </span>
                        <button
                            className="all-order-page-pagination-button pagination-next"
                            onClick={handleNextFunction}
                            disabled={paginationIndex + 1 > totalPages}
                        >
                            <span>Next</span>
                            <IoIosArrowForward />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllOrdersPage;