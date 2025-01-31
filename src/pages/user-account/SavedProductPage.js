import { useContext, useState } from "react";
import Recommended from "../../components/Recommended";
import "../../styles/pages-styles/user-account-page-styles/SavedProductPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SaveProductContext } from "../../contexts/SaveProductContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { AlertContext } from "../../contexts/AlertContext";
import Alert from "../../components/Alert";

function SavedProductPage () {
    const { accessToken, customerId, refreshAccessToken } = useContext(AuthContext); 
    const { customAlert, showAlert } = useContext(AlertContext);
    const { savedProducts, setSavedProducts, handleSaveProduct, removeFromSavedProduct } = useContext(SaveProductContext);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)


    const handlePreviousFunction = async () => {
        try {
      if (paginationIndex > 0) { 
          const newPaginationIndex = paginationIndex - 1;
          setPaginationIndex(newPaginationIndex);
          const response = await axios.get(
              `/customer/fetch-saved-product?page=${newPaginationIndex}&limit=5`,
              {
                params: {
                    customerId: customerId
                },  
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                }
              }
          );
  
          if (response.status === 200) {
              console.log("fetched data", response.data.result)
              setSavedProducts(response.data.result);
              
          }
      }
          } catch (err) {
              if (err.response) {
              const status = err.response.status;
              const errMessage = err.response.data.error;

              if (status === 400 || status === 403 || status === 404 || status === 500) {
                  showAlert(status, errMessage)
              } else if (status === 401) {
                  refreshAccessToken(handlePreviousFunction);
              }
              } else {
                  showAlert("Error", "An Unknow Error Occured!")
              }
          }
    };

    const handleNextFunction = async () => {
      try {
      if (paginationIndex < totalPages - 1) {
          const newPaginationIndex = paginationIndex + 1;
          setPaginationIndex(newPaginationIndex);
          const response = await axios.get(
              `/customer/fetch-saved-product?page=${newPaginationIndex}&limit=5`,
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
              console.log("fetched data", response.data.result)
              setSavedProducts(response.data.result);
          }
      }
      } catch (err) {
        if (err.response) {
          const status = err.response.status;
          const errMessage = err.response.data.error;

          if (status === 400 || status === 403 || status === 404 || status === 500) {
              showAlert(status, errMessage)
          } else if (status === 401) {
              refreshAccessToken(handlePreviousFunction);
          }
          } else {
          showAlert("Error", "An Unknow Error Occured!")
          }   
      }
      
    };

    // useEffect(() => {
    //   const fetchSavedProduct = async () => {
    //       try {
    //           const response = await axios.post(`/customer/fetch-saved-product?page=${paginationIndex}&limit=5`, {
    //               customerId: customerId
    //           },
    //           {
    //               headers: {
    //                 Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
    //               },
    //           });

    //           if (response.status === 200) {
    //               setSavedProducts(response.data.savedProducts);
    //               setTotalPages(response.data.totalPages)
    //               console.log('save product message', response.data.savedProducts)
    //           }
    //       } catch (err) {
    //           console.log('err fetching save product', err)
    //       }
          
    //   }
    //   fetchSavedProduct();
    // }, [])


    return(
        <div className="saved-product-page-container">
          {customAlert.type ? (<Alert /> ) : ""}
          <h3>Saved Product</h3>
          <div className="saved-product-page-main-content-container">
          <div className="saved-product-card-container">
             {
              savedProducts.map((savedProduct, index) => (
                <div className="saved-product-card">
                  <div className="saved-product-card-img-container">
                    <img src={savedProduct.productRef.productImageUrl} />
                  </div>
                  <div className="saved-product-description-container">
                    <p className="saved-product-name">{savedProduct.productRef.productName}</p>
                    <div className="saved-product-size-price-container">
                      <p>Size: small</p>
                      <p>{savedProduct.productRef.productPrice}</p>
                    </div>
                  </div>
                  <div className="saved-product-button-container">
                    <div className="saved-product-btn-child">
                      <button 
                          className="saved-product-buy-now-button"
                          onClick={() => {
                            addToCart(savedProduct.productRef._id, 1)
                          }}
                          >
                            Buy Now
                      </button>
                    </div>
                    <div className="saved-product-btn-child">
                      <button 
                          className="saved-product-remove-button"
                          onClick={() => {
                            removeFromSavedProduct(savedProduct.productRef._id)
                          }}
                          >
                            Remove
                          </button>
                    </div>
                  </div>
                </div>
              ))
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