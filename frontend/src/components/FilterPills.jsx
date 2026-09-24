import React from 'react';

const PILLS = ['All', 'Equity', 'Loan', 'Grant'];

export default function FilterPills({ filter, onSelect, isDark, count }) {
  return (
    <div className="mb-4">
      {/* Pills row + count — stack on xs, side-by-side on sm+ */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div className="d-flex flex-wrap gap-2">
          {PILLS.map((pill) => {
            const active = filter === pill;
            return (
              <button
                key={pill}
                onClick={() => onSelect(pill)}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                  active
                    ? 'text-white'
                    : isDark
                      ? 'btn-outline-secondary text-light'
                      : 'btn-outline-secondary text-dark'
                }`}
                style={{
                  backgroundColor: active ? '#3BA9EB' : 'transparent',
                  borderColor: active ? '#3BA9EB' : undefined,
                  fontSize: '0.82rem',
                }}
                onMouseEnter={(e) => {
                  if (active) {
                    e.currentTarget.style.backgroundColor = '#2582b8';
                    e.currentTarget.style.borderColor = '#2582b8';
                  } else {
                    e.currentTarget.style.backgroundColor = isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (active) {
                    e.currentTarget.style.backgroundColor = '#3BA9EB';
                    e.currentTarget.style.borderColor = '#3BA9EB';
                  } else {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {pill}
              </button>
            );
          })}
        </div>

        <small className="text-secondary" style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
          {count} Active {count === 1 ? 'Ask' : 'Asks'}
        </small>
      </div>
    </div>
  );
}