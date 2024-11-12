import '../styles/components-styles/Header.css'
import { FaSistrix } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import logo from '../images/dman-logo.png'
import cartIcon from '../images/cart-icon-image.png';
import { RiMenu5Line } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

function Header () {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showSearchIcon, setShowSearchIcon] = useState(true);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
          console.log('Window width:', window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    return(
       <>
       {windowWidth <= 980 ? 
        <div className="sm-header-container">
            <div className="sm-header-logo" style={{display: showSearchIcon === false ? 'none' : 'block' }}>
                <RiMenu5Line className="sm-header-menu"/>
                <img src={logo} width={24} height={24}/>
            </div>
            <div className="sm-header-search-container" style={{display: showSearchIcon === true ? 'none' : 'block' }}>
                <input type="text" 
                    placeholder="Search product"
                    className="sm-header-search-input">
                </input>  
            </div>
            { showSearchIcon === true ?
                <FaSistrix className="sm-header-search-icon" onClick={() => setShowSearchIcon(false)}/>
                :
                <LiaTimesSolid className="sm-header-cancel-icon" onClick={() => setShowSearchIcon(true)}/>
            }
            <div className="sm-header-account-container">
                <AiOutlineUser className="sm-header-account" onClick={() => navigate("/account-page")}/> 
            </div>
            <div className="sm-header-cart-container">
                <img src={cartIcon} width={24} height={24}  
                    className="sm-header-cart" 
                    onClick={() => navigate("/cart-page")}
                />
            </div>
        </div>
        : 
        <div className="lg-header-container">
            <div className="lg-header-logo">
                    <img src={logo} width={50} height={50}/>
            </div>
            <div className="lg-header-nav-list">
                <ul>
                    <li>Men</li>
                    <li>Accessory</li>
                    <li>Collection</li>
                </ul>
            </div>
            <div className="lg-header-search-container">
                <FaSistrix className="lg-header-search-icon"/>
                <input type="text" 
                    placeholder="Search product"
                    className="lg-header-search-input">
                </input>
                    <button  className="lg-header-search-btn">Go</button>
                </div>
            <div className="lg-header-account" onClick={() => navigate("/account-page")}>
                <AiOutlineUser />   
                <p> Account</p>
            </div>
            <div className="lg-header-cart">
                <img src={cartIcon} width={24} height={24} onClick={() => navigate("/cart-page")}/>
                <p>Cart</p>
            </div>
        </div>
        } 
        </>
    );
}

export default Header;


{/* <div className="header-container">
            <div className="menubar-container">
                <RiMenu5Line className="menubar-icon"/>
            </div>
            <div className="header-logo">
                <img src={logo} width={50} height={50}/>
            </div>
            <div className="header-nav-list">
                <ul>
                    <li>Men</li>
                    <li>Women</li>
                    <li>Accessory</li>
                    <li>Collection</li>
                    <li>Sales</li>
                </ul>
            </div>
            <div className="header-search-container">
                <FaSistrix className="header-search-icon"/>
                <input type="text" 
                    placeholder="Search product"
                    className="header-search-input">
                </input>
                <button  className="header-search-btn">Go</button>
            </div>
            <div className="responsive-search-icon-container">
                <FaSistrix className="responsive-search-icon"/>
            </div>
            <div className="header-account">
              <AiOutlineUser />   
              <p> Account</p>
            </div>
            <div className="header-cart">
                <img src={cartIcon} width={24} height={24}/>
                <p>Cart</p>
            </div>
        </div> */}