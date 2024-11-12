import '../../styles/pages-styles/payment-pages-styles/USSDPaymentPage.css'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function USSDPaymentPage () {
    const navigate = useNavigate();
    
    return(
        <div className="ussd-payment-page-container">
            <div className="ussd-payment-total-header-details-container">
                <div className="ussd-payment-header-total-div">
                    <p>USSD</p>
                    <p>Total to pay: <b>₦</b>39,720</p>
                </div>
                    <p>All transactions are secure and encrypted.</p>
            </div>
            <div className="ussd-payment-choose-a-bank-container">
                <p>CHOOSE A BANK</p>
                <div className="bank-select-container" name="Please select a bank">
                    <select>
                        <option>Please select a bank</option>
                        <option>Access bank</option>
                    </select>
                    <p style={{display: 'none', color: '#FF3B30'}}>Please select a bank</p>
                </div>
            </div>

            <p className="ussd-different-payment-method-text">Use a different payment method</p>

            <div className="ussd-button-container"> 
                <button className="ussd-page-btn" onClick={() => navigate("/ussd-instruction-page")}>Pay now ₦28,720</button>
            </div>

            <p className="ussd-bottom-first-instruction-text">By clicking on "Pay now", I accept the Payment 
                Terms of use and privacy policy.
            </p>

            <p className="ussd-bottom-second-instruction-text">
                <span style={{ fontWeight: 'bold' }}>Please note:</span> we will never ask you for your 
                password, PIN, CVV or full card details over 
                the phone or via email.
            </p>
            
            <div className="ussd-payment-go-back-bottom-text">
                <IoIosArrowBack /> 
                <p>Go Bak to .MAN</p>
            </div>
                    



        </div>
    )
}


export default USSDPaymentPage;