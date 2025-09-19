import { useContext, useEffect, useState, useCallback } from "react";
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
    const [limit, setLimit] = useState(6);
    const [loading, setLoading] = useState(true);

    const calculateLimit = useCallback(() => {
        const width = window.innerWidth;
        if (width < 768) {
            return 4;
        } else if (width < 986) {
            return 6;
        } else {
            const cols = Math.floor(width / 250);
            return Math.min(cols * 2, 20);
        }
    }, []);

    const fetchTrendingNowProducts = useCallback(async (currentLimit, signal) => {
        setLoading(true);
        try {
            const response = await axios.get(`/customer/fetch-trending-now-products?page=0&limit=${currentLimit}`, {
                params: {
                    category: selectedCategory || undefined,
                    subCategory: selectedSubCategory || undefined,
                    sortBy: sortBy.toLowerCase() || undefined,
                },
                signal,
            });
            if (response.status === 200) {
                setTrendingNow(response.data.result || []);
            }
        } catch (err) {
            if (!axios.isCancel(err)) {
                console.error("Error fetching trending now products", err);
                setTrendingNow([]);
            }
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, selectedSubCategory, sortBy]);

    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);
        const controller = new AbortController();
        fetchTrendingNowProducts(initialLimit, controller.signal);

        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit);
                    fetchTrendingNowProducts(newLimit, controller.signal);
                }
            }, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [fetchTrendingNowProducts, calculateLimit, limit]);

    // Skeleton Card Component
    const SkeletonCard = () => (
        <div className="home-page-trending-now-card skeleton-card">
            <div className="home-page-trending-now-card-image-container skeleton-image"></div>
            <div className="skeleton-text-line"></div>
            <div className="skeleton-price-container">
                <div className="skeleton-price"></div>
                <div className="skeleton-price-small"></div>
            </div>
            <div className="skeleton-button"></div>
        </div>
    );

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
                {loading ? (
                    // Render skeleton cards matching the grid limit
                    Array.from({ length: limit }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))
                ) : trendingNow && trendingNow.length > 0 ? (
                    trendingNow.map((trendingNowItem, index) => (
                        <div key={trendingNowItem._id || index} className="home-page-trending-now-card">
                            <div className="home-page-trending-now-card-image-container">
                                <img
                                    src={trendingNowItem.productImageUrl?.[0] || '/placeholder-image.jpg'}
                                    className="home-page-trending-now-card-img"
                                    alt={trendingNowItem.productName || 'Trending Product'}
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