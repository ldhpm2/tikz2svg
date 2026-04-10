import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" style={{ background: 'var(--bg-secondary)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-color)', marginTop: '3rem', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                TikZ to SVG © {new Date().getFullYear()}. Chuyển đổi mã TikZ sang ảnh vector chất lượng cao.
            </p>
            <div className="footer-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <a href="/terms-of-service" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-file-contract" style={{ fontSize: '1rem' }}></i> Điều khoản sử dụng
                </a>
                <a href="/privacy-policy" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-user-shield" style={{ fontSize: '1rem' }}></i> Chính sách bảo mật
                </a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
