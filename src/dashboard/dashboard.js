import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/dashboard-style/Dashboard.css';
import { useEffect, useState } from "react";
import { CartProvider } from "../contexts/CartContext";
import SideDrawer from "../components/SideDrawer";
import { SideDrawerProvider } from "../contexts/SideDrawerContext";
import { SaveProductProvider } from "../contexts/SaveProductContext";
import Overlay from "./Overlay";
import { CouponProvider } from "../contexts/CouponContext";
import { SearchProvider } from "../contexts/SearchContext";

function Dashboard () {
    const [showAuthSwitchPage, setShowAuthSwitchPage] = useState(false);
    const [showMobileScreenNavbar, setShowMobileScreenNavbar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        //   console.log('Window width:', window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth <= 786) {
            if (showAuthSwitchPage === true) {
                setShowAuthSwitchPage(false);
                setShowMobileScreenNavbar(true)
            }
        }
        if (windowWidth >= 786) {
            if (showMobileScreenNavbar === true) {
                setShowMobileScreenNavbar(false)
                setShowAuthSwitchPage(true);
            }
        }
    }, [windowWidth]);


    return (
        <SideDrawerProvider>
            <SearchProvider>
                <CouponProvider>
                    <CartProvider>
                        <SaveProductProvider> 
                            <Overlay />
                            <div className="dashboard-container">
                                <Header />
                                <SideDrawer />
                                <div className="dashboard-main-content">
                                    <Outlet />
                                </div> 
                                <Footer />
                            </div>
                        </SaveProductProvider>
                    </CartProvider>
                </CouponProvider>
            </SearchProvider>
        </SideDrawerProvider>
    )
}


export default Dashboard;