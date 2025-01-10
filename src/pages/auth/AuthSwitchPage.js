import { useEffect, useState } from "react";
import "../../styles/pages-styles/auth-pages-styles/AuthSwitchPage.css"
import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function AuthSwitchPage ({ isOpen, toggleAuthSwitchPage }) {
    const location = useLocation(); // Get current location
    const navigate = useNavigate(); 
    const [showLogin, setShowLogin] = useState(true);
    
    const [showAuthSwitchPage, setShowAuthSwitchPage] = useState(false);

    useEffect(() => {
        console.log("AuthSwitchPage mounted");
        // alert('well hello')
    }, []);

  // Effect to listen for changes in the pathname
  useEffect(() => {
    // Check if the pathname includes '/auth'
    if (location.pathname.includes('/auth')) {
        // setShowAuthSwitchPage(true);
    } else {
        // setShowAuthSwitchPage(false); // Set isOpen to false otherwise
    }
  }, [location.pathname]); // Dependency array includes pathname

  useEffect(() => {
    if (isOpen === false) {
        // setShowAuthSwitchPage(false);
        // console.log('is is', isOpen)
    }
  }, [isOpen])

    return (
        <div className="auth-switch-page-container">
            <div className="auth-switch-page-container-head">
                <p onClick={() => {
                    setShowLogin(true);
                }}>Login</p>
                <p onClick={() => {
                    setShowLogin(false);
                }}>Sign Up</p>
            </div>

            {/* Child Routes Render Here */}
            <div className="auth-content">
                {
                    showLogin ? <LoginPage /> : <SignUpPage />
                }
            </div>
            
        </div>
    );
}

export default AuthSwitchPage;