import { useContext, useEffect, useState } from 'react';
import dmanLogo from '../../images/dman-black-logo.png'
import "../../styles/pages-styles/user-account-page-styles/UserDetailsPage.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import Alert from '../../components/Alert';

function UserDetails () {
    const { accessToken, customerId, refreshAccessToken } = useContext(AuthContext); 
    const { customAlert, showAlert } = useContext(AlertContext);
    const [isEdittingProfile, setIsEdittingProfile] = useState(false);
    const [isEdittingSecurity, setIsEdittingSecurity] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFetchCustomerDetails = async () => {
        try {
            const response = await axios.get("/customer/fetch-customer-details", {
                params: {
                    customerId: customerId
                },
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log("customer details", response.data);

                setFirstName(response.data.customer.firstName);
                setLastName(response.data.customer.lastName);
                setEmail(response.data.customer.email);
                setGender(response.data.customer.gender);
                setDob(response.data.customer.dob);
                setPhoneNumber(response.data.customer.phoneNumber);
            }

        } catch (err) {
            console.log("Err fetching customer details", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    await refreshAccessToken(handleFetchCustomerDetails);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }

    useEffect(() => {
        handleFetchCustomerDetails()
    }, [accessToken, customerId]);

    const handleUpdateCustomerDetails = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/customer/update-customer-details", {
                customerId: customerId,
                firstName, 
                lastName, 
                email, 
                gender, 
                dob, 
                phoneNumber
            }, // Request body
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
              },
            });

            if (response.status === 200) {
                console.log("customer details updated", response.data);

                setFirstName(response.data.customer.firstName);
                setLastName(response.data.customer.lastName);
                setEmail(response.data.customer.email);
                setGender(response.data.customer.gender);
                setDob(response.data.customer.dob);
                setPhoneNumber(response.data.customer.phoneNumber);
            }

        } catch (err) {
            console.log("Err fetching customer details", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    await refreshAccessToken(handleUpdateCustomerDetails);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };


    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/customer/update-account-password', {
                customerId: customerId,
                currentPassword,
                newPassword,
                confirmPassword,
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
            alert(response.data.message);
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    await refreshAccessToken(handlePasswordUpdate);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };
    

    return(
        <div className="user-details-page-container">
            {customAlert.type ? (<Alert />) : "" }
            <div className="user-details-header-container">
                <img src={dmanLogo} width={50} height={50}/>
                <h2>Hello {firstName} {lastName}</h2>
            </div>
            <div className="user-details-body-content">
                <div className="user-details-profile-container">
                    <div className="user-details-profile-details-header">
                        <p>PROFILE DETAILS</p>
                        <button className="user-details-profile-edit-btn"
                            onClick={() => setIsEdittingProfile(true)}>Edit</button>
                    </div>

                    <form className="user-details-form" onSubmit={handleUpdateCustomerDetails}>
                        <div className="user-details-profile-label-and-input-div">
                            <label>First Name</label>
                            <div>
                                {
                                    isEdittingProfile ? 
                                        <input type="text"
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value)
                                            }}
                                        /> 
                                    : 
                                    <p>{firstName}</p>
                                }
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Last Name</label>
                            <div>
                                {
                                    isEdittingProfile ? 
                                        <input type="text"
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value)
                                            }}
                                        ></input> 
                                    : 
                                    <p>{lastName}</p>
                                }
                            </div>
                        </div>
                        {/* <div className="user-details-profile-label-and-input-div">
                            <label>Email</label>
                            <div>
                                {
                                    isEdittingProfile ? 
                                        <input type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        /> 
                                    : 
                                    <p>{email}</p>
                                }
                            </div>
                            
                        </div> */}
                        <div className="user-details-profile-label-and-input-div">
                            <label>Gender</label>
                            <div>
                                {
                                    isEdittingProfile ? 
                                        <input type="text"
                                        value={gender}
                                        onChange={(e) => {
                                            setGender(e.target.value)
                                        }}
                                        /> 
                                    : 
                                    <p>{gender}</p>
                                }
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Date of Birth</label>
                            <div>
                                {
                                    isEdittingProfile ? 
                                        <input type="date"
                                            value={new Date(dob).toISOString().split('T')[0]}
                                            onChange={(e) => {
                                                setDob(e.target.value)
                                            }}
                                        /> 
                                    : 
                                    <p>
                                        {new Date(dob).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="user-details-profile-label-and-input-div">
                            <label>Phone Number</label>
                            <div>
                                {
                                    isEdittingProfile ? 
                                        <input type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                setPhoneNumber(e.target.value)
                                            }}/> 
                                    : 
                                    <p>{phoneNumber}</p>
                                }
                            </div>
                        </div>
                        {
                            isEdittingProfile ? <button 
                                className="user-details-save-button"
                                type="submit"
                                >
                                    Save
                                </button>
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
                            <form onSubmit={handlePasswordUpdate}>
                                <div className="user-details-security-label-and-input-div">
                                    <label>Current Password*</label>
                                    <div className="user-details-security-input-container">
                                        <input 
                                            type="text"
                                            value={currentPassword}
                                            onChange={(e) => {
                                                setCurrentPassword(e.target.value)
                                            }}
                                        />
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                    
                                </div>
                                <div className="user-details-security-label-and-input-div">
                                    <label>New Password*</label>
                                    <div className="user-details-security-input-container">
                                        <input 
                                            type="text"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value)
                                            }}
                                        />
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>
                                <div className="user-details-security-label-and-input-div">
                                    <label>Confirm Password*</label>
                                    <div className="user-details-security-input-container">
                                        <input 
                                            type="text"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                            }}
                                        />
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="user-details-security-save-button"
                                
                                >
                                    Save
                                </button>
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