import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext to share login info across customer app
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    // Store access token and customer ID from session storage
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || null);
    const [customerId, setCustomerId] = useState(sessionStorage.getItem('customerId') || null);
    const isRefreshing = useRef(false); // Track if we're refreshing the token
    const failedRequests = useRef([]); // Queue for failed requests

    // Log out user: clear session and redirect to home page
    const handleLogout = async () => {
        try {
            await axios.post('/customer/logout', { customerId }, { withCredentials: true });
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout error:', error.message);
        } finally {
            // Always clear session and redirect
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('customerId');
            setAccessToken(null);
            setCustomerId(null);
            navigate('/');
        }
    };

    // Set up Axios interceptor to catch 401 errors
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response, // Pass successful responses
            async (error) => {
                const originalRequest = error.config;

                // Handle 401 errors (expired token) and not a retry
                if (error.response?.status === 401 && !originalRequest._retry) {
                    console.log('401 error detected, attempting to refresh token');
                    originalRequest._retry = true;

                    // Queue request if refresh is in progress
                    if (isRefreshing.current) {
                        console.log('Refresh in progress, queuing request:', originalRequest.url);
                        try {
                            const newToken = await new Promise((resolve, reject) => {
                                failedRequests.current.push({ config: originalRequest, resolve, reject });
                            });
                            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            console.log('Retrying request with new token:', originalRequest.url);
                            return axios(originalRequest);
                        } catch (err) {
                            console.error('Queued request failed:', err.message);
                            return Promise.reject(err);
                        }
                    }

                    isRefreshing.current = true;
                    try {
                        console.log('Requesting new token from /customer/refresh-token');
                        const response = await axios.post(
                            '/customer/refresh-token',
                            {},
                            { withCredentials: true }
                        );

                        if (response.status !== 200) {
                            console.error('Refresh token request failed with status:', response.status);
                            await handleLogout();
                            failedRequests.current.forEach(({ reject }) => reject(new Error('Refresh failed')));
                            failedRequests.current = [];
                            return Promise.reject(error);
                        }

                        const newAccessToken = response.data.accessToken;
                        const decoded = jwtDecode(newAccessToken);
                        console.log('New access token received:', newAccessToken);
                        sessionStorage.setItem('accessToken', newAccessToken);
                        sessionStorage.setItem('customerId', decoded.userId);
                        setAccessToken(newAccessToken);
                        setCustomerId(decoded.userId);

                        // Retry queued requests
                        failedRequests.current.forEach(({ config, resolve }) => {
                            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            console.log('Retrying queued request:', config.url);
                            resolve(axios(config));
                        });
                        failedRequests.current = [];

                        // Retry original request
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        isRefreshing.current = false;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.error('Refresh token error:', refreshError.message);
                        if (refreshError.response?.status === 401) {
                            console.log('Refresh token expired or invalid, logging out');
                        }
                        await handleLogout();
                        failedRequests.current.forEach(({ reject }) => reject(refreshError));
                        failedRequests.current = [];
                        isRefreshing.current = false;
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error); // Pass other errors
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                customerId,
                setAccessToken,
                setCustomerId,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
