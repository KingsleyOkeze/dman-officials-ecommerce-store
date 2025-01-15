import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { SideDrawerContext } from './SideDrawerContext';

// Create the context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { 
        showSideDrawer, 
        setShowSideDrawer, 
        activeComponent, 
        setActiveComponent,
        toggleSideDrawer
    } = useContext(SideDrawerContext);

    const fetchCart = async () => {
        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/fetch-cart", {
                customerId: data
            });

            if (response.status === 200) {
                setCartItems(response.data.cart);
                console.log('cart message', response.data)
            }
        } catch (err) {
            console.log('err fetching cart', err)
        }
        
    };

    useEffect(() => {
        fetchCart();
    }, [])

    useEffect(() => {
        fetchCart();
    }, [showSideDrawer])

    // Function to add an item to the cart
    const addToCart = async (productId, quantity) => {

        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/add-to-cart", {
                customerId: data,
                productId: productId,
                quantity: quantity
            });

            if (response.status === 201) {
                alert("added to cart!");
                setCartItems(response.data.cart)
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;
                if (status) {
                    alert("err cart", errMessage)

                }
            } else {
                alert("Unknow Error adding to cart!")
            }
            console.log("err ading to cart ", err)
        }

    };

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/remove-from-cart", {
                customerId: data,
                itemId: itemId,
            });

            if (response.status === 200) {
                alert("removed from cart!");
                setCartItems(response.data.cart)
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;
                if (status) {
                    alert("err removing from cart", errMessage)

                }
            } else {
                alert("Unknow Error removing from cart!")
            }
            console.log("err removing from cart ", err)
        }

        // setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = async (itemId, newQuantity) => {
        let data = localStorage.getItem("customerId");

        if (!data || newQuantity < 1) return; // Prevent updating with invalid quantity

        try {
            const response = await axios.post("/customer/update-cart", { // Assuming you have this endpoint
                customerId: data,
                itemId: itemId,
                quantity: newQuantity
            });

            if (response.status === 200) {
                setCartItems((prevItems) =>
                    prevItems.map(item =>
                        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
                    )
                );
            }
        } catch (err) {
            console.error("Error updating quantity", err);
        }
    };

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
