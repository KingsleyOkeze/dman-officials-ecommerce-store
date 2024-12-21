import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/pages-styles/auth-pages-styles/LoginPage.css"
import { useNavigate } from 'react-router-dom';
import logo from '../../images/dman-logo.png'


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/customer/login', { email, password });
            setMessage(response.data.message);
            // Handle successful login, such as redirecting or storing tokens.
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/account");
        } catch (err) {
            if (err.response.status === 403) {
                navigate(`/email-sent/${err.response?.data?.userId}`)
            } else {
                setError(err.response?.data?.error || 'Login failed.');
            }
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
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
                    {loading ? <span className="spinner"></span> : 'Sign in'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <p className="login-forget-password-text">Forget your password</p>
        </div>
    );
};

export default LoginPage;
