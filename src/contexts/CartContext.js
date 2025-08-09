import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { SideDrawerContext } from './SideDrawerContext';
import { AlertContext } from './AlertContext';
import { AuthContext } from './AuthContext';

// Create the context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { accessToken, customerId } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);

    const { 
        showSideDrawer, 
        setShowSideDrawer, 
        activeComponent, 
        setActiveComponent,
        toggleSideDrawer
    } = useContext(SideDrawerContext);
    const [loadingId, setLoadingId] = useState(null);
    const [actionType, setActionType] = useState("");



    const fetchCart = async () => {
        if (!accessToken && !customerId) {
            return;
        }
        try {
            const response = await axios.get("/customer/fetch-cart", {
                params: {
                    customerId: customerId
                },
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                setCartItems(response.data.cart);
                
                console.log('cart message', response.data)
            }
        } catch (err) {
            console.log('err fetching cart', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
        
    };

    useEffect(() => {
        fetchCart();
    }, [])

    useEffect(() => {
        fetchCart();
    }, [showSideDrawer]);

    

    // Function to add an item to the cart
    const addToCart = async (productId, quantity) => {
        if (!accessToken && !customerId) {
            showAlert("Error", "You need to login first!")
        }

        try {
            const response = await axios.post("/customer/add-to-cart", {
                customerId: customerId,
                productId: productId,
                quantity: quantity
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 201) {
                console.log("added to cart!");
                setCartItems(response.data.cart)
                showAlert("Success", response.data.message);
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert("Error", errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            console.log("err adding to cart ", err)
        }

    };

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        if (!accessToken && !customerId) {
            showAlert("Error", "You need to login first!")
        }

        try {
            const response = await axios.post("/customer/remove-from-cart", {
                customerId: customerId,
                itemId: itemId,
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                setCartItems(response.data.cart)
                showAlert("Success", response.data.message);
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert("Error", errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            console.log("err removing from cart ", err)
        }

        // setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = async (itemId, newQuantity) => {
        if (!accessToken && !customerId) {
            showAlert("Error", "You need to login first!")
        }

        if (newQuantity < 1) return; // Prevent updating with invalid quantity

        setLoadingId(itemId);
        try {
            const response = await axios.post("/customer/update-cart", { // Assuming you have this endpoint
                customerId: customerId,
                itemId: itemId,
                quantity: newQuantity
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                // Fetch the full updated cart from backend instead of modifying state manually
                fetchCart();
                showAlert("Success", response.data.message);
                console.log("cartItems after update:", cartItems); // Make sure cartItems are updated.
            }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert("Error", errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            console.error("Error updating quantity", err);

        } finally {
            setLoadingId(null);
            setActionType("");
        }
        
    };

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart , 
            loadingId,
            actionType,
            setActionType
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
