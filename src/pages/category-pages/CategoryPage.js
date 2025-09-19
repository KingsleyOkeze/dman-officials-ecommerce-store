import { useState, useEffect, useContext } from 'react';
import '../../styles/pages-styles/category-pages-styles/CategoryPage.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SaveProductContext } from '../../contexts/SaveProductContext';
import axios from 'axios';
import { SearchContext } from '../../contexts/SearchContext';
import { AlertContext } from '../../contexts/AlertContext';
import { Helmet } from 'react-helmet-async';


function CategoryPage() {
    const { category: urlCategory, subCategory: urlSubCategory } = useParams();  // Rename to avoid confusion
    const navigate = useNavigate();
    const location = useLocation();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { customAlert, showAlert } = useContext(AlertContext);
    const { savedProducts, handleSaveProduct, removeFromSavedProduct } = useContext(SaveProductContext);
    const { searchInput, searchResult } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(urlCategory || "");  // Initial from params
    const [selectedSubCategory, setSelectedSubCategory] = useState(urlSubCategory || "All");
    const [sortBy, setSortBy] = useState("");
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(12);

    const calculateLimit = () => {
        const width = window.innerWidth;
        if (width < 768) return 8;
        else if (width < 986) return 12;
        else {
            const cols = Math.floor((width - 250) / 250);
            return Math.min(cols * 3, 24);
        }
    };

    const handleFetchCategoryProducts = async (currentLimit, page = paginationIndex) => {
        setLoading(true);
        try {
            // Use urlCategory directly to avoid state timing issue
            console.log('Fetching products for category:', urlCategory, 'subCategory:', selectedSubCategory, 'page:', page, 'limit:', currentLimit);
            const response = await axios.get(
                `/customer/fetch-products?page=${page}&limit=${currentLimit}`,
                {
                    params: {
                        category: urlCategory || undefined,  // Use direct from useParams (sync)
                        subCategory: selectedSubCategory !== "All" ? selectedSubCategory : undefined,
                        sortBy: sortBy || undefined,
                        searchInput: (urlCategory === 'Search' ? searchInput : undefined) || undefined,  // Only send searchInput for search
                    },
                }
            );
            if (response.status === 200) {
                console.log('Fetched items:', response.data.result.length, response.data.result);
                setItems(response.data.result);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            console.error('Error fetching products', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error || "Failed to fetch products";
                if ([400, 401, 403, 404, 500].includes(status)) {
                    showAlert("error", errMessage);
                }
            } else {
                showAlert("Error", "An Unknown Error Occurred!");
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousFunction = async () => {
        if (paginationIndex > 0) {
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            await handleFetchCategoryProducts(limit, newPaginationIndex);
        }
    };

    const handleNextFunction = async () => {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            await handleFetchCategoryProducts(limit, newPaginationIndex);
        }
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setPaginationIndex(0);
        handleFetchCategoryProducts(limit, 0);
    };

    // Handle URL params update (set state, but don't fetch here to avoid timing)
    useEffect(() => {
        console.log('URL params:', { urlCategory, urlSubCategory });
        setSelectedCategory(urlCategory || '');
        setSelectedSubCategory(urlSubCategory || "All");
        setPaginationIndex(0);
        setItems([]); // Clear items on param change
    }, [urlCategory, urlSubCategory]);

    // Fetch for non-search categories (depends on urlCategory to ensure sync)
    useEffect(() => {
        if (urlCategory && urlCategory !== 'Search') {
            const initialLimit = calculateLimit();
            setLimit(initialLimit);
            handleFetchCategoryProducts(initialLimit, 0);
        }
    }, [urlCategory, selectedSubCategory, sortBy]);  // Depend on urlCategory directly

    // For search page: Use searchResult directly, no API fetch (prevents override)
    useEffect(() => {
        if (urlCategory === 'Search' && searchInput.length > 0) {
            console.log('Using searchResult for search page:', searchResult.length);
            setItems(searchResult);
            setLoading(false);  // No loading for searchResult
            setTotalPages(1);  // Assume single page for searchResult (adjust if paginated)
        } else if (urlCategory === 'Search' && searchInput.length === 0) {
            setItems([]);  // Clear if empty search
        }
    }, [urlCategory, searchInput, searchResult]);

    // Handle resize for dynamic limit (only for non-search)
    useEffect(() => {
        let debounceTimer;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const newLimit = calculateLimit();
                if (newLimit !== limit && urlCategory !== 'Search') {
                    setLimit(newLimit);
                    setPaginationIndex(0);
                    handleFetchCategoryProducts(newLimit, 0);
                }
                setScreenWidth(window.innerWidth);
            }, 300);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimer);
        };
    }, [limit, urlCategory]);

    // Category options based on URL
    let options = [];
    const path = location.pathname;
    if (path.includes('/MensWear')) {
        options = ["All", "TShirt", "Hoodie", "SweatShirt"];
    } else if (path.includes('/FootWear')) {
        options = ["All", "Bullup500"];
    } else {
        options = ["All", "TShirt", "Hoodie", "SweatShirt", "Bullup500"];
    }

    const isProductSaved = (productId) => {
        return savedProducts.some((product) => product.productRef?._id === productId);
    };

    const getTitle = () => {
        if (urlCategory === 'search') return `Search: ${searchInput || 'All'} | Dman Officials Store`;
        if (urlCategory && selectedSubCategory !== 'All') return `${urlCategory} - ${selectedSubCategory} | Dman Officials Store`;
        return `${urlCategory || 'Category'} | Dman Officials Store`;
    };

    return (
        <div className="category-page-container">
            <Helmet>
                <title>{getTitle()}</title>
                <meta
                    name="description"
                    content={`Explore ${urlCategory || 'products'} ${selectedSubCategory !== 'All' ? `- ${selectedSubCategory}` : ''} at Dman Officials Store.`}
                />
            </Helmet>
            <div className="category-page-options-list-container">
                <div className="category-page-sub-category-header-and-list-container">
                    <p className="category-page-options-list-header">Category</p>
                    <div className="category-page-sub-category-list-container">
                        {options.map((list, id) => (
                            <div className="category-page-sub-category-list" key={id}>
                                <input
                                    type="checkbox"
                                    className="category-list-checkbox"
                                    checked={selectedSubCategory === list}
                                    onChange={() => handleSubCategoryChange(list)}
                                />
                                <span onClick={() => handleSubCategoryChange(list)}>
                                    {list}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="category-page-sorted-by-option-container">
                    <p className="category-page-options-list-header">Sorted By</p>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                className="category-list-radio"
                                name="sortBy"
                                checked={sortBy === "latest"}
                                onChange={() => setSortBy("latest")}
                            />
                            Latest
                        </li>
                        <li>
                            <input
                                type="radio"
                                className="category-list-radio"
                                name="sortBy"
                                checked={sortBy === "oldest"}
                                onChange={() => setSortBy("oldest")}
                            />
                            Oldest
                        </li>
                    </ul>
                </div>
            </div>

            <div className="category-page-showcase-container">
                <div className="category-page-items-header-container">
                    <h2>{selectedCategory || 'Category'}:</h2>
                    <p className="category-page-items-header-extra-details">
                        {selectedSubCategory !== "All" ? selectedSubCategory : <span>All</span>}
                        <span> - {items.length} products</span>
                    </p>
                </div>
                <div className="category-page-items-container">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : items && items.length > 0 ? (
                        items.map((item, id) => (
                            <div className="category-page-card" key={id}>
                                <div className="category-page-card-image-container">
                                    <img
                                        src={item.productImageUrl[0]}
                                        className="category-card-img"
                                        alt={item.productName}
                                        onClick={() => navigate(`/product-page/${item._id}`)}
                                    />
                                </div>
                                <p className="category-page-card-item-description">
                                    {item.productCategory} - {item.productName}
                                </p>
                                <div className="category-page-card-item-price-and-save-container">
                                    <p className="category-page-card-item-price">
                                        <b>₦</b> {item.productOfferPrice}
                                    </p>
                                    {isProductSaved(item._id) ? (
                                        <IoIosHeart
                                            className="category-page-card-save-item-icon"
                                            onClick={() => removeFromSavedProduct(item._id)}
                                        />
                                    ) : (
                                        <IoHeartOutline
                                            className="category-page-card-save-item-icon"
                                            onClick={() => handleSaveProduct(item._id)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>
                            No products found in {selectedCategory || 'this category'}.{' '}
                            <span
                                style={{ color: '#ff4f4f', cursor: 'pointer' }}
                                onClick={() => navigate('/category-page/MensWear')}
                            >
                                Explore MensWear instead!
                            </span>
                        </p>
                    )}
                </div>
                <div className="category-page-bottom-pagination-container">
                    <button
                        className="category-page-pagination-button pagination-prev"
                        onClick={handlePreviousFunction}
                        disabled={paginationIndex === 0}
                    >
                        <IoIosArrowBack />
                        <span>Previous</span>
                    </button>
                    <span className="category-page-pagination-status">
                        {totalPages ? paginationIndex + 1 : 0} / {totalPages || 0}
                    </span>
                    <button
                        className="category-page-pagination-button pagination-next"
                        onClick={handleNextFunction}
                        disabled={paginationIndex + 1 === totalPages}
                    >
                        <span>Next</span>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;