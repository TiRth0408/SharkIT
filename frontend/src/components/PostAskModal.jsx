import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

export default function PostAskModal({ isOpen, onClose, onSubmit, isDark }) {
  const [form, setForm] = useState({
    company_name: '',
    founder_name: '',
    sector: '',
    pitch: '',
    funding_type: 'Equity',
    amount_sought: '',
    equity_offered: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      company_name: form.company_name.trim(),
      founder_name: form.founder_name.trim(),
      sector: form.sector.trim(),
      pitch: form.pitch.trim(),
      funding_type: form.funding_type,
      amount_sought: Number(form.amount_sought),
      equity_offered: form.funding_type === 'Equity' && form.equity_offered !== ''
        ? Number(form.equity_offered)
        : null
    };

    const res = await onSubmit(payload);
    if (!res.success) {
      setError(res.error);
      setSubmitting(false);
    } else {
      setSubmitting(false);
      onClose();
    }
  };

  const inputClasses = `form-control form-control-sm rounded-3 ${
    isDark ? 'bg-dark text-light border-secondary' : 'bg-light text-dark border-secondary-subtle'
  }`;

  const selectClasses = `form-select form-select-sm rounded-3 ${
    isDark ? 'bg-dark text-light border-secondary' : 'bg-light text-dark border-secondary-subtle'
  }`;

  return (
    <div
      className="modal show d-block"
      style={{
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
      }}
    >
      {/* w-100 + px-3 so it never clips on xs; maxWidth caps it on larger screens */}
      <div
        className="modal-dialog modal-dialog-centered mx-auto w-100"
        style={{ maxWidth: 520, padding: '0 0.75rem' }}
      >
        <div
          className={`modal-content rounded-4 border shadow-lg ${
            isDark ? 'bg-dark text-light border-secondary' : 'bg-white text-dark'
          }`}
          style={{
            maxHeight: 'calc(100dvh - 3rem)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Fixed header */}
          <div className="d-flex justify-content-between align-items-center px-4 pt-4 pb-2" style={{ flexShrink: 0 }}>
            <h5 className="fw-bold d-flex align-items-center gap-2 mb-0" style={{ fontSize: '1rem' }}>
              <Plus size={18} style={{ color: '#3BA9EB' }} /> Post Investment Ask
            </h5>
            <button
              type="button"
              className={`btn-close ${isDark ? 'btn-close-white' : ''}`}
              onClick={onClose}
            />
          </div>

          {/* Scrollable form body — only scrolls if viewport is very short */}
          <div className="px-4 pb-4 pt-1" style={{ overflowY: 'auto', flex: '1 1 auto' }}>
            {error && (
              <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 rounded-3 mb-3">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-2">
              {/* Company + Founder side by side on sm+, stacked on xs */}
              <div className="col-12 col-sm-6">
                <label className="form-label small text-secondary mb-1">Company Name</label>
                <input
                  required
                  placeholder="e.g. Acme Flow"
                  className={inputClasses}
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                />
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label small text-secondary mb-1">Founder Name</label>
                <input
                  required
                  placeholder="e.g. Priya Sharma"
                  className={inputClasses}
                  value={form.founder_name}
                  onChange={(e) => setForm({ ...form, founder_name: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label small text-secondary mb-1">Sector</label>
                <input
                  required
                  placeholder="e.g. FinTech, AgriTech"
                  className={inputClasses}
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label small text-secondary mb-1">Pitch</label>
                <textarea
                  required
                  rows={3}
                  style={{ resize: 'none' }}
                  placeholder="Describe your startup to investors..."
                  className={inputClasses}
                  value={form.pitch}
                  onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                />
              </div>

              {/* Funding type + Amount — col-6 on sm+, full-width stacked on xs */}
              <div className="col-12 col-sm-6">
                <label className="form-label small text-secondary mb-1">Funding Type</label>
                <select
                  className={selectClasses}
                  value={form.funding_type}
                  onChange={(e) => setForm({ ...form, funding_type: e.target.value })}
                >
                  <option value="Equity">Equity</option>
                  <option value="Loan">Loan</option>
                  <option value="Grant">Grant</option>
                </select>
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label small text-secondary mb-1">Amount (₹)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="₹ 50,00,000"
                  className={inputClasses}
                  value={form.amount_sought
                    ? Number(form.amount_sought).toLocaleString('en-IN')
                    : ''}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setForm({ ...form, amount_sought: raw });
                  }}
                />
              </div>

              {form.funding_type === 'Equity' && (
                <div className="col-12">
                  <label className="form-label small text-secondary mb-1">Equity Offered (%)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    required
                    placeholder="5.0"
                    className={inputClasses}
                    value={form.equity_offered}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      setForm({ ...form, equity_offered: val });
                    }}
                  />
                </div>
              )}

              {/* Buttons — full width on xs, right-aligned on sm+ */}
              <div className="col-12 d-flex flex-column flex-sm-row justify-content-sm-end gap-2 pt-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill px-4"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-sm text-white rounded-pill px-4 shadow-sm"
                  style={{ backgroundColor: '#3BA9EB', border: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2582b8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3BA9EB'; }}
                >
                  {submitting ? 'Publishing...' : 'Publish Ask'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}