// utils/getUserIpAddress.js
import axios from 'axios';

export async function getUserIpAddress() {

    try {
       // Using ipify API to retrieve the public IP address
        const response = await axios.get(process.env.REACT_APP_IP_API_URL);
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }

}
