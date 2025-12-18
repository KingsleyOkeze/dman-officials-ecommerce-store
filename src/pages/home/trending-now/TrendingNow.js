import { useContext, useEffect, useState, useCallback } from "react";
import "../../../styles/pages-styles/home-pages-styles/trending-now-styles/TrendingNow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useQuery } from '@tanstack/react-query'; // Same powerful tool as above

function TrendingNow() {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext);

    // Currently not using filters, but kept in case you add them later
    const [selectedCategory] = useState("TrendingNow");
    const [selectedSubCategory] = useState("");
    const [sortBy] = useState("");

    // How many cards to show based on screen width
    const [limit, setLimit] = useState(6);

    const calculateLimit = useCallback(() => {
        const width = window.innerWidth;
        if (width < 768) return 4;
        if (width < 986) return 6;
        const cols = Math.floor(width / 250);
        return Math.min(cols * 2, 20);
    }, []);

    // React Query fetches trending products
    // It will cache them and retry on failure
    const {
        data: trendingNow = [],
        isLoading: loading,
        error
    } = useQuery({
        queryKey: ['trendingNowProducts', limit, selectedCategory, selectedSubCategory, sortBy],
        queryFn: async () => {
            const response = await axios.get(`/customer/fetch-trending-now-products?page=0&limit=${limit}`, {
                params: {
                    category: selectedCategory || undefined,
                    subCategory: selectedSubCategory || undefined,
                    sortBy: sortBy.toLowerCase() || undefined,
                },
            });
            return response.data.result || [];
        },
        staleTime: 300000,          // Cache for 5 minutes
        retry: 3,                   // Retry failed requests
        refetchOnWindowFocus: true  // Refresh when user comes back
    });

    // Handle window resize → update number of cards shown
    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);

        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit); // Triggers refetch automatically
                }
            }, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(debounceTimer);
        };
    }, [calculateLimit, limit]);

    // Skeleton loader for smooth UX
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
            {/* Section header */}
            <div className="home-page-trending-now-and-see-all-btn-container">
                <div className="home-page-trending-now-header-container">
                    <div className="home-page-trending-now-header-title-and-icon-container">
                        <div className="home-page-trending-now-header-bar-icon"></div>
                        <p className="home-page-trending-now-title-header">This month</p>
                    </div>
                    <p className="home-page-trending-now-sub-header">Trending Now</p>
                </div>
                <div className="home-page-trending-now-see-all-button-container">
                    <button onClick={() => navigate("/category-page/TrendingNow")}>See All</button>
                </div>
            </div>

            {/* Product cards */}
            <div className="home-page-trending-now-card-container">
                {loading ? (
                    Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)
                ) : error ? (
                    <p className="home-page-trending-now-error">
                        {error?.message || "Failed to load trending products."}
                    </p>
                ) : trendingNow.length > 0 ? (
                    trendingNow.map((product) => (
                        <div key={product._id} className="home-page-trending-now-card">
                            <div className="home-page-trending-now-card-image-container">
                                <img
                                    src={product.productImageUrl?.[0] || '/placeholder-image.jpg'}
                                    className="home-page-trending-now-card-img"
                                    alt={product.productName}
                                    onClick={() => navigate(`product-page/${product._id}`)}
                                />
                            </div>
                            <p className="home-page-trending-now-card-description">
                                {product.productName} - {product.color || 'N/A'}
                            </p>
                            <div className="home-page-trending-now-card-price-container">
                                <p className="home-page-trending-now-card-offer-price">₦ {product.productOfferPrice}</p>
                                <p className="home-page-trending-now-card-price">₦ {product.productPrice}</p>
                            </div>
                            <button
                                className="home-page-trending-now-card-btn"
                                onClick={() => addToCart(product._id, 1)}
                                disabled={loadingId === product._id}
                            >
                                {loadingId === product._id ? <span className="home-page-trending-now-btn-spinner" /> : "Add to Cart"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="home-page-trending-now-error">No trending products available at the moment.</p>
                )}
            </div>
        </>
    );
}

export default TrendingNow;