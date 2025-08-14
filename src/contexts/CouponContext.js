import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
    const { accessToken, customerId } = useContext(AuthContext); 
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [isValidCoupon, setIsValidCoupon] = useState(false);

    useEffect(() => {
        const storedCouponCode = sessionStorage.getItem('couponCode');
        const storedDiscountAmount = parseFloat(sessionStorage.getItem('discountAmount'));
        const storedIsValidCoupon = sessionStorage.getItem('isValidCoupon') === 'true';

        if (storedCouponCode) {
            setCouponCode(storedCouponCode);
        }
        if (storedDiscountAmount) {
            setDiscountAmount(storedDiscountAmount);
        }
        if (storedIsValidCoupon) {
            setIsValidCoupon(storedIsValidCoupon);
        }
    }, []);

    const applyCoupon = async (code) => {
        try {
            // Call server to validate coupon
            const response = await axios.post('/customer/validate-coupon', { 
                customerId: customerId, 
                couponCode: code.replace(/\s+/g, '') // Removes all whitespace from the string
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.data.isValid) {
                setCouponCode(code);
                setDiscountAmount(response.data.discount); 
                setCouponError('');
                setIsValidCoupon(true);

                // Persist to sessionStorage
                sessionStorage.setItem('couponCode', code);
                sessionStorage.setItem('discountAmount', response.data.discount);
                sessionStorage.setItem('isValidCoupon', 'true');
            } 
            
        } catch (err) {
            // console.error("Error applying coupon:", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response?.data?.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    // console.log("log coupon err", errMessage)
                    setCouponError(errMessage);
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                setCouponError("An Unknown error occurred while validating the coupon!")
            }
            // setCouponError('An error occurred while validating the coupon.', errMessage);
            setIsValidCoupon(false);

            // Clear persisted data
            sessionStorage.removeItem('couponCode');
            sessionStorage.removeItem('discountAmount');
            sessionStorage.setItem('isValidCoupon', 'false');
        }
    };

    
    const removeCoupon = () => {
        setCouponCode('');
        setDiscountAmount(0);
        setCouponError('');
        setIsValidCoupon(false);

        // Clear persisted data
        sessionStorage.removeItem('couponCode');
        sessionStorage.removeItem('discountAmount');
        sessionStorage.setItem('isValidCoupon', 'false');
    };

     // Ensure persisted data is updated on state changes
     useEffect(() => {
        sessionStorage.setItem('couponCode', couponCode);
        sessionStorage.setItem('discountAmount', discountAmount);
        sessionStorage.setItem('isValidCoupon', isValidCoupon.toString());
    }, [couponCode, discountAmount, isValidCoupon]);

    useEffect(() => {
        // if (couponError) {
        //     setTimeout(() => {
        //         setCouponError("")
        //     }, 7000);
        // }
    }, [couponError]);

    
    return (
        <CouponContext.Provider value={{
            couponCode,
            setCouponCode,
            discountAmount,
            couponError,
            isValidCoupon,
            applyCoupon,
            removeCoupon
        }}>
            {children}
        </CouponContext.Provider>
    );
};

