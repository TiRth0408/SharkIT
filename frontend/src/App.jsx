import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterPills from './components/FilterPills';
import DealCard from './components/DealCard';
import PostAskModal from './components/PostAskModal';
import LoginModal from './components/LoginModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('sharkit_theme') || 'dark');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('sharkit_auth'));
  const [deals, setDeals] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sharkit_theme', theme);
  }, [theme]);

  const fetchDeals = async (selectedFilter) => {
    setLoading(true);
    try {
      const url = selectedFilter && selectedFilter !== 'All'
        ? `${API_BASE}/deals?type=${selectedFilter}`
        : `${API_BASE}/deals`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setDeals(data.data);
    } catch (err) {
      console.error('Failed to load deals', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchDeals(filter);
  }, [isAuthenticated, filter]);

  const handlePostDeal = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/deals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.errors?.join(', ') || data.error };
      setDeals((prev) => [data.data, ...prev]);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error connecting to API' };
    }
  };

  const isDark = theme === 'dark';

  if (!isAuthenticated) {
    return (
      <LoginModal
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
        onLogin={() => {
          localStorage.setItem('sharkit_auth', 'true');
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: isDark ? '#06080E' : '#F4F6FC' }}
    >
      <Header
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
        onOpenModal={() => setModalOpen(true)}
        onLogout={() => {
          localStorage.removeItem('sharkit_auth');
          setIsAuthenticated(false);
        }}
      />

      <main className="container-xl py-4 px-3 px-md-4">
        <FilterPills filter={filter} onSelect={setFilter} isDark={isDark} count={deals.length} />

        {loading ? (
          <div className="text-center py-5 text-secondary">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
            Loading live asks...
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-5 text-secondary">
            <p className="mb-1 fw-semibold">No investment asks in this category</p>
            <small>Click "Post an Ask" above to submit your deal.</small>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} isDark={isDark} />
            ))}
          </div>
        )}
      </main>

      <PostAskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePostDeal}
        isDark={isDark}
      />
    </div>
  );
}