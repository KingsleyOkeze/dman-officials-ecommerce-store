import { useState } from "react";
import "../../styles/pages-styles/user-account-page-styles/OrdersPage.css";
import cardImage1 from "../../images/cardImage1.png"
import cardImage2 from "../../images/cardImage2.png";
import cardImage3 from "../../images/cardImage3.png";
import cardImage4 from "../../images/cardImage4.png"

function OrdersPage () {
    const [orders, setOrders] = useState([
        {
            image: cardImage1,
            name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
            orderId: 'brown',
            status: 'Order placed',
            deliveryDate: '28-08-2024'
        },
        {
            image: cardImage2,
            name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
            orderId: 'brown',
            status: 'Shipping in progress',
            deliveryDate: '28-08-2024'
        },
        {
            image: cardImage2,
            name: 'This is part of dman officials, This is part of dman officials, This is part of dman officials,',
            orderId: 'brown',
            status: 'Order cancelled',
            deliveryDate: '28-08-2024'
        },
        {
            image: cardImage3,
            name: 'This is part of dman officials,',
            orderId: 'brown',
            status: 'Product shipped',
            deliveryDate: '28-08-2024'
        },
        {
            image: cardImage4,
            name: 'This is part of dman officials,',
            orderId: 'brown',
            status: 'Product delivered',
            deliveryDate: '28-08-2024'
        }
        ]);
    return(
        <div className="order-page-container">
            <h3>Orders</h3>
            <div className="order-page-main-content">
                <div className="order-page-title">
                   <p>IN PROGRESS/DELIVERED</p>  
                </div>
                <div className="order-page-card-container">
                {               
                    orders.map((order, index) => (
                        <div className="order-page-card">
                            <div className="order-page-card-img-container">
                              <img src={order.image} />
                            </div>
                            <div className="order-page-card-description-container">
                                <div className="order-page-card-name-and-order-id-container">
                                  <p className="order-page-card-name">{order.name}</p>
                                  <p className="order-page-card-order-id">Order ID: <span>{order.orderId}</span></p>
                                </div>
                                <div className="order-page-card-status-and-date-container">
                                  <p 
                                    className="order-page-card-status"
                                    style={{
                                        background: order.status.includes("delivered") ? "#008C00" : 
                                        order.status.includes("cancelled") ? "#808080" : "#FFA500"
                                    }}> {order.status}</p>
                                  <p className="order-page-card-deliveryDate">{order.deliveryDate}</p>
                                </div>
                            </div>
                            <div className="order-page-card-see-details">
                               <p>See Details</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;