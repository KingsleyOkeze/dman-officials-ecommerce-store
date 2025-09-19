import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/user-account-page-styles/SavedProductPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SaveProductContext } from "../../contexts/SaveProductContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';


function SavedProductPage () {
    const navigate = useNavigate();
    const { accessToken, customerId } = useContext(AuthContext); 
    const { showAlert } = useContext(AlertContext);
    const { addToCart} = useContext(CartContext);
    const { 
        savedProducts, 
        removeFromSavedProduct,
        fetchSavedProduct,
        totalPages,
        paginationIndex,
        setPaginationIndex  
    } = useContext(SaveProductContext);
   
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

    useEffect(() => {
        fetchSavedProduct();
    }, [accessToken, customerId, paginationIndex]);
      

    if (!savedProducts) {
        <div className="loading-container">
            <Helmet>
                <title>Saved Products | Dman Officials Store</title>
                <meta name="description" content="Loading your saved products at Dman Officials Store." />
            </Helmet>
            <p>Loading...</p>
        </div>
    }

    return(
        <div className="saved-product-page-container">
            <Helmet>
                <title>Saved Products | Dman Officials Store</title>
                <meta
                    name="description"
                    content={`View your ${savedProducts.length} saved product${savedProducts.length !== 1 ? 's' : ''} at Dman Officials Store. Add to cart or manage your wishlist.`}
                />
            </Helmet>
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
                                    <img 
                                        src={savedProduct.productRef?.productImageUrl[0]} 
                                        onClick={() => {
                                            console.log("clicked saved product", savedProduct._id)
                                            navigate(`/product-page/${savedProduct.productRef._id}`)}}
                                    />
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
                                                background: savedProduct?.productRef?.isDeleted ? '#A0A0A0' : '#000000',
                                                cursor: savedProduct?.productRef?.isDeleted ? 'not-allowed' : 'pointer'
                                            }}
                                            disabled={savedProduct?.productRef?.isDeleted}
                                            onClick={() => {
                                                if (savedProduct?.productRef?.isDeleted) {
                                                    showAlert("Error", "Product has been discontinued")
                                                } else {
                                                    addToCart(savedProduct?.productRef?._id, 1)
                                                }
                                            }}
                                        >
                                            { savedProduct?.productRef?.isDeleted ? 'Discontinued' : 'Buy Now' }
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
                    {savedProducts?.length > 0 && (
                        <div className="saved-product-bottom-pagination-container">
                            <button
                                className="saved-product-pagination-button pagination-prev"
                                onClick={handlePreviousFunction}
                                disabled={paginationIndex === 0}
                            >
                                <IoIosArrowBack />
                                <span>Previous</span>
                            </button>
                            <span className="saved-product-pagination-status">
                                { totalPages ? paginationIndex + 1 : 0} / {totalPages ? totalPages : 0 }
                            </span>
                            <button
                                className="saved-product-pagination-button pagination-next"
                                onClick={handleNextFunction}
                                disabled={paginationIndex + 1 === totalPages}
                            >
                                <span>Next</span>
                                <IoIosArrowForward />
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}


export default SavedProductPage;