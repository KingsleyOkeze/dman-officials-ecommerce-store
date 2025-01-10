import { useContext, useEffect, useState } from 'react';
import { RiCheckboxBlankFill } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import "../../styles/pages-styles/cart-pages-styles/CartPage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../contexts/CartContext';

function CartPage () {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); 
    const [cartLists, setCartLists] = useState(cartItems
        // [
        // {
        //     image: cardImage1,
        //     name: 'This is part of dman officials,',
        //     color: 'brown',
        //     size: 'small',
        //     price: '5000'
        // },
        // {
        //     image: cardImage2,
        //     name: 'This is part of dman officials,',
        //     color: 'brown',
        //     size: 'small',
        //     price: '5000'
        // },
        // {
        //     image: cardImage3,
        //     name: 'This is part of dman officials,',
        //     color: 'brown',
        //     size: 'small',
        //     price: '5000'
        // },
        // {
        //     image: cardImage4,
        //     name: 'This is part of dman officials,',
        //     color: 'brown',
        //     size: 'small',
        //     price: '5000'
        // }
        // ]
    );

    const handleFetchCart = async () => {
        // let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        // try {
        //     const response = await axios.get("/customer/fetch-cart", {
        //         customerId: data,
        //     });

        //     if (response.status === 200) {
        //         setCartLists(response.data)
        //     }
        // } catch (err) {
        //     if (err.response) {
        //         const status = err.response.status;
        //         const errMessage = err.response.data.error;
        //         if (status) {
        //             alert("err cart", errMessage)

        //         }
        //     } else {
        //         alert("Unknow Error fetching to cart!")
        //     }
        // }
    };

    useEffect(() => {
        // handleFetchCart();
    }, [])
    
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
                                        <p className="cart-item-name">{cartItem.name} - {cartItem.color} </p>
                                        <p className="cart-item-size">Size: {cartItem.size}</p>
                                        <p className="cart-item-color">Color: <RiCheckboxBlankFill style={{color: 'brown'}}/></p>
                                        <p className="cart-item-price"><b>₦</b> {cartItem.price} </p>
                                    </div>
                                </div>
                                <div className="cart-item-quantity-and-remove-container">
                                    <div>
                                        <p>Quantity <span style={{paddingLeft: '25px'}}>1</span></p>
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
                        />
                        <button
                             className="cart-checkout-coupon-code-button"
                             >
                                Apply
                        </button>
                    </div>
                    <button className="cart-checkout-button" onClick={() => navigate("/order-summary-page")}>Checkout N38,720</button>
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