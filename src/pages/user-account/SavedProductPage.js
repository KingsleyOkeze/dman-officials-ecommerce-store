import { useContext, useEffect, useState } from "react";
import Recommended from "../../components/Recommended";
import "../../styles/pages-styles/user-account-page-styles/SavedProductPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SaveProductContext } from "../../contexts/SaveProductContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { AlertContext } from "../../contexts/AlertContext";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function SavedProductPage () {
    const navigate = useNavigate();
    const { accessToken, customerId, refreshAccessToken } = useContext(AuthContext); 
    const { customAlert, showAlert } = useContext(AlertContext);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const { 
        savedProducts, 
        setSavedProducts, 
        removeFromSavedProduct,
        fetchSavedProduct,
        totalPages,
        paginationIndex,
        setPaginationIndex  
    } = useContext(SaveProductContext);


    useEffect(() => {
        fetchSavedProduct();
    }, []);

    useEffect(() => {
        fetchSavedProduct();
    }, [paginationIndex]);
      
    const handlePreviousFunction = () => {
        if (paginationIndex > 0) {
          setPaginationIndex(paginationIndex - 1);
        }
    };
      
    const handleNextFunction = () => {
        if (paginationIndex < totalPages) {
          setPaginationIndex(paginationIndex + 1);
        }
    };


    return(
        <div className="saved-product-page-container">
            <div className="saved-product-page-header-container">
                <div className="saved-product-page-header-icon-container"
                    onClick={() => navigate(-1)}
                >
                    <IoMdArrowBack className="saved-product-page-header-icon"/>
                </div>
                <h3>Saved Product</h3>
            </div>
            <div className="saved-product-page-main-content-container">
                <div className="saved-product-card-container">
                    {savedProducts && savedProducts.length > 0 ? ( 
                    savedProducts.map((savedProduct, index) => (
                        <div className="saved-product-card" key={savedProduct._id}>
                            <div className="saved-product-card-img-container">
                                <img src={savedProduct.productRef?.productImageUrl[0]} />
                            </div>
                            <div className="saved-product-description-container">
                                <p className="saved-product-name">{savedProduct.productRef?.productName}</p>
                                <div className="saved-product-size-price-container">
                                    <p className="saved-product-size-text">Size: small</p>
                                    <p className="saved-product-price-text">₦ {savedProduct.productRef?.productOfferPrice}</p>
                                </div>
                            </div>
                            <div className="saved-product-button-container">
                                <div className="saved-product-btn-child">
                                    <button 
                                        className="saved-product-buy-now-button"
                                        style={{
                                            background: savedProduct.productRef?.isDeleted ? '#A0A0A0' : '#000000',
                                            cursor: savedProduct.productRef?.isDeleted ? 'not-allowed' : 'pointer'
                                        }}
                                        disabled={savedProduct.productRef?.isDeleted}
                                        onClick={() => {
                                            if (savedProduct.productRef?.isDeleted) {
                                                showAlert("Error", "Product has been discontinued")
                                            } else {
                                                addToCart(savedProduct.productRef?._id, 1)
                                            }
                                        }}
                                    >
                                        { savedProduct.productRef?.isDeleted ? 'Discontinued' : 'Buy Now' }
                                    </button>
                                </div>
                                <div className="saved-product-btn-child">
                                    <button 
                                        className="saved-product-remove-button"
                                        onClick={() => {
                                            removeFromSavedProduct(savedProduct._id)
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                        <p>No saved product found!</p>
                    )
                    }
                </div>
                <div className="saved-product-bottom-pagination-container">
                    <button
                        className="saved-product-pagination-button pagination-prev"
                        onClick={handlePreviousFunction}
                        disabled={paginationIndex === 0}
                    >
                        <IoIosArrowBack />
                        <span>Previous page</span>
                    </button>
                    {/* <div> */}
                        <span className="saved-product-pagination-status">
                            {paginationIndex + 1} / {totalPages ? totalPages : 0 }
                        </span>
                    {/* </div> */}
                    <button
                        className="saved-product-pagination-button pagination-next"
                        onClick={handleNextFunction}
                        disabled={paginationIndex + 1 === totalPages}
                    >
                        Next page
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default SavedProductPage;