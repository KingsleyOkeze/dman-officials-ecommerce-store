import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/pages-styles/auth-pages-styles/SignUpPage.css";
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/dman-logo.png'


const SignUpPage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [country, setCountry] = useState('country');
    const [dob, setDob] = useState('');
    const [receiveUpdates, setReceiveUpdates] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('/customer/sign-up', {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                country,
                dob,
                receiveUpdates
            });
            setMessage(response.data.message);
            console.log(response.data.message)
            // Optionally, redirect to a verification page or login page after signup.
            navigate(`/email-sent/${response.data.userId}`)
        } catch (err) {
            console.log("error signing up", err)
            setError(err.response?.data?.error || 'Sign-up failed.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-page-head-container">
                <img src={logo} width={24} height={24}
                     onClick={() => navigate("/")}
                />
                <h2>Register</h2>
                <p className="signup-page-head-instruction">Create your account to access your order history.</p>
                <p className="signup-page-head-instruction">order status, saved address and more.</p>
            </div>
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Phone number (e.g., +1234567890)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <select 
                    name={country} 
                    className="sign-up-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="Nigeria">Nigeria</option>
                    <option value="UK">UK</option>
                </select>
                <input
                    type="date"
                    id='date'
                    // value={dob}
                    onChange={(e) => {
                        console.log(e.target.value); // Check if this logs the selected date
                        setDob(e.target.value);
                    }}
                    required
                />
                <div className="sign-up-bottom-instruction-container">
                    <input 
                    type="checkbox"
                    className="sign-up-checkbox"
                    onChange={() => setReceiveUpdates(!receiveUpdates)}
                    /> 
                    <p>
                        Register for emails to get updates on the latest 
                        new arrivals, Collection and events.
                    </p>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <p className="sign-up-sign-in-text">Already have an account? Sign In</p>
            <p className="sign-up-agreement-text">
                By creating an account, you agree to our 
                <Link>Privacy Policy and Terms of Use</Link>
            </p>
        </div>
    );
};

export default SignUpPage;
