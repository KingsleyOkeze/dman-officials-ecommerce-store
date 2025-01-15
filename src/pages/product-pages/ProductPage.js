import "../../styles/pages-styles/product-pages/ProductPage.css"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { GrBasket } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import cardImage1 from "../../images/cardImage1.png";
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png";
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Recommended from "../../components/Recommended";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";
import { SaveProductContext } from "../../contexts/SaveProductContext";

function ProductPage () {
    const { productId } = useParams();
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext); 
    const { savedProducts, handleSaveProduct, removeFromSavedProduct } = useContext(SaveProductContext);
    const [product, setProduct] = useState({});
    const [currentImageUrl, setCurrentImageUrl] = useState(product?.productImageUrl?.length > 0 ? product.productImageUrl[0] : null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/customer/fetch-product-details/${productId}`);

                if (response.status === 200) {
                    console.log('fetch product details page', response.data)
                    setProduct(response.data.result)
                }
            } catch (err) {
                console.log('err fetch product details page', err)
            }
            
        }
        fetchProductDetails();
    }, []);


    useEffect(() => {
        if (product.productImageUrl && product.productImageUrl.length > 0) {
          setCurrentImageUrl(product.productImageUrl[0]);
        }
    }, [product]);


    const nextImage = () => {
        const imageArray = product.productImageUrl;
        const nextIndex = currentImageIndex + 1;
      
        if (nextIndex >= imageArray.length) {
          // If we're at the last image, go back to the first one
          setCurrentImageIndex(0);
        } else {
          setCurrentImageIndex(nextIndex);
        }
      
        setCurrentImageUrl(imageArray[currentImageIndex]);
      };
      
    const previousImage = () => {
        const imageArray = product.productImageUrl;
        const previousIndex = currentImageIndex - 1;
      
        if (previousIndex < 0) {
          // If we're at the first image, go to the last one
          setCurrentImageIndex(imageArray.length - 1);
        } else {
          setCurrentImageIndex(previousIndex);
        }
      
        setCurrentImageUrl(imageArray[currentImageIndex]);
    };

    return (
        <div className="product-page-container">
            {product && ( 
            <div className="product-page-sub-container">
                <div className="product-page-product-showcase-and-details-and-recommended-container">
                    <div className="product-page-product-showcase-container">
                        <div className="product-page-product-img-and-pagination-container">
                            <div className="product-page-product-img-container">
                                <img src={currentImageUrl} />
                            </div>
                            <div className="product-page-product-img-pagination-container">
                                <IoIosArrowBack 
                                    className="product-page-product-img-pagination-back-arrow-container" 
                                    onClick={nextImage}/>
                                <p 
                                    className="product-page-product-img-pagination-count">
                                        <span>{currentImageIndex + 1}</span>
                                        /
                                        <span>{product.productImageUrl?.length}</span>
                                </p>
                                <IoIosArrowForward 
                                    className="product-page-product-img-pagination-forward-arrow-container" 
                                    onClick={previousImage}/>
                            </div>
                        </div>
                        <div className="product-page-product-overview-container">
                            <div className="product-page-product-category">
                                <p>Women Dress</p>
                                <GoDotFill className="product-page-product-category-status-icon" />
                                <p className="product-page-product-category-status-text">In Stock</p>
                            </div>
                            <p className="product-page-product-name">Women dress name goes here</p>
                            <div className="product-page-product-time-container">
                                <p className="product-page-product-time-title">Time Left:</p>
                                <div className="product-page-product-time-block-container">
                                    <p>16h</p> : <p>45m</p> : <p>47s</p>
                                </div>
                            </div>
                            <div className="product-page-product-price-container">
                                <p className="product-page-product-price-offer">N {product.productOfferPrice}</p>
                                <p className="product-page-product-price">N {product.productOfferPrice}</p>
                            </div>
                            <p className="product-page-product-color-title-text">Color</p>
                            <ul className="product-page-product-color-boxes-container">
                                <li></li>
                                <li></li>
                            </ul>
                            <p className="product-page-product-size-title-text">
                                Size <span>(Size Guide)</span>
                            </p>
                            <ul className="product-page-product-size-container">
                                <li>XS</li>
                                <li>S</li>
                                <li>M</li>
                                <li>L</li>
                                <li>XL</li>
                                <li>XXL</li>
                            </ul>
                            <div className="product-page-product-button-container">
                                <button 
                                    className="product-page-product-add-to-cart-button"
                                    onClick={() => {
                                        addToCart(product._id, 1)
                                    }}>
                                    <GrBasket className="product-page-product-add-to-cart-icon" />
                                    Add to cart
                                </button>
                                <button 
                                    className="product-page-product-save-button"
                                    onClick={() => {
                                        handleSaveProduct(product._id)
                                    }}>
                                    <FaRegHeart className="product-page-product-save-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-page-details-container">
                        <h3>Product details</h3>
                        <p>
                            Experience the ultimate in comfort and style with our premium
                            cotton t-shirt. Soft to the touch and breathable, this tee is
                            perfect for everyday wear. Featuring a classic fit and crew neck
                            design, it's a timeless addition to any wardrobe. Available in a
                            range of colors to suit your unique style. High-quality
                            construction ensures durability and long-lasting wear.
                        </p>
                    </div>
                    <div className="lg-product-page-recommended-component-container">
                        <Recommended />
                    </div>
                </div>
                <div className="product-page-delivery-and-return-container">
                    <div className="product-page-delivery-container">
                        <div className="product-page-delivery-container-header">
                            <div className="product-page-delivery-header-icon-div">
                                <CiDeliveryTruck className="product-page-delivery-header-icon" />
                            </div>
                            <h3>Delivery</h3>
                        </div>
                        <p>
                            Get your order delivered right to your doorstep! We offer fast
                            and reliable shipping options to ensure your package arrives
                            promptly. Our standard delivery timeframe is 3-5 business days,
                            with express options available for urgent orders. Tracking
                            information will be provided via email once your order ships.
                            Please allow additional time for delivery to rural or remote
                            areas.
                        </p>
                    </div>
                    <div className="product-page-return-container">
                        <div className="product-page-return-container-header">
                            <div className="product-page-return-header-icon-div">
                                <IoReturnUpBackOutline className="product-page-return-header-icon" />
                            </div>
                            <h3>Returns</h3>
                        </div>
                        <p>
                            At [Your Store Name], we want to ensure you're completely
                            satisfied with your purchase. If for any reason you're not
                            delighted, you can return it within 30 days of delivery. To be
                            eligible, items must be in their original condition, unworn,
                            and in their original packaging. Please contact our customer
                            service team to obtain a Return Merchandise Authorization (RMA)
                            number. Carefully package the item(s) and ship them back to us.
                            Once received, we'll process your refund or exchange within 5-7
                            business days. Refunds will be issued in the original form of
                            payment. Certain items, like final sale or personalized
                            products, are not eligible for returns. Please note that return
                            shipping costs are the customer's responsibility. If you have
                            any questions, please don't hesitate to contact us.
                        </p>
                    </div>
                </div>
                <div className="sm-product-page-recommended-component-container">
                    <Recommended />
                </div>
            </div>
            )}
        </div>
    );
    
}

export default ProductPage;







{/* <div className="product-page-recommended-section">
                <h3>You may also like</h3>

                <div className="product-page-recommended-container">
                {
                    recommended.map((recommend) => (
                        <div className="product-page-card">
                            <img src={recommend.image} className="product-page-card-img"/>
                            <p className="product-page-card-description">{recommend.name} - {recommend.color}</p>
                            <div className="product-page-card-price-and-heart-container">
                                <p className="product-page-card-price"><b>₦</b> {recommend.price}</p>
                                <p className="product-page-card-heart">
                                    {productIsSaved === true ?
                                        <FaRegHeart 
                                            onClick={() => {
                                                setProductIsSaved(!productIsSaved)
                                            }}
                                        />
                                        : 
                                        <FaHeart 
                                            onClick={() => {
                                                setProductIsSaved(!productIsSaved)
                                            }}
                                        />
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
                </div>   
            </div> */}