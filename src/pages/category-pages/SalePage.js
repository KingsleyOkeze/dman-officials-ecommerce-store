import { useState } from "react";
// import "../../styles/pages-styles/category-pages-styles/SalePage.css"
import "../../styles/pages-styles/category-pages-styles/SalePage.css"
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import cardImage5 from "../../images/cardImage5.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function SalePage () {
    const navigate = useNavigate();
    const [sales, setSales] = useState([{
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 4
    },
    {
        image: cardImage5,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',

    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 4
    },
    {
        image: cardImage5,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 4
    },
    {
        image: cardImage5,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 4
    },
    {
        image: cardImage5,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
        id: 4
    },
    {
        image: cardImage5,
        category: 'men wears',
        name: 'jean',
        offerPrice: '4000',
        price: '5000',
    }
    ]);

    return(
        <div className="sale-page-container">
            <div className="sale-page-hero-section-container">
                <div className="sale-page-hero-section-block-content-container">
                    <h2 className="sale-page-hero-section-block-content-head-text">D.MAN</h2>
                    <h2 className="sale-page-hero-section-block-content-sub-head-text">Sales up to 50% off</h2>
                </div>
            </div>
            
            <h2 className="sale-page-body-header"><span>Sale:</span>All</h2>
            <div className="sale-page-body-items-container">
                {
                    sales.map((sale) => (
                        <div key={sale.id} className="sale-page-card" onClick={() => navigate("/category-page")}>
                            <img src={sale.image} className="sale-page-card-img" />
                            <p className="sale-page-card-description">{sale.category} - {sale.name}</p>
                            <div className="sale-page-card-price-container">
                                <p className="sale-page-card-offer-price"><b>₦</b> {sale.offerPrice}</p>
                                <p className="sale-page-card-price"><b>₦</b> {sale.price}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="sale-page-bottom-pagination-container">
                <div>
                    <IoIosArrowBack />
                    <p>Previous page</p>
                </div>
                <div>
                    <p>1/5</p>
                </div>
                <div>
                    <p>Next page</p>
                    <IoIosArrowForward />
                </div>
            </div>
           
        </div>
    )
}

export default SalePage;