import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#007BFF", color: "white" }}>
      <Link style={{ margin: "10px", color: "white", textDecoration: "none" }} to="/">
        Home
      </Link>
      <Link style={{ margin: "10px", color: "white", textDecoration: "none" }} to="/about">
        About
      </Link>
      <Link style={{ margin: "10px", color: "white", textDecoration: "none" }} to="/contact">
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;