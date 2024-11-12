import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import '../../styles/pages-styles/payment-pages-styles/USSDInstructionPage.css';

function USSDInstructionPage() {
    return (
        <div className="ussd-instruction-page-container">
            {/* Spinner */}
            <div className="ussd-instruction-spinner-container">
                <FaSpinner className="ussd-instruction-spinner" />
            </div>

            {/* Waiting Message */}
            <div className="ussd-instruction-waiting-container">
                <h2 className="ussd-instruction-waiting-heading">We're Waiting for You</h2>
                <p className="ussd-instruction-text">Please follow the instructions below to complete your payment.</p>
            </div>

            {/* USSD Code Instructions */}
            <div className="ussd-instruction-code-container">
                <h3 className="ussd-instruction-code-heading">Dial *123*456#</h3>
                <ul className="ussd-instruction-steps-list">
                    <li className="ussd-instruction-step-item">Choose the payment option on the USSD menu.</li>
                    <li className="ussd-instruction-step-item">Confirm the payment with your PIN or security code.</li>
                </ul>
            </div>
        </div>
    );
}

export default USSDInstructionPage;
