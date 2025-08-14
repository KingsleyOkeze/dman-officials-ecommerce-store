// utils/activityTracker.js
import axios from "axios";

let interval; // Keep track of interval globally
let startTime = Date.now(); // Store start time
let sessionDuration = 0;

// Define handleVisibilityChange outside of startActivityTracker
const handleVisibilityChange = async (customerId, accessToken) => {
  console.log("Visibility Change Triggered");

  if (!customerId || !accessToken) return;

  const now = Date.now();
  const duration = Math.floor((now - startTime) / 1000);

  if (document.hidden) {
    clearInterval(interval);
    console.log("Sending 'Left Tab' event");
    await axios.post("/customer/activity", {
      customerId,
      activity: "Left Tab",
      duration,
      timestamp: new Date(),
    });
  } else {
    startTime = now;
    console.log("Sending 'Returned To Tab' event");
    await axios.post("/customer/activity", {
      customerId,
      activity: "Returned To Tab",
      timestamp: new Date(),
    });
    interval = setInterval(() => {
      sessionDuration += 1;
    }, 1000);
  }
};

export const startActivityTracker = (accessToken, customerId) => {
  let sessionDuration = 0;

  const startTimer = () => {
    startTime = Date.now();
    interval = setInterval(() => {
      sessionDuration += 1;
    }, 1000);
  };

  const stopTimer = async () => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    clearInterval(interval);
    return totalTime;
  };

  // Prevent multiple event listeners
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  document.addEventListener("visibilitychange", () =>
    handleVisibilityChange(customerId, accessToken)
  );

  return {
    startTimer,
    stopTimer,
    sessionDuration,
  };
};