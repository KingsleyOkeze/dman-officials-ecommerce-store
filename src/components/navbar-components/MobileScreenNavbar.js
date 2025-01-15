import { useRef, useState } from "react";
import "../../styles/components-styles/navbar-components/MobileScreenNavbar.css"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage";
import SignUpPage from "../../pages/auth/SignUpPage";
import { LiaTimesSolid } from "react-icons/lia";


function MobileScreenNavbar ({ isOpen }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showMenArrowUp, setShowMenArrowUp] = useState(false);
    const [showMenTopArrowUp, setShowMenTopArrowUp] = useState(false);
    const [showMenBottomArrowUp, setShowMenBottomArrowUp] = useState(false);
    
    const [showAccessoryArrowUp, setShowAccessoryArrowUp] = useState(false);

    const menListRef = useRef(null);
    const accessoryRef = useRef(null);

    const handleOpenMenDropDown = () => {
        // menListRef.current.style.overflow  = "visible";
        menListRef.current.style.background = "green"
    }

    const handleCloseMenDropDown = () => {
        menListRef.current.style.display = "block"
    }

    const handleOpenAccessoryDropDown = () => {
        accessoryRef.current.style.display = "none";
    }

    const handleCloseAccessoryDropDown = () => {
        accessoryRef.current.style.display = "block"
    }

    return(
        <div
            className="mobile-screen-navbar-container">
            <div className="mobile-screen-navbar-list-div">
            <div className="mobile-screen-navbar-list-head-drop-down">
                <p>Men</p>
                {showMenArrowUp ? 
                    <IoIosArrowUp onClick={handleOpenMenDropDown}/> :
                    <IoIosArrowDown onClick={handleCloseMenDropDown}/>
                }
            </div>
            
            <div ref={menListRef}>
                <div className="mobile-screen-navbar-list-head-drop-down">
                <p>Tops</p>
                    {showMenTopArrowUp ? 
                        <IoIosArrowUp /> :
                        <IoIosArrowDown />
                    }
                </div>   
               <ul>
                   <li>T-Shirts</li>
                   <li>Hoodies & Sweater</li>
                   <li>Jackets</li>
               </ul>
               <div className="mobile-screen-navbar-list-head-drop-down">
                   <p>Bottom</p>
                   {showMenBottomArrowUp ? 
                    <IoIosArrowUp /> :
                    <IoIosArrowDown />
                   }
               </div>
                <ul>
                    <li>Shorts</li>
                    <li>Trousers</li>
                    <li>Pants</li>
                </ul>
                </div>
            </div>
            <div className="mobile-screen-navbar-list-div">
            <div className="mobile-screen-navbar-list-head-drop-down">
                <p>Accessories</p>
                {showAccessoryArrowUp ? 
                    <IoIosArrowUp onClick={handleOpenAccessoryDropDown}/> :
                    <IoIosArrowDown onClick={handleCloseAccessoryDropDown}/>
                }
            </div>
            <ul ref={accessoryRef}>
                <li>Shoes</li>
                <li>2</li>
                <li>3</li>
            </ul>
            </div>
            <p>
                <span 
                    onClick={() => setShowLogin(true)}
                    >
                        Sign in
                </span>
                /
                <span 
                    onClick={() => setShowSignUp(true)}
                    >
                        Register
                </span>
            </p>
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
            <p>FAQ</p>
            <p>Contact us</p>
        </div>
    )
}

export default MobileScreenNavbar;