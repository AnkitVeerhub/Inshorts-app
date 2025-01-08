import React, { useState } from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // Trigger search whenever input changes
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery); // Trigger search when clicking the icon
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>MERN Inshorts</h1>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <input
          type="text"
          placeholder="Search news..."
          className="search-bar"
          value={searchQuery}
          onChange={handleInputChange} // Trigger search when the user types
        />
        <FaSearch
          className="search-icon"
          onClick={handleSearchClick} // Trigger search when clicking the icon
        />
      </div>
    </header>
  );
};

export default Header;
