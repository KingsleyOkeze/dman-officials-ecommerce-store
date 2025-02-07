import { useEffect, useState } from "react";
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
import axios from "axios";

function SalePage () {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSaleProducts = async () => {
            try {
                const response = await axios.get('/customer/flash-sale-products?page=0&limit=6'); 

                if (response.status === 200) {
                    setSales(response.data.result);
                }
            } catch (error) {
                
            } finally {
                // setLoading(false);
            }
        };

        fetchSaleProducts();
    }, []);
    

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
                {sales && sales.length > 0 ? ( 
                    sales.map((sale, id) => (
                        <div key={sale._id} 
                            className="sale-page-card" 
                            onClick={() => navigate(`/product-page/${sale._id}`)}
                        >
                            <img src={sale.productImageUrl[0]} className="sale-page-card-img" />
                            <p className="sale-page-card-description">{sale.productCategory} - {sale.productName}</p>
                            <div className="sale-page-card-price-container">
                                <p className="sale-page-card-offer-price"><b>₦</b> {sale.productOfferPrice}</p>
                                <p className="sale-page-card-price"><b>₦</b> {sale.productPrice}</p>
                            </div>
                        </div>
                    ))
                    ) : (
                        <p>No product on sale found.</p>
                    )
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