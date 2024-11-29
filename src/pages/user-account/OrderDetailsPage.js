import "../../styles/pages-styles/user-account-page-styles/OrderDetailsPage.css"
import { IoArrowBackOutline } from "react-icons/io5";
import cardImage1 from "../../images/cardImage1.png"

function OrderDetailsPage () {

    return(
        <div className="order-details-container">
            <div className="order-details-header-container">
                <IoArrowBackOutline className="order-details-header-icon"/>
                <h3>Order Details</h3>
            </div>
            <div className="order-details-main-detail-container">
                <div className="order-details-main-detail-top-description-container">
                    <p className="order-details-main-detail-top-description-header">ORDER ID: 09657054598</p>
                    <div className="order-details-main-detail-top-description">
                        <p>1 item</p>
                        <p>Order placed on 13th Oct, 2024</p>
                        <p>Total: N9,680</p>
                    </div>

                    <p className="order-details-card-head">PRODUCTION IN YOUR ORDER</p>
                    <div className="order-details-card">
                        <div className="order-details-card-flex">
                            <div className="order-details-card-img-container">
                                <img src={cardImage1} />
                            </div>
                            <div className="order-details-card-description-container">
                                <div className="order-details-card-description-first-child">
                                    <p className="order-details-card-name">Men trouser and under wear zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzz- brown</p>
                                    <p>Quantity:<span>1</span></p>
                                </div>
                                <div className="order-details-card-description-second-child">
                                    <p className="order-details-card-description-second-child-status">Shipped</p>
                                    <p  className="order-details-card-description-second-child-price">N 9680</p>
                                </div>
                            </div>
                            <div className="order-details-card-history-btn-container">
                                <button>Product history</button>
                            </div>
                        </div>
                        <p className="order-details-card-bottom-text">Delivered between 28th friday october</p>
                    </div>

                </div>
            </div>
            <div className="order-details-payment-and-delivery-container">
                <div className="order-details-payment-container">
                    <p className="order-details-payment-header">PAYMENT INFORMATION</p>
                    <div className="order-details-payment-first-child">
                        <p className="order-details-payment-first-child-head">Payment Method</p>
                        <p>Pay with card, bank transfer or USSD</p>
                    </div>
                    <div className="order-details-payment-second-child">
                        <p className="order-details-payment-second-child-head">Payment Method</p>
                        <p>Items Total: N9,658</p>
                        <p>Deli ver Fees: N700</p>
                        <p>N9,986</p>
                    </div>
                </div>
                <div className="order-details-delivery-container">
                    <p className="order-details-delivery-header">DELIVERY INFORMATION</p>
                    <div className="order-details-delivery-first-child">
                        <p className="order-details-delivery-first-child-head">Delivery Method</p>
                        <p>Door - To - Door</p>
                    </div>
                    <div className="order-details-delivery-second-child">
                        <p className="order-details-delivery-second-child-head">Shiping Address</p>
                        <p>45 Adebayo street, Ikeja, Lagos, Nigeria</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage;