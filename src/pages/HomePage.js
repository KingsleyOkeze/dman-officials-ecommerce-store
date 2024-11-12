import { useState } from "react";
import "../styles/pages-styles/HomePage.css"
import Showcase from "../components/Showcase";
import cardImage1 from "../images/cardImage1.png";
import cardImage2 from "../images/cardImage2.png";
import cardImage3 from "../images/cardImage3.png";
import cardImage4 from "../images/cardImage4.png";
import cardImage5 from "../images/cardImage5.png";
import { Link, useNavigate } from "react-router-dom";

function HomePage () {
    const navigate = useNavigate();
    const [newlyArrived, setNewlyArrived] = useState([{
        image: cardImage1,
        category: 'men wears',
        name: 'jean',
        price: '5000',
        id: 1
    },
    {
        image: cardImage2,
        category: 'men wears',
        name: 'jean',
        price: '5000',
        id: 2
    },
    {
        image: cardImage3,
        category: 'men wears',
        name: 'jean',
        price: '5000',
        id: 3
    },
    {
        image: cardImage4,
        category: 'men wears',
        name: 'jean',
        price: '5000',
        id: 4
    },
    // {
    //     image: cardImage5,
    //     category: 'men wears',
    //     name: 'jean',
    // }
    ]);

    return(
        <div className="home-page-container">
            <Showcase />
            {/* home-page-body-first-items-container */}
            <div className="home-page-body-header-container">
                <h2>Discover new arrival</h2>
                <p>New just come in</p>
            </div>
            <div className="home-page-body-items-container">
                {
                    newlyArrived.map((newlyArrive) => (
                        <div key={newlyArrive.id} className="home-page-card" onClick={() => navigate("/category-page")}>
                            <img src={newlyArrive.image} width={245} height={257} />
                            <p className="card-description">{newlyArrive.category} - {newlyArrive.name}</p>
                            <p className="card-price"><b>₦</b> {newlyArrive.price}</p>
                        </div>
                    ))
                }
            </div>

            <div className="see-all-btn-container">
                <button className="see-all-btn">See All</button>
            </div>

            {/* home-page-body-second-items-container */}
            <div className="home-page-body-header-container">
                <h2>Recommended for you</h2>
                <p>Your style your pick</p>
            </div>
            <div className="home-page-body-items-container">
                {
                    newlyArrived.map((newlyArrive) => (
                        <div className="home-page-card">
                            <img src={newlyArrive.image} width={245} height={257} />
                            <p className="card-description">{newlyArrive.category} - {newlyArrive.name}</p>
                            <p className="card-price"><b>₦</b> {newlyArrive.price}</p>
                        </div>
                    ))
                }
            </div>       

            <div className="see-all-btn-container">
                <button className="see-all-btn">See All</button>
            </div>
            
            {/* home-page-body-third-items-container */}
            <div className="home-page-body-header-container">
                <h2>Trending now</h2>
                <p>Stay ahead of the curve</p>
            </div>
            <div className="home-page-body-items-container">
                {
                    newlyArrived.map((newlyArrive) => (
                        <div className="home-page-card">
                            <img src={newlyArrive.image} width={245} height={257} />
                            <p className="card-description">{newlyArrive.category} -{newlyArrive.name} </p>
                            <p className="card-price"><b>₦</b> {newlyArrive.price}</p>
                        </div>
                    ))
                }
            </div>       

            <div className="see-all-btn-container">
                <button className="see-all-btn">See All</button>
            </div>

        </div>
    )
}

export default HomePage;