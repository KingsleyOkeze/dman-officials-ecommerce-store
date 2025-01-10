import AuthSwitchPage from "../pages/auth/AuthSwitchPage";
import CartPage from "../pages/cart/CartPage";
import "../styles/components-styles/SideDrawer.css";

function SideDrawer ({ isOpen, activeComponent }) {

    return(
        <div
            className={`side-drawer-container ${
                isOpen
                    ? "open-side-drawer-container"
                    : "close-side-drawer-container"
            }`}
        >
        {activeComponent === 'account' ? (
            <AuthSwitchPage />
        ) : activeComponent === 'cart' ? (
            <CartPage />
        ) : <div className="close-side-drawer-container"></div>
        }

        </div>
    )
}

export default SideDrawer;