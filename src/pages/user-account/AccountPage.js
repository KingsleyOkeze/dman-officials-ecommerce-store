import "../../styles/pages-styles/user-account-page-styles/AccountPage.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  // Determine initial state of showMenu based on location
  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= 768;
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
          <p onClick={() => handleNavigation("/account/user-overview")}>My D.MAN Account</p>
          <p onClick={() => handleNavigation("/account/orders")}>Orders</p>
          <p onClick={() => handleNavigation("/account/saved-product")}>
            Saved Product
          </p>
          {/* <p onClick={() => handleNavigation("/account/recently-viewed")}>
            Recently Viewed
          </p> */}
          <p>
            <button className="logout-button">LOGOUT</button>
          </p>
        </div>
      ) : (
        <div className="account-page-mobile-content">
          <button
            className="back-to-menu"
            onClick={() => setShowMenu(true)} // Go back to menu on mobile
          >
            Back to Menu
          </button>
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
