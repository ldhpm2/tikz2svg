import React from 'react';
import './PromptSection.css';

const PromptSection = () => {
  return (
    <section className="prompt-section container animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="prompt-card glass-card">
        <h2 className="index-title">
          <span className="sparkle">✨</span> Sinh mã TikZ từ mô tả
        </h2>
        
        <p className="prompt-desc">
          Mô tả hình vẽ bạn muốn bằng tiếng Việt hoặc tiếng Anh, AI sẽ tự động sinh mã TikZ cho bạn.
        </p>
        
        <div className="input-group">
          <label className="input-label">Mô tả hình vẽ của bạn</label>
          <textarea 
            placeholder='VD: "vẽ đồ thị hàm số y = x^2 - 4x + 3"'
            className="prompt-textarea"
          ></textarea>
        </div>
        
        <div className="prompt-footer">
          <div className="char-count">0 / 500 ký tự</div>
          <button className="example-btn">
            <i className="far fa-lightbulb"></i> Xem ví dụ
          </button>
        </div>
        
        <button className="generate-btn">
          <i className="fas fa-paint-brush"></i> Sinh mã TikZ
        </button>
        
        <p className="login-hint">
          <a href="#">Đăng nhập</a> để sử dụng tính năng sinh mã tự động
        </p>
      </div>
    </section>
  );
};

export default PromptSection;
