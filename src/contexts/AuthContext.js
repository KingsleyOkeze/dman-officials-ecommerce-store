// AuthContext.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useActivityTracker from '../hooks/useActivityTracker'; // Import the custom hook


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || null);
    const [customerId, setCustomerId] = useState(sessionStorage.getItem('customerId') || null);

    const [sessionDuration, setSessionDuration] = useState(0); // To track session duration

    // Use the custom hook
    const { stopTimer } = useActivityTracker(customerId, accessToken);

    
    const handleLogout = async () => {
        // Stop the timer and get the session duration
        const duration = await stopTimer();

        try {
            const response = await axios.post(
                "/customer/logout",
                { 
                    customerId, 
                    sessionDuration: duration
                },
                { withCredentials: true } // Include credentials for cookies
            );

            if (response.status === 200) {
                console.log('user logged out')
                sessionStorage.removeItem("customerId");
                sessionStorage.removeItem('accessToken');
                setCustomerId(null);
                setAccessToken(null);
                navigate("/");
            }
      
        } catch (err) {
            console.error("Error during logout:", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    // showAlert(status, errMessage)
                } else if (status === 401) {
                    await refreshAccessToken(handleLogout);
                }
            } else {
                // showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };

    const refreshAccessToken = async (retryFunction) => {
        try {
            const response = await axios.post('/customer/refresh-token',
                {},
                { withCredentials: true }
            );
            
            if (response.status !== 200) {  // Check for non-200 status
                console.error("Refresh token request failed:", response.status, response.data);
                handleLogout(); // Logout immediately on refresh failure
                return null; // Or throw an error
            }
          
            console.log('Refresh token response:', response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            sessionStorage.setItem('accessToken', response.data.accessToken); // Store new access token in sessionStorage
            sessionStorage.setItem("customerId", decoded.userId);

            // Update state
            setAccessToken(response.data.accessToken);
            setCustomerId(decoded.userId);

            // Retry the original function if provided
            if (retryFunction && typeof retryFunction === 'function') {
                await retryFunction();
            }

            return response.data.accessToken;

        } catch (error) {
            console.error("Error refreshing token:", error);
            handleLogout(); // Logout the user if token refresh fails
            return null;
        }
    };
    

    return (
        <AuthContext.Provider value={{ 
            accessToken,
            customerId,
            setCustomerId,
            setAccessToken, 
            handleLogout, 
            refreshAccessToken
          }}
        >
            {children}
        </AuthContext.Provider>
    );
};


