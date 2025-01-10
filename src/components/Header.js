import '../styles/components-styles/Header.css'
import { FaSistrix } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import logo from '../images/dman-logo.png'
import cartIcon from '../images/cart-icon-image.png';
import { RiMenu5Line } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";


function Header ({ toggleAuthSwitchPage, toggleMobileScreenNavbar, toggleSideDrawer, setActiveComponent }) {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    const [showMenuIcon, setShowMenuIcon] = useState(true);


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
       <div className="header-container">
       <div className="header-benefit-bar-container">
            <p>Unmissable New Arrival up To 50% Off</p>
       </div>
       {windowWidth <= 980 ? 
        <div className="sm-header-container">
            <div className="sm-header-logo" style={{display: showSearchIcon === false ? 'none' : 'block' }}>
                {showMenuIcon ? 
                    <RiMenu5Line 
                        className="sm-header-menu"
                        onClick={() => {
                            setShowMenuIcon(false);
                            toggleMobileScreenNavbar()
                        }
                        }/>
                    : 
                    <FaTimes 
                        className="sm-header-menu"
                        onClick={() => {
                            setShowMenuIcon(true);
                            toggleMobileScreenNavbar();
                        }
                    }
                    />
                }
                
                <img src={logo} width={24} height={24}
                     onClick={() => navigate("/")}
                />
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
                <AiOutlineUser className="sm-header-account" onClick={() => navigate("/account")}/> 
            </div>
            <div className="sm-header-cart-container">
                <img src={cartIcon} width={24} height={24}  
                    className="sm-header-cart" 
                    // onClick={() => navigate("/cart-page")}
                />
            </div>
        </div>
        : 
        <div className="lg-header-container">
            <div className="lg-header-logo">
                <img src={logo} width={50} height={50}
                    onClick={() => navigate("/")}
                />
            </div>
           
            <div className="lg-header-search-and-account-and-cart-container">
                <div className="lg-header-search-container">
                    <FaSistrix className="lg-header-search-icon"/>
                    <input type="text" 
                        placeholder="Search product"
                        className="lg-header-search-input">
                    </input>
                    <button  className="lg-header-search-btn">Go</button>
                </div>
                <div className="lg-header-account-and-cart-container">
                    <div className="lg-header-account" onClick={() => {
                        toggleSideDrawer();
                        setActiveComponent('account');
                    }}>
                        <AiOutlineUser />   
                        <p> Account</p>
                    </div>
                    <div className="lg-header-cart" onClick={() => {
                        toggleSideDrawer();
                        setActiveComponent('cart');
                    }}>
                        <img src={cartIcon} width={24} height={24}/>
                        <p>Cart</p>
                    </div>
                </div>
            </div>
        </div>
        } 
        </div>
    );
}

export default Header;

