import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the context
export const SaveProductContext = createContext();

// Create a provider component
export const SaveProductProvider = ({ children }) => {
    const [savedProducts, setSavedProducts] = useState([]);

    useEffect(() => {
        const fetchSavedProduct = async () => {
            let data = localStorage.getItem("customerId");

            // if (!data) return alert('No user found!');

            try {
                const response = await axios.post("/customer/fetch-saved-product", {
                    customerId: data
                });

                if (response.status === 200) {
                    setSavedProducts(response.data.savedProducts);
                    console.log('save product message', response.data.savedProducts)
                }
            } catch (err) {
                console.log('err fetching save product', err)
            }
            
        }
        fetchSavedProduct();
    }, [])

    // Function to save a product
    const handleSaveProduct = async (productId) => {

        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/save-product", {
                customerId: data,
                productId: productId,
            });

            if (response.status === 201) {
                alert("saved product!");
                setSavedProducts(response.data.savedProducts)
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
    const removeFromSavedProduct = async (itemId) => {
        let data = localStorage.getItem("customerId");

        // if (!data) return alert('No user found!');

        try {
            const response = await axios.post("/customer/remove-from-saved-product", {
                customerId: data,
                itemId: itemId,
            });

            if (response.status === 200) {
                alert("removed from saved product!");
                setSavedProducts(response.data.savedProducts)
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;
                if (status) {
                    alert("err removing from saved product", errMessage)

                }
            } else {
                alert("Unknow Error removing from saved product!")
            }
            console.log("err removing from saved product ", err)
        }

    };

   

    return (
        <SaveProductContext.Provider value={{ savedProducts, handleSaveProduct, removeFromSavedProduct }}>
            {children}
        </SaveProductContext.Provider>
    );
};
