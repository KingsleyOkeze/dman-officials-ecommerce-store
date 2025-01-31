import '../styles/components-styles/Header.css'
import { FaSistrix } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import logo from '../images/dman-logo.png'
import cartIcon from '../images/cart-icon-image.png';
import { RiMenu5Line } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { SideDrawerContext } from '../contexts/SideDrawerContext';
import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { AuthContext } from '../contexts/AuthContext';


function Header () {
    const navigate = useNavigate();
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    const [showMenuIcon, setShowMenuIcon] = useState(true);
    const { accessToken } = useContext(AuthContext);
    const { 
            showSideDrawer, 
            setShowSideDrawer, 
            activeComponent, 
            setActiveComponent,
            toggleSideDrawer
    } = useContext(SideDrawerContext); 
    const { searchInput, setSearchInput, handleSearchInput } = useContext(SearchContext);

    // Top benefit slide effect
    const messages = [
        "Unmissable New Arrival up To 50% Off",
        "Buy One Get One Free on Selected Items",
        "Free Shipping on Orders Above $50",
        "Exclusive Deals for Members Only",
      ];
    
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000); // Change message every 3 seconds
        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);
    

    // const isAuthenticated = localStorage.getItem('accessToken'); // Check if the access token exists

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
            <p 
                key={currentMessageIndex} 
                className="header-benefit-sliding-text"
            >
                {messages[currentMessageIndex]}
            </p>
       </div>
       {windowWidth <= 980 ? 
        <div className="sm-header-container">
            <div 
                className="sm-header-logo" 
                style={{
                    display: showSearchIcon === false ? 'none' : 'block' 
                }}>
                {/* {showMenuIcon ?  */}
                    <RiMenu5Line 
                        className="sm-header-menu"
                        onClick={() => {
                            // setShowMenuIcon(false);
                            toggleSideDrawer();
                            setActiveComponent('mobile-screen-navbar');
                        }
                        }/>
                    {/* : 
                    <FaTimes 
                        className="sm-header-menu"
                        onClick={() => {
                            setShowMenuIcon(true);
                            toggleSideDrawer();
                        }
                    }
                    /> */}
                {/* } */}
                
                <img src={logo} width={24} height={24}
                     onClick={() => navigate("/")}
                />
            </div>
            <div 
                className="sm-header-search-container" 
                style={{
                    display: showSearchIcon === true ? 'none' : 'block' 
                }}>
                <input type="text" 
                    placeholder="Search product"
                    className="sm-header-search-input"
                    onChange={(e) => setSearchInput(e.target.value)}
                >
                </input>  
            </div>
            { showSearchIcon === true ?
                <FaSistrix 
                    className="sm-header-search-icon" 
                    onClick={() => setShowSearchIcon(false)}
                />
                :
                <LiaTimesSolid 
                    className="sm-header-cancel-icon" 
                    onClick={() => setShowSearchIcon(true)}
                />
            }
            <div className="sm-header-account-container"
                onClick={() => {
                    if (accessToken) {
                        console.log('access token exist to go to account', accessToken);
                        console.log("Current Path:", location.pathname);
                        if (location.pathname !== "/account") {
                            console.log("Current Path:", location.pathname);
                            navigate("/account")
                        }
                    } else {
                        toggleSideDrawer();
                        setActiveComponent('account');
                    }
                }}
            >
                <AiOutlineUser className="sm-header-account"/> 
            </div>
            <div className="sm-header-cart-container"
                onClick={() => {
                    toggleSideDrawer();
                    setActiveComponent('cart');
                }}>
                <img src={cartIcon} width={24} height={24}  
                    className="sm-header-cart" 
                />
            </div>
        </div>
        : 
        <div className="lg-header-container" style={{
            // background: location.pathname === "/" ? "rgba(0, 0, 0, 0.5)" : "000000"
            }}>
            <div className="lg-header-logo">
                <img src={logo} width={50} height={50}
                    onClick={() => navigate("/")}
                />
            </div>
           
            <div className="lg-header-search-and-account-and-cart-container">
                <div className="lg-header-search-container">
                    <FaSistrix className="lg-header-search-icon"/>
                    <input 
                        type="text" 
                        placeholder="Search product"
                        className="lg-header-search-input"
                        onChange={(e) => setSearchInput(e.target.value)}
                    >
                    </input>
                    <button 
                        className="lg-header-search-btn"
                        disabled={searchInput.length === 0}
                        onClick={handleSearchInput}
                    >
                        Go
                    </button>
                </div>
                <div className="lg-header-account-and-cart-container">
                    <div className="lg-header-account" 
                        onClick={() => {
                            if (accessToken) {
                                if (location.pathname !== "/account") {
                                navigate("/account")
                                }
                            } else {
                                toggleSideDrawer();
                                setActiveComponent('account');
                            } 
                        }}
                    >
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

















































