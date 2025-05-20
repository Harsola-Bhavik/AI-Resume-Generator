import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.editUser.userData);
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        // Add any additional auth checks here
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 