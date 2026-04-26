import React, { useState } from 'react';
import axios from 'axios';

export default function SSRF() {
  const [url, setUrl] = useState('');
  const [responseInsecure, setResponseInsecure] = useState('');
  const [responseSecure, setResponseSecure] = useState('');

  const fetchInsecure = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ssrf/fetch?url=${encodeURIComponent(url)}`);
      setResponseInsecure(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponseInsecure(err.response?.data || err.message);
    }
  };

  const fetchSecure = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ssrf/fetch-secure?url=${encodeURIComponent(url)}`);
      setResponseSecure(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponseSecure(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>SSRF Demo</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Demonstrates forcing the server to make unintended requests to internal resources.
      </p>

      <div className="card">
        <h3>Fetch Resource</h3>
        <div className="input-group">
          <input
            placeholder="Enter URL to fetch (e.g., https://example.com or http://localhost:5000/api/admin-data-secure)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={fetchInsecure} className="danger">Fetch Insecure</button>
          <button onClick={fetchSecure}>Fetch Secure</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h4>Insecure Endpoint</h4>
          <pre style={{ height: '300px', overflow: 'auto' }}>
            {responseInsecure || 'Waiting for request...'}
          </pre>
        </div>
        <div className="card">
          <h4>Secure Endpoint</h4>
          <pre style={{ height: '300px', overflow: 'auto' }}>
            {responseSecure || 'Waiting for request...'}
          </pre>
        </div>
      </div>
    </div>
  );
}