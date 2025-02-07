import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AlertContext } from './AlertContext';

// Create the context
export const SaveProductContext = createContext();

// Create a provider component
export const SaveProductProvider = ({ children }) => {
    const { accessToken, customerId, refreshAccessToken } = useContext(AuthContext); 
    const { customAlert, showAlert } = useContext(AlertContext);
    const [savedProducts, setSavedProducts] = useState([]);
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)

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
                console.log('save product message', response.data.savedProducts)
            }
        } catch (err) {
            console.log('err fetching save product', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(fetchSavedProduct);
                }
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
            showAlert("Error", "You need to login first!")
        }

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
                alert("saved product!");
                setSavedProducts(response.data.savedProducts)
            }

        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(() => handleSaveProduct(productId));
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            console.log("err ading to cart ", err)
        }

    };

    // Function to remove an item from the cart
    const removeFromSavedProduct = async (itemId) => {
        if (!accessToken && !customerId) {
            showAlert("Error", "You need to login first!")
        }

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
                } else if (status === 401) {
                    refreshAccessToken(() => removeFromSavedProduct(itemId));
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            console.log("err removing from saved product ", err)
        }
      

    }; 

   

    return (
        <SaveProductContext.Provider value={{ 
            savedProducts,
            setSavedProducts,
            handleSaveProduct, 
            removeFromSavedProduct,
            totalPages,
            paginationIndex,
            setPaginationIndex
        }}>
            {children}
        </SaveProductContext.Provider>
    );
};
