import React from 'react';
import { Plus, Sun, Moon, LogOut } from 'lucide-react';

export default function Header({ isDark, onToggleTheme, onOpenModal, onLogout }) {
  return (
    <header
      className={`navbar sticky-top border-bottom py-3 px-3 px-md-5 ${isDark ? 'navbar-dark border-secondary border-opacity-25' : 'navbar-light border-light-subtle'
        }`}
      style={{
        backgroundColor: isDark ? 'rgba(6, 8, 14, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div className="container-fluid max-w-6xl d-flex justify-content-between align-items-center">
        {/* Brand identity with SVG image */}
        <div className="d-flex align-items-center gap-2">
          <img
            src="/gemini-svg.svg"
            alt="SharkIT Logo"
            width={36}
            height={36}
            className="rounded-3"
            style={{ objectFit: 'contain', display: 'inline-block' }}
          />
          <div>
            <h6 className="mb-0 fw-bold" style={{ color: '#3BA9EB', letterSpacing: '-0.2px' }}>
              FinPulse
            </h6>
            <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
              Founder Investment Asks
            </small>
          </div>
        </div>

        {/* Action controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Post an Ask Button: Color-only hover */}
          <button
            className="btn btn-sm text-white rounded-pill px-3 d-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#3BA9EB', border: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2582b8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3BA9EB'; }}
            onClick={onOpenModal}
          >
            <Plus size={15} /> Post an Ask
          </button>

          {/* Theme Toggle Button: Color-only hover */}
          <button
            className={`btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center p-0 border ${isDark ? 'border-secondary' : 'border-secondary-subtle'
              }`}
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'transparent',
              color: isDark ? '#3BA9EB' : '#495057',
              transition: 'background-color 0.2s, border-color 0.2s, color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3BA9EB';
              e.currentTarget.style.borderColor = '#3BA9EB';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = isDark ? 'rgba(108, 117, 125, 0.5)' : '#dee2e6';
              e.currentTarget.style.color = isDark ? '#3BA9EB' : '#495057';
            }}
            onClick={onToggleTheme}
            title="Toggle theme"
          >
            {isDark ? <Sun size={16} color="currentColor" /> : <Moon size={16} color="currentColor" />}
          </button>

          {/* Logout Button: Native Bootstrap btn-outline-danger hover */}
          <button
            className="btn btn-sm btn-outline-danger rounded-circle d-inline-flex align-items-center justify-content-center p-0"
            style={{ width: '36px', height: '36px' }}
            onClick={onLogout}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}