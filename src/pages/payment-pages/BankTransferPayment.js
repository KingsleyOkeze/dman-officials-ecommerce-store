import { FaSpinner } from 'react-icons/fa';
import '../../styles/pages-styles/payment-pages-styles/BankTransferPage.css'

function BankTransferPage () {

    return(
        <div className="bank-transfer-page-container">
            <div className="bank-transfer-spinner-container">
                <FaSpinner className="bank-transfer-spinner" />
            </div>
            <div className="bank-transfer-waiting-container">
                <h3>WE ARE WAITING FOR YOUR PAYMENT</h3>
                <div className="bank-transfer-waiting-content-container">
                    <p>
                        Please follow the instruction below and do 
                        not refresh or leave this page.
                    </p>
                    <p>Payment confirmation may take up to 2 minutes.</p>
                </div>
            </div>
            <div className="bank-transfer-acount-details-container">
                <h2>TRANSFER TO THE ACCOUNT BELOW</h2>

                <div className="bank-transfer-acount-name-container">
                    <p>Bank Name</p>
                    <p>United Bank for Africa</p>
                </div>
                <div className="bank-transfer-acount-number-container">
                    <div className="bank-transfer-main-content">
                        <p>Account Number</p>
                        <p>42666667425</p>
                    </div>
                    
                    <div className="bank-transfer-copy-container">
                        <p>Copy Number</p>
                    </div>
                </div>
                <div className="bank-transfer-acount-beneficiary-container">
                    <p>Beneficiary Name</p>
                    <p>D.MAN FASHION</p>
                </div>
            </div>
            <div className="bank-transfer-amount-container">
                <h3>AMOUNT TO TRANSFER</h3>
                <div className="bank-transfer-total-and-copy-div">
                    <div className="bank-transfer-main-content">
                        <p>Amount to pay </p>
                        <p>N38,720</p>
                    </div>
                    <div className="bank-transfer-copy-container">
                        <p>Copy Amount</p>
                    </div>
                </div>
            </div>

            <p className="bank-transfer-first-bottom-text">We will update this screen after your payment</p>
            <p className="bank-transfer-second-bottom-text">This transaction expires in 30 minutes.</p>
        </div>
    )
}

export default BankTransferPage;