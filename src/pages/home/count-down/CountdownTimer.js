import { useEffect, useState } from 'react';
import "../../../styles/pages-styles/home-pages-styles/HomePage.css";

const CountdownTimer = ({ targetDate }) => {
    // A key for localStorage to store the target date
    const localStorageKey = 'countdownTargetDate';

    // State to hold the countdown values
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        let storedTargetDate;
        
        // 1. Check if a target date exists in localStorage
        const storedDateString = localStorage.getItem(localStorageKey);

        if (storedDateString) {
            // If it exists, parse it back into a Date object
            storedTargetDate = new Date(storedDateString);
        } else {
            // If not, use the targetDate prop and store it
            storedTargetDate = targetDate;
            localStorage.setItem(localStorageKey, targetDate.toISOString());
        }

        // 2. Set up the timer to calculate time remaining
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = storedTargetDate.getTime() - now;

            if (difference <= 0) {
                // When the timer ends, clear it and remove the date from storage
                clearInterval(timer);
                localStorage.removeItem(localStorageKey);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, [targetDate]); // The useEffect dependency array ensures the effect runs only when targetDate prop changes

    const padNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="home-page-call-to-action-showcase-timer-container">
            <div className="home-page-call-to-action-showcase-time-block">
                <p>{padNumber(timeLeft.days)}</p>
                <small>Days</small>
            </div>
            <div className="home-page-call-to-action-showcase-time-block">
                <p>{padNumber(timeLeft.hours)}</p>
                <small>Hours</small>
            </div>
            <div className="home-page-call-to-action-showcase-time-block">
                <p>{padNumber(timeLeft.minutes)}</p>
                <small>Mins</small>
            </div>
            <div className="home-page-call-to-action-showcase-time-block">
                <p>{padNumber(timeLeft.seconds)}</p>
                <small>Secs</small>
            </div>
        </div>
    );
};

export default CountdownTimer;