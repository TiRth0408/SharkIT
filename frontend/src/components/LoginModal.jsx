import React, { useState } from 'react';

export default function LoginModal({ onLogin, onToggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === 'admin@sharkit.demo' && password === 'sharkit2026') {
      setTimeout(() => {
        setLoading(false);
        if (typeof onLogin === 'function') {
          onLogin({ email, role: 'admin' });
        }
      }, 250);
    } else {
      setLoading(false);
      setError('Invalid credentials. Use admin@sharkit.demo / sharkit2026');
    }
  };

  const fillCredentials = () => {
    setEmail('admin@sharkit.demo');
    setPassword('sharkit2026');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#05070B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '438px',
          backgroundColor: '#0C1017',
          border: '1px solid #1A2230',
          borderRadius: '20px',
          padding: '34px 34px 30px 34px',
          boxSizing: 'border-box',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Waveform / Pulse Logo Badge */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #18233C 0%, #0F1626 100%)',
                border: '1.5px solid #2B59FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 10px rgba(43, 89, 255, 0.35)',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 53H34L43 27L56 75L68 45L74 53H82"
                  stroke="#7B8CFF"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="43" cy="27" r="5.5" fill="#3BA9EB" />
              </svg>
            </div>
            <span
              style={{
                color: '#29B6F6',
                fontSize: '15px',
                fontWeight: '700',
                letterSpacing: '-0.2px',
              }}
            >
              FinPulse Portal
            </span>
          </div>

          {/* Sun Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#121722',
              border: '1px solid #1F2838',
              color: '#FBBF24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
            </svg>
          </button>
        </div>

        {/* Heading & Subtext */}
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 6px 0',
            letterSpacing: '-0.3px',
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            color: '#606C7E',
            fontSize: '13.5px',
            fontWeight: '400',
            margin: '0 0 24px 0',
          }}
        >
          Sign in to browse curated founder asks
        </p>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#F87171',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                color: '#606C7E',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@sharkit.demo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: '#070A0F',
                border: '1px solid #1C2333',
                borderRadius: '8px',
                padding: '0 14px',
                color: '#E2E8F0',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '22px' }}>
            <label
              style={{
                display: 'block',
                color: '#606C7E',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: '#070A0F',
                border: '1px solid #1C2333',
                borderRadius: '8px',
                padding: '0 14px',
                color: '#E2E8F0',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: '42px',
              backgroundColor: '#2EA5E8',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14.5px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2593d1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2EA5E8')}
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In to Feed</span>
                <span style={{ fontSize: '15px' }}>→</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Pill */}
        <div
          onClick={fillCredentials}
          title="Click to fill credentials"
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: '#CEF5F6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#084852',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#084852"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>admin@sharkit.demo • sharkit2026</span>
        </div>
      </div>
    </div>
  );
}