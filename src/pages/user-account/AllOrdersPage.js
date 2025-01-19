import { useEffect, useState } from "react";
import "../../styles/pages-styles/user-account-page-styles/AllOrdersPage.css";
import cardImage1 from "../../images/cardImage1.png"
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AllOrdersPage () {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const handleFetchOrders = async () => {
        let data = localStorage.getItem("customerId");

        try {
            const response = await axios.post(`/customer/fetch-all-customer-orders`, {
                customerId: data  
            });

            if (response.status === 200) {
                console.log('fetch-all-customer-orders', response.data.result)
                setOrders(response.data.result);
            }
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
        }
    };
    useEffect(() => {
        handleFetchOrders();
    }, []);



    return(
        <div className="all-order-page-container">
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
            </div>
        </div>
    )
}

export default AllOrdersPage;