import "../styles/components-styles/Recommended.css"
import cardImage1 from "../images/cardImage1.png";
import cardImage2 from "../images/cardImage2.png";
import cardImage3 from "../images/cardImage3.png";
import cardImage4 from "../images/cardImage4.png";
import { useState } from "react";


function Recommended () {
    const [recommended, setRecommended] = useState([{
        image: cardImage1,
        description: 'men wears, recommended-item, recommended-item',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 1
    },
    {
        image: cardImage2,
        description: 'men wears',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 2
    },
    {
        image: cardImage3,
        description: 'men wears',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 3
    },
    {
        image: cardImage4,
        description: 'men wears',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 4
    },
    {
        image: cardImage2,
        description: 'men wears',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 2
    },
    {
        image: cardImage3,
        description: 'men wears',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 3
    },
    {
        image: cardImage4,
        description: 'men wears',
        name: 'jean',
        price: '5000',
        color: 'red',
        id: 4
    },
    ]);
    
    return(
        <div className="recommended-container">
            <div className="recommended-container-header">
              <h3>Recommended For You</h3>
              <button>See All</button>
            </div>
              <div className="recommended-card-container">
                {
                    recommended.map((item, index) => ( 
                        <div key={index} className="recommended-card">
                            <img src={item.image} />
                            <div className="recommended-item-description-container">
                                <p className="recommended-item-name">{item.name} - {item.description} - {item.color} </p>
                            </div>   
                            <p className="recommended-item-price"><b>₦</b> {item.price}</p>
                        </div>
                    ))
                }
              </div>
        </div>
    )
}

export default Recommended;