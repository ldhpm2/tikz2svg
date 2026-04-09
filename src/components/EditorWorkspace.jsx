import React, { useEffect, useRef, useState } from 'react';
import './EditorWorkspace.css';

const EditorWorkspace = ({ tikzCode, onCodeChange }) => {
  const editorRef = useRef(null);
  const codeMirrorRef = useRef(null);
  const previewRef = useRef(null);
  const [isCompiling, setIsCompiling] = useState(false);

  // Initialize CodeMirror
  useEffect(() => {
    if (window.CodeMirror && editorRef.current && !codeMirrorRef.current) {
      codeMirrorRef.current = window.CodeMirror.fromTextArea(editorRef.current, {
        mode: 'stex',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
      });

      codeMirrorRef.current.on('change', (instance) => {
        onCodeChange(instance.getValue());
      });
    }
  }, []);

  // Sync internal CodeMirror value with prop (from Generator)
  useEffect(() => {
    if (codeMirrorRef.current && codeMirrorRef.current.getValue() !== tikzCode) {
      codeMirrorRef.current.setValue(tikzCode);
    }
    // Trigger compilation
    handleCompile();
  }, [tikzCode]);

  const handleCompile = () => {
    if (!previewRef.current) return;
    
    setIsCompiling(true);
    
    // TikZJax logic: Clear container and inject new script tag
    previewRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.type = 'text/tikz';
    script.textContent = tikzCode;
    previewRef.current.appendChild(script);

    // TikZJax automatically picks up new scripts and renders them.
    // We simulate a small "compilation" delay for UI feedback
    setTimeout(() => {
      setIsCompiling(false);
    }, 500);
  };

  return (
    <section className="editor-workspace container animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="section-title mb-4">Trình biên dịch TikZ</h2>
      
      <div className="workspace-grid">
        <div className="editor-side glass-card">
          <div className="card-header">
            <span><i className="fas fa-code"></i> TikZ Code</span>
            <div className="header-actions">
              <button className="action-btn" onClick={handleCompile} disabled={isCompiling}>
                {isCompiling ? 'Đang chạy...' : 'Biên dịch'}
              </button>
            </div>
          </div>
          <textarea ref={editorRef} defaultValue={tikzCode}></textarea>
        </div>

        <div className="preview-side glass-card">
          <div className="card-header">
            <span><i className="fas fa-image"></i> Preview Live</span>
            <div className="header-actions">
              <button className="icon-btn" title="Download SVG"><i className="fas fa-download"></i></button>
            </div>
          </div>
          <div className="preview-container">
            {isCompiling && (
              <div className="compiling-overlay">
                <div className="spinner"></div>
                <span>Đang xử lý hình vẽ...</span>
              </div>
            )}
            {/* Target for TikZJax */}
            <div ref={previewRef} className="tikz-render-target"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorWorkspace;
