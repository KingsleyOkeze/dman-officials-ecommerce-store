import { useEffect, useState } from "react";
import "../../styles/pages-styles/product-pages/CountdownTimer.css"


function CountdownTimer({ expiryDate }) {

    const calculateTimeLeft = () => {
      const difference = new Date(expiryDate) - new Date();
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, [expiryDate]);
  
    return (
      <div className="product-page-product-time-block-container">
        <p>{timeLeft.hours}</p>
        <p>{timeLeft.minutes}</p>
        <p>{timeLeft.seconds}</p>
      </div>
    );
}
  

export default CountdownTimer;