import React, { useState } from 'react';
import './PromptSection.css';

const PromptSection = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

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
        document.querySelector('.input-preview-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
    setShowExamples(false);
  };

  return (
    <div className="prompt-to-tikz-section page-container">
      <h2 className="index-title">
          <span style={{ marginRight: '8px' }}>✨</span>
          Sinh mã TikZ từ mô tả
      </h2>

      <p style={{ color: 'var(--text-on-glass)', marginBottom: 'var(--spacing-16)', lineHeight: '1.6' }}>
          Mô tả hình vẽ bạn muốn bằng tiếng Việt hoặc tiếng Anh, AI sẽ tự động sinh mã TikZ cho bạn.
      </p>

      {/* Input Area */}
      <div className="prompt-input-container">
          <div className="prompt-label">
              <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-header-glass)', marginBottom: 'var(--spacing-8)' }}>
                  Mô tả hình vẽ của bạn
                  <span style={{ fontSize: 'var(--prompt-hint-size)', fontWeight: 400, color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', marginTop: 'var(--spacing-2)' }}>
                      VD: "vẽ bảng biến thiên hàm số y = x^2 - 4x + 3"
                  </span>
              </div>
          </div>

          <textarea
              id="tikz-prompt-input"
              className="prompt-textarea"
              placeholder="Mô tả hình vẽ bạn muốn tạo..."
              rows="5"
              maxLength="500"
              aria-describedby="prompt-char-count prompt-examples"
              style={{ width: '100%', padding: 'var(--spacing-8)', fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-on-glass)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--prompt-border)', borderRadius: 'var(--radius-md)', resize: 'vertical', minHeight: '120px', transition: 'var(--transition-fast)' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <div className="prompt-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
              <div className="prompt-char-count" id="prompt-char-count" aria-live="polite" style={{ fontSize: 'var(--prompt-hint-size)', color: 'var(--text-muted)' }}>
                  <span id="char-current">{prompt.length}</span> / 500 ký tự
              </div>

              <button
                  type="button"
                  id="show-examples-btn"
                  className="show-examples-btn"
                  aria-expanded={showExamples}
                  aria-controls="prompt-examples"
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-4) var(--spacing-8)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--primary-color)', background: 'transparent', border: '1px solid var(--primary-color)', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-fast)' }}
                  onClick={() => setShowExamples(!showExamples)}
              >
                  <span style={{ fontSize: '1rem' }}>💡</span>
                  Xem ví dụ
              </button>
          </div>

          {/* Example Prompts (collapsible) */}
          {showExamples && (
          <div id="prompt-examples" className="prompt-examples" style={{ marginTop: 'var(--spacing-8)', padding: 'var(--spacing-8)', background: 'rgba(25, 118, 210, 0.05)', borderLeft: '3px solid var(--primary-color)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-header-glass)', marginBottom: 'var(--spacing-8)' }}>Ví dụ mô tả tốt:</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  <li className="example-item" style={{ margin: 0 }}>
                      <button className="example-btn" onClick={() => handleExampleClick("Vẽ miền nghiệm hệ bất phương trình {x>=0; y>=0; 2x+5y<=10; x+y<=3}")} aria-label="Dùng ví dụ này" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-6)', background: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(148, 163, 184, 0.15)', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-fast)', textAlign: 'left' }}>
                          <span className="example-text" style={{ fontSize: '0.9375rem', color: 'var(--text-on-glass)', lineHeight: '1.5' }}>"Vẽ miền nghiệm hệ bất phương trình {'{x>=0; y>=0; 2x+5y<=10; x+y<=3}'}"</span>
                          <span className="example-action" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>Dùng</span>
                      </button>
                  </li>
                  <li className="example-item" style={{ margin: 0 }}>
                      <button className="example-btn" onClick={() => handleExampleClick("vẽ bảng biến thiên của hàm số y = x^3 - 3x + 1")} aria-label="Dùng ví dụ này" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-6)', background: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(148, 163, 184, 0.15)', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-fast)', textAlign: 'left' }}>
                          <span className="example-text" style={{ fontSize: '0.9375rem', color: 'var(--text-on-glass)', lineHeight: '1.5' }}>"vẽ bảng biến thiên của hàm số y = x^3 - 3x + 1"</span>
                          <span className="example-action" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>Dùng</span>
                      </button>
                  </li>
                  <li className="example-item" style={{ margin: 0 }}>
                      <button className="example-btn" onClick={() => handleExampleClick("Vẽ đa giác đều 5 cạnh ABCDE, đường tròn ngoại tiếp ABCDE có màu đỏ")} aria-label="Dùng ví dụ này" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-6)', background: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(148, 163, 184, 0.15)', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-fast)', textAlign: 'left' }}>
                          <span className="example-text" style={{ fontSize: '0.9375rem', color: 'var(--text-on-glass)', lineHeight: '1.5' }}>"Vẽ đa giác đều 5 cạnh ABCDE, đường tròn ngoại tiếp ABCDE có màu đỏ"</span>
                          <span className="example-action" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>Dùng</span>
                      </button>
                  </li>
              </ul>
          </div>
          )}

          {/* Generate Button */}
          <div className="prompt-actions" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-8)' }}>
              <button
                  type="button"
                  id="generate-tikz-btn"
                  className="generate-btn"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  title="Sinh code TikZ"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-8) var(--spacing-12)', fontSize: '1.125rem', fontWeight: 600, color: 'white', background: 'linear-gradient(135deg, var(--primary-color), #1565c0)', border: 'none', borderRadius: 'var(--radius-md)', cursor: isGenerating || !prompt.trim() ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)', transition: 'var(--transition-fast)' }}
              >
                  <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{isGenerating ? '⏳' : '🎨'}</span>
                  <span>{isGenerating ? 'Đang tạo mã...' : 'Sinh mã TikZ'}</span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default PromptSection;
