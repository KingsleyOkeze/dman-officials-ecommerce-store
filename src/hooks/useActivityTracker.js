import { useEffect, useRef } from 'react';
import axios from 'axios';

const useActivityTracker = (customerId, accessToken) => {
    const intervalRef = useRef(null); // To store the interval ID
    const startTimeRef = useRef(Date.now()); // To store the start time

    // Define the event handler function
    const handleVisibilityChange = async () => {
        if (!customerId || !accessToken) return;

        const now = Date.now();
        const duration = Math.floor((now - startTimeRef.current) / 1000);

        if (document.hidden) {
            // Tab is hidden
            clearInterval(intervalRef.current); // Stop the timer
            console.log("Sending 'Left Tab' event");
            await axios.post("/customer/activity", {
                customerId,
                activity: "Left Tab",
                duration,
                timestamp: new Date(),
            });
        } else {
            // Tab is visible
            startTimeRef.current = now; // Reset the start time
            console.log("Sending 'Returned To Tab' event");
            await axios.post("/customer/activity", {
                customerId,
                activity: "Returned To Tab",
                timestamp: new Date(),
            });

            // Restart the timer
            intervalRef.current = setInterval(() => {
                console.log("Session is active");
            }, 1000);
        }
    };

    // Function to start the timer manually
    const startTimer = () => {
        startTimeRef.current = Date.now(); // Reset the start time
        intervalRef.current = setInterval(() => {
            console.log("Session is active");
        }, 1000);

        // Add the event listener
        document.addEventListener("visibilitychange", handleVisibilityChange);
    };

    // Function to stop the timer manually
    const stopTimer = async () => {
        const totalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        clearInterval(intervalRef.current); // Stop the timer
        document.removeEventListener("visibilitychange", handleVisibilityChange); // Remove the event listener
        return totalTime;
    };

    // Cleanup when the component unmounts or customerId/accessToken changes
    useEffect(() => {
        if (accessToken && customerId) {
            startTimer(); // Start the timer automatically if customerId and accessToken are available
        }

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                stopTimer(); // Stop the timer and clean up
            }
        };
    }, [accessToken, customerId]); // Re-run only if accessToken or customerId changes

    return { startTimer, stopTimer };
};

export default useActivityTracker;