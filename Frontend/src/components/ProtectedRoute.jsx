import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../api';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
      setChecking(false);
    };

    checkAuth();
  }, [location]);

  // Show loading while checking authentication
  if (checking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!authenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
