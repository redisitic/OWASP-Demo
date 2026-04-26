import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import BrokenAccessControlDemo from './pages/BrokenAccessControl';
import Injection from './pages/Injection';
import SSRF from './pages/SSRF.jsx';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <div className="sidebar">
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>SEC<span style={{ color: 'var(--accent-primary)' }}>DEMO</span></h1>
      <nav>
        <Link to="/vulnerability/1" className={isActive('/vulnerability/1')}>1. Broken Access Control</Link>
        <Link to="/vulnerability/2" className={isActive('/vulnerability/2')}>2. NoSQL Injection</Link>
        <Link to="/vulnerability/3" className={isActive('/vulnerability/3')}>3. SSRF</Link>
        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <small style={{ color: 'var(--text-secondary)' }}>OWASP Top 10 Demo</small>
        </div>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div className="card"><h2>Select a Demo</h2><p>Choose a vulnerability from the sidebar to begin.</p></div>} />
            <Route path="/vulnerability/1" element={<BrokenAccessControlDemo />} />
            <Route path="/vulnerability/2" element={<Injection />} />
            <Route path="/vulnerability/3" element={<SSRF />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
