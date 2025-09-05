import { useContext, useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/trending-now-styles/TrendingNow.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

function TrendingNow () {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext);
    const [trendingNow, setTrendingNow] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("TrendingNow");  // For selected category
    const [selectedSubCategory, setSelectedSubCategory] = useState(""); // For selected subcategory
    const [sortBy, setSortBy] = useState("");  // For sorting option

    const fetchTrendingNowProducts = async () => {
        try {
            const response = await axios.get("/customer/fetch-trending-now-products?page=0&limit=6", {
                params: {
                    category: selectedCategory ? selectedCategory : undefined,
                    subCategory: selectedSubCategory ? selectedSubCategory : undefined,
                    sortBy: sortBy.toLowerCase(), // Pass selected sorting option
                },
            });

            if (response.status === 200) {
                setTrendingNow(response.data.result);
            }
        } catch (err) {
            // console.log('Error fetching trending now products', err);
        } finally {
        }
    };

    useEffect(() => {
        fetchTrendingNowProducts();
    }, []);

    return (
        <>
            <div className="home-page-trending-now-and-see-all-btn-container">
                <div className="home-page-trending-now-header-container">
                    <div className="home-page-trending-now-header-title-and-icon-container">
                        <div className="home-page-trending-now-header-bar-icon">
                        </div>
                        <p className="home-page-trending-now-title-header">This month</p>
                    </div>
                    <p className="home-page-trending-now-sub-header">Trending Now</p>
                </div>
                <div className="home-page-trending-now-see-all-button-container">
                    <button
                        onClick={() => {
                            navigate("/category-page/TrendingNow");
                        }}
                    >
                        See All
                    </button>
                </div>
            </div>

            <div className="home-page-trending-now-card-container">
                {trendingNow && trendingNow.length > 0 ? (
                    trendingNow.map((trendingNowItem, index) => (
                        <div key={index} className="home-page-trending-now-card">
                            <div className="home-page-trending-now-card-image-container">
                                <img
                                    src={trendingNowItem.productImageUrl[0]} 
                                    className="home-page-trending-now-card-img"
                                    alt={trendingNowItem.productName}
                                    onClick={() => navigate(`product-page/${trendingNowItem._id}`)}
                                />
                            </div>
                            <p className="home-page-trending-now-card-description">
                              {trendingNowItem.productName} - {trendingNowItem.color}
                            </p>
                            <div className="home-page-trending-now-card-price-container">
                              <p className="home-page-trending-now-card-offer-price">
                                  <b>₦</b> {trendingNowItem.productOfferPrice}
                              </p>
                              <p className="home-page-trending-now-card-price">
                                  <b>₦</b> {trendingNowItem.productPrice}
                             </p>
                            </div>
                                <button 
                                    className="home-page-trending-now-card-btn"
                                    onClick={() => addToCart(trendingNowItem._id, 1)}
                                    disabled={loadingId === trendingNowItem._id} // Use loadingId to check against the current item's ID
                                >
                                    {loadingId === trendingNowItem._id ? ( // Use loadingId for conditional rendering
                                        <span className="home-page-trending-now-btn-spinner" />
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </button>
                            </div>
                    ))
                    ) : (
                        <p className="home-page-trending-now-error">
                            No trending products available at the moment.
                        </p>
                    )
                }
            </div>
 
        </>
    )
}

export default TrendingNow;