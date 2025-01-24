import { useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/flash-sale-styles/FlashSale.css";
import axios from "axios";


function FlashSale () {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [timerExpiryDate, setTimerExpiryDate] = useState(null);
  const [timer, setTimer] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
  });

  // Fetch data from the server
  useEffect(() => {
      // Call the server to get flash sale data and expiry date
      const fetchFlashSaleData = async () => {
          try {
              const response = await axios.get('/api/flashsale'); // Replace with your actual API endpoint
              if (response.data.success) {
                  const { flashSaleProducts } = response.data;
                  setFlashSaleProducts(flashSaleProducts); // Assuming 'flashSaleProducts' is the array of flash sale items

                  // Set the timer expiry date based on the first product's expiry date
                  if (flashSaleProducts.length > 0) {
                      setTimerExpiryDate(flashSaleProducts[0].timerExpiryDate); // Assuming the first product has a common expiry date
                  }
              } else {
                  console.log(response.data.message); // Log if no products are available
              }
          } catch (error) {
              console.error('Error fetching flash sale data:', error);
          }
      };

      fetchFlashSaleData();
  }, []);

  // Calculate the countdown timer based on the expiry date
  useEffect(() => {
      const calculateTimeLeft = () => {
          if (!timerExpiryDate) return;

          const difference = new Date(timerExpiryDate) - new Date();
          if (difference <= 0) {
              setTimer({
                  days: 0,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
              });
              return; // Stop the countdown if the time is up
          }

          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimer({
              days,
              hours,
              minutes,
              seconds,
          });
      };

      if (timerExpiryDate) {
          // Update the timer every second
          const intervalId = setInterval(calculateTimeLeft, 1000);
          return () => clearInterval(intervalId); // Clean up the interval on unmount
      }
  }, [timerExpiryDate]);

  if (!flashSaleProducts || flashSaleProducts.length === 0) {
      return <></>; // If there are no flash sale products, return nothing
  }

  return (
      <>
          <div className="home-page-flash-sale-timer-and-see-all-btn-container">
              <div className="home-page-flash-sale-title-and-timer-container">
                  <div className="home-page-flash-sale-header-title-and-icon-container">
                      <div className="home-page-flash-sale-header-bar-icon">
                          {/* Icon here */}
                      </div>
                      <p className="home-page-flash-sale-title-header">Today</p>
                  </div>
                  <p className="home-page-flash-sale-sub-header">Flash Sales</p>

                  {/* Timer for Flash Sales */}
                  {timer.days > 0 || timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0 ? (
                      <div className="home-page-flash-sale-timer-container">
                          <div className="home-page-flash-sale-time-block">
                              <p>{String(timer.days).padStart(2, "0")}</p>
                              <small>Days</small>
                          </div>
                          <div className="home-page-flash-sale-time-block">
                              <p>{String(timer.hours).padStart(2, "0")}</p>
                              <small>Hours</small>
                          </div>
                          <div className="home-page-flash-sale-time-block">
                              <p>{String(timer.minutes).padStart(2, "0")}</p>
                              <small>Mins</small>
                          </div>
                          <div className="home-page-flash-sale-time-block">
                              <p>{String(timer.seconds).padStart(2, "0")}</p>
                              <small>Secs</small>
                          </div>
                      </div>
                  ) : (
                      <p className="no-timer-message">Flash sale has ended. Stay tuned for the next one!</p>
                  )}
              </div>
              <div className="home-page-flash-sale-see-all-button-container">
                  <button>See All</button>
              </div>
          </div>

          {/* Flash Sale Products */}
          <div className="home-page-flash-sale-card-container">
              {flashSaleProducts.map((flashSale, index) => (
                  <div key={index} className="home-page-flash-sale-card">
                      <img
                          src={flashSale.productImageUrl[0]} // Assuming the first image is the main one
                          className="home-page-flash-sale-card-img"
                          alt={flashSale.productName}
                      />
                      <p className="home-page-flash-sale-card-description">
                          {flashSale.productName} - {flashSale.productColor[0]}
                      </p>
                      <div className="home-page-flash-sale-card-price-container">
                          <p className="home-page-flash-sale-card-offer-price">
                              <b>₦</b> {flashSale.productOfferPrice}
                          </p>
                          <p className="home-page-flash-sale-card-price">
                              <b>₦</b>{flashSale.productPrice}
                          </p>
                      </div>
                      <button className="home-page-flash-sale-card-btn">Add to Cart</button>
                  </div>
              ))}
          </div>
      </>
  )
}

export default FlashSale;