import { useContext, useRef, useState } from "react";
import "../../styles/components-styles/navbar-components/MobileScreenNavbar.css"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import logo from '../../images/dman-logo.png'
import LoginPage from "../../pages/auth/LoginPage";
import SignUpPage from "../../pages/auth/SignUpPage";
import { LiaTimesSolid } from "react-icons/lia";
import { SideDrawerContext } from "../../contexts/SideDrawerContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


function MobileScreenNavbar() {
    const navigate = useNavigate();
    const { accessToken } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showMenDropDown, setShowMenDropDown] = useState(false);
    const [showAccessoryDropDown, setShowAccessoryDropDown] = useState(false);
    const [showFootwearDropDown, setShowFootwearDropDown] = useState(false);
  
    const { toggleSideDrawer } = useContext(SideDrawerContext);  
    
    const menListRef = useRef(null);
    const accessoryListRef = useRef(null);
    const footwearListRef = useRef(null);
  
    const toggleDropdown = (stateSetter, currentState) => {
      stateSetter(!currentState);
    };
  
    return (
        <div className="mobile-screen-navbar-container">
            {/* Logo and Close Icon */}
            <div className="mobile-screen-navbar-header">
                <img src={logo} alt="D-Man Logo" className="navbar-logo" />
                <LiaTimesSolid
                    className="navbar-close-icon"
                    onClick={() => {
                    setShowLogin(false);
                    setShowSignUp(false);
                    toggleSideDrawer();
                    }}
                />
            </div>
  
            <div className="mobile-nav-scroll-container">
            {/* Men Section */}
            <div className="mobile-screen-navbar-list-div">
                <div
                    className="mobile-screen-navbar-list-head-drop-down"
                    onClick={() => toggleDropdown(setShowMenDropDown, showMenDropDown)}
                >
                    <p>Men</p>
                    {showMenDropDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showMenDropDown && (
                <div ref={menListRef} className="dropdown-list">
                    <p>Tops</p>
                    <ul>
                        <li onClick={() => {
                            toggleSideDrawer()
                            navigate("/category-page/MensWear/TShirt");
                        }}>T-Shirts</li>
                        <li onClick={() => {
                            toggleSideDrawer()
                            navigate("/category-page/MensWear/Hoodie")
                        }}>Hoodies & Sweaters</li>
                        <li onClick={() => {
                            toggleSideDrawer()
                            navigate("/category-page/MensWear/SweatShirt")
                        }}>Jackets</li>
                    </ul>
                    <p>Bottom</p>
                    <ul>
                        <li>Shorts</li>
                        <li>Trousers</li>
                        <li>Pants</li>
                    </ul>
                </div>
            )}
            </div>
  
            {/* Accessories Section */}
            <div className="mobile-screen-navbar-list-div">
                <div
                    className="mobile-screen-navbar-list-head-drop-down"
                    onClick={() =>
                    toggleDropdown(setShowAccessoryDropDown, showAccessoryDropDown)
                    }
                >
                    <p>Accessories</p>
                    {showAccessoryDropDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showAccessoryDropDown && (
                <div ref={accessoryListRef} className="dropdown-list">
                    <ul>
                        <li>Shoes</li>
                        <li>Hats</li>
                        <li>Watches</li>
                    </ul>
                </div>
                )}
            </div>
  
            {/* Footwear Section */}
            <div className="mobile-screen-navbar-list-div">
                <div
                    className="mobile-screen-navbar-list-head-drop-down"
                    onClick={() =>
                        toggleDropdown(setShowFootwearDropDown, showFootwearDropDown)
                    }
                >
                    <p>Footwear</p>
                    {showFootwearDropDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showFootwearDropDown && (
                <div ref={footwearListRef} className="dropdown-list">
                    <ul>
                        <li>Sneakers</li>
                        <li>Boots</li>
                        <li>Slippers</li>
                    </ul>
                </div>
                )}
            </div>

            {/* Footer Links */}
            <div className="navbar-footer">
                <p>
                    <span onClick={() => setShowLogin(true)}>
                        {!accessToken ? 'Sign in' : ''}
                    </span> 
                        {!accessToken ? '/{" "}' : ''}
                     <span onClick={() => setShowSignUp(true)}>
                        {!accessToken ? 'Register' : ''}
                    </span>
                </p>
                <p 
                    onClick={() => {
                        navigate("/faq-page")
                        toggleSideDrawer()
                    }}
                >
                    FAQ
                </p>
                <p 
                    onClick={() => {
                        navigate("/contact")
                        toggleSideDrawer()
                    }}
                >
                    Contact us
                </p>
            </div>
  
            {/* Login and Sign Up Modals */}
            {showLogin || showSignUp ? (
                <div className="mobile-screen-navbar-login-and-sign-up-modal">
                    <LiaTimesSolid
                        className="mobile-screen-navbar-login-and-sign-up-modal-cancel-icon"
                        onClick={() => {
                            setShowLogin(false);
                            setShowSignUp(false);
                        }}
                    />
                    {showLogin && <LoginPage />}
                    {showSignUp && <SignUpPage />}
                </div>
            ) : null}
            </div>
        </div>
    );
}
  

export default MobileScreenNavbar;