import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import { Sun, Moon, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginModal({ onLogin, isDark, onToggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@sharkit.demo' && password === 'sharkit2026') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin@sharkit.demo / sharkit2026');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-3"
      style={{ backgroundColor: isDark ? '#06080E' : '#F4F6FC' }}
    >
      <div
        className={`card rounded-4 p-4 border shadow-lg ${isDark ? 'text-light border-secondary border-opacity-25' : 'text-dark border-light-subtle'
          }`}
        style={{
          maxWidth: 420,
          width: '100%',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <BrandLogo size={34} />
            <h6 className="mb-0 fw-bold" style={{ color: '#3BA9EB' }}>FinPulse Portal</h6>
          </div>
          <button
            className={`btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center p-0 border ${isDark ? 'border-secondary text-warning' : 'border-secondary-subtle text-secondary'
              }`}
            style={{ width: '36px', height: '36px' }}
            onClick={onToggleTheme}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <h4 className="fw-bold mb-1">Welcome Back</h4>
        <small className="text-secondary mb-4 d-block">Sign in to browse curated founder asks</small>

        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 rounded-3">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small text-secondary">Email</label>
            <input
              type="email"
              required
              className={`form-control rounded-3 ${isDark ? 'bg-black bg-opacity-25 text-light border-secondary' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sharkit.demo"
            />
          </div>

          <div className="mb-3">
            <label className="form-label small text-secondary">Password</label>
            <input
              type="password"
              required
              className={`form-control rounded-3 ${isDark ? 'bg-black bg-opacity-25 text-light border-secondary' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn text-white w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold mt-3 rounded-3"
            style={{ backgroundColor: '#3BA9EB' }}
          >
            Sign In to Feed <ArrowRight size={16} />
          </button>
        </form>

        <div className="alert alert-info py-2 mt-4 mb-0 small d-flex align-items-center gap-2 rounded-3">
          <ShieldCheck size={16} />
          <span>admin@sharkit.demo &bull; sharkit2026</span>
        </div>
      </div>
    </div>
  );
}