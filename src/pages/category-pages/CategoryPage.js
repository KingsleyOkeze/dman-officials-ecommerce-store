import { useState, useEffect } from 'react';
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

function CategoryPage () {
    const [width, setWidth] = useState(window.innerWidth);
    const [saveItem, setSaveItem] = useState(false);
    const [items, setItems] = useState([
    {
        image: cardImage1,
        category: 'men wears',
        name: 'This is part of dman officials,',
        price: '5000'
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'This is part of dman officials  ',
        price: '5000'
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'This is part of dman officials brand  ',
        price: '5000'
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'This is part of dman officials brand ',
        price: '5000'
    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'This is part of dman officials brand  ',
        price: '5000'
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'This is part of dman officials brand ',
        price: '5000'
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'This is part of dman officials brand ' ,
        price: '5000'
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'This is part of dman officials brand ' ,
        price: '5000'
    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'This is part of dman officials brand ' ,
        price: '5000'
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'This is part of dman officials brand ' ,
        price: '5000'
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'This is part of dman officials brand ' ,
        price: '5000'
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'This is part of dman officials brand',
        price: '5000'
    },
    {
        image: cardImage1,
        category: 'men wears',
        name: 'This is part of dman officials brand  ',
        price: '5000'
    }, 
    {
        image: cardImage2,
        category: 'men wears',
        name: 'This is part of dman officials brand  ',
        price: '5000'
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'This is part of dman officials brand ',
        price: '5000'
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'This is part of dman officials brand  ',
        price: '5000'
    },
    ]);

   
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
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
                            <img src={item.image} className="category-card-img"/>
                            <p className="item-description">{item.category} - {item.name} </p>
                            <div className="item-price-and-save-container">
                                <p className="item-price"><b>₦</b> {item.price}</p>
                                {saveItem === false ? 
                                    <IoHeartOutline className="save-item-icon" onClick={() => setSaveItem(true)}/> 
                                    : 
                                    <IoIosHeart className="save-item-icon" onClick={() => setSaveItem(false)}/>
                                }
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