import React, { useState } from 'react';
import './PromptSection.css';

const PromptSection = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, type: 'tikz-gen' })
      });
      
      const data = await response.json();
      if (data.content) {
        onGenerate(data.content);
        // Scroll to editor
        document.querySelector('.editor-workspace')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={500}
          ></textarea>
        </div>
        
        <div className="prompt-footer">
          <div className="char-count">{prompt.length} / 500 ký tự</div>
          <button className="example-btn" onClick={() => setPrompt('Vẽ một hình tròn màu xanh lam có bán kính 2cm')}>
            <i className="far fa-lightbulb"></i> Xem ví dụ
          </button>
        </div>
        
        <button 
          className="generate-btn" 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt.trim()}
        >
          <i className={isGenerating ? "fas fa-spinner fa-spin" : "fas fa-paint-brush"}></i> 
          {isGenerating ? 'Đang tạo mã...' : 'Sinh mã TikZ'}
        </button>
        
        <p className="login-hint">
          Thử mô tả: "Vẽ bảng biến thiên hàm số bậc 2" hoặc "Vẽ sơ đồ khối"
        </p>
      </div>
    </section>
  );
};

export default PromptSection;
