import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { formatINR, getRelativeTime } from '../utils/formatters';

export default function DealCard({ deal, isDark }) {
  const [hovered, setHovered] = useState(false);

  const badgeStyle = deal.funding_type === 'Equity'
    ? { background: 'rgba(59, 169, 235, 0.15)', color: '#3BA9EB' }
    : deal.funding_type === 'Loan'
      ? { background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }
      : { background: 'rgba(157, 140, 255, 0.15)', color: '#9D8CFF' };

  return (
    <div className="col d-flex">
      <div
        className={`card h-100 w-100 rounded-4 p-3 border ${hovered ? 'shadow-lg' : 'shadow-sm'
          } ${isDark ? 'text-light border-secondary' : 'text-dark border-light-subtle'}`}
        style={{
          backgroundColor: isDark
            ? (hovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)')
            : (hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)'),
          borderColor: hovered ? '#3BA9EB' : undefined,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="card-title fw-bold mb-1">{deal.company_name}</h6>
            <small className="text-secondary">{deal.founder_name} &bull; {deal.sector}</small>
          </div>
          <span className="badge rounded-pill px-2 py-1" style={badgeStyle}>
            {deal.funding_type}
          </span>
        </div>

        <p className="card-text text-secondary small flex-grow-1 my-3" style={{ minHeight: '3rem' }}>
          {deal.pitch}
        </p>

        <hr className={`my-2 ${isDark ? 'border-secondary border-opacity-25' : 'border-light-subtle'}`} />

        <div className="d-flex justify-content-between align-items-end mt-2">
          <div>
            <span className="text-secondary d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Amount Sought</span>
            <span className="fw-bold" style={{ color: '#3BA9EB' }}>₹{formatINR(deal.amount_sought)}</span>
          </div>
          {deal.funding_type === 'Equity' && deal.equity_offered && (
            <div className="text-end">
              <span className="text-secondary d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Equity</span>
              <span className="fw-bold" style={{ color: '#9D8CFF' }}>{deal.equity_offered}%</span>
            </div>
          )}
        </div>

        <div className="d-flex align-items-center gap-1 text-secondary mt-2" style={{ fontSize: '0.7rem' }}>
          <Clock size={12} />
          <span>{getRelativeTime(deal.created_at)}</span>
        </div>
      </div>
    </div>
  );
}