import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/user-account-page-styles/AllOrdersPage.css";
import cardImage1 from "../../images/cardImage1.png"
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import Alert from "../../components/Alert";

function AllOrdersPage () {
    const navigate = useNavigate();
    const { accessToken, customerId, refreshAccessToken } = useContext(AuthContext); 
    const { showAlert, customAlert } = useContext(AlertContext);
    const [orders, setOrders] = useState([]);
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)


    const handlePreviousFunction = async () => {
        try {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(
                `/customer/fetch-all-customer-orders?page=${newPaginationIndex}&limit=5`,
                {
                    params: {
                        customerId: customerId
                    },
                    headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                    }
                }
            );
    
            if (response.status === 200) {
                console.log("fetched data", response.data.result)
                setOrders(response.data.result);
                
            }
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handlePreviousFunction);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };

    const handleNextFunction = async () => {
        try {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(
                `/customer/fetch-all-customer-orders?page=${newPaginationIndex}&limit=5`,
                {
                    params: {
                        customerId: customerId
                    },
                    headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                    },
                }
            );
        
            if (response.status === 200) {
                console.log("fetched data", response.data.result)
                setOrders(response.data.result);
            }
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleNextFunction);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };

    
    const handleFetchOrders = async () => {
        try {
            const response = await axios.get(
            `/customer/fetch-all-customer-orders?page=${paginationIndex}&limit=5`, 
            {
                params: {
                    customerId: customerId
                },
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log('fetch-all-customer-orders', response.data.result)
                setOrders(response.data.result);
                setTotalPages(response.data.totalPages)
            }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleFetchOrders);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };
    useEffect(() => {
        if (accessToken) {
            console.log('called', accessToken)
            handleFetchOrders();
        }
    }, [accessToken, customerId]);


    return(
        <div className="all-order-page-container">
            {customAlert.type ? (<Alert />) : "" }
            <h3>Orders</h3>
            <div className="all-order-page-main-content">
                <div className="all-order-page-title">
                   <p>IN PROGRESS/DELIVERED</p>  
                </div>
                <div className="all-order-page-card-container">
                {               
                    orders?.map((order, index) => (
                        <div className="all-order-page-card">
                            <div className="all-order-page-card-img-container">
                              <img src={order.image} />
                            </div>
                            <div className="all-order-page-card-description-container">
                                <div className="all-order-page-card-name-and-order-id-container">
                                  <p className="all-order-page-card-name">{order.name}</p>
                                  <p className="all-order-page-card-order-id">Order ID: <span>{order.orderId}</span></p>
                                </div>
                                <div className="all-order-page-card-status-and-date-container">
                                  <p 
                                    className="all-order-page-card-status"
                                    style={{
                                        background: order.status.includes("delivered") ? "#008C00" : 
                                        order.status.includes("cancelled") ? "#808080" : "#FFA500"
                                    }}> {order.status}</p>
                                  <p className="all-order-page-card-deliveryDate">{order.deliveryDate}</p>
                                </div>
                            </div>
                            <div className="all-order-page-card-see-details">
                               <p onClick={() => {
                                navigate(`/account/purchase-details/${order.orderId}`)
                               }}>See Details</p>
                            </div>
                        </div>
                    ))
                }
                </div>

                <div className="all-order-page-bottom-pagination-container">
                    <button
                        className="all-order-page-pagination-button pagination-prev"
                        onClick={handlePreviousFunction}
                        disabled={paginationIndex === 0}
                    >
                        <IoIosArrowBack />
                        <span>Previous page</span>
                    </button>
                    {/* <div> */}
                        <span className="all-order-page-pagination-status">
                            {paginationIndex + 1} / {totalPages ? totalPages : 0 }
                        </span>
                    {/* </div> */}
                    <button
                        className="all-order-page-pagination-button pagination-next"
                        onClick={handleNextFunction}
                        disabled={paginationIndex + 1 === totalPages}
                    >
                        Next page
                        <IoIosArrowForward />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AllOrdersPage;