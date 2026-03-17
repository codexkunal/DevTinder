import React from 'react';
import { Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2024 DevTinder. Connecting developers since 2023.
            </span>
          </div>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map((link, i) => (
              <a key={i} href="#" className="text-xs no-underline transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;