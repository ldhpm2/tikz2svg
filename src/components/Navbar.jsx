import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="main-nav glass-card container">
      <div className="nav-logo">
        <img src="/vite.svg" alt="Logo" />
        <span className="logo-text">TikZ to SVG</span>
      </div>
      
      <div className="nav-links d-none d-md-flex">
        <a href="#" className="nav-item active">Trang chủ</a>
        <a href="#" className="nav-item">Packages</a>
        <a href="#" className="nav-item">Tài liệu</a>
      </div>
      
      <div className="nav-actions">
        <button className="login-btn">Đăng nhập</button>
        <button className="md-hidden mobile-menu-btn">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
