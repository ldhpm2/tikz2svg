import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('keywords'); // keywords or username

  return (
    <>
      {/* Search Bar */}
      <div className="search-container page-container index-top-container">
        <h3 className="search-title">Tìm kiếm ảnh SVG</h3>

        {/* Search Type Selection */}
        <div className="search-type-selector">
          <button 
            type="button" 
            className={`search-type-option ${searchType === 'keywords' ? 'active' : ''}`} 
            id="search-type-keywords" 
            data-type="keywords"
            onClick={() => setSearchType('keywords')}
          >
            <span className="radio-label">Từ khóa</span>
          </button>
          <button 
            type="button" 
            className={`search-type-option ${searchType === 'username' ? 'active' : ''}`} 
            id="search-type-username" 
            data-type="username"
            onClick={() => setSearchType('username')}
          >
            <span className="radio-label">Tên tài khoản</span>
          </button>
        </div>

        <div className="group">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="icon">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"/>
          </svg>
          <input 
            className="input" 
            type="search" 
            placeholder="Tìm theo từ khóa..." 
            id="main-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div id="search-suggestions" className="search-suggestions"></div>
        </div>
      </div>

      {/* Search Blur Overlay */}
      <div id="search-blur-overlay" className="search-blur-overlay"></div>
    </>
  );
};

export default SearchBar;
