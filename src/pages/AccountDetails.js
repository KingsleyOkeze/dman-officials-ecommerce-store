import { useState } from 'react';
import dmanLogo from '../images/dman-black-logo.png'
import "../styles/pages-styles/user-account-page-styles/AccountDetailsPage.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function AccountDetails () {
    const [isEdittingProfile, setIsEdittingProfile] = useState(false);
    const [isEdittingSecurity, setIsEdittingSecurity] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('Kingsley');
    const [lastName, setLastName] = useState('Okeze');
    const [email, setEmail] = useState('gmail.com');
    const [gender, setGender] = useState('Male');
    const [dob, setDob] = useState('1-1-1-1');
    const [phoneNumber, setPhoneNumber] = useState('090000000000');

    return(
        <div className="account-details-page-container">
            <div className="account-details-header-container">
                <img src={dmanLogo} width={50} height={50}/>
                <h2>Hello Name</h2>
            </div>
            <div className="account-details-body-content">
                <div className="account-details-profile-container">
                    <div className="account-details-profile-details-header">
                        <p>PROFILE DETAILS</p>
                        <button className="account-details-profile-edit-btn"
                            onClick={() => setIsEdittingProfile(true)}>Edit</button>
                    </div>

                    <form className="account-details-form">
                        <div className="account-details-profile-label-and-input-div">
                            <label>First Name</label>
                            <div>
                                {isEdittingProfile ? <input type="text"></input> : <p>{firstName}</p>}
                            </div>
                        </div>
                        <div className="account-details-profile-label-and-input-div">
                            <label>Last Name</label>
                            <div>
                                {isEdittingProfile ? <input type="text"></input> : <p>{lastName}</p>}
                            </div>
                        </div>
                        <div className="account-details-profile-label-and-input-div">
                            <label>Email</label>
                            <div>
                                {isEdittingProfile ? <input type="email"></input> : <p>{email}</p>}
                            </div>
                            
                        </div>
                        <div className="account-details-profile-label-and-input-div">
                            <label>Gender</label>
                            <div>
                                {isEdittingProfile ? <input type="text"></input> : <p>{gender}</p>}
                            </div>
                        </div>
                        <div className="account-details-profile-label-and-input-div">
                            <label>Date of Birth</label>
                            <div>
                                {isEdittingProfile ? <input type="date"></input> : <p>{dob}</p>}
                            </div>
                        </div>
                        <div className="account-details-profile-label-and-input-div">
                            <label>Phone Number</label>
                            <div>
                                {isEdittingProfile ? <input type="tel"></input> : <p>{phoneNumber}</p>}
                            </div>
                        </div>
                        {
                            isEdittingProfile ? <button className="account-details-save-button">Save</button>
                            :
                            <p className="account-details-bottom-info-text">Feel free to edit your 
                                account information by clicking the edit button.</p>
                        }
                    </form>
                </div>

                <div className="account-details-security-container">
                    {
                        isEdittingSecurity ?
                        <p className="account-details-security-form-header">PASSWORD SETTINGS</p>
                        :
                        <p>SECURITY DETAILS</p>
                    }
                    {
                        isEdittingSecurity ?  
                            <form>
                                <div className="account-details-security-label-and-input-div">
                                    <label>Current Password*</label>
                                    <div className="account-details-security-input-container">
                                        <input type="text"></input>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                    
                                </div>
                                <div className="account-details-security-label-and-input-div">
                                    <label>New Password*</label>
                                    <div className="account-details-security-input-container">
                                        <input type="text"></input>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>
                                <div className="account-details-security-label-and-input-div">
                                    <label>Confirm Password*</label>
                                    <div className="account-details-security-input-container">
                                        <input type="text"></input>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>

                                <button className="account-details-security-save-button">Save</button>
                            </form>
                        
                        :
                        <button className="account-details-edit-security-button"
                            onClick={() => setIsEdittingSecurity(true)}>
                            Change password
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountDetails;