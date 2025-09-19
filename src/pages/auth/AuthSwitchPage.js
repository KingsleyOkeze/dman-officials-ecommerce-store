import { useState } from "react";
import "../../styles/pages-styles/auth-pages-styles/AuthSwitchPage.css"
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function AuthSwitchPage ({ isOpen, toggleSideDrawer }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="auth-switch-page-container">
            <div className="auth-switch-page-container-head">
                <p 
                    onClick={() => {
                        setShowLogin(true);
                    }}
                    className={showLogin ? "active-tab" : ""}
                >
                    Login
                </p>
                <p 
                    onClick={() => {
                        setShowLogin(false);
                    }}
                    className={!showLogin ? "active-tab" : ""}
                >
                    Sign Up
                </p>
            </div>

            <div className="auth-content">
                {
                    showLogin ? 
                        <LoginPage 
                            toggleSideDrawer={toggleSideDrawer}
                        /> 
                    : 
                        <SignUpPage 
                            setShowLogin={() => setShowLogin(true)}
                        />
                }
            </div>
        </div>
    );
}

export default AuthSwitchPage;