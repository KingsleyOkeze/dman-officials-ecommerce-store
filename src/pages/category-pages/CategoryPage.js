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

function CategoryPage () {
    const { category, subCategory } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [width, setWidth] = useState(window.innerWidth);
    const { customAlert, showAlert } = useContext(AlertContext);
    const { savedProducts, handleSaveProduct, removeFromSavedProduct } = useContext(SaveProductContext);
    const { searchInput, setSearchInput, searchResult } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // loading state
    const [selectedCategory, setSelectedCategory] = useState("");  // For selected category
    const [selectedSubCategory, setSelectedSubCategory] = useState(""); // For selected subcategory
    const [sortBy, setSortBy] = useState("");  // For sorting option

    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)


    const handlePreviousFunction = async () => {
        try {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(
                `/customer/fetch-products?page=${newPaginationIndex}&limit=12`, 
                {
                    params: {
                        category: selectedCategory ? selectedCategory : undefined,
                        subCategory: selectedSubCategory ? selectedSubCategory : undefined,
                        sortBy: sortBy ? sortBy : undefined, // Pass selected sorting option
                        searchInput: searchInput ? searchInput : undefined
                },
            });
    
            if (response.status === 200) {
                console.log("fetched data", response.data.result)
                setItems(response.data.result);
                
            }
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 401 || 
                    status === 403 || 
                    status === 404 || 
                    status === 500
                ) {
                    showAlert("error", errMessage)
                } 
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };

    const handleNextFunction = async () => {
        try {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(
                `/customer/fetch-products?page=${newPaginationIndex}&limit=12`, 
                {
                    params: {
                        category: selectedCategory ? selectedCategory : undefined,
                        subCategory: selectedSubCategory ? selectedSubCategory : undefined,
                        sortBy: sortBy ? sortBy : undefined, // Pass selected sorting option
                        searchInput: searchInput ? searchInput : undefined
                },
            });
        
            if (response.status === 200) {
                console.log("fetched data", response.data.result)
                setItems(response.data.result);
            }
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 403 || 
                    status === 404 || 
                    status === 500 || 
                    status === 401
                ) {
                    showAlert("error", errMessage)
                } 
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
        
    };


    const handleFetchCategoryProducts = async () => {
        console.log('sort by is', sortBy)
        setLoading(true); // Start loading
        try {
            const response = await axios.get(
                `/customer/fetch-products?page=${paginationIndex}&limit=12`, 
                {
                    params: {
                        category: selectedCategory ? selectedCategory : undefined,
                        subCategory: selectedSubCategory ? selectedSubCategory : undefined,
                        sortBy: sortBy ? sortBy : undefined, // Pass selected sorting option
                        searchInput: searchInput ? searchInput : undefined
                },
            });

            if (response.status === 200) {
                console.log('category fetched is', response.data)
                setItems(response.data.result);
                setTotalPages(response.data.totalPages)
                // alert(response.data.totalPages)
            }
        } catch (err) {
            console.log('Error fetching products', err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 403 || 
                    status === 404 || 
                    status === 500
                ) {
                    showAlert("Error", errMessage)
                } 
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    // Optional: Update sortBy or other filters to refetch products
    useEffect(() => {
        handleFetchCategoryProducts();
    }, [selectedCategory, selectedSubCategory, sortBy, paginationIndex]);


    // const handleCategoryChange = (category) => {
    //     setSelectedCategory(category);
    //     setSelectedSubCategory(null); // Reset subcategory when the main category changes
    // };
    
    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };
    

    useEffect(() => {
        setSelectedCategory(category);
        setSelectedSubCategory(subCategory || "");
    }, [category, subCategory]);
      

    // // Fetch the category params holds on load of page
    // useEffect(() => {
    //     handleCategoryChange(category);
    // }, [category]);


    // Fetch products with filters
    // useEffect(() => {
    //     handleFetchCategoryProducts();
    // }, [selectedCategory, sortBy]);  // Re-run when category or sortBy changes


    // When user is searching, sset items to display as search result
    useEffect(() => {
        setItems(searchResult);
    }, [searchInput]);


    // Handle getting current screen size so as to dynamically change
    // the header layout On different screen size
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Determine which options to show based on the URL path.
    let options = [];
    const path = location.pathname;

    if (path.includes('/MensWear')) {
        options = ["TShirt", "Hoodie", "SweatShirt"];
    } else if (path.includes('/FootWear')) {
        options = ["Bullup500"];
    } else {
        options = ["TShirt", "Hoodie", "SweatShirt", "Bullup500"];
    }


    const isProductSaved = (productId) => {
        const result = savedProducts.find((product) => product.productRef?._id === productId);
        return result ? true : false;
    };


    return (
        <div className="category-page-container">
            <div className="category-page-options-list-container">
                <div className="category-page-sub-category-header-and-list-container">
                    <p className="category-page-options-list-header">Category</p>
                    <div className="category-page-sub-category-list-container">
                        {
                            options.map((list, id) => (
                                <div className="category-page-sub-category-list" key={id}>
                                    <input
                                        type="checkbox"
                                        className="category-list-checkbox"
                                        checked={selectedSubCategory === list} // Set checked based on state
                                        onChange={() => handleSubCategoryChange(list)} // Update state on change
                                    />
                                        {list}
                                </div>

                            ))
                        }
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
                                onChange={() =>{
                                    setSortBy("latest")
                                    }}
                            />
                                Latest
                        </li>
                        <li>
                            <input 
                                type="radio" 
                                className="category-list-radio" 
                                name="sortBy" 
                                onChange={() => {
                                    setSortBy("oldest")
                                    }}
                            />
                                Oldest
                        </li>
                    </ul>
                </div>
            </div>

            <div className="category-page-showcase-container">
                <div className="category-page-items-header-container">
                    <h2>{category}:</h2> 
                    <p className="category-page-items-header-extra-details">
                        {width ? <span>All</span> : <span>T shirt - Showing {items.length} products</span>}
                    </p>
                </div>
                <div className="category-page-items-container">
                    {loading ? (
                        <p>Loading products...</p> // Show loading state
                    ) : (
                        items && items.length > 0 ? (
                            items.map((item, id) => (
                                <div className="category-page-card" key={id}>
                                    <div className="category-page-card-image-container">
                                        <img 
                                            src={item.productImageUrl[0]} 
                                            className="category-card-img" 
                                            alt={item.productName} 
                                            onClick={() => {
                                                navigate(`/product-page/${item._id}`)
                                            }}
                                        />
                                    </div>
                                    <p className="category-page-card-item-description">{item.productCategory} - {item.productName}</p>
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
                            <p>No products found in this category.</p> // Handle empty product list
                        )
                    )}
                </div>
                <div className="category-page-bottom-pagination-container">
                    <button
                        className="category-page-pagination-button pagination-prev"
                        onClick={handlePreviousFunction}
                        disabled={paginationIndex === 0}
                    >
                        <IoIosArrowBack />
                        <span>Previous page</span>
                    </button>
                    {/* <div> */}
                        <span className="category-page-pagination-status">
                            {totalPages ? paginationIndex + 1 : 0} / {totalPages ? totalPages : 0}
                        </span>
                    {/* </div> */}
                    <button
                        className="category-page-pagination-button pagination-next"
                        onClick={handleNextFunction}
                        disabled={paginationIndex + 1 === totalPages}
                    >
                        Next page
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CategoryPage;