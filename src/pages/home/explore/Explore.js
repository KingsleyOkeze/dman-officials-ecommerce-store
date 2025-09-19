import { useContext, useEffect, useState } from "react";
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

    const fetchExploreProducts = async (currentLimit) => {
        try {
            const response = await axios.get(`/customer/fetch-explore-products?page=0&limit=${currentLimit}`);
            if (response.status === 200) {
                setExploreProducts(response.data.result);
            }
        } catch (error) {
            setError("An error occurred while fetching products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);
        fetchExploreProducts(initialLimit);

        // Debounced resize handler to refetch only if limit changes
        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit);
                    fetchExploreProducts(newLimit);
                }
            }, 300); // Debounce 300ms
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [limit]); // Refetch on limit change

    if (loading) return <p>Loading explore products...</p>;
    if (error) return <p>Error fetching explore products: {error}</p>;

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
                {exploreProducts && exploreProducts.length > 0 ? (
                    exploreProducts.map((exploreItem, index) => (
                        <div key={index} className="home-page-explore-card">
                            <div className="home-page-explore-card-image-container">
                                <img
                                    src={exploreItem.productImageUrl[0]}
                                    className="home-page-explore-card-img"
                                    alt={exploreItem.productName}
                                    onClick={() => navigate(`/product-page/${exploreItem._id}`)}
                                />
                            </div>
                            <p className="home-page-explore-card-description">
                                {exploreItem.productName} - {exploreItem.productColor}
                            </p>
                            <div className="home-page-explore-card-price-container">
                                <p className="home-page-explore-card-offer-price">
                                    <b>₦</b> {exploreItem.productOfferPrice}
                                </p>
                                <p className="home-page-explore-card-price">
                                    <b>₦</b> {exploreItem.productPrice}
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