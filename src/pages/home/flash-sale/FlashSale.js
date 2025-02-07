import { useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/flash-sale-styles/FlashSale.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function FlashSale () {
    const navigate = useNavigate();
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchFlashSaleProducts = async () => {
            try {
                const response = await axios.get('/customer/flash-sale-products?page=0&limit=6'); 

                if (response.status === 200) {
                    setFlashSaleProducts(response.data.result);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashSaleProducts();
    }, []);

    useEffect(() => {
        // This line ensures that if there are no flash sale products available 
        // (i.e., the length of flashSaleProducts is zero), the subsequent logic 
        // for calculating the countdown timer does not execute.
        if (!flashSaleProducts || flashSaleProducts.length === 0) return;

        const now = new Date();
        const activeProducts = flashSaleProducts.filter(product => new Date(product.timerExpiryDate) > now);

        if (activeProducts.length === 0) {
            setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const soonestExpiryDate = new Date(Math.min(...activeProducts.map(product => new Date(product.timerExpiryDate))));
        
        const interval = setInterval(() => {
            const distance = soonestExpiryDate - new Date();

            if (distance < 0) {
                clearInterval(interval);
                setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimer({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [flashSaleProducts]);

    if (loading) return <p>Loading flash sale products...</p>;
    if (error) return <p>Error fetching flash sale products: {error}</p>;

    // Return an empty fragment if there are no flash sale products
    if (!flashSaleProducts || flashSaleProducts.length === 0) return <></>;

    return (
        <>
            <div className="home-page-flash-sale-timer-and-see-all-btn-container">
                <div className="home-page-flash-sale-title-and-timer-container">
                    <div className="home-page-flash-sale-header-title-and-icon-container">
                        <div className="home-page-flash-sale-header-bar-icon">
                            {/* Icon here */}
                        </div>
                        <p className="home-page-flash-sale-title-header">Today</p>
                    </div>
                    <p className="home-page-flash-sale-sub-header">Flash Sales</p>

                    {/* Timer for Flash Sales */}
                    {timer.days > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0 ? (
                        <div className="home-page-flash-sale-timer-container">
                            <div className="home-page-flash-sale-time-block">
                                <p>{String(timer.days).padStart(2, "0")}</p>
                                <small>Days</small>
                            </div>
                            <div className="home-page-flash-sale-time-block">
                                <p>{String(timer.hours).padStart(2, "0")}</p>
                                <small>Hours</small>
                            </div>
                            <div className="home-page-flash-sale-time-block">
                                <p>{String(timer.minutes).padStart(2, "0")}</p>
                                <small>Mins</small>
                            </div>
                            <div className="home-page-flash-sale-time-block">
                                <p>{String(timer.seconds).padStart(2, "0")}</p>
                                <small>Secs</small>
                            </div>
                        </div>
                    ) : (
                        <p className="no-timer-message">Flash sale has ended. Stay tuned for the next one!</p>
                    )}
                </div>
                <div className="home-page-flash-sale-see-all-button-container">
                    <button
                        onClick={() => {
                            navigate("/category-page/Sale")
                        }}>See All</button>
                </div>
            </div>

            {/* Flash Sale Products */}
            <div className="home-page-flash-sale-card-container">
                {flashSaleProducts && flashSaleProducts.length > 0 ? (
                    flashSaleProducts.map((flashSale, index) => (
                        <div key={index} className="home-page-flash-sale-card">
                            <div className="home-page-flash-sale-card-image-container">
                                <img
                                    src={flashSale.productImageUrl[0]} // Assuming the first image is the main one
                                    className="home-page-flash-sale-card-img"
                                    alt={flashSale.productName}
                                />
                            </div>
                            <p className="home-page-flash-sale-card-description">
                                {flashSale.productName} - {flashSale.productColor[0]}
                            </p>
                            <div className="home-page-flash-sale-card-price-container">
                                <p className="home-page-flash-sale-card-offer-price">
                                    <b>₦</b> {flashSale.productOfferPrice}
                                </p>
                                <p className="home-page-flash-sale-card-price">
                                    <b>₦</b>{flashSale.productPrice}
                                </p>
                            </div>
                            <button className="home-page-flash-sale-card-btn">Add to Cart</button>
                        </div>
                    ))
                    ) : (
                        <p className="home-page-flash-sale-error">
                            No products available in sale category.
                        </p>
                    )
                }
            </div>
        </>
    );
}

export default FlashSale;




