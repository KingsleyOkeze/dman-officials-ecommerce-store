import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/home-pages-styles/HomePage.css"
import hero1 from "../../images/hero1.png";
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
import FlashSale from "./flash-sale/FlashSale"
import TrendingNow from "./trending-now/TrendingNow";
import Explore from "./explore/Explore";

function HomePage () {
    const navigate = useNavigate()
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); 

    return(
        <div className="home-page-container">
            <div className="home-page-hero-section-container">
                <div className="home-page-hero-section-block-content-container">
                    <div className="home-page-hero-section-block-content-header-container">
                        <h3>Discover</h3> 
                        <h3>and Find Your Own Type of style and</h3>
                        <h3>Fashion</h3>
                    </div>
                    <p>
                        Explore our curated collection of stylish 
                        clothing and accessory tailored to your
                        unique taste
                    </p>
                    <button
                         className="home-page-hero-section-block-content-btn"
                         onClick={() => {
                            navigate("/category-page/Explore");
                        }}
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
                        <button 
                            onClick={() => {
                                navigate("/category-page/MensWear")
                            }}
                        >
                            Men Ware
                        </button>
                    </div>
                    <div className="home-page-categories-card">
                        <img src={homeCategory2} />
                        <button
                            onClick={() => {
                                navigate("/category-page/FootWear")
                            }}
                        >
                            Foot Wear
                        </button>
                    </div>
                    <div className="home-page-categories-card">
                        <img src={homeCategory3} />
                        <button>Accessories</button>
                    </div>
                </div>
                
            </div>
             
            {/*Flash Sale */}
            <FlashSale />

            {/*Trending now */}
            <TrendingNow />

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

            {/*Explore product*/}
            <Explore />

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
                        <p className="home-page-new-arrival-section-block-content-head">Accessories</p>
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
                        <p className="home-page-new-arrival-section-block-content-head">Foot Wear</p>
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