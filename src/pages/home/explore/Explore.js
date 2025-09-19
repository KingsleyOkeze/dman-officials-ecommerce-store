import { useContext, useEffect, useState, useCallback } from "react";
import "../../../styles/pages-styles/home-pages-styles/explore-styles/Explore.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

function Explore() {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext);
    const [exploreProducts, setExploreProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(6);

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

    const fetchExploreProducts = useCallback(async (currentLimit, signal) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/customer/fetch-explore-products?page=0&limit=${currentLimit}`, {
                signal,
            });
            if (response.status === 200) {
                setExploreProducts(response.data.result || []);
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error("Error fetching explore products", error);
                setError("An error occurred while fetching products.");
                setExploreProducts([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);
        const controller = new AbortController();
        fetchExploreProducts(initialLimit, controller.signal);

        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit);
                    fetchExploreProducts(newLimit, controller.signal);
                }
            }, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [fetchExploreProducts, calculateLimit, limit]);

    // Skeleton Card Component
    const SkeletonCard = () => (
        <div className="home-page-explore-card skeleton-card">
            <div className="home-page-explore-card-image-container skeleton-image"></div>
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
            <div className="home-page-explore-and-see-all-btn-container">
                <div className="home-page-explore-header-container">
                    <div className="home-page-explore-header-title-and-icon-container">
                        <div className="home-page-explore-header-bar-icon"></div>
                        <p className="home-page-explore-title-header">Our Product</p>
                    </div>
                    <p className="home-page-explore-sub-header">Explore Our Products</p>
                </div>
                <div className="home-page-explore-see-all-button-container">
                    <button onClick={() => navigate("/category-page/Explore")}>
                        See All
                    </button>
                </div>
            </div>

            <div className="home-page-explore-card-container">
                {loading ? (
                    Array.from({ length: limit }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))
                ) : error ? (
                    <p className="home-page-explore-error">{error}</p>
                ) : exploreProducts && exploreProducts.length > 0 ? (
                    exploreProducts.map((exploreItem, index) => (
                        <div key={exploreItem._id || index} className="home-page-explore-card">
                            <div className="home-page-explore-card-image-container">
                                <img
                                    src={exploreItem.productImageUrl?.[0] || '/placeholder-image.jpg'}
                                    className="home-page-explore-card-img"
                                    alt={exploreItem.productName || 'Explore Product'}
                                    onClick={() => navigate(`/product-page/${exploreItem._id}`)}
                                />
                            </div>
                            <p className="home-page-explore-card-description">
                                {exploreItem.productName} - {exploreItem.productColor || 'N/A'}
                            </p>
                            <div className="home-page-explore-card-price-container">
                                <p className="home-page-explore-card-offer-price">
                                    <b>₦</b> {exploreItem.productOfferPrice || 'N/A'}
                                </p>
                                <p className="home-page-explore-card-price">
                                    <b>₦</b> {exploreItem.productPrice || 'N/A'}
                                </p>
                            </div>
                            <button
                                className="home-page-explore-card-btn"
                                onClick={() => addToCart(exploreItem._id, 1)}
                                disabled={loadingId === exploreItem._id}
                            >
                                {loadingId === exploreItem._id ? (
                                    <span className="home-page-explore-card-btn-spinner" />
                                ) : (
                                    "Add to Cart"
                                )}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="home-page-explore-error">
                        No products available in this category.
                    </p>
                )}
            </div>
        </>
    );
}

export default Explore;