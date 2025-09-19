import { useContext, useEffect, useState, useCallback } from "react";
import "../../../styles/pages-styles/home-pages-styles/flash-sale-styles/FlashSale.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";

function FlashSale() {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext);
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

    const fetchFlashSaleProducts = useCallback(async (currentLimit, signal) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/customer/flash-sale-products?page=0&limit=${currentLimit}`, {
                signal,
            });
            if (response.status === 200) {
                setFlashSaleProducts(response.data.result || []);
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error("Error fetching flash sale products", error);
                setError("An error occurred while fetching flash sale products.");
                setFlashSaleProducts([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);
        const controller = new AbortController();
        fetchFlashSaleProducts(initialLimit, controller.signal);

        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit);
                    fetchFlashSaleProducts(newLimit, controller.signal);
                }
            }, 300);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [fetchFlashSaleProducts, calculateLimit, limit]);

    useEffect(() => {
        if (!flashSaleProducts || flashSaleProducts.length === 0) {
            setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

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

    // Skeleton Card Component
    const SkeletonCard = () => (
        <div className="home-page-flash-sale-card skeleton-card">
            <div className="home-page-flash-sale-card-image-container skeleton-image"></div>
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
            <div className="home-page-flash-sale-timer-and-see-all-btn-container">
                <div className="home-page-flash-sale-title-and-timer-container">
                    <div className="home-page-flash-sale-header-title-and-icon-container">
                        <div className="home-page-flash-sale-header-bar-icon"></div>
                        <p className="home-page-flash-sale-title-header">Today</p>
                    </div>
                    <p className="home-page-flash-sale-sub-header">Flash Sales</p>
                    {loading ? (
                        <div className="home-page-flash-sale-timer-container">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={`timer-skeleton-${index}`} className="home-page-flash-sale-time-block skeleton-timer">
                                    <div className="skeleton-timer-text"></div>
                                    <div className="skeleton-timer-label"></div>
                                </div>
                            ))}
                        </div>
                    ) : timer.days > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0 ? (
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
                    <button onClick={() => navigate("/category-page/Sale")}>
                        See All
                    </button>
                </div>
            </div>

            <div className="home-page-flash-sale-card-container">
                {loading ? (
                    Array.from({ length: limit }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))
                ) : error ? (
                    <p className="home-page-flash-sale-error">{error}</p>
                ) : flashSaleProducts && flashSaleProducts.length > 0 ? (
                    flashSaleProducts.map((flashSale, index) => (
                        <div key={flashSale._id || index} className="home-page-flash-sale-card">
                            <div className="home-page-flash-sale-card-image-container">
                                <img
                                    src={flashSale.productImageUrl?.[0] || '/placeholder-image.jpg'}
                                    className="home-page-flash-sale-card-img"
                                    alt={flashSale.productName || 'Flash Sale Product'}
                                    onClick={() => navigate(`product-page/${flashSale._id}`)}
                                />
                            </div>
                            <p className="home-page-flash-sale-card-description">
                                {flashSale.productName} - {flashSale.productColor?.[0] || 'N/A'}
                            </p>
                            <div className="home-page-flash-sale-card-price-container">
                                <p className="home-page-flash-sale-card-offer-price">
                                    <b>₦</b> {flashSale.productOfferPrice || 'N/A'}
                                </p>
                                <p className="home-page-flash-sale-card-price">
                                    <b>₦</b> {flashSale.productPrice || 'N/A'}
                                </p>
                            </div>
                            <button
                                className="home-page-flash-sale-card-btn"
                                onClick={() => addToCart(flashSale._id, 1)}
                                disabled={loadingId === flashSale._id}
                            >
                                {loadingId === flashSale._id ? (
                                    <span className="home-page-flash-sale-card-btn-spinner" />
                                ) : (
                                    "Add to Cart"
                                )}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="home-page-flash-sale-placeholder">
                        <p>No active flash sales right now.</p>
                        <button onClick={() => navigate("/category-page/Explore")}>
                            Shop All Products
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default FlashSale;