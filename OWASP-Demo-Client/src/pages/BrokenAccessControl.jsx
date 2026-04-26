import React, { useState } from 'react';
import axios from 'axios';

function BrokenAccessControl() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [responseSecure, setResponseSecure] = useState('');

  // Registration State
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('user');

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: regUsername,
        password: regPassword,
        role: regRole
      });
      alert('User registered successfully! Now try logging in.');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      setToken(res.data.token);
    } catch (err) {
      alert(err);
    }
  };

  const testSecure = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin-data-secure', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseSecure(res.data);
    } catch (err) {
      setResponseSecure(err.response?.data || 'Error');
    }
  };

  return (
    <div>
      <h2>Broken Access Control Demo</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Demonstrates improper authorization checks (IDOR/Privilege Escalation).
      </p>

      <div className="card">
        <h3>0. Register (Exploit: Set Role to 'admin')</h3>
        <div className="input-group">
          <input
            placeholder="New Username"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <input
            placeholder="New Password"
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '5px', display: 'block' }}>
            Role (Try changing to 'admin'):
          </label>
          <input
            placeholder="Role"
            value={regRole}
            onChange={(e) => setRegRole(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <button onClick={register}>Register</button>
      </div>

      <div className="card">
        <h3>1. Login</h3>
        <div className="input-group">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login}>Login</button>
      </div>

      <div className="card">
        <h3>2. Your Identity (JWT)</h3>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          This token proves who you are. An attacker can tamper with this if the secret is weak.
        </p>
        <textarea
          rows="4"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
        />
      </div>

      <div className="card">
        <h3>3. Admin Panel</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={testSecure} className={responseSecure.includes('Welcome') ? 'success' : ''}>
            Access Protected Data
          </button>

          {responseSecure && (
            <span style={{
              color: responseSecure.includes('Welcome') ? 'var(--success)' : 'var(--danger)',
              fontWeight: 'bold'
            }}>
              {responseSecure}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrokenAccessControl;