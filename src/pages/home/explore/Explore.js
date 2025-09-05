import { useContext, useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/explore-styles/Explore.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

function Explore () {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext); 
    const [exploreProducts, setExploreProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Fetch Explore Products from the API
        const fetchExploreProducts = async () => {
            try {
                const response = await axios.get("/customer/fetch-explore-products?page=0&limit=6");
                if (response.status === 200) {
                    setExploreProducts(response.data.result);
                } 
            } catch (error) {
                setError("An error occurred while fetching products.");
            } finally {
                setLoading(false);
            }
        };

        fetchExploreProducts();
    }, []);


    return (
        <>
            <div className="home-page-explore-and-see-all-btn-container">
                <div className="home-page-explore-header-container">
                    <div className="home-page-explore-header-title-and-icon-container">
                        <div className="home-page-explore-header-bar-icon">
                        </div>
                        <p className="home-page-explore-title-header">Our Product</p>
                    </div>
                    <p className="home-page-explore-sub-header">Explore Our Products</p>
                </div>
                <div className="home-page-explore-see-all-button-container">
                    <button
                        onClick={() => {
                            navigate("/category-page/Explore");
                        }}
                    >
                        See All
                    </button>
                </div>
            </div>

            <div className="home-page-explore-card-container">
                {exploreProducts && exploreProducts.length > 0 ? (
                    exploreProducts.map((exploreItem, id) => (
                        <div key={id} className="home-page-explore-card">
                            <div className="home-page-explore-card-image-container">
                                <img
                                    src={exploreItem.productImageUrl[0]}
                                    className="home-page-explore-card-img"
                                    alt={exploreItem.productName}
                                    onClick={() => {
                                        navigate(`/product-page/${exploreItem._id}`);
                                    }}
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
                                onClick={() => {
                                    // Add to Cart logic
                                    addToCart(exploreItem._id, 1);
                                }}
                                disabled={loadingId === exploreItem._id}
                            >
                                {loadingId === exploreItem._id ? ( // Use loadingId for conditional rendering
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
                    )
                }
            </div>
  
        </>
    )
}

export default Explore;