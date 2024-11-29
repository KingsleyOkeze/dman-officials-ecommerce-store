import { useState } from "react";
import Recommended from "../../components/Recommended";
import "../../styles/pages-styles/user-account-page-styles/SavedProductPage.css";
import cardImage1 from "../../images/cardImage1.png"
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png"

function SavedProductPage () {
  const [savedProducts, setSavedProducts] = useState([
    {
        image: cardImage1,
        name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
        color: 'brown',
        size: 'small',
        price: '5000'
    },
    {
        image: cardImage2,
        name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
        color: 'brown',
        size: 'small',
        price: '5000'
    },
    {
        image: cardImage3,
        name: 'This is part of dman officials,',
        color: 'brown',
        size: 'small',
        price: '5000'
    },
    {
        image: cardImage4,
        name: 'This is part of dman officials,',
        color: 'brown',
        size: 'small',
        price: '5000'
    }
    ]);
    return(
        <div className="saved-product-page-container">
          <h3>Saved Product</h3>
          <div className="saved-product-card-container">
             {
              savedProducts.map((savedProduct, index) => (
                <div className="saved-product-card">
                  <div className="saved-product-card-img-container">
                    <img src={savedProduct.image} />
                  </div>
                  <div className="saved-product-description-container">
                    <p className="saved-product-name">{savedProduct.name}</p>
                    <div className="saved-product-size-price-container">
                      <p>Size: small</p>
                      <p>{savedProduct.price}</p>
                    </div>
                  </div>
                  <div className="saved-product-button-container">
                    <div className="saved-product-btn-child">
                      <button className="saved-product-buy-now-button">Buy Now</button>
                    </div>
                    <div className="saved-product-btn-child">
                      <button className="saved-product-remove-button">Remove</button>
                    </div>
                  </div>
                </div>
              ))
             }
          </div>
        </div>
    )
}

export default SavedProductPage;