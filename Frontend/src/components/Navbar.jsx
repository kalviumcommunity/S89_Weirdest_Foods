import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, getCurrentUser, logoutUser, checkAuthCookie } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  // Update auth state when location changes
  useEffect(() => {
    const updateAuthState = async () => {
      // Check token-based authentication
      setAuthenticated(isAuthenticated());
      setCurrentUser(getCurrentUser());

      // Also check cookie-based authentication
      const cookieAuth = await checkAuthCookie();
      console.log('Navbar cookie auth check:', cookieAuth);

      // If we have cookie auth but no token auth, we can use the cookie username
      if (cookieAuth.authenticated && !isAuthenticated()) {
        console.log('Using cookie authentication in Navbar');
        setAuthenticated(true);
        // If we don't have user data in localStorage but have cookie auth,
        // we can at least display the username
        if (!getCurrentUser() && cookieAuth.username) {
          setCurrentUser({ username: cookieAuth.username });
        }
      }
    };

    updateAuthState();
  }, [location]);

  const linkStyle = {
    margin: "0 8px",
    color: "white",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    fontWeight: "500",
    letterSpacing: "0.3px",
    display: "inline-block"
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  const buttonStyle = {
    ...linkStyle,
    border: "none",
    background: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const handleLogout = async () => {
    try {
      // Call the async logoutUser function
      const result = await logoutUser();

      if (result.success) {
        // Update state immediately
        setAuthenticated(false);
        setCurrentUser(null);
        // Navigate to login page
        navigate('/login');
        // Optional: reload the page to reset all states
        // window.location.reload();
      } else {
        console.error('Logout failed:', result.error);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <nav style={{
      padding: "16px 24px",
      backgroundColor: "#4A6FFF",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{
          textDecoration: "none",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginRight: "24px",
          display: "flex",
          alignItems: "center"
        }}>
          <span style={{
            backgroundColor: "white",
            color: "#4A6FFF",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "8px",
            fontWeight: "bold"
          }}>W</span>
          Weird Foods
        </Link>

        <div style={{ display: "flex", gap: "8px" }}>
          <Link style={linkStyle} to="/">
            Home
          </Link>
          <Link style={linkStyle} to="/about">
            About
          </Link>
          <Link style={linkStyle} to="/contact">
            Contact
          </Link>
          {authenticated && (
            <Link style={linkStyle} to="/foodlist">
              View Foods
            </Link>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {authenticated ? (
          <>
            <div style={{
              margin: "0 16px",
              color: "white",
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "6px 12px",
              borderRadius: "20px"
            }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: "#4A6FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "8px",
                fontWeight: "bold"
              }}>
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span>{currentUser?.username || 'User'}</span>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <Link style={{
                ...activeLinkStyle,
                backgroundColor: "#FF6B6B",
                color: "white",
                fontWeight: "bold"
              }} to="/add-entity">
                Add Food
              </Link>
              <Link style={{
                ...linkStyle,
                backgroundColor: "rgba(255, 255, 255, 0.15)"
              }} to="/manage-entities">
                Manage Foods
              </Link>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "6px",
                  padding: "8px 16px"
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              style={{
                ...linkStyle,
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "6px",
                padding: "8px 20px"
              }}
              to="/login"
            >
              Login
            </Link>
            <Link
              style={{
                ...linkStyle,
                backgroundColor: "white",
                color: "#4A6FFF",
                borderRadius: "6px",
                padding: "8px 20px",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }}
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;