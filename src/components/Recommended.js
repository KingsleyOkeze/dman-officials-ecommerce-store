import "../styles/components-styles/Recommended.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Recommended ({ productDetails }) {
    const navigate = useNavigate();
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            if (!productDetails || !productDetails._id) return;
            try {
                const response = await axios.get(`/customer/recommended-product/${productDetails._id}`);
                if (response.status === 200) {
                    console.log(response.data.products)
                    setRecommendedProducts(response.data.products);
                }
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, [productDetails]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return(
        <div className="recommended-container">
            <div className="recommended-container-header">
              <h3>Recommended For You</h3>
              <button
                onClick={() => {
                    navigate(
                    `/category-page/${productDetails.productCategory}/${productDetails.productSubCategory}`
                    );
                }}
                >
                    See All
              </button>
            </div>
            <div className="recommended-card-container">
                {isLoading ? (
                    <p>Loading recommendations...</p>
                    ) : recommendedProducts.length > 0 ? (
                        recommendedProducts.map((item, index) => (
                            <div key={index} className="recommended-card">
                                <div className="recommended-card-img-container">
                                    <img 
                                        src={item?.productImageUrl[0]} 
                                        alt={item?.productName} 
                                        className="recommended-card-img"
                                        onClick={() => {
                                            navigate(`/product-page/${item?._id}`);
                                            scrollToTop();
                                        }}
                                    />
                                </div>
                                <div className="recommended-item-description-container">
                                    <p 
                                        className="recommended-item-name"
                                    >
                                        {item?.productName} 
                                        - 
                                        {
                                            item?.productBrand ? item?.productBrand :
                                            item?.productCategory ? item?.productCategory :
                                            item?.productSubCategory ? item?.productSubCategory :
                                            ""
                                        } 
                                        - 
                                        {item?.productColor[0]} 
                                    </p>
                                </div>
                                <p className="recommended-item-price"><b>₦</b> {item?.productPrice}</p>
                            </div>
                        ))
                    ) : (
                    <p>No recommended products found.</p>
                )}
            </div>
        </div>
    )
}

export default Recommended;