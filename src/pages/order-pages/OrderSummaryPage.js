import { useState } from "react";
import '../../styles/pages-styles/order-pages-styles/OrderSummaryPage.css';
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function OrderSummaryPage () {
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

    return(
        <div className="order-summary-page-container">
            <div className="order-delivery-address-and-items-ordered-container">
                <div className="order-delivery-address-container">
                    <div className="order-delivery-address-header">
                        <h2>DELIVERY</h2>
                        <p>Delivery between <b>23 October</b> and <b>25 October</b></p>
                    </div>

                    <div>
                        <select name="Country/Region" className="order-country">
                            <option>Nigeria</option>
                        </select>
                        <div className="order-first-and-last-name-container">
                            <input type="text" placeholder="First Name"
                                className="order-first-name-input"
                            />
                            <input type="text" placeholder="Last Name"
                                className="order-last-name-input"
                            />
                        </div>
                        <input type="text" 
                            placeholder="Company (optional)"
                            className="order-company-input"
                        />
                        <input type="text" placeholder="Address"
                            className="order-address-input"
                        />
                        <div>
                            <input type="text" 
                                placeholder="City"
                                className="order-city-input"
                            />
                            <input type="text" 
                                placeholder="State"
                                className="order-state-input"
                            />
                            <input type="text" 
                                placeholder="Postal code (optional)"
                                className="order-postal-code-input"
                            />
                        </div>
                        <input type="text" 
                            placeholder="Phone Number (+234)"
                            className="order-phone-number-input"
                         />
                        <p>Incase we need to contact you about your order</p>
                    </div>
                </div>




                <div className="items-ordered-container">
                <h2>ITEMS</h2>
                    {
                        itemsOrdered.map((item) => (
                            <div className="items-ordered-card">
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
                                className="order-coupon-code-input"></input>
                            <button className="order-coupon-apply-button">Apply</button>
                        </div>

                        <div className="order-total-container">
                            <div>
                                <p>Subtotal</p>
                                <p>Shipping fee</p>
                                <p><b>Total</b></p>
                            </div>
                            <div>
                                <p>N 38,000</p>
                                <p>N 1,000</p>
                                <p>N 39,720</p>
                            </div>
                        </div>
                        <button className="confirm-order-button" onClick={() => navigate("/card-payment-page")}>Confirm order</button>
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

export default OrderSummaryPage;