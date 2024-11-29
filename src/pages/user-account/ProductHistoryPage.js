import "../../styles/pages-styles/user-account-page-styles/ProductHistoryPage.css"
import { BsCartCheck } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { PiPackageLight } from "react-icons/pi";
import { IoMdArrowBack } from "react-icons/io";

function ProductHistoryPage () {

    return(
        <div className="product-history-container">
            <div className="product-history-header-container">
                <div className="product-history-header-icon-container">
                   <IoMdArrowBack className="product-history-header-icon"/>
                </div>
                <h3>Product History</h3>
            </div>
            <div className="product-history-details">
                <div className="product-status">
                  <BsCartCheck className="product-history-icon"/>
                  <p className="product-status-title">Order Placed</p>
                  <div className="product-status-description">
                    <p>Your order has been successfully placed and is being processed</p>
                    <p>2024-10-23 7:30am</p>
                  </div>
                </div>
                <div className="product-status">
                  <FaCircle className="product-history-circle-icon"/>
                  <p className="product-status-title">Confirmation in progress</p>
                  <div className="product-status-description">
                    <p>W are confirming the details of your order. This may take few minutes</p>
                    <p>2024-10-23 7:30am</p>
                  </div>
                </div>
                <div className="product-status">
                  <FaCircle className="product-history-circle-icon"/>
                  <p className="product-status-title">Shipping in progress</p>
                  <div className="product-status-description">
                    <p>Your order has been prepared for shipping.</p>
                    <p>2024-10-23 7:30am</p>
                  </div>
                </div>
                <div className="product-status">
                  <BsTruck className="product-history-icon"/>
                  <p className="product-status-title">Product shipped</p>
                  <div className="product-status-description">
                    <p>Your order has been shipped. A tracking number will be provided.</p>
                    <p>2024-10-23 7:30am</p>
                  </div>
                </div>
                <div className="product-status">
                  <PiPackageLight className="product-history-icon"/>
                  <p className="product-status-title">Product delivered</p>
                  <div className="product-status-description">
                    <p>Your order has been delivered.</p>
                    <p>2024-10-23 7:30am</p>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default ProductHistoryPage;