import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('keywords');

  return (
    <section className="search-section container animate-slide-up">
      <h3 className="section-title">Tìm kiếm ảnh SVG</h3>
      
      <div className="search-type-selector">
        <button 
          className={`type-btn ${searchType === 'keywords' ? 'active' : ''}`}
          onClick={() => setSearchType('keywords')}
        >
          Từ khóa
        </button>
        <button 
          className={`type-btn ${searchType === 'username' ? 'active' : ''}`}
          onClick={() => setSearchType('username')}
        >
          Tài khoản
        </button>
      </div>
      
      <div className="search-input-wrapper glass-card">
        <i className="fas fa-search search-icon"></i>
        <input 
          type="text" 
          placeholder={searchType === 'keywords' ? "Tìm theo từ khóa (vd: hàm số, đa giác...)" : "Nhập tên người dùng..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm('')}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="search-results-preview animate-fade-in">
          <p>Đang tìm kiếm <strong>"{searchTerm}"</strong> trong {searchType === 'keywords' ? 'từ khóa' : 'tài khoản'}...</p>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
