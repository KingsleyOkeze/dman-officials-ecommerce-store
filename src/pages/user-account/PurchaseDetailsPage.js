import "../../styles/pages-styles/user-account-page-styles/PurchaseDetailsPage.css"
import { IoArrowBackOutline } from "react-icons/io5";
import cardImage1 from "../../images/cardImage1.png"
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import Alert from "../../components/Alert";

function PurchaseDetailsPage () {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { accessToken, customerId, refreshAccessToken } = useContext(AuthContext);
     const { customAlert, showAlert } = useContext(AlertContext);
    const [purchasedOrderDetails, setPurchasedOrderDetails] = useState([]);

    
    const handleFetchPurchasedOrderDetails = async () => {
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
                setPurchasedOrderDetails(response.data.order);
                console.log('purchase order details message', response.data.order);
            }
        } catch (err) {
            console.log('err OrderDetails', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleFetchPurchasedOrderDetails);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }

    useEffect(() => {
        handleFetchPurchasedOrderDetails();
    }, [accessToken, customerId, orderId]);


    return(
        <div className="purchase-details-container">
            {customAlert.type ? (<Alert /> ) : ""}
            {purchasedOrderDetails && (
            <>
            <div className="purchase-details-header-container">
                <IoArrowBackOutline className="purchase-details-header-icon"/>
                <h3>Order Details</h3>
            </div>
            <div className="purchase-details-main-detail-container">
                <div className="purchase-details-main-detail-top-description-container">
                    <p className="purchase-details-main-detail-top-description-header">ORDER ID: 09657054598</p>
                    <div className="purchase-details-main-detail-top-description">
                        <p>1 item</p>
                        <p>Order placed on 13th Oct, 2024</p>
                        <p>Total: N {purchasedOrderDetails?.orderTotalAmount}</p>
                    </div>

                    <p className="purchase-details-card-head">PRODUCTION IN YOUR ORDER</p>
                    <div className="purchase-details-card">
                        <div className="purchase-details-card-flex">
                            <div className="purchase-details-card-img-container">
                                {/* <img src={ purchasedOrderDetails?.orderedItems[0]?.productRef?.productImageUrl[0] } /> */}
                            </div>
                            <div className="purchase-details-card-description-container">
                                <div className="purchase-details-card-description-first-child">
                                    <p className="opurchase-details-card-name">Men trouser and under wear zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzz- brown</p>
                                    <p>Quantity:<span>1</span></p>
                                </div>
                                <div className="purchase-details-card-description-second-child">
                                    <p 
                                        className="purchase-details-card-description-second-child-status"
                                    >
                                        {purchasedOrderDetails?.orderStatus}
                                    </p>
                                    <p  className="purchase-details-card-description-second-child-price">N 9680</p>
                                </div>
                            </div>
                            <div className="purchase-details-card-history-btn-container">
                                <button
                                    onClick={() => {
                                        navigate(`/account/order-tracking/${purchasedOrderDetails?._id}`)
                                    }}
                                >
                                    Product Tracking
                                </button>
                            </div>
                        </div>
                        <p className="purchase-details-card-bottom-text">Delivered between 28th friday october</p>
                    </div>

                </div>
            </div>
            <div className="purchase-details-payment-and-delivery-container">
                <div className="purchase-details-payment-container">
                    <p className="purchase-details-payment-header">PAYMENT INFORMATION</p>
                    <div className="purchase-details-payment-first-child">
                        <p className="purchase-details-payment-first-child-head">Payment Method</p>
                        <p>Pay with card, bank transfer or USSD</p>
                    </div>
                    <div className="purchase-details-payment-second-child">
                        <p className="purchase-details-payment-second-child-head">Payment Method</p>
                        <p>Items Total: N9,658</p>
                        <p>Deli ver Fees: N700</p>
                        <p>N9,986</p>
                    </div>
                </div>
                <div className="purchase-details-delivery-container">
                    <p className="purchase-details-delivery-header">DELIVERY INFORMATION</p>
                    <div className="purchase-details-delivery-first-child">
                        <p className="purchase-details-delivery-first-child-head">Delivery Method</p>
                        <p>Door - To - Door</p>
                    </div>
                    <div className="purchase-details-delivery-second-child">
                        <p className="purchase-details-delivery-second-child-head">Shiping Address</p>
                        <p>45 Adebayo street, Ikeja, Lagos, Nigeria</p>
                    </div>
                </div>
            </div>
            </>
            ) }
        </div>
    )
}

export default PurchaseDetailsPage;