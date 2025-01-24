import { useContext, useRef, useState } from "react";
import "../../styles/components-styles/navbar-components/MobileScreenNavbar.css"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import logo from '../../images/dman-logo.png'
import LoginPage from "../../pages/auth/LoginPage";
import SignUpPage from "../../pages/auth/SignUpPage";
import { LiaTimesSolid } from "react-icons/lia";
import { SideDrawerContext } from "../../contexts/SideDrawerContext";


function MobileScreenNavbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showMenDropDown, setShowMenDropDown] = useState(false);
    const [showAccessoryDropDown, setShowAccessoryDropDown] = useState(false);
    const [showFootwearDropDown, setShowFootwearDropDown] = useState(false);
  
    const { 
        showSideDrawer, 
        setShowSideDrawer, 
        activeComponent, 
        setActiveComponent,
        toggleSideDrawer
    } = useContext(SideDrawerContext);  
    
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
                        <li>T-Shirts</li>
                        <li>Hoodies & Sweaters</li>
                        <li>Jackets</li>
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
                    <span onClick={() => setShowLogin(true)}>Sign in</span> /{" "}
                     <span onClick={() => setShowSignUp(true)}>Register</span>
                </p>
                <p>FAQ</p>
                <p>Contact us</p>
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
    );
}
  

export default MobileScreenNavbar;