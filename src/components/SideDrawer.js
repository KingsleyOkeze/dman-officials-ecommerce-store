import { useContext, useEffect } from "react";
import AuthSwitchPage from "../pages/auth/AuthSwitchPage";
import CartPage from "../pages/cart/CartPage";
import "../styles/components-styles/SideDrawer.css";
import MobileScreenNavbar from "./navbar-components/MobileScreenNavbar";
import { SideDrawerContext } from "../contexts/SideDrawerContext";

function SideDrawer ({ }) {
    const { 
        showSideDrawer, 
        setShowSideDrawer, 
        activeComponent, 
        setActiveComponent,
        toggleSideDrawer
    } = useContext(SideDrawerContext); 
    
    return(
        <div
            className={`side-drawer-container ${
                showSideDrawer
                    ? "open-side-drawer-container"
                    : "close-side-drawer-container"
            }`}
        >
            {activeComponent === "account" ? (
                <AuthSwitchPage />
            )
            : activeComponent === "cart" ? (
                <CartPage />
            ) : activeComponent === "mobile-screen-navbar" ? (
                <MobileScreenNavbar />
            ): (
                <div className="close-side-drawer-container"></div>
            )}

        </div>
    )
}

export default SideDrawer;