import { useContext, useEffect, useState, useCallback } from "react";
import "../../../styles/pages-styles/home-pages-styles/flash-sale-styles/FlashSale.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { useQuery } from '@tanstack/react-query'; // This is the magic library that fixes slow loading!

function FlashSale() {
    const navigate = useNavigate();
    const { addToCart, loadingId } = useContext(CartContext); // Get add-to-cart function from context

    // State for countdown timer (days, hours, mins, secs)
    const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // State to control how many products to show based on screen size
    const [limit, setLimit] = useState(6);

    // This function calculates how many product cards fit nicely on the screen
    const calculateLimit = useCallback(() => {
        const width = window.innerWidth;
        if (width < 768) return 4;        // Mobile: show 4 cards
        if (width < 986) return 6;        // Tablet: show 6 cards
        const cols = Math.floor(width / 250); // Desktop: calculate columns
        return Math.min(cols * 2, 20);    // Max 20 cards
    }, []);

    // === REACT QUERY MAGIC STARTS HERE ===
    // useQuery automatically:
    // - Fetches data
    // - Shows loading skeletons
    // - Caches results (so next visit is instant!)
    // - Retries if network fails
    // - Refreshes quietly when user comes back
    const { 
        data: flashSaleProducts = [],   // The actual products (default to empty array if none)
        isLoading: loading,             // True while fetching
        error                           // Any error that happened
    } = useQuery({
        queryKey: ['flashSaleProducts', limit], // Unique key: changes when limit changes (e.g. resize)
        queryFn: async () => {
            // Fetch flash sale products from backend
            const response = await axios.get(`/customer/flash-sale-products?page=0&limit=${limit}`);
            return response.data.result || []; // Return products or empty array
        },
        staleTime: 300000,          // Keep data "fresh" for 5 minutes (300,000 ms)
        retry: 3,                   // If request fails, try again up to 3 times
        refetchOnWindowFocus: true  // Quietly refresh when user returns to tab
    });
    // === END OF REACT QUERY ===

    // Update the limit when user resizes window (mobile → desktop etc.)
    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);

        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit) {
                    setLimit(newLimit); // This triggers React Query to refetch with new limit!
                }
            }, 300); // Wait 300ms after resize stops
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(debounceTimer);
        };
    }, [calculateLimit, limit]);

    // Countdown timer logic: finds the soonest expiring flash sale and counts down
    useEffect(() => {
        if (!flashSaleProducts || flashSaleProducts.length === 0) {
            setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const now = new Date();
        const activeProducts = flashSaleProducts.filter(
            product => new Date(product.timerExpiryDate) > now
        );

        if (activeProducts.length === 0) {
            setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        // Find the product that ends soonest
        const soonestExpiryDate = new Date(
            Math.min(...activeProducts.map(p => new Date(p.timerExpiryDate)))
        );

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

        return () => clearInterval(interval); // Cleanup
    }, [flashSaleProducts]);

    // Skeleton card shown while loading — gives nice shimmer effect
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
            {/* Header with title and countdown timer */}
            <div className="home-page-flash-sale-timer-and-see-all-btn-container">
                <div className="home-page-flash-sale-title-and-timer-container">
                    <div className="home-page-flash-sale-header-title-and-icon-container">
                        <div className="home-page-flash-sale-header-bar-icon"></div>
                        <p className="home-page-flash-sale-title-header">Today</p>
                    </div>
                    <p className="home-page-flash-sale-sub-header">Flash Sales</p>

                    {/* Show timer or loading skeletons */}
                    {loading ? (
                        <div className="home-page-flash-sale-timer-container">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="home-page-flash-sale-time-block skeleton-timer">
                                    <div className="skeleton-timer-text"></div>
                                    <div className="skeleton-timer-label"></div>
                                </div>
                            ))}
                        </div>
                    ) : timer.days > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0 ? (
                        <div className="home-page-flash-sale-timer-container">
                            <div className="home-page-flash-sale-time-block"><p>{String(timer.days).padStart(2, "0")}</p><small>Days</small></div>
                            <div className="home-page-flash-sale-time-block"><p>{String(timer.hours).padStart(2, "0")}</p><small>Hours</small></div>
                            <div className="home-page-flash-sale-time-block"><p>{String(timer.minutes).padStart(2, "0")}</p><small>Mins</small></div>
                            <div className="home-page-flash-sale-time-block"><p>{String(timer.seconds).padStart(2, "0")}</p><small>Secs</small></div>
                        </div>
                    ) : (
                        <p className="no-timer-message">Flash sale has ended. Stay tuned for the next one!</p>
                    )}
                </div>

                {/* See All button */}
                <div className="home-page-flash-sale-see-all-button-container">
                    <button onClick={() => navigate("/category-page/Sale")}>See All</button>
                </div>
            </div>

            {/* Product cards grid */}
            <div className="home-page-flash-sale-card-container">
                {loading ? (
                    // Show skeletons while loading
                    Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)
                ) : error ? (
                    <p className="home-page-flash-sale-error">
                        {error?.message || "Failed to load flash sale products. Please try again."}
                    </p>
                ) : flashSaleProducts.length > 0 ? (
                    // Show real products
                    flashSaleProducts.map((product) => (
                        <div key={product._id} className="home-page-flash-sale-card">
                            <div className="home-page-flash-sale-card-image-container">
                                <img
                                    src={product.productImageUrl?.[0] || '/placeholder-image.jpg'}
                                    className="home-page-flash-sale-card-img"
                                    alt={product.productName}
                                    onClick={() => navigate(`product-page/${product._id}`)}
                                />
                            </div>
                            <p className="home-page-flash-sale-card-description">
                                {product.productName} - {product.productColor?.[0] || 'N/A'}
                            </p>
                            <div className="home-page-flash-sale-card-price-container">
                                <p className="home-page-flash-sale-card-offer-price">₦ {product.productOfferPrice || 'N/A'}</p>
                                <p className="home-page-flash-sale-card-price">₦ {product.productPrice || 'N/A'}</p>
                            </div>
                            <button
                                className="home-page-flash-sale-card-btn"
                                onClick={() => addToCart(product._id, 1)}
                                disabled={loadingId === product._id}
                            >
                                {loadingId === product._id ? <span className="home-page-flash-sale-card-btn-spinner" /> : "Add to Cart"}
                            </button>
                        </div>
                    ))
                ) : (
                    // No products message
                    <div className="home-page-flash-sale-placeholder">
                        <p>No active flash sales right now.</p>
                        <button onClick={() => navigate("/category-page/Explore")}>Shop All Products</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default FlashSale;