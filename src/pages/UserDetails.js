import { useState } from 'react';
import dmanLogo from '../images/dman-black-logo.png'
import "../styles/pages-styles/user-account-page-styles/UserDetailsPage.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function UserDetails () {
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
        <div className="user-details-page-container">
            <div className="user-details-header-container">
                <img src={dmanLogo} width={50} height={50}/>
                <h2>Hello Name</h2>
            </div>
            <div className="user-details-body-content">
                <div className="user-details-profile-container">
                    <div className="user-details-profile-details-header">
                        <p>PROFILE DETAILS</p>
                        <button className="user-details-profile-edit-btn"
                            onClick={() => setIsEdittingProfile(true)}>Edit</button>
                    </div>

                    <form className="user-details-form">
                        <div className="user-details-profile-label-and-input-div">
                            <label>First Name</label>
                            <div>
                                {isEdittingProfile ? <input type="text"></input> : <p>{firstName}</p>}
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Last Name</label>
                            <div>
                                {isEdittingProfile ? <input type="text"></input> : <p>{lastName}</p>}
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Email</label>
                            <div>
                                {isEdittingProfile ? <input type="email"></input> : <p>{email}</p>}
                            </div>
                            
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Gender</label>
                            <div>
                                {isEdittingProfile ? <input type="text"></input> : <p>{gender}</p>}
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Date of Birth</label>
                            <div>
                                {isEdittingProfile ? <input type="date"></input> : <p>{dob}</p>}
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Phone Number</label>
                            <div>
                                {isEdittingProfile ? <input type="tel"></input> : <p>{phoneNumber}</p>}
                            </div>
                        </div>
                        {
                            isEdittingProfile ? <button className="user-details-save-button">Save</button>
                            :
                            <p className="user-details-bottom-info-text">Feel free to edit your 
                                account information by clicking the edit button.</p>
                        }
                    </form>
                </div>

                <div className="user-details-security-container">
                    {
                        isEdittingSecurity ?
                        <p className="user-details-security-form-header">PASSWORD SETTINGS</p>
                        :
                        <p>SECURITY DETAILS</p>
                    }
                    {
                        isEdittingSecurity ?  
                            <form>
                                <div className="user-details-security-label-and-input-div">
                                    <label>Current Password*</label>
                                    <div className="user-details-security-input-container">
                                        <input type="text"></input>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                    
                                </div>
                                <div className="user-details-security-label-and-input-div">
                                    <label>New Password*</label>
                                    <div className="user-details-security-input-container">
                                        <input type="text"></input>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>
                                <div className="user-details-security-label-and-input-div">
                                    <label>Confirm Password*</label>
                                    <div className="user-details-security-input-container">
                                        <input type="text"></input>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>

                                <button className="user-details-security-save-button">Save</button>
                            </form>
                        
                        :
                        <button className="user-details-edit-security-button"
                            onClick={() => setIsEdittingSecurity(true)}>
                            Change password
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDetails;