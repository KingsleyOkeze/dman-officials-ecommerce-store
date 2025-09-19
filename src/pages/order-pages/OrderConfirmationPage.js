import { useContext, useEffect, useState } from "react";
import '../../styles/pages-styles/order-pages-styles/OrderConfirmationPage.css';
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CouponContext } from "../../contexts/CouponContext";
import PrivacyPolicyPage from "../../pages/footer-pages/PrivacyPolicyPage"
import TermsOfUsePage from "../../pages/footer-pages/TermsOfUsePage";
import ShippingPolicyPage  from "../../pages/footer-pages/ShippingPolicyPage";
import ReturnsPolicyPage from "../../pages/footer-pages/ReturnsPolicyPage"
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import { handlePayment } from "../../services/paymentService";
import { CartContext } from "../../contexts/CartContext";
import { Helmet } from 'react-helmet-async';


function OrderConfirmationPage () {
    const navigate = useNavigate();
    const { accessToken, customerId } = useContext(AuthContext);
    const [itemsOrdered, setItemsOrdered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [couponLoading, setCouponLoading] = useState(false);
    const { 
        applyCoupon, 
        couponCode, 
        setCouponCode, 
        discountAmount, 
        couponError, 
        isValidCoupon
    } = useContext(CouponContext);
    const {refreshAccessToken} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);
    const {cartItems, clearCart} = useContext(CartContext);
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

    
    const handleApplyCoupon = async () => {
        // Start loading
        setCouponLoading(true); 

        try {
            // Since applyCoupon in your CouponContext is an async function
            await applyCoupon(couponCode); 
        } catch (err) {
            // The coupon context likely handles this, but it's good to have a catch block.
            // console.error("Error applying coupon:", err);
        } finally {
            // Stop loading, regardless of success or failure
            setCouponLoading(false); 
        }
    };

    const handlePlaceOrder = async () => {
        setLoading(true); // Start loading
        setCouponLoading(true); // Start coupon loading
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
                    showAlert,
                    clearCart
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
        } finally {
            setLoading(false); // Stop loading, regardless of the outcome
            setCouponLoading(false); // Stop coupon loading
        }
    }

    

    return(
        <div className="order-confirmation-page-container">
            <Helmet>
                <title>Order Confirmation | Dman Officials Store</title>
                <meta
                name="description"
                content="Confirm your order details, enter shipping information, and apply coupons at Dman Officials Store."
                />
            </Helmet>
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
                    {cartItems.length === 0 ? (
                        <p style={{ fontStyle: 'italic' }}>Items is empty</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="items-ordered-card">
                                <div className="items-ordered-card-img-container">
                                    <img 
                                        width={150}
                                        height={124}
                                        src={item?.productRef?.productImageUrl[0]} 
                                        alt={item?.productRef?.productName}
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
                    )}
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
                                disabled={couponLoading} // Disable the button while loading
                            >
                                {couponLoading ? <span className="order-apply-coupon-button-spinner"></span> : 'Apply'}
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
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? <span className="confirm-order-button-spinner"></span> : 'Confirm order'}
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