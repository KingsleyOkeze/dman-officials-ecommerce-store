import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AlertContext } from './AlertContext';

// Create the context
export const SaveProductContext = createContext();

// Create a provider component
export const SaveProductProvider = ({ children }) => {
    const { accessToken, customerId } = useContext(AuthContext); 
    const { showAlert } = useContext(AlertContext);
    const [savedProducts, setSavedProducts] = useState([]);
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)
    const [loadingSelectedProductId, setLoadingSelectedProductId] = useState(null);
    
    const fetchSavedProduct = async () => {
        if (!accessToken && !customerId) {
            return;
        }
        try {
            const response = await axios.get(
                `/customer/fetch-saved-product?page=${paginationIndex}&limit=5`, 
                {
                    params: {
                        customerId: customerId
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                    },
                }
            );

            if (response.status === 200) {
                setSavedProducts(response.data.savedProducts);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            // console.log('err fetching save product', err);
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
             
    }

    useEffect(() => {
        fetchSavedProduct();
    }, [])

    // Function to save a product
    const handleSaveProduct = async (productId) => {
        if (!accessToken && !customerId) {
            showAlert("Error", "You need to login first!");
            setLoadingSelectedProductId(null); // Reset loadingId to null
            return;
        }

        setLoadingSelectedProductId(productId);

        try {
            const response = await axios.post("/customer/save-product", {
                customerId: customerId,
                productId: productId,
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 201) {
                setSavedProducts(response.data.savedProducts);
                showAlert("Success", response.data.message)
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 403 || 
                    status === 404 || 
                    status === 409 || 
                    status === 500
                ) {
                    showAlert("Error", errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            // console.log("err ading to cart ", err)
        } finally {
            setLoadingSelectedProductId(null); // Reset loadingId to null
            // console.log("Loading id is", loadingId)
        }

    };

    // Function to remove an item from the cart
    const removeFromSavedProduct = async (itemId) => {
        if (!accessToken && !customerId) {
            showAlert("Error", "You need to login first!")
            setLoadingSelectedProductId(null); // Reset loadingId to null
            return;
        }

        setLoadingSelectedProductId(itemId); // Set loadingId to the item ID 

        try {
            const response = await axios.post("/customer/remove-from-saved-product", {
                customerId: customerId,
                itemId: itemId,
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                setSavedProducts(response.data.savedProducts);
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
            // console.log("err removing from saved product ", err)
        } finally {
            setLoadingSelectedProductId(null);  // Stop the spinner after the request is complete
        }
      

    }; 


    return (
        <SaveProductContext.Provider value={{ 
            savedProducts,
            setSavedProducts,
            handleSaveProduct, 
            removeFromSavedProduct,
            fetchSavedProduct,
            loadingSelectedProductId,
            totalPages,
            paginationIndex,
            setPaginationIndex
        }}>
            {children}
        </SaveProductContext.Provider>
    );
};
