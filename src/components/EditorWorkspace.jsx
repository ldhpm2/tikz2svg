import React, { useEffect, useRef, useState } from 'react';
import './EditorWorkspace.css';

const EditorWorkspace = ({ tikzCode, onCodeChange }) => {
  const textareaRef = useRef(null);
  const cmRef = useRef(null);
  
  // State for rendering debounced TikZ in iframe
  const [debouncedCode, setDebouncedCode] = useState(tikzCode);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    // Initialize CodeMirror from global CDN if available
    if (window.CodeMirror && textareaRef.current && !cmRef.current) {
      cmRef.current = window.CodeMirror.fromTextArea(textareaRef.current, {
        mode: 'stex',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
      });

      cmRef.current.on('change', (instance) => {
        const val = instance.getValue();
        onCodeChange(val);
      });
    }
  }, []);

  // Sync prop changes back to CodeMirror (e.g. from AI Generation)
  useEffect(() => {
    if (cmRef.current && cmRef.current.getValue() !== tikzCode) {
      cmRef.current.setValue(tikzCode);
    }
  }, [tikzCode]);

  // Debounce logic for compiling (so iframe doesnt flash on every keystroke)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(tikzCode);
    }, 1000);

    return () => clearInterval(handler);
  }, [tikzCode]);

  const handleCompileClick = (e) => {
    e.preventDefault();
    setIsCompiling(true);
    setDebouncedCode(tikzCode); // Force compile immediately
    setTimeout(() => setIsCompiling(false), 800); // Fake compile state for UI feedback
  };

  const getIframeSrcDoc = (code) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="https://tikzjax.com/v1/fonts.css">
      <script src="https://tikzjax.com/v1/tikzjax.js"><\/script>
      <style>
        body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: inherit; min-height: calc(100vh - 40px); background: transparent; overflow: auto; }
        svg { max-width: 100%; height: auto; }
        /* Style the default loading text of TikzJax */
        .tikz-loader { font-family: sans-serif; color: #888; margin-top: 50vh; transform: translateY(-50%); }
      </style>
    </head>
    <body>
      <script type="text/tikz">${code.replace(/</g, '\\u003c')}<\/script>
    </body>
    </html>
  `;

  return (
    <div className="input-preview-section page-container editor-workspace">
      <h2 className="index-title">Chuyển đổi TikZ sang SVG/PNG/JPEG</h2>

      <div className="table-scroll-x">
        <div className="table-content" style={{ display: 'flex', gap: '2rem' }}>
          
          <div className="col" style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
            <form id="tikz-form" onSubmit={handleCompileClick} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <textarea 
                ref={textareaRef}
                name="code" 
                id="code" 
                className="tikz-code-textarea" 
                rows="12" 
                placeholder="&#10;\begin{tikzpicture}&#10;    ...&#10;\end{tikzpicture}"
                defaultValue={tikzCode}
                style={{ flexGrow: 1, width: '100%', fontFamily: 'Courier, monospace', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
              ></textarea>
              <div className="d-flex justify-content-start align-items-center gap-2" id="compile-save-row" style={{ marginTop: '1rem' }}>
                <button type="submit" id="compile-btn" className="compile-save-row-btn" disabled={isCompiling} style={{ padding: '8px 16px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isCompiling ? 'not-allowed' : 'pointer', minWidth: '120px' }}>
                  {isCompiling ? 'Đang dịch...' : 'Biên dịch'}
                </button>
                <button
                  type="button"
                  id="save-server-btn"
                  className="compile-save-row-btn"
                  onClick={() => alert("Tính năng Cloud Database đang được phát triển!")}
                  style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  💾 Lưu server
                </button>
              </div>
            </form>
          </div>
          
          <div className="col" style={{ flex: '1 1 50%', background: 'rgb(255, 255, 255)', borderRadius: '8px', border: '1px solid var(--border-color)', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {debouncedCode.trim() ? (
              <iframe
                title="TikZ Preview"
                srcDoc={getIframeSrcDoc(debouncedCode)}
                style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="preview-placeholder">
                <p style={{ color: '#666', textAlign: 'center' }}>Nhập code TikZ để xem preview real-time</p>
              </div>
            )}
             
            {isCompiling && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Đang cập nhật...</span>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* Thông báo hướng dẫn cho mobile - Enhanced UX */}
      <div id="mobile-scroll-hint" className="mobile-scroll-hint" style={{ display: 'none' }}>
        <div className="hint-content">
          <span className="hint-icon">👆</span>
          <span className="hint-text">Vuốt ngang để xem đủ 2 cột</span>
          <button className="hint-dismiss" aria-label="Đóng thông báo">×</button>
        </div>
      </div>
    </div>
  );
};

export default EditorWorkspace;
