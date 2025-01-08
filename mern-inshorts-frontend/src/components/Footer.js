import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© 2025 MERN Inshorts. All rights reserved.</p>
      <div className="social-icons">
        <FaFacebook className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
      </div>
    </footer>
  );
};

export default Footer;
