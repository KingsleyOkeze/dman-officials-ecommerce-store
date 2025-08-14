import { useContext, useEffect, useState } from "react";
import '../../styles/pages-styles/order-pages-styles/OrderConfirmationPage.css';
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CouponContext } from "../../contexts/CouponContext";
import PrivacyPolicyPage from "../../pages/footer-pages/PrivacyPolicyPage"
import TermsOfUsePage from "../../pages/footer-pages/TermsOfUsePage";
import ShippingPolicyPage  from "../../pages/footer-pages/ShippingPolicyPage";
import ReturnsPolicyPage from "../../pages/footer-pages/ReturnsPolicyPage"
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import { handlePayment } from "../../services/paymentService";

function OrderConfirmationPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const { accessToken, customerId } = useContext(AuthContext);
    const [itemsOrdered, setItemsOrdered] = useState([]);

    const { 
        applyCoupon, 
        couponCode, 
        setCouponCode, 
        discountAmount, 
        couponError, 
        isValidCoupon, 
        removeCoupon 
    } = useContext(CouponContext);
    const {refreshAccessToken} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);
    const [showModal, setShowModal] = useState(false);
    const [pageToShowOnModal, setPageToShowOnModal] = useState("");
    const [country, setCountry] = useState('Nigeria');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    
    const [totalPrice, setTotalPrice] = useState(0); 
    const [shippingPrice, setShippingPrice] = useState(1000)

    // Calculate final total price after discount and adding shipping fee
    const finalTotalPrice = Math.max(totalPrice - discountAmount + shippingPrice, 0); // Prevent negative total


    // Get cart items from navigation state
    useEffect(() => {
        if (location.state && location.state.cartItems) {
            setItemsOrdered(location.state.cartItems);
            console.log("cart items is", location.state.cartItems)
        }
    }, [location.state]);

    const fetchCartTotalPrice = async () => {
        try {
            const response = await axios.get("/customer/fetch-cart-total-price", {
                params: {
                    customerId: customerId
                },
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            })

            if (response.status === 200) {
                setTotalPrice(response.data.totalPrice);
                console.log('cart total price message', response.data);
            }
        } catch (err) {
            console.log('err fetching cart', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 403 || 
                    status === 404 || 
                    status === 500
                ) {
                    showAlert(status, errMessage)
                } 
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
        
    };

    useEffect(() => {
        fetchCartTotalPrice();
    }, [accessToken, customerId]);

    
    const handleApplyCoupon = () => {
        applyCoupon(couponCode); // Call the context function to apply the coupon
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post("/customer/place-order", {
                customerId: customerId,
                country,
                firstName,
                lastName,
                company,
                address,
                city,
                state,
                postalCode,
                phoneNumber,
                appliedCouponCode: couponCode, // Pass the applied coupon code
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            })

            if (response.status === 201) {
                console.log('place-order message', response.data.customerEmail);
                // Handle payment
                handlePayment(
                    response.data.customerEmail, 
                    response.data.savedOrder.orderTotalAmount, 
                    response.data.savedOrder._id,
                    navigate, 
                    accessToken, 
                    refreshAccessToken, 
                    showAlert
                );
            }
        } catch (err) {
            console.log('err placing order', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 403 || 
                    status === 404 || 
                    status === 500
                ) {
                    showAlert(status, errMessage)
                } 
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }

    

    return(
        <div className="order-confirmation-page-container">
            <div className="order-delivery-address-and-items-ordered-container">
                <div className="order-delivery-address-container">
                    <div className="order-delivery-address-header">
                        <h2>DELIVERY</h2>
                        <p>Delivery between <b>23 October</b> and <b>25 October</b></p>
                    </div>

                    <div>
                        <select 
                            name="Country/Region" 
                            className="order-country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="Nigeria">Nigeria</option>
                        </select>
                        <div className="order-first-and-last-name-container">
                            <input 
                                type="text" 
                                placeholder="First Name"
                                value={firstName}
                                className="order-first-name-input"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name"
                                value={lastName}
                                className="order-last-name-input"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Company (optional)"
                            value={company}
                            className="order-company-input"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Address"
                            value={address}
                            className="order-address-input"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <div>
                            <input 
                                type="text" 
                                placeholder="City"
                                value={city}
                                className="order-city-input"
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="State"
                                value={state}
                                className="order-state-input"
                                onChange={(e) => setState(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Postal code (optional)"
                                value={postalCode}
                                className="order-postal-code-input"
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Phone Number (+234)"
                            value={phoneNumber}
                            className="order-phone-number-input"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                         />
                        <p>Incase we need to contact you about your order</p>
                    </div>
                </div>

                <div className="items-ordered-container">
                <h2>ITEMS</h2>
                    {
                        itemsOrdered.map((item, index) => (
                            <div key={index} className="items-ordered-card">
                                <div className="items-ordered-card-img-container">
                                    <img 
                                        width={150}
                                        height={124}
                                        src={item?.productRef?.productImageUrl[0]} alt={item?.productRef?.productName}
                                    />
                                </div>
                                <div className="items-ordered-card-description">
                                    <p>{item?.productRef?.productName} - {item.color}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p><RiCheckboxBlankFill width={20} height={20}/></p>
                                    <p>N {item?.productRef?.productPrice}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

            
             
            <div className="order-calculation-summary-container">
                    <div className="order-summary-total-container">
                        <h2>ORDER SUMMARY</h2>
                        <div className="order-coupon-code-input-container">
                            <input type="text" 
                                placeholder="Enter discount code here"
                                className="order-coupon-code-input"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                // readOnly={discountApplied} // Only prevent editing if discount already applied
                            />
                            <button 
                                className="order-coupon-apply-button"
                                onClick={handleApplyCoupon}
                                >
                                    Apply
                            </button>
                        </div>
                        {couponError && <p className="order-coupon-error-message">{couponError}</p>}
                        {isValidCoupon && <p className="order-coupon-success-message">Coupon applied successfully!</p>}
                        <div className="order-total-container">
                            <div>
                                <p>Subtotal</p>
                                <p>Shipping fee</p>
                                <p>Discount:</p>
                                <p><b>Total</b></p>
                            </div>
                            <div>
                                <p>N {totalPrice.toFixed(2)}</p>
                                <p>N {shippingPrice.toFixed(2)}</p>
                                <p>N {discountAmount.toFixed(2)}</p>
                                <p>N {finalTotalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                        <button 
                            className="confirm-order-button" 
                            onClick={handlePlaceOrder}
                        >
                            Confirm order
                        </button>
                    </div>

                    <ul className="order-policy-list">
                        <li
                            onClick={() => {
                                setShowModal(true)
                                setPageToShowOnModal("return-policy-page")
                            }}
                        >
                            Refund policy
                        </li>
                        <li
                            onClick={() => {
                                setShowModal(true)
                                setPageToShowOnModal("shipping-policy-page")
                            }}
                        >
                            Shipping Policy
                        </li>
                        <li
                            onClick={() => {
                                setShowModal(true)
                                setPageToShowOnModal("privacy-policy-page")
                            }}
                        >
                            Privacy policy
                        </li>
                        <li
                            onClick={() => {
                                setShowModal(true)
                                setPageToShowOnModal("terms-of-use-policy-page")
                            }}
                        >
                            Terms of Use
                        </li>
                    </ul>

            </div>

            {/* Modal for show modal */}
            {showModal && (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <button
                        className="close-modal-button"
                        onClick={() => setShowModal(false)}
                    >
                        &times; {/* "Times" icon for close */}
                    </button>
                    {
                        pageToShowOnModal === "return-policy-page" ?
                            <ReturnsPolicyPage />
                        : pageToShowOnModal === "shipping-policy-page" ?
                            <ShippingPolicyPage />
                        : pageToShowOnModal === "privacy-policy-page" ?
                            <PrivacyPolicyPage />
                        : pageToShowOnModal === "terms-of-use-policy-page" ? 
                            <TermsOfUsePage />
                        : 
                        ""
                    }
                </div>
            </div>
            )}


        </div>
    );
}


export default OrderConfirmationPage;