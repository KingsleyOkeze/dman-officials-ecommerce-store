import { useContext } from "react";
import { SideDrawerContext } from "../contexts/SideDrawerContext";
import "../styles/dashboard-style/Overlay.css";

function Overlay () {
    const { 
            showSideDrawer, 
            setShowSideDrawer, 
            activeComponent, 
            setActiveComponent,
            toggleSideDrawer
    } = useContext(SideDrawerContext);
    
    return(
        <div 
            id="dashboard-overlay" 
            style={{
                display: showSideDrawer === true ? 'block' : 'none'
            }}
            onClick={() => {
                setShowSideDrawer(false);
            }}>
        </div>
    )
}

export default Overlay;