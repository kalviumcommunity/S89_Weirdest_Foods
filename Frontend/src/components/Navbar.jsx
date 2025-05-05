import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser, logoutUser } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();

  const linkStyle = {
    margin: "10px",
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "background-color 0.3s"
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  };

  const buttonStyle = {
    ...linkStyle,
    border: "none",
    background: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "inherit"
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={{
      padding: "15px",
      backgroundColor: "#007BFF",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div>
        <Link style={linkStyle} to="/">
          Home
        </Link>
        <Link style={linkStyle} to="/about">
          About
        </Link>
        <Link style={linkStyle} to="/contact">
          Contact
        </Link>
      </div>
      <div>
        {authenticated ? (
          <>
            <span style={{ margin: "0 10px", color: "white" }}>
              Welcome, {currentUser?.username || 'User'}
            </span>
            <Link style={linkStyle} to="/foodlist">
              View Foods
            </Link>
            <Link style={activeLinkStyle} to="/add-entity">
              Add Food
            </Link>
            <Link style={linkStyle} to="/manage-entities">
              Manage Foods
            </Link>
            <button style={buttonStyle} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link style={linkStyle} to="/login">
              Login
            </Link>
            <Link style={linkStyle} to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;