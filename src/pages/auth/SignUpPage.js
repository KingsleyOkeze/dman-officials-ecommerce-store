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
    const [dob, setDob] = useState(null);
    const [receiveUpdates, setReceiveUpdates] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({}); // For field-specific errors
    const dateInputRef = useRef(null);

    const countries = countryList.getData();

    // Client-side validation function
    const validateForm = () => {
        const errors = {};
        const currentDate = new Date('2025-09-19'); // Current date as per system

        // First Name and Last Name
        if (!firstName.trim()) {
            errors.firstName = 'First name is required.';
        }
        if (!lastName.trim()) {
            errors.lastName = 'Last name is required.';
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Password
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            errors.password = 'Password must include uppercase, lowercase, and a number.';
        }

        // Confirm Password
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password.';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        // Phone
        if (!phone) {
            errors.phone = 'Phone number is required.';
        } else if (phone.length < 10) {
            errors.phone = 'Phone number must be at least 10 digits.';
        }

        // Country
        if (!country) {
            errors.country = 'Please select a country.';
        }

        // DOB
        if (!dob) {
            errors.dob = 'Date of birth is required.';
        } else {
            const dobDate = new Date(dob);
            if (isNaN(dobDate.getTime()) || dobDate >= currentDate) {
                errors.dob = 'Date of birth must be a valid past date.';
            } else {
                // Calculate age
                let age = currentDate.getFullYear() - dobDate.getFullYear();
                const monthDiff = currentDate.getMonth() - dobDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
                    age--;
                }
                if (age < 13) {
                    errors.dob = 'You must be at least 13 years old to sign up.';
                }
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setValidationErrors({});

        // Client-side validation
        if (!validateForm()) {
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/customer/sign-up', {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password,
                phone,
                country,
                dob, // Date object will be serialized to ISO string
                receiveUpdates,
            }, {
                timeout: 10000 // 10 second timeout to prevent infinite spinning
            });

            setMessage(response.data.message);
            toggleSideDrawer();
            navigate(`/email-sent/${response.data.userId}`);
        } catch (err) {
            console.error('Signup error:', err);
            if (err.code === 'ECONNABORTED' || err.message === 'timeout of 10000ms exceeded') {
                setError('Request timed out. Please try again.');
            } else if (err.response) {
                // Server responded with error status
                setError(err.response.data.error || 'Sign-up failed.');
            } else if (err.request) {
                // No response received
                setError('Network error. Please check your connection and try again.');
            } else {
                // Other errors
                setError('An unexpected error occurred. Please try again.');
            }
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
                    {validationErrors.email && <span className="validation-error">{validationErrors.email}</span>}

                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {validationErrors.password && <span className="validation-error">{validationErrors.password}</span>}

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {validationErrors.confirmPassword && <span className="validation-error">{validationErrors.confirmPassword}</span>}

                    <input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {validationErrors.firstName && <span className="validation-error">{validationErrors.firstName}</span>}

                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    {validationErrors.lastName && <span className="validation-error">{validationErrors.lastName}</span>}

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
                    {validationErrors.phone && <span className="validation-error">{validationErrors.phone}</span>}

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
                    {validationErrors.country && <span className="validation-error">{validationErrors.country}</span>}

                    <div className="date-input-container">
                        <DatePicker
                            selected={dob}
                            onChange={(date) => setDob(date)}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Date of Birth"
                            className="signup-date-picker-input"
                            maxDate={new Date('2025-09-19')} // Prevent future dates
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                        />
                    </div>
                    {validationErrors.dob && <span className="validation-error">{validationErrors.dob}</span>}

                    <button type="submit" disabled={loading}>
                        {loading ? <span className="signup-page-spinner"></span> : 'Sign Up'}
                    </button>
                </form>
                {message && <p className="signup-page-message">{message}</p>}
                {error && <p className="signup-page-error">{error}</p>}
                <p className="sign-up-sign-in-text">
                    Already have an account?
                    <span onClick={() => setShowLogin(true)}>
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
                    onClick={() => setShowLogin(true)}
                >
                    {'< Go back'}
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;