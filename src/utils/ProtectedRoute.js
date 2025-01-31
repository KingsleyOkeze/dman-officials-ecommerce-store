import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { accessToken } = useContext(AuthContext); // Check if the access token exists
  let userRole = ''; 

  if (accessToken) {
    const decodedToken = jwtDecode(accessToken); // Decode the token
    console.log("role is", decodedToken.role)
    userRole = decodedToken.role; // Access the role
  }

  // If not authenticated, redirect to login
  if (!accessToken || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  // Render the children (outlet) if authenticated 
  return <Outlet />;
};

export default ProtectedRoute;
