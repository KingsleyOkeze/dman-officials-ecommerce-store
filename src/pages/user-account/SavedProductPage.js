import { useContext, useState } from "react";
import Recommended from "../../components/Recommended";
import "../../styles/pages-styles/user-account-page-styles/SavedProductPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SaveProductContext } from "../../contexts/SaveProductContext";
import { CartContext } from "../../contexts/CartContext";

function SavedProductPage () {
  const { savedProducts, handleSaveProduct, removeFromSavedProduct } = useContext(SaveProductContext);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  // const [savedProducts, setSavedProducts] = useState([
  //   {
  //       image: cardImage1,
  //       name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
  //       color: 'brown',
  //       size: 'small',
  //       price: '5000'
  //   },
  //   {
  //       image: cardImage2,
  //       name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
  //       color: 'brown',
  //       size: 'small',
  //       price: '5000'
  //   },
  //   {
  //       image: cardImage3,
  //       name: 'This is part of dman officials,',
  //       color: 'brown',
  //       size: 'small',
  //       price: '5000'
  //   },
  //   {
  //       image: cardImage4,
  //       name: 'This is part of dman officials,',
  //       color: 'brown',
  //       size: 'small',
  //       price: '5000'
  //   }
  //   ]);

    return(
        <div className="saved-product-page-container">
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
                        // onClick={handlePreviousFunction}
                        // disabled={paginationIndex === 0}
                    >
                        <IoIosArrowBack />
                        <span>Previous page</span>
                    </button>
                    {/* <div> */}
                        <span className="saved-product-pagination-status">
                            {/* {paginationIndex + 1} / {totalPages ? totalPages : 0 } */}
                        </span>
                    {/* </div> */}
                    <button
                        className="saved-product-pagination-button pagination-next"
                        // onClick={handleNextFunction}
                        // disabled={paginationIndex + 1 === totalPages}
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