import { useContext, useEffect, useState, useCallback } from "react";
import "../../../styles/pages-styles/home-pages-styles/explore-styles/Explore.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useQuery } from '@tanstack/react-query';

function Explore() {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext);

    const [limit, setLimit] = useState(6);

    const calculateLimit = useCallback(() => {
        const width = window.innerWidth;
        if (width < 768) return 4;
        if (width < 986) return 6;
        const cols = Math.floor(width / 250);
        return Math.min(cols * 2, 20);
    }, []);

    // React Query handles fetching, caching, retrying, loading states
    const {
        data: exploreProducts = [],
        isLoading: loading,
        error
    } = useQuery({
        queryKey: ['exploreProducts', limit],
        queryFn: async () => {
            const response = await axios.get(`/customer/fetch-explore-products?page=0&limit=${limit}`);
            return response.data.result || [];
        },
        staleTime: 300000,
        retry: 3,
        refetchOnWindowFocus: true
    });

    // Adjust number of cards when screen size changes
    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);

        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit);
                }
            }, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(debounceTimer);
        };
    }, [calculateLimit, limit]);

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
                    <button onClick={() => navigate("/category-page/Explore")}>See All</button>
                </div>
            </div>

            <div className="home-page-explore-card-container">
                {loading ? (
                    Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)
                ) : error ? (
                    <p className="home-page-explore-error">
                        {error?.message || "Failed to load products."}
                    </p>
                ) : exploreProducts.length > 0 ? (
                    exploreProducts.map((product) => (
                        <div key={product._id} className="home-page-explore-card">
                            <div className="home-page-explore-card-image-container">
                                <img
                                    src={product.productImageUrl?.[0] || '/placeholder-image.jpg'}
                                    className="home-page-explore-card-img"
                                    alt={product.productName}
                                    onClick={() => navigate(`/product-page/${product._id}`)}
                                />
                            </div>
                            <p className="home-page-explore-card-description">
                                {product.productName} - {product.productColor || 'N/A'}
                            </p>
                            <div className="home-page-explore-card-price-container">
                                <p className="home-page-explore-card-offer-price">₦ {product.productOfferPrice || 'N/A'}</p>
                                <p className="home-page-explore-card-price">₦ {product.productPrice || 'N/A'}</p>
                            </div>
                            <button
                                className="home-page-explore-card-btn"
                                onClick={() => addToCart(product._id, 1)}
                                disabled={loadingId === product._id}
                            >
                                {loadingId === product._id ? <span className="home-page-explore-card-btn-spinner" /> : "Add to Cart"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="home-page-explore-error">No products available in this category.</p>
                )}
            </div>
        </>
    );
}

export default Explore;