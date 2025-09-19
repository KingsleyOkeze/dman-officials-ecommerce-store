import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankFill } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import "../../styles/pages-styles/cart-pages-styles/CartPage.css";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { SideDrawerContext } from '../../contexts/SideDrawerContext';
import axios from 'axios';
import { CouponContext } from '../../contexts/CouponContext';
import { LiaTimesSolid } from "react-icons/lia";
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import { FiX } from "react-icons/fi";
import { Helmet } from 'react-helmet-async';

function CartPage () {
    const navigate = useNavigate();
    const { accessToken, customerId } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const { 
        cartItems, 
        updateQuantity, 
        removeFromCart, 
        loadingId, 
        actionType, 
        setActionType 
    } = useContext(CartContext); 
    const { 
        applyCoupon, 
        couponCode, 
        setCouponCode, 
        discountAmount, 
        couponError, 
        isValidCoupon 
    } = useContext(CouponContext);
    const { toggleSideDrawer } = useContext(SideDrawerContext); 
    const [currency, setCurrency] = useState('₦');
    const [totalPrice, setTotalPrice] = useState(0);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false); // New state for coupon button
    const [isCheckingOut, setIsCheckingOut] = useState(false); // New state for checkout button
    

    const fetchCartTotalPrice = async () => {
        try {
            const response = await axios.get("/customer/fetch-cart-total-price", {
                params: {
                    customerId: customerId
                },
                headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                }
            });

            if (response.status === 200) {
                setTotalPrice(response.data.totalPrice);
            }
        } catch (err) {
            // console.log('err fetching cart', err);
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
        }
        
    };

    useEffect(() => {
        fetchCartTotalPrice();
    }, [cartItems]);

    
    const handleApplyCoupon = async () => {
        setIsApplyingCoupon(true); // Start loading
        try {
            await applyCoupon(couponCode);
        } finally {
            setIsApplyingCoupon(false); // End loading
        }
    };

    const finalTotalPrice = totalPrice - discountAmount; // Calculate final price after discount

    const handleCheckout = () => {
        setIsCheckingOut(true); // Start loading
        toggleSideDrawer();
        navigate("/order-confirmation-page");
    };

    return (
        <div className="cart-page-container">
            <Helmet>
                <title>Shopping Cart | Dman Officials Store</title>
                <meta
                    name="description"
                    content="View and manage your shopping cart at Dman Officials Store. Update quantities, apply coupons, and proceed to checkout with secure payment options."
                />
            </Helmet>
            {
                !accessToken && !customerId ? (
                    <div className="empty-cart-page-container">
                        <div className="cart-page-list-showcase-header-container">
                            <h2>Shopping cart</h2>
                            <LiaTimesSolid 
                                    className="cart-page-close-page-icon"
                                    onClick={toggleSideDrawer}
                            />
                        </div>
                        <p>You need to log in to manage cart.</p>
                    </div>
                ) 
                :
                cartItems.length > 0 ? 
                    <div className="cart-page-sub-container">
                        <div className="cart-page-list-showcase-container">
                            <div className="cart-page-list-showcase-header-container">
                                <h2>Shopping cart ({cartItems.length})</h2>
                                <LiaTimesSolid 
                                    className="cart-page-close-page-icon"
                                    onClick={toggleSideDrawer}
                                />
                            </div>
                            <div className="cart-page-list-container">
                                {
                        cartItems.map((cartItem, index) => ( 
                            <div key={index} className="cart-page-card">
                                    <div className="cart-item-image-container">
                                        <img 
                                            src={cartItem?.productRef?.productImageUrl[0]}
                                            className="cart-item-image"
                                        />
                                    </div>
                                    <div className="cart-item-description-container">
                                        <p className="cart-item-name">
                                            {cartItem?.productRef?.productName} - {cartItem?.productRef?.productColor[0]} 
                                        </p>
                                        <p className="cart-item-size">
                                            Size: {cartItem?.productRef?.productSize}
                                        </p>
                                        <p className="cart-item-color">
                                            Color: <RiCheckboxBlankFill 
                                                        style={{
                                                            color: cartItem?.productRef?.productColor[0] ?
                                                                cartItem?.productRef?.productColor[0].replace(/\s+/g, '').toLowerCase()
                                                                : 'brown'
                                                        }}
                                                    />
                                        </p>
                                        <p className="cart-item-price">
                                            <b>{cartItem?.productRef?.currency}</b> 
                                            {cartItem?.productRef?.productOfferPrice} 
                                        </p>
                                    </div>
                                    <div className="cart-item-quantity-container">
                                        <p className="cart-item-quantity-text">Quantity </p>
                                        <p className="cart-item-quantity-counter-container">
                                            <button 
                                                className="cart-card-quantity-button"
                                                disabled={cartItem.quantity <= 1 || loadingId === cartItem._id}                                    
                                                onClick={() => {
                                                    setActionType("decrease");  
                                                    updateQuantity(cartItem._id, cartItem.quantity - 1) 
                                                }}
                                            >
                                                {loadingId === cartItem._id && actionType === "decrease" ? (
                                                    <span className="cart-card-btn-spinner"></span>
                                                ) : (
                                                    "-"
                                                 )}
                                            </button >
                                            <span 
                                                className="cart-card-quantity-value"
                                            >
                                                {cartItem.quantity}
                                            </span>
                                            <button 
                                                className="cart-card-quantity-button"
                                                disabled={loadingId === cartItem._id} 
                                                onClick={() => {
                                                    setActionType("increase");
                                                    updateQuantity(cartItem._id, cartItem.quantity + 1) 
                                                }}
                                            >
                                                {loadingId === cartItem._id && actionType === "increase" ? (
                                                    <span className="cart-card-btn-spinner"></span>
                                                    ) : (
                                                    "+"
                                                )}
                                            </button>
                                        </p>
                                    </div>
                                    <div className="cart-item-remove-text-and-icon-container">
                                        <span onClick={() => {
                                                removeFromCart(cartItem._id)
                                            }}>
                                                <FaRegTrashCan 
                                                    className="cart-item-remove-icon"
                                                />
                                                    Remove
                                        </span>
                                    </div>
                                
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="cart-checkout-section">
                <div className="cart-checkout-button-container">
                    <div className="cart-checkout-coupon-code-container">
                        <input type="text"
                            placeholder="Enter coupon code"
                            className="cart-checkout-coupon-code-input"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                            className="cart-checkout-coupon-code-button"
                            onClick={handleApplyCoupon}
                            disabled={isApplyingCoupon} // Disable the button while loading
                        >
                            {isApplyingCoupon ? <span className="apply-coupon-spinner"></span> : 'Apply'}
                        </button>
                    </div>
                    <div className="cart-coupon-response-message-container" >
                        {couponError && <p className="cart-coupon-error-message">{couponError}</p>} 
                        {isValidCoupon && <p className="cart-coupon-success-message">Coupon applied successfully!</p>}
                    </div>
                    {/* Checkout Button */}
                    <button 
                        className="cart-checkout-button" 
                        onClick={handleCheckout}
                        disabled={isCheckingOut} // Disable the button while loading
                    >
                        {isCheckingOut ? (
                            <span className="checkout-spinner"></span>
                        ) : (
                            `Checkout ${currency} ${finalTotalPrice.toFixed(2)}`
                        )}
                    </button>
                    <p className="cart-checkout-button-bottom-text">You are eligible for free shipping</p>
                </div>
                
                <div className="cart-instruction-container">
                    <div className="cart-payment-instruction-container">
                        <h3>Payment information</h3>
                        <p>Secure payments via Visa, Mastercard, 
                            & Bank Transfer. 
                            <br></br> <br></br>
                            Contact support: [{process.env.REACT_APP_CUSTOMER_SUPPORT_EMAIL}/{process.env.REACT_APP_CUSTOMER_SUPPORT_PHONE_NUMBER}] for 
                            inquiries.
                        </p>
                    </div>
                    <div className="cart-shipping-instruction-container">
                        <h3>Shipping and return</h3>
                        <p>
                            Shipping:
                            Orders processed within 24-48 hours
                            <br></br> <br></br>
                            Delivery: 3-5 business days (domestic)
                            <br></br> <br></br>
                            Delivery: 9-12 business days (international)
                            <br></br> <br></br>
                            Returns:
                            Accepted within 7 days
                            Items must be unused, in original packaging
                            Refunds in original payment method, minus shipping.
                            <br></br> <br></br>
                            Contact support: [{process.env.REACT_APP_CUSTOMER_SUPPORT_EMAIL}/{process.env.REACT_APP_CUSTOMER_SUPPORT_PHONE_NUMBER}] for inquiries
                            Track your order via email updates
                        </p>
                    </div>
                    
                </div>
            </div>
            </div>
             : 
             <div className="empty-cart-page-container">

                <div className="empty-cart-header">
                    <h2>Shopping cart</h2>
                    <FiX 
                        className="empty-cart-header-close-icon"
                        onClick={toggleSideDrawer}
                    />
                </div>
                <p>Your cart is empty</p>
            </div>
            }
        </div>
    )
}

export default CartPage;