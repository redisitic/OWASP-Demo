import React, { useState } from 'react';
import axios from 'axios';

function Injection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vulnerableResponse, setVulnerableResponse] = useState('');
  const [secureResponse, setSecureResponse] = useState('');

  const loginVulnerable = async () => {
    try {


      const res = await axios.post('http://localhost:5000/api/auth/login-insecure', {
        username,
        password,
      });
      setVulnerableResponse(`Success!`);
    } catch (err) {
      setVulnerableResponse(`Error: ${err.response?.data?.message || err.message}`);
    }
  };



  const loginSecure = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login-secure', {
        username,
        password,
      });
      setSecureResponse(`Success!`);
    } catch (err) {
      setSecureResponse(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h2>Injection Demo (MongoDB Injection)</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Demonstrates bypassing authentication by injecting NoSQL operators (e.g., <code>{`{"$ne": null}`}</code>).
      </p>

      <div className="card">
        <h3>Login Form</h3>
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={loginVulnerable} className="danger">
            Login (Vulnerable)
          </button>
          <button onClick={loginSecure}>Login (Secure)</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h4>Vulnerable Response</h4>
          <pre>{vulnerableResponse || 'Waiting for input...'}</pre>
        </div>
        <div className="card">
          <h4>Secure Response</h4>
          <pre>{secureResponse || 'Waiting for input...'}</pre>
        </div>
      </div>
    </div>
  );
}

export default Injection;