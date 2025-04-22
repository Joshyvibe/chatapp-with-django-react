import React, { useState } from "react";
import "../styles/Navbar.css";
import { useAuthentication } from "../auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthentication();
  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Close menu after logout
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to='/'  className="navbar-logo-text"><h2>ChitChat</h2></Link>

        <div className="navbar-icon" onClick={toggleSidebar}>
          ☰
        </div>
        {isSidebarOpen && (
          <div className="sidebar">
            <button className="close-btn" onClick={toggleSidebar}>
              ✖
            </button>
            <ul className="sidebar-menu">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="#" onClick={handleLogout} className="button-link">
                      Logout
                    </Link>
                  </li>
                  <li>
                    <Link to="/chats" className="button-link">
                      Chats
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/register">Register</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;