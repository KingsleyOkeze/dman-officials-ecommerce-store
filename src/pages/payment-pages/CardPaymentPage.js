import '../../styles/pages-styles/payment-pages-styles/CardPaymentPage.css'
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { LuDot } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import MastercardLogo from '../../images/MastercardLogo.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CardPaymentPage () {
    const navigate = useNavigate();

    const publicKey = process.env.PAYSTACK_PUBLIC_KEY;

    const amount = 1000000
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
    }
    
    return (
        <div className="card-payment-page-container">
            <div className="card-payment-container">
                <div className="card-payment-header">
                    <h2 className="card-payment-header-h2">PAYMENT</h2>
                    <p className="card-payment-header-total-text">Total to pay: <b>₦</b>38, 720</p>
                </div>
                <p className="card-payment-sub-header">All transaction are secure and encrypted.</p>
                <div className="card-payment-card-type-container">
                    <div className="card-payment-card-type-text-div">
                        <p>Credit Card</p>
                    </div>
                    <div className="card-payment-card-type-icon-container">
                        <SiVisa className="card-payment-card-type-icon" color="#1434CB"/>
                        <img src={MastercardLogo} height={30} width={50} />
                    </div>
                </div>
                <div className="card-payment-input-container">
                    <input type="text" placeholder="Card number"
                        className="card-payment-input"
                     />
                    <div className="card-payment-expiration-and-cvv-container">
                        <input type="text" 
                            placeholder="Expiration date (MM/YY)" 
                            className="card-payment-expiration-input"
                        />
                        <input type="text" 
                            placeholder="Security code (CVV)" 
                            className="card-payment-cvv-input"
                        />
                    </div>
                    <input type="text" placeholder="Cardholder's name" 
                        className="card-payment-input"
                    />
                    </div>
                    <input type="checkbox" 
                        className="card-payment-check-box-input"
                    /> <span className="card-payment-check-box-input-text">Save my info for faster checkout </span>

            </div>
            <div className="card-payment-cvv-instruction-text">
                <p >CVV: 3-digit security code usually found at the back of your card.</p>
            </div>
            <div className="card-payment-choose-a-new-payment-method">
                <h2>CHOOSE A NEW PAYMENT METHOD</h2>
                <div className="card-payment-methods-container">
                    <p onClick={() => navigate("/ussd-payment-page")}>Pay with USSD</p>
                    <p onClick={() => navigate("/bank-transfer-page")}>Bank Transfer</p>
                </div>
            </div>
            <button className="card-payment-button">Pay now <LuDot /> ₦38,720</button>
            <p className="card-payment-bottom-instruction-text">
                <span style={{fontWeight: 900}}>Please note:</span> We will nver ask you for your password,
                PIN, CVV or full card details over the phone or via email.
            </p>

            <div className="card-payment-go-back-bottom-text">
                <IoIosArrowBack /> 
                <div>
                    <p>Go Bak to .MAN</p>
                </div>
            </div>
        </div>
    )
}

export default CardPaymentPage;