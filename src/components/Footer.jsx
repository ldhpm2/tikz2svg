import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <p>© 2026 TikZ to SVG - Premium Reconstruction</p>
        <div className="footer-links">
          <a href="#"><i className="fab fa-github"></i> GitHub</a>
          <a href="#"><i className="fas fa-book"></i> Docs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
