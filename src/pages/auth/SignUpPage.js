import React, { useContext, useState, useRef } from 'react';
import axios from 'axios';
import "../../styles/pages-styles/auth-pages-styles/SignUpPage.css";
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/dman-logo.png';
import { SideDrawerContext } from '../../contexts/SideDrawerContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'country-list';
import { Helmet } from 'react-helmet-async';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SignUpPage = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { toggleSideDrawer } = useContext(SideDrawerContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [dob, setDob] = useState(null); // Changed initial state to null
    const [receiveUpdates, setReceiveUpdates] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dateInputRef = useRef(null); // This ref is no longer strictly necessary with react-datepicker but kept to show it was part of the original code.

    const countries = countryList.getData();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/customer/sign-up', {
                firstName,
                lastName,
                email,
                password,
                phone,
                country,
                dob,
                receiveUpdates,
            });
            setMessage(response.data.message);
            toggleSideDrawer();
            navigate(`/email-sent/${response.data.userId}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Sign-up failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleDateInputClick = () => {
        if (dateInputRef.current) {
            try {
                dateInputRef.current.showPicker();
            } catch (err) {
                console.warn('showPicker() not supported in this browser:', err);
            }
        }
    };

    return (
        <div className="signup-page">
            <Helmet>
                <title>Sign Up | Dman Officials Store</title>
                <meta
                    name="description"
                    content="Create an account at Dman Officials Store to access order history, saved addresses, and exclusive updates."
                />
            </Helmet>
            <div className="signup-page-sub-container">
                <div className="signup-page-head-container">
                    <img
                        src={logo}
                        width={24}
                        height={24}
                        onClick={() => navigate('/')}
                        alt="D-Man Logo"
                    />
                    <h2>Register</h2>
                    <p className="signup-page-head-instruction">
                        Create your account to access your order history.
                    </p>
                    <p className="signup-page-head-instruction">
                        order status, saved address and more.
                    </p>
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
                    <PhoneInput
                        country={'ng'}
                        value={phone}
                        onChange={setPhone}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                        }}
                        containerStyle={{
                            width: '100%',
                            marginBottom: '10px',
                        }}
                        inputStyle={{
                            width: '100%',
                            background: '#000000',
                        }}
                        dropdownStyle={{
                            background: '#1a1a1a',
                            color: '#ffffff',
                        }}
                    />
                    <select
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="sign-up-select"
                        required
                    >
                        <option value="">Select your country</option>
                        {countries.map((c) => (
                            <option key={c.code} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {/* Replaced the native input with React-DatePicker */}
                    <div className="date-input-container">
                        <DatePicker
                            selected={dob}
                            onChange={(date) => setDob(date)}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Date of Birth"
                            className="signup-date-picker-input"
                        />
                    </div>
                    {/* <div className="sign-up-bottom-instruction-container">
                        <div className="sign-up-checkbox-container">
                            <input
                                type="checkbox"
                                className="sign-up-checkbox"
                                onChange={() => setReceiveUpdates(!receiveUpdates)}
                            />
                        </div>
                        <p>
                            Register for emails to get updates on the latest
                            new arrivals, Collection and events.
                        </p>
                    </div> */}
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="signup-page-spinner"></span> : 'Sign Up'}
                    </button>
                </form>
                {message && <p className="signup-page-message">{message}</p>}
                {error && <p className="signup-page-error">{error}</p>}
                <p className="sign-up-sign-in-text">
                    Already have an account?
                    <span
                        onClick={() => {
                            setShowLogin(true);
                        }}
                    >
                        {' Sign In'}
                    </span>
                </p>
                <p className="sign-up-agreement-text">
                    By creating an account, you agree to our
                    <Link
                        style={{
                            paddingLeft: '5px',
                            paddingRight: '5px',
                            color: 'lightblue',
                        }}
                        onClick={() => toggleSideDrawer()}
                        to="/privacy-policy"
                    >
                        Privacy Policy
                    </Link>
                    and
                    <Link
                        to="/terms-of-use-page"
                        style={{
                            paddingLeft: '5px',
                            color: 'lightblue',
                        }}
                        onClick={() => toggleSideDrawer()}
                    >
                        Terms of Use
                    </Link>
                </p>
                <p
                    className="sign-up-bottom-go-back-text"
                    onClick={() => {
                        setShowLogin(true);  
                    }}
                >
                    {'< Go back'}
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;