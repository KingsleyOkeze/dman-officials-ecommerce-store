import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankFill } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import "../../styles/pages-styles/cart-pages-styles/CartPage.css";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { SideDrawerContext } from '../../contexts/SideDrawerContext';
import axios from 'axios';


function CartPage () {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); 
    const { toggleSideDrawer } = useContext(SideDrawerContext); 
    const [currency, setCurrency] = useState('₦');
    const [totalPrice, setTotalPrice] = useState(0);

    const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(null);
  const [isValidCoupon, setIsValidCoupon] = useState(false);


    const fetchCartTotalPrice = async () => {
        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/fetch-cart-total-price", {
                customerId: data
            })

            if (response.status === 200) {
                setTotalPrice(response.data.totalPrice);
                console.log('cart total price message', response.data)
                // alert('cart message', response.data.totalPrice)
            }
        } catch (err) {
            console.log('err fetching cart', err)
        }
        
    };

    useEffect(() => {
        fetchCartTotalPrice();
    }, [cartItems]);

    const handleApplyCoupon = async () => {
        try {
            const response = await axios.post('/customer/validate-coupon', {
                customerId: localStorage.getItem('customerId'),
                couponCode: couponCode,
            });

            if (response.status === 200) {
                setIsValidCoupon(true);
                setCouponError(null);
                setTotalPrice(response.data.total);

                // Store the coupon code and discount details in sessionStorage
                sessionStorage.setItem("dmanCouponCode", couponCode);
                sessionStorage.setItem("discount", response.data.total.toString());
                sessionStorage.setItem("discountApplied", "true");
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    return (
        <div className="cart-page-container">
            { cartItems.length > 0 ? 
            <div className="cart-page-sub-container">
            <div className="cart-page-list-showcase-container">
                <h2>Shopping cart (4)</h2>

                <div className="cart-page-list-container">
                    {
                        cartItems.map((cartItem, index) => ( 
                            <div key={index}  className="cart-page-card">
                                <div className="cart-item-image-and-description-container">
                                    <img src={cartItem.productRef.productImageUrl[0]} width={150} height={139} />
                                    <div className="cart-item-description-container">
                                        <p className="cart-item-name">{cartItem.productRef.productName} - {cartItem.color} </p>
                                        <p className="cart-item-size">Size: {cartItem.size}</p>
                                        <p className="cart-item-color">Color: <RiCheckboxBlankFill style={{color: 'brown'}}/></p>
                                        <p className="cart-item-price">
                                            <b>{cartItem.productRef.currency}</b> 
                                            {cartItem.productRef.productOfferPrice} 
                                        </p>
                                    </div>
                                </div>
                                <div className="cart-item-quantity-and-remove-container">
                                    <div>
                                        <p>Quantity <span style={{paddingLeft: '25px'}}>{cartItem.quantity}</span></p>
                                    </div>
                                    <ul>
                                        <li onClick={() => {
                                                removeFromCart(cartItem._id)
                                            }}>
                                                <FaRegTrashCan 
                                                    className="cart-item-remove-icon"
                                                />
                                                    Remove
                                        </li>
                                    </ul>
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
                            >
                                Apply
                        </button>
                    </div>
                    {couponError && <p className="error-message">{couponError}</p>}
                    {isValidCoupon && <p className="success-message">Coupon applied successfully!</p>}
                    <button 
                        className="cart-checkout-button" 
                        onClick={() => {
                            toggleSideDrawer();
                            navigate("/order-confirmation-page");
                        }}>
                            Checkout {currency} <span>{totalPrice}</span>
                        </button>
                    <p className="cart-checkout-button-bottom-text">You are eligible for free shipping</p>
                </div>
                
                <div className="cart-instruction-container">
                    <div className="cart-payment-instruction-container">
                        <h3>Payment information</h3>
                        <p>Secure payments via Visa, Mastercard, 
                            PayPal & Bank Transfer. 5-7 day refunds. 
                            Contact [support email/phone number] for 
                            inquiries.
                        </p>
                    </div>
                    <div className="cart-shipping-instruction-container">
                        <h3>Shipping and return</h3>
                        <p>
                            Shipping:
                            Orders processed within 24-48 hours
                            Delivery: 3-7 business days (domestic)
                            Delivery: 7-14 business days (international)
                            <br></br> <br></br>
                            Returns:
                            Accepted within 30 days
                            Items must be unused, in original packaging
                            Refunds in original payment method, minus shipping
                            Contact [support email/phone number] for inquiries
                            Track your order via email updates
                        </p>
                    </div>
                    
                </div>
            </div>
            </div>
             : 
             <div className="empty-cart-page-container">

                <h2>Shopping cart</h2>
                <p>Your cart is empty</p>
            </div>
            }
        </div>
    )
}

export default CartPage;