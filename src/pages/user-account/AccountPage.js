import "../../styles/pages-styles/user-account-page-styles/AccountPage.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import dmanLogo from "../../images/dman-black-logo.png"
import { AuthContext } from "../../contexts/AuthContext";

function AccountPage() {
    const navigate = useNavigate();
    const {handleLogout} = useContext(AuthContext);
    const location = useLocation(); // Get current route
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    // Determine initial state of showMenu based on location
    useEffect(() => {
        const handleResize = () => {
            const isMobileScreen = window.innerWidth <= 986;
            setIsMobile(isMobileScreen);

            // If on mobile and not on the main account page, hide the menu
            if (isMobileScreen) {
                setShowMenu(location.pathname === "/account");
            } else {
                setShowMenu(true); // Always show menu on desktop
            }
        };

        handleResize(); // Check on initial load
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [location.pathname]); // Rerun when the route changes

    const handleNavigation = (path) => {
      navigate(path);
      if (isMobile) setShowMenu(false); // Hide menu on mobile after navigation
    };


  return (
    <div className={`account-page-container ${isMobile ? "mobile" : ""}`}>
      {showMenu ? (
        <div className="account-page-menu-container">
          <img src={dmanLogo} alt="D.MAN Logo" className="account-logo" />
          <h2 className="account-page-user-name">Kingsley Okeze</h2>
          <p className="account-page-welcome-message">
            Welcome back to your account, You can manage your account settings here.
          </p>
          <div className="account-list">
              <p onClick={() => handleNavigation("/account/user-overview")}>My D.MAN Account</p>
              <p onClick={() => handleNavigation("/account/all-orders")}>Orders</p>
              <p onClick={() => handleNavigation("/account/saved-product")}>
                  Saved Product
              </p>
          {/* <p onClick={() => handleNavigation("/account/recently-viewed")}>
            Recently Viewed
          </p> */}
           </div>
          <p>
            <button 
                className="logout-button"
                onClick={handleLogout}
                >
                  LOGOUT
            </button>
          </p>
        </div>
      ) : (
        <div className="account-page-mobile-content">
          {/* <button
            className="back-to-menu"
            onClick={() => setShowMenu(true)} // Go back to menu on mobile
          >
            Back to Menu
          </button> */}
          <Outlet />
        </div>
      )}

      {!isMobile && (
        <div className="account-page-main-content-container">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default AccountPage;
