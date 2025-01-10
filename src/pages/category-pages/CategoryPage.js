import { useState, useEffect, useContext } from 'react';
import '../../styles/pages-styles/category-pages-styles/CategoryPage.css';
import { Link } from "react-router-dom";
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import { IoIosHeart } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SaveProductContext } from '../../contexts/SaveProductContext';
import axios from 'axios';

function CategoryPage () {
    const [width, setWidth] = useState(window.innerWidth);
    const { savedProducts, handleSaveProduct, removeFromSavedProduct } = useContext(SaveProductContext);
    const [items, setItems] = useState([ ]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get("/customer/fetch-products");

                if (response.status === 200) {
                    console.log('ex', response.data)
                    setItems(response.data)
                }
            } catch (err) {
                console.log('err fetching fetchCategoryProducts product', err)
            }
            
        }
        fetchCategoryProducts();
        
    }, []);



   
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Helper function to check if a product is saved
    const isProductSaved = (productId) => {
        // return savedProducts.some((product) => product._id === productId);
        // console.log(savedProducts)
       const result = savedProducts.find((product) => product.productRef._id === productId);
       if (result) {
        return true;
       } else {
        return false;
       }
    };
 
    useEffect(() => {
        console.log('rere', savedProducts.length, savedProducts)
    }, [savedProducts])
    
    return(
        <div className="category-page-container">
            <div className="category-page-options-list-container">
                <>
                    <p className="category-page-options-list-header">Category</p>
                    <ul>
                        <li><input type="checkbox" className="category-list-checkbox"/>T shirt</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>Jacket</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>Top</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>Jeans</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>T shirt</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>Jacket</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>Top</li>
                        <li><input type="checkbox" className="category-list-checkbox"/>Jeans</li>
                    </ul>
                </>
                <div className="category-page-sorted-by-option-container">
                    <p className="category-page-options-list-header">Sorted By</p>
                    <ul>
                        <li><input type="radio" className="category-list-radio"/>Latest</li>
                        <li><input type="radio" className="category-list-radio"/>Oldest</li>
                    </ul>
                </div>
                
            </div>

            <div className="category-page-showcase-container">
                <div className="category-page-items-header">
                    <p>Men wares:</p> {width ? <p>All</p> : <p>T shirt - Showing 10 products</p>}
                </div>
                <div className="category-page-items-container">
                {
                    items.map((item, id) => (
                        <div className="category-page-card" key={id}>
                            <img src={item.productImageUrl[0]} className="category-card-img"/>
                            <p className="item-description">{item.category} - {item.productName} </p>
                            <div className="item-price-and-save-container">
                                <p className="item-price"><b>₦</b> {item.productOfferPrice}</p>
                                {isProductSaved(item._id) === true ? (
                                    <IoIosHeart
                                        className="save-item-icon"
                                        onClick={() => removeFromSavedProduct(item._id)}
                                    />
                                ) : (
                                    <IoHeartOutline
                                        className="save-item-icon"
                                        onClick={() => handleSaveProduct(item._id)}
                                    />
                                )}
                            </div>
                        </div>
                    ))
                }
                </div>
                <div className="category-page-bottom-pagination-container">
                    <div>
                        <IoIosArrowBack />
                        <p>Previous page</p>
                    </div>
                    <div>
                        <p>1/5</p>
                    </div>
                    <div>
                        <p>Next page</p>
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoryPage;