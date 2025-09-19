import axios from "axios";
import { createContext, useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "./AlertContext";
import { debounce } from 'lodash';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const { showAlert } = useContext(AlertContext);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [limit, setLimit] = useState(12); // Initial default; dynamic based on screen
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.pathname); // Store previous path for back navigation

    // Calculate dynamic limit based on screen width (industry standard: fill ~2-3 rows without gaps)
    const calculateLimit = () => {
        const width = window.innerWidth;
        if (width < 768) {
            return 8; // Mobile: 2 cols × 4 rows (more for taller search pages)
        } else if (width < 986) {
            return 12; // Tablet: 3 cols × 4 rows
        } else {
            // Desktop: Account for potential sidebar (~250px), ~3 rows, cap at 24 to avoid over-fetch
            const availableWidth = width - 250; // Subtract sidebar if present
            const cols = Math.floor(availableWidth / 250);
            return Math.min(cols * 3, 24);
        }
    };

    // Fetch search results with dynamic limit
    const handleSearchInput = async () => {
        if (searchInput.length > 0) {
            try {
                // Use dynamic limit in API call
                const currentLimit = limit; // Use current state
                const response = await axios.get(
                    `/customer/search-product?searchInput=${searchInput}&page=0&limit=${currentLimit}`
                );

                if (response.status === 200) {
                    setSearchResult(response.data.result);
                    // Navigate to search page if not already there, save previous path
                    if (location.pathname !== "/category-page/Search") {
                        previousPath.current = location.pathname;
                        navigate("/category-page/Search");
                    }
                }
            } catch (err) {
                console.error("Error searching products:", err); // Better logging
                if (err.response) {
                    const status = err.response.status;
                    const errMessage = err.response.data.error || "Search failed";
                    showAlert("Error", errMessage);
                } else {
                    showAlert("Error", "Unknown error occurred while searching!");
                }
            }
        } else {
            // If empty input, navigate back to previous path
            navigate(previousPath.current || "/"); // Fallback to home if no previous
            setSearchResult([]); // Clear results
        }
    };

    const debouncedHandleSearchInput = debounce(handleSearchInput, 500);

    useEffect(() => {
        debouncedHandleSearchInput();
        return () => debouncedHandleSearchInput.cancel();
    }, [searchInput, limit]);

    // Effect: Set initial category/subcategory and dynamic limit on mount/resize
    useEffect(() => {
        const initialLimit = calculateLimit();
        setLimit(initialLimit);

        // Debounced resize handler: Refetch only if limit changes (performance)
        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit && searchInput.length > 0) {
                    // Only refetch if searching (avoid unnecessary calls)
                    setLimit(newLimit);
                    // handleSearchInput will trigger via dependency
                }
            }, 300); // 300ms debounce
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimer);
        };
    }, []); // Run once on mount

    // Expose values to consumers (e.g., CategoryPage uses searchResult)
    return (
        <SearchContext.Provider value={{
            searchInput,
            setSearchInput,
            handleSearchInput, // Manual trigger if needed (e.g., from button)
            searchResult,
            limit, // Expose for debugging/UI if needed
        }}>
            {children}
        </SearchContext.Provider>
    );
};