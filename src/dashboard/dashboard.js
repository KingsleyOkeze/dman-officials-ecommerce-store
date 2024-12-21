import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/dashboard-style/Dashboard.css';
import SlidingNavList from "../components/navbar-components/SlidingNavList";
import { useEffect, useState } from "react";
import AuthSwitchPage from "../pages/auth/AuthSwitchPage";
import MobileScreenNavbar from "../components/navbar-components/MobileScreenNavbar";


function Dashboard () {
    const [showAuthSwitchPage, setShowAuthSwitchPage] = useState(false);
    const [showMobileScreenNavbar, setShowMobileScreenNavbar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleAuthSwitchPage = () => {
        setShowAuthSwitchPage(!showAuthSwitchPage); // Toggle visibility
    };
    const toggleMobileScreenNavbar  = () => {
        setShowMobileScreenNavbar(!showMobileScreenNavbar); // Toggle visibility
    };

    useEffect(() => {
        console.log('draft', showAuthSwitchPage)
    }, [showAuthSwitchPage]);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
          console.log('Window width:', window.innerWidth);
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
    }, [windowWidth])
    return (
        <div className="dashboard-container">
             <Header 
                 toggleAuthSwitchPage={toggleAuthSwitchPage}
                 toggleMobileScreenNavbar={toggleMobileScreenNavbar}
             />
             
            <AuthSwitchPage 
                isOpen={showAuthSwitchPage}
                toggleAuthSwitchPage={toggleAuthSwitchPage}
            />    
             
            <MobileScreenNavbar 
                isOpen={showMobileScreenNavbar}
                toggleMobileScreenNavbar={toggleMobileScreenNavbar}
            />
            <div className="dashboard-main-content">
                <Outlet />
            </div> 
            <Footer />

        </div>
    )
}

export default Dashboard;