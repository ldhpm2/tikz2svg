import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <section className="search-section container animate-slide-up">
      <h3 className="section-title">Tìm kiếm ảnh SVG</h3>
      
      <div className="search-type-selector">
        <button className="type-btn active">Từ khóa</button>
        <button className="type-btn">Tài khoản</button>
      </div>
      
      <div className="search-input-wrapper glass-card">
        <i className="fas fa-search search-icon"></i>
        <input type="text" placeholder="Tìm theo từ khóa (vd: hàm số, đa giác...)" />
      </div>
    </section>
  );
};

export default SearchBar;
