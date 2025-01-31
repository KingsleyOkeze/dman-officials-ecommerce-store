import React, { useContext, useState } from 'react';
import axios from 'axios';
import "../../styles/pages-styles/auth-pages-styles/LoginPage.css"
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/dman-logo.png'
import { SideDrawerContext } from '../../contexts/SideDrawerContext';
import SlidingNavList from '../../components/navbar-components/SlidingNavList';
import { AuthContext } from '../../contexts/AuthContext';


const LoginPage = () => {
    const navigate = useNavigate();
    const { setAccessToken, setCustomerId } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { 
        showSideDrawer, 
        setShowSideDrawer, 
        activeComponent, 
        setActiveComponent,
        toggleSideDrawer
    } = useContext(SideDrawerContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/customer/login', { email, password });
            setMessage(response.data.message);
            console.log("login response", response.data)
            // Handle successful login, such as redirecting or storing tokens.
            sessionStorage.setItem("customerId", response.data.userId);
            sessionStorage.setItem("accessToken", response.data.accessToken);
            setCustomerId(response.data.userId);
            setAccessToken(response.data.accessToken);
            toggleSideDrawer(); // Close the sliding sidebar
            navigate("/account");

            console.log("Login Response:", response.data);
            console.log("Access Token Set:", response.data.accessToken);
            console.log("Customer ID Set:", response.data.userId);

        } catch (err) {
            console.log('login 403 err', err);
            if (err.response) {
                if (err.response.status === 403) {
                    navigate(`/email-sent/${err.response?.data?.userId}`)
                } else {
                    setError(err.response?.data?.error || 'Login failed.');
                }     
            }
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
        <div className="login-page-sub-container">
            <div className="login-page-head-container">
                <img src={logo} width={24} height={24}
                    onClick={() => navigate("/")}
                />
                <h2>Sign in</h2>
                <p className="login-page-head-instruction">
                    Welcome back!.
                </p>
                <p className="login-page-head-instruction">
                    Login below to access your account.
                </p>
            </div>
            <form onSubmit={handleLogin}>
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
                <button type="submit" disabled={loading}>
                    {loading ? <span className="login-page-spinner"></span> : 'Sign in'}
                </button>
            </form>
            {message && <p className="login-page-message">{message}</p>}
            {error && <p className="login-page-error">{error}</p>}
            <p
                className="login-forget-password-text"
                onClick={() => {
                    toggleSideDrawer()
                    navigate("/forget-password")
                }}
            >
                Forget your password
            </p>
        </div>
        </div>
    );
};

export default LoginPage;
