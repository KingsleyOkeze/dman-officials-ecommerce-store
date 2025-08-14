import { useEffect, useState } from "react";
import "../../styles/pages-styles/auth-pages-styles/AuthSwitchPage.css"
import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function AuthSwitchPage ({ isOpen, toggleSideDrawer }) {
    const location = useLocation(); // Get current location
    const navigate = useNavigate(); 
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="auth-switch-page-container">
            <div className="auth-switch-page-container-head">
                <p onClick={() => {
                    setShowLogin(true);
                }}
                style={{ 
                    borderBottom: showLogin ? "2px solid #ffffff" : "none", padding: "10px" 
                }}
                >Login</p>
                <p onClick={() => {
                    setShowLogin(false);
                }}
                style={{ 
                    borderBottom: showLogin === false ? "2px solid #ffffff" : "none", padding: "10px" 
                }}
                >Sign Up</p>
            </div>

            {/* Child Routes Render Here */}
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