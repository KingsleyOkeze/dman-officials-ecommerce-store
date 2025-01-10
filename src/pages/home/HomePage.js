import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/home-pages-styles/HomePage.css"
import hero1 from "../../images/hero1.png";
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import unleash1 from "../../images/unleash1.png";
import unleash2 from "../../images/unleash2.jpg";
import unleash3 from "../../images/unleash3.jpg";
import bottomShowcaseImg from "../../images/bottomShowcaseImg.png";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoCardOutline } from "react-icons/io5";
import homeCategory1 from "../../images/homeCategory1.png";
import homeCategory2 from "../../images/homeCategory2.png";
import homeCategory3 from "../../images/homeCategory3.png";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";

function HomePage () {
    const navigate = useNavigate()
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); 
    const [flashSales, setFlashSales] = useState([{
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 4
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 4
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        color: 'brown',
        price: '5000',
        offerPrice: '4000',
        id: 4
    },
    ]);

    const [exploreProducts, setExploreProducts] = useState([]);

    // const handleAddToCart = async (itemId) => {
    //     let data = localStorage.getItem("customerId");

    //     if (!data) return alert('No user found!');

    //     try {
    //         const response = await axios.post("/customer/add-to-cart", {
    //             customerId: data,
    //             productId: itemId
    //         });

    //         if (response.status === 201) {
    //             alert("added to cart!")
    //         }

    //     } catch (err) {
    //         if (err.response) {
    //             const status = err.response.status;
    //             const errMessage = err.response.data.error;
    //             if (status) {
    //                 alert("err cart", errMessage)

    //             }
    //         } else {
    //             alert("Unknow Error adding to cart!")
    //         }
            
    //     }
        
    // };

    useEffect(() => {
        const fetchExploreProducts = async () => {
            try {
                const response = await axios.get("/customer/fetch-products");

                if (response.status === 200) {
                    console.log('ex', response.data)
                    setExploreProducts(response.data)
                }
            } catch (err) {
                console.log('err fetching explore product', err)
            }
            
        }
        fetchExploreProducts();
    }, []);

    return(
        <div className="home-page-container">
            <div className="home-page-hero-section-container">
                <div className="home-page-hero-section-block-content-container">
                    <div className="home-page-hero-section-block-content-header-container">
                        <h3>Discover</h3> 
                        <h3>and Find Your Own </h3>
                        <h3>Fashion</h3>
                    </div>
                    <p>
                        Explore our curated collection of stylish 
                        clothing and accessory tailored to your
                        unique taste
                    </p>
                    <button
                         className="home-page-hero-section-block-content-btn"
                         >
                            Shop Now
                    </button>
                </div>
                <img src={hero1} className="home-page-hero-section-img" />
            </div>
            <div className="home-page-flat-empty-area">

            </div>
            <div className="home-page-categories-container">
                <div className="home-page-categories-header-title-and-icon-container">
                    <div className="home-page-categories-header-bar-icon">
                    </div>
                    <p>Categories</p>
                </div>
                <p className="home-page-categories-sub-header">Shop by Category</p>
                <div className="home-page-categories-card-container">
                    <div className="home-page-categories-card">
                        <img src={homeCategory1} />
                        <button onClick={() => navigate("/category-page")}>Men Ware</button>
                    </div>
                    <div className="home-page-categories-card">
                        <img src={homeCategory2} />
                        <button>Shoe</button>
                    </div>
                    <div className="home-page-categories-card">
                        <img src={homeCategory3} />
                        <button>Collection</button>
                    </div>
                </div>
                
            </div>
            <div className="home-page-flash-sale-timer-and-see-all-btn-container">
                <div className="home-page-flash-sale-title-and-timer-container">

                    <div className="home-page-flash-sale-header-title-and-icon-container">
                        <div className="home-page-flash-sale-header-bar-icon">
                        </div>
                        <p className="home-page-flash-sale-title-header">Today</p>
                    </div>
                    <p className="home-page-flash-sale-sub-header">Flash Sales</p>

                    <div className="home-page-flash-sale-timer-container">
                        <div className="home-page-flash-sale-time-block">
                            <p>7</p>
                            <small>Days</small>
                        </div>
                        :
                        <div className="home-page-flash-sale-time-block">
                            <p>8</p>
                            <small>Hours</small>
                        </div>
                        :
                        <div className="home-page-flash-sale-time-block">
                            <p>15</p>
                            <small>Mins</small>
                        </div>
                        :
                        <div className="home-page-flash-sale-time-block">
                            <p>12</p>
                            <small>Secs</small>
                        </div>
                    </div>
                </div>
                <div className="home-page-flash-sale-see-all-button-container">
                    <button>See All</button>
                </div>
            </div>
            <div className="home-page-flash-sale-card-container">
                {
                    flashSales.map((flashSale, index) => (
                        <div key={index} className="home-page-flash-sale-card">
                            <img src={flashSale.image} className="home-page-flash-sale-card-img"/>
                            <p className="home-page-flash-sale-card-description">{flashSale.name} - {flashSale.color}</p>
                            <div className="home-page-flash-sale-card-price-container">
                                <p className="home-page-flash-sale-card-offer-price"><b>₦</b> {flashSale.offerPrice}</p>
                                <p className="home-page-flash-sale-card-price"><b>₦</b>{flashSale.price}</p>
                            </div>
                            <button className="home-page-flash-sale-card-btn">Add to Cart</button>
                        </div>
                    ))
                }
            </div>  



            <div className="home-page-best-selling-and-see-all-btn-container">
                <div className="home-page-best-selling-header-container">
                    <div className="home-page-best-selling-header-title-and-icon-container">
                        <div className="home-page-best-selling-header-bar-icon">
                        </div>
                        <p className="home-page-best-selling-title-header">This month</p>
                    </div>
                    <p className="home-page-best-selling-sub-header">Best Selling Product</p>
                </div>
                <div className="home-page-best-selling-see-all-button-container">
                    <button>See All</button>
                </div>
            </div>

            <div className="home-page-best-selling-card-container">
                    {
                        flashSales.map((bestSelling, index) => (
                        <div key={index} className="home-page-best-selling-card">
                            <img src={bestSelling.image} className="home-page-best-selling-card-img"  width={100} height={100}/>
                            <p className="home-page-best-selling-card-description">{bestSelling.name} - {bestSelling.color}</p>
                            <div className="home-page-best-selling-card-price-container">
                                <p className="home-page-best-selling-card-offer-price"><b>₦</b> {bestSelling.offerPrice}</p>
                                <p className="home-page-best-selling-card-price"><b>₦</b>{bestSelling.price}</p>
                            </div>
                            <button className="home-page-best-selling-card-btn">Add to Cart</button>
                        </div>
                        ))
                    }
            </div>  

            <div className="home-page-call-to-action-showcase-area-container">
                <div className="home-page-call-to-action-showcase-area-block-content-container">
                    <p className="home-page-call-to-action-showcase-area-block-content-header">Collection</p>
                    <div className="home-page-call-to-action-showcase-area-block-content-body-text">
                        <p>Enhance Your</p>
                        <p>Fashion Lifestyle</p>
                    </div>
                    <div className="home-page-call-to-action-showcase-timer-container">
                        <div className="home-page-call-to-action-showcase-time-block">
                            <>
                                <p>23</p>
                                <small>Days</small>
                            </>
                        </div>
                        <div className="home-page-call-to-action-showcase-time-block">
                            <>
                                <p>08</p>
                                <small>Hours</small>
                            </>
                        </div>
                        <div className="home-page-call-to-action-showcase-time-block">
                            <>
                                <p>59</p>
                                <small>Mins</small>
                            </>
                        </div>
                        <div className="home-page-call-to-action-showcase-time-block">
                            <>
                                <p>12</p>
                                <small>Secs</small>
                            </>
                        </div>
                    </div>
                    <button 
                        className="home-page-call-to-action-showcase-btn"
                        >
                            Buy Now
                    </button>
                </div>
                <img src={bottomShowcaseImg} 
                    className="home-page-call-to-action-showcase-img"/>
            </div>


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
                    <button>See All</button>
                </div>
            </div>

            <div className="home-page-explore-card-container">
                    {
                        exploreProducts.map((exploreProduct, index) => (
                        <div key={index} className="home-page-explore-card">
                            <img src={exploreProduct.productImageUrl[0]} className="home-page-explore-card-img" width={100} height={100}/>
                            <p className="home-page-explore-card-description">{exploreProduct.productName} - {exploreProduct.productColor}</p>
                            <div className="home-page-explore-card-price-container">
                                <p className="home-page-explore-card-offer-price"><b>₦</b> {exploreProduct.productOfferPrice}</p>
                                <p className="home-page-explore-card-price"><b>₦</b>{exploreProduct.productPrice}</p>
                            </div>
                            <button 
                                className="home-page-explore-card-btn"
                                onClick={() => {
                                    addToCart(exploreProduct._id, 1)
                                }}
                                >
                                    Add to Cart
                            </button>
                        </div>
                        ))
                    }
            </div> 




            <div className="home-page-new-arrival-header-container">
                <div className="home-page-new-arrival-header-title-and-bar-icon-container">
                    <div className="home-page-new-arrival-header-bar-icon"></div>
                    <p className="home-page-new-arrival-header-title">Featured</p>
                </div>
                <p className="home-page-new-arrival-sub-header">New Arrival</p>
            </div>
            
            <div className="home-page-new-arrival-section-container">
                <div className="home-page-new-arrival-first-section-container">
                    <img src={unleash1} className="home-page-new-arrival-section-img"/>
                    <div className="home-page-new-arrival-section-block-content-container">
                        <p className="home-page-new-arrival-section-block-content-head">Men's Collection</p>
                        <p className="home-page-new-arrival-section-block-body-content">
                            This e-commerce website is a user-friendly and responsive 
                            online platform that provides a seamless shopping experience.
                        </p>
                        <button>Shop Now</button>
                    </div> 
                </div>
                <div className="home-page-new-arrival-second-section-container">
                    <img src={unleash2} className="home-page-new-arrival-section-img"/>
                    <div className="home-page-new-arrival-section-block-content-container">
                        <p className="home-page-new-arrival-section-block-content-head">Men's Collection</p>
                        <p className="home-page-new-arrival-section-block-body-content">
                            This e-commerce website is a user-friendly and responsive 
                            online platform that provides a seamless shopping experience.
                        </p>
                        <button>Shop Now</button>
                    </div> 
                </div>
                <div className="home-page-new-arrival-third-section-container">
                    <img src={unleash3} className="home-page-new-arrival-section-img"/>
                    <div className="home-page-new-arrival-section-block-content-container">
                        <p className="home-page-new-arrival-section-block-content-head">Men's Collection</p>
                        <p className="home-page-new-arrival-section-block-body-content">
                            This e-commerce website is a user-friendly and responsive 
                            online platform that provides a seamless shopping experience.
                        </p>
                        <button>Shop Now</button>
                    </div> 
                </div>
            </div>
            

            <div className="home-page-bottom-highlight-container">
                <div className="home-page-bottom-highlight-div">
                    <TbTruckDelivery className="home-page-bottom-highlight-icon"/>
                    <div className="home-page-bottom-child-div">
                        <p className="home-page-bottom-highlight-title" >Free shipping</p>
                        <p className="home-page-bottom-highlight-body-text">Free shipping for order above N5999</p>
                    </div>
                </div>
                <div className="home-page-bottom-highlight-div">
                    <GrMoney className="home-page-bottom-highlight-icon"/>
                    <div className="home-page-bottom-child-div">
                        <p className="home-page-bottom-highlight-title">Money Guarantee</p>
                        <p className="home-page-bottom-highlight-body-text">Free shipping for order above N5999</p>
                    </div>
                </div>
                <div className="home-page-bottom-highlight-div">
                    <BiSupport className="home-page-bottom-highlight-icon"/>
                    <div className="home-page-bottom-child-div">
                        <p className="home-page-bottom-highlight-title">Online Support</p>
                        <p className="home-page-bottom-highlight-body-text">Free shipping for order above N5999</p>
                    </div>
                </div>
                <div className="home-page-bottom-highlight-div">
                    <IoCardOutline className="home-page-bottom-highlight-icon"/>
                    <div className="home-page-bottom-child-div">
                        <p className="home-page-bottom-highlight-title">Flexible payment</p>
                        <p className="home-page-bottom-highlight-body-text">Free shipping for order above N5999</p>
                    </div>
                </div>
            </div>






        </div>
    )
}

export default HomePage;