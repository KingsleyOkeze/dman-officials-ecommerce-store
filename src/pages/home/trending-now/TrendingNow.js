import { useContext, useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/trending-now-styles/TrendingNow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

function TrendingNow() {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext);
    const [trendingNow, setTrendingNow] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("TrendingNow");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [limit, setLimit] = useState(6); // Initial default; updated on mount/resize

    const calculateLimit = () => {
        const width = window.innerWidth;
        if (width < 768) {
            return 4; // 2 columns × 2 rows for mobile
        } else if (width < 986) {
            return 6; // 3 columns × 2 rows for tablet
        } else {
            const cols = Math.floor(width / 250); // Approx columns based on min card width
            return Math.min(cols * 2, 20); // ~2 rows, capped at 20 to avoid over-fetching
        }
    };

    const fetchTrendingNowProducts = async (currentLimit) => {
        try {
            const response = await axios.get(`/customer/fetch-trending-now-products?page=0&limit=${currentLimit}`, {
                params: {
                    category: selectedCategory || undefined,
                    subCategory: selectedSubCategory || undefined,
                    sortBy: sortBy.toLowerCase() || undefined,
                },
            });
            if (response.status === 200) {
                setTrendingNow(response.data.result);
            }
        } catch (err) {
            console.error("Error fetching trending now products", err);
        }
    };

    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);
        fetchTrendingNowProducts(initialLimit);

        // Debounced resize handler to refetch only if limit changes
        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit);
                    fetchTrendingNowProducts(newLimit);
                }
            }, 300); // Debounce 300ms
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [selectedCategory, selectedSubCategory, sortBy, limit]); // Refetch on filter or limit change

    return (
        <>
            <div className="home-page-trending-now-and-see-all-btn-container">
                <div className="home-page-trending-now-header-container">
                    <div className="home-page-trending-now-header-title-and-icon-container">
                        <div className="home-page-trending-now-header-bar-icon"></div>
                        <p className="home-page-trending-now-title-header">This month</p>
                    </div>
                    <p className="home-page-trending-now-sub-header">Trending Now</p>
                </div>
                <div className="home-page-trending-now-see-all-button-container">
                    <button onClick={() => navigate("/category-page/TrendingNow")}>
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
                                disabled={loadingId === trendingNowItem._id}
                            >
                                {loadingId === trendingNowItem._id ? (
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
                )}
            </div>
        </>
    );
}

export default TrendingNow;