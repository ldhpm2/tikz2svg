import React, { useEffect, useRef, useState } from 'react';
import './EditorWorkspace.css';

const EditorWorkspace = () => {
  const editorRef = useRef(null);
  const codeMirrorRef = useRef(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // Initialize CodeMirror via CDN-loaded global
    if (window.CodeMirror && editorRef.current && !codeMirrorRef.current) {
      codeMirrorRef.current = window.CodeMirror.fromTextArea(editorRef.current, {
        mode: 'stex',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
        placeholder: '\\begin{tikzpicture}\n    \\draw (0,0) circle (1);\n\\end{tikzpicture}'
      });

      // Simple implementation of real-time preview simulation
      codeMirrorRef.current.on('change', () => {
        handleCompile();
      });
    }
  }, []);

  const handleCompile = () => {
    setIsCompiling(true);
    // Simulate compilation delay
    setTimeout(() => {
      setIsCompiling(false);
      // In a real app, this would be an SVG from the backend.
      // We'll use a placeholder for now to demonstrate the UI.
      setPreviewUrl('https://upload.wikimedia.org/wikipedia/commons/b/b3/TikZ_Example_Coordinates.svg');
    }, 800);
  };

  return (
    <section className="editor-workspace container animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="section-title mb-4">Trình biên dịch TikZ</h2>
      
      <div className="workspace-grid">
        {/* Editor Side */}
        <div className="editor-side glass-card">
          <div className="card-header">
            <span><i className="fas fa-code"></i> TikZ Code</span>
            <div className="header-actions">
              <button className="action-btn" onClick={handleCompile} disabled={isCompiling}>
                {isCompiling ? 'Đang chạy...' : 'Biên dịch'}
              </button>
            </div>
          </div>
          <textarea ref={editorRef}></textarea>
        </div>

        {/* Preview Side */}
        <div className="preview-side glass-card">
          <div className="card-header">
            <span><i className="fas fa-image"></i> Preview</span>
            <div className="header-actions">
              <button className="icon-btn" title="Download SVG"><i className="fas fa-download"></i></button>
              <button className="icon-btn" title="Expand"><i className="fas fa-expand"></i></button>
            </div>
          </div>
          <div className="preview-container">
            {isCompiling && (
              <div className="compiling-overlay">
                <div className="spinner"></div>
                <span>Đang xử lý hình vẽ...</span>
              </div>
            )}
            {previewUrl ? (
              <img src={previewUrl} alt="TikZ Preview" className="preview-img" />
            ) : (
              <div className="preview-placeholder">
                <i className="fas fa-paint-brush"></i>
                <p>Nhập mã TikZ để thấy kết quả</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorWorkspace;
