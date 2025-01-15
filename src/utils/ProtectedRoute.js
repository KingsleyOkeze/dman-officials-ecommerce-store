import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken'); // Check if the access token exists
  let userRole = ''; 

  if (isAuthenticated) {
    const decodedToken = jwtDecode(isAuthenticated); // Decode the token
    console.log("role is", decodedToken.role)
    userRole = decodedToken.role; // Access the role
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || (userRole !== 'admin' && userRole !== 'customer')) {
    return <Navigate to="/" />;
  }

  // Render the children (outlet) if authenticated 
  return <Outlet />;
};

export default ProtectedRoute;
