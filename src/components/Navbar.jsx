import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ user, onLoginClick, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="container bg-white/80 backdrop-blur nv-shadow rounded-2xl p-3 flex items-center justify-between mb-8 border border-white/20 hover:shadow-xl transition-all duration-300" style={{ minHeight: 'auto', height: 'auto' }}>
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
            <img src="/vite.svg" 
                 alt="TikZ to SVG Logo" 
                 className="rounded-lg shadow-sm"
                 style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
            <span className="text-lg font-bold text-gray-800">TikZ to SVG</span>
          </a>
        </div>

        {/* Menu - Desktop (Hidden in original structure but left here) */}
        <div className="hidden">
          <ul id="main-menu" className="list-unstyled p-0 m-0 d-flex align-items-center gap-3 font-medium text-gray-700">
            <li className="menu-item relative px-2 py-1 cursor-pointer transition hover:text-blue-600">
              <a href="/" className="block text-base" style={{ lineHeight: 1 }}>Trang chủ</a>
              <div className="menu-underline"></div>
            </li>
            <li className="menu-item relative px-2 py-1 cursor-pointer transition hover:text-blue-600">
              <a href="/packages" className="block text-base flex items-center gap-1" style={{ lineHeight: 1 }}>
                <i className="fas fa-cube" style={{ fontSize: '14px' }}></i>
                Packages
              </a>
              <div className="menu-underline"></div>
            </li>
            <li className="menu-item relative px-2 py-1 cursor-pointer transition hover:text-blue-600">
              <a href="/docs" className="block text-base flex items-center gap-1" style={{ lineHeight: 1 }}>
                <i className="fas fa-book" style={{ fontSize: '14px' }}></i>
                Tài liệu
              </a>
              <div className="menu-underline"></div>
            </li>
          </ul>
        </div>

        {/* Avatar/User or Login & Hamburger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold text-dark d-none d-md-block">{user.username}</span>
              <button className="hidden md:block text-white px-3 py-1.5 rounded-xl shadow hover:scale-105 transition-all duration-200 font-semibold text-sm border-0" 
                      style={{ background: '#dc3545' }}
                      onClick={onLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <button className="hidden md:block bg-gradient-to-r from-blue-400 to-yellow-400 text-white px-3 py-1.5 rounded-xl shadow hover:scale-105 transition-all duration-200 font-semibold text-sm border-0 hover:from-blue-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50" 
                    onClick={onLoginClick}>
              Đăng nhập
            </button>
          )}

          {/* Hamburger (mobile) */}
          <button id="menu-toggle" className="md:hidden p-1.5 rounded-lg hover:bg-blue-100 transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </nav>

      {/* Scrollable Menu - Always Visible */}
      <div id="scrollable-menu" className="container mb-8">
        <ul id="scrollable-menu-list" className="list-unstyled p-0 m-0 d-flex align-items-center gap-3 font-medium text-gray-700 px-3">
          <li className="menu-item relative px-2 py-1 cursor-pointer transition hover:text-blue-600">
            <a href="/" className="block text-base" style={{ lineHeight: 1 }}>Trang chủ</a>
            <div className="menu-underline"></div>
          </li>
          <li className="menu-item relative px-2 py-1 cursor-pointer transition hover:text-blue-600">
            <a href="/packages" className="block text-base flex items-center gap-1" style={{ lineHeight: 1 }}>
              <i className="fas fa-cube" style={{ fontSize: '14px' }}></i>
              Packages
            </a>
            <div className="menu-underline"></div>
          </li>
          <li className="menu-item relative px-2 py-1 cursor-pointer transition hover:text-blue-600">
            <a href="/docs" className="block text-base flex items-center gap-1" style={{ lineHeight: 1 }}>
              <i className="fas fa-book" style={{ fontSize: '14px' }}></i>
              Tài liệu
            </a>
            <div className="menu-underline"></div>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`fixed top-0 left-0 w-full h-full bg-black/50 z-400 ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="absolute right-0 top-0 w-60 h-full nv-shadow flex flex-col p-6 gap-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <button id="close-menu" className="self-end text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
          <a href="/" className="font-medium">Trang chủ</a>
          <a href="/packages" className="font-medium flex items-center gap-2">
            <i className="fas fa-cube" style={{ fontSize: '14px' }}></i>
            Packages
          </a>
          <a href="/docs" className="font-medium flex items-center gap-2">
            <i className="fas fa-book" style={{ fontSize: '14px' }}></i>
            Tài liệu
          </a>
          
          {user ? (
            <button className="login-btn rounded-xl shadow-lg font-semibold mt-8 transition-all duration-200" 
                    style={{ background: '#dc3545', color: 'white', padding: '8px 16px' }}
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
              Đăng xuất
            </button>
          ) : (
            <button className="login-btn rounded-xl shadow-lg font-semibold mt-8 transition-all duration-200" 
                    style={{ background: 'linear-gradient(to right, #2563EB, #1E40AF)', color: 'white', padding: '8px 16px' }}
                    onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}>
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
