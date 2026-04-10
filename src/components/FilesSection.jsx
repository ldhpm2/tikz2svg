import React from 'react';

const FilesSection = () => {
  // Demo mock data based on the structure
  const files = [
    {
      id: 340,
      username: 'khangvotranphuc',
      date: '08/04/2026 15:06',
      filename: '101546306489151851711_150612080426.svg',
      likes: 0,
      comments: 0
    },
    {
      id: 339,
      username: 'huongnamvuphuong',
      date: '08/04/2026 09:25',
      filename: '113787305524961843027_092530080426.svg',
      likes: 0,
      comments: 0
    }
  ];

  return (
    <div className="files-section-container files-section" data-is-owner="false">
      <h3 className="files-section-title">📁 Files đã lưu (220 files)</h3>
      <div id="files-container" className="files-grid">
        {files.map(file => (
          <div key={file.id} className="file-card" data-file-id={file.id}>
            <button className="action-toggle-btn" type="button" aria-label="Hiện menu hành động">⋯</button>

            {/* File Info */}
            <div className="file-info">
              <div className="file-creator" style={{ marginBottom: 0, fontSize: '12px' }}>
                👤 <a href={`/profile/${file.username}/svg-files`} style={{ textDecoration: 'none', color: 'var(--primary-light)', fontWeight: 700, fontSize: '13px' }}>
                  {file.username}
                </a>
                <span style={{ marginLeft: '8px', color: 'var(--text-muted)', fontSize: '11px' }}>{file.date}</span>
              </div>
            </div>

            {/* Image Container Demo */}
            <div className="file-img-container" data-filename={file.filename} style={{ cursor: 'pointer', background: 'white', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid #ccc', margin: '10px 0' }}>
              <span style={{ color: '#aaa', fontSize: '12px' }}>[SVG Image: {file.filename}]</span>
            </div>

            {/* Interaction Row */}
            <div className="interaction-buttons-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <div className="like-button-wrapper">
                <div className="like-button">
                  <input id={`heart-${file.id}`} type="checkbox" disabled />
                  <label className="like" htmlFor={`heart-${file.id}`} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                    <svg className="like-icon" fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
                    </svg>
                    <div className="like-count-container">
                      <span className="like-count one">{file.likes}</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="comment-count-wrapper">
                <a href="#" className="comment-count-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'inherit' }}>
                  <i className="fas fa-comment"></i>
                  <span className="comment-count">{file.comments}</span>
                </a>
              </div>
            </div>
            
            <div className="file-action-container">
                <ul className="file-action-list">
                    <li className="file-action-item">
                        <button type="button" className="Btn" data-action="download-image">
                            <div className="sign">
                                <i className="fas fa-image logoIcon"></i>
                            </div>
                            <div className="text">Tải ảnh</div>
                        </button>
                    </li>
                    <li className="file-action-item">
                        <button type="button" className="Btn" data-action="toggle-code">
                            <div className="sign">
                                <i className="fas fa-code logoIcon"></i>
                            </div>
                            <div className="text">Xem Code</div>
                        </button>
                    </li>
                </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesSection;
