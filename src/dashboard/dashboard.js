import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import '../styles/dashboard-style/Dashboard.css';
function Dashboard () {

    return (
        <div className="dashboard-container">
             <Header />
            <div className="dashboard-main-content">
                <Outlet />
            </div> 
            <Footer />
        </div>
    )
}

export default Dashboard;