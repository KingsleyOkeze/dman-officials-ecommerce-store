import { useContext, useEffect, useState } from "react";
import '../../styles/pages-styles/order-pages-styles/OrderConfirmationPage.css';
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaystackPop from '@paystack/inline-js'
import { CouponContext } from "../../contexts/CouponContext";


function OrderConfirmationPage () {
    const navigate = useNavigate();
    const [itemsOrdered, setItemsOrdered] = useState([
        {
            image: cardImage1,
            name: 'This is part of dman officials,',
            color: 'brown',
            size: 'small',
            price: '5000'
        },
        {
            image: cardImage2,
            name: 'This is part of dman officials,',
            color: 'brown',
            size: 'small',
            price: '5000'
        },
        {
            image: cardImage3,
            name: 'This is part of dman officials,',
            color: 'brown',
            size: 'small',
            price: '5000'
        },
        {
            image: cardImage4,
            name: 'This is part of dman officials,',
            color: 'brown',
            size: 'small',
            price: '5000'
        }
    ]);

    const { 
        applyCoupon, 
        couponCode, 
        setCouponCode, 
        discountAmount, 
        couponError, 
        isValidCoupon, 
        removeCoupon 
    } = useContext(CouponContext);
    
    const [country, setCountry] = useState('Nigeria')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    
    const [totalPrice, setTotalPrice] = useState(0); 
    const [shippingPrice, setShippingPrice] = useState(1000)

    // Calculate final total price after discount and adding shipping fee
    const finalTotalPrice = Math.max(totalPrice - discountAmount + shippingPrice, 0); // Prevent negative total

    const fetchCartTotalPrice = async () => {
        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/fetch-cart-total-price", {
                customerId: data
            })

            if (response.status === 200) {
                setTotalPrice(response.data.totalPrice);
                console.log('cart total price message', response.data);
            }
        } catch (err) {
            console.log('err fetching cart', err)
        }
        
    };

    useEffect(() => {
        fetchCartTotalPrice();
    }, []);

    
    const handleApplyCoupon = () => {
        applyCoupon(couponCode); // Call the context function to apply the coupon
    };

    const handlePlaceOrder = async () => {
        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/place-order", {
                customerId: data,
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
            })

            if (response.status === 201) {
                console.log('place-order message', response.data.customerEmail);
                // Handle payment
                handlePayment(
                    response.data.customerEmail, 
                    response.data.savedOrder.orderTotalAmount, 
                    response.data.savedOrder._id
                );
            }
        } catch (err) {
            console.log('err placing order', err)
        }
    }

    // HANDLE PAYMENT
    async function handlePayment (customerEmail, totalAmount, orderId) {
        const popup = new PaystackPop()
  
        popup.newTransaction({
            key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
            email: customerEmail,
            amount: totalAmount * 100, // Convert amount to kobo
            onSuccess: async (transaction) => {
                console.log('onSuccess', transaction);
                try {
                    const response = await axios.post("/customer/verify-transaction", { 
                        reference: transaction.reference,
                        customerEmail,
                        orderId
                    });

                    if (response.data.status === "payment mismatch") {
                        alert(response.data.message); // Show detailed message
                        navigate(`/order-review/${orderId}`); // Navigate to a pending review page
                    } else if (response.status === 200) {
                        // Payment success
                        console.log("Payment verified successfully:", response.data);
                        navigate(`/account/order-tracking/${orderId}`);

                        // Clear all billing state and coupon ("if applied")
                        setCountry('');
                        setFirstName('');
                        setLastName('');
                        setCompany('');
                        setAddress('');
                        setCity('');
                        setState('');
                        setPostalCode('');
                        setPhoneNumber();
                    } 

                    // Clear coupon if applied
                    removeCoupon();
                    
                } catch (error) {
                    console.error("Error verifying payment:", error.message);
                }
        
            },
        onLoad: (response) => {
          console.log("onLoad: ", response);
        },
        onCancel: () => {
          console.log("onCancel");
        },
        onError: (error) => {
          console.log("Error: ", error.message);
        }
        });
  
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
                                <img src={item.image} width={150} height={139}/>
                                <div className="items-ordered-card-description">
                                    <p>{item.name} - {item.color}</p>
                                    <p>{item.color}</p>
                                    <p><RiCheckboxBlankFill width={20} height={20}/></p>
                                    <p>{item.price}</p>
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
                        {couponError && <p className="error-message">{couponError}</p>}
                        {isValidCoupon && <p className="success-message">Coupon applied successfully!</p>}
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
                        <li>Refund policy</li>
                        <li>Shipping Policy</li>
                        <li>Privacy policy</li>
                        <li>Terms of Use</li>
                    </ul>

            </div>


        </div>
    );
}

export default OrderConfirmationPage;