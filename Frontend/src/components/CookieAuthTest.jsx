import React, { useState, useEffect } from 'react';
import { checkAuthCookie } from '../api';

const CookieAuthTest = () => {
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    authenticated: false,
    username: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await checkAuthCookie();
        setAuthStatus({
          loading: false,
          authenticated: result.authenticated,
          username: result.username || null
        });
      } catch (error) {
        console.error('Error checking auth cookie:', error);
        setAuthStatus({
          loading: false,
          authenticated: false,
          username: null
        });
      }
    };

    checkAuth();
  }, []);

  if (authStatus.loading) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        margin: '20px 0',
        textAlign: 'center'
      }}>
        Checking authentication status...
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      backgroundColor: authStatus.authenticated ? '#e6f7ff' : '#fff8f8',
      borderRadius: '8px',
      margin: '20px 0',
      border: `1px solid ${authStatus.authenticated ? '#91caff' : '#ffccc7'}`
    }}>
      <h3 style={{ marginTop: 0 }}>Cookie Authentication Status</h3>
      
      {authStatus.authenticated ? (
        <div>
          <p style={{ color: '#389e0d', fontWeight: 'bold' }}>
            ✅ Authenticated via Cookie
          </p>
          <p>Welcome, <strong>{authStatus.username}</strong>!</p>
        </div>
      ) : (
        <p style={{ color: '#cf1322' }}>
          ❌ Not authenticated via Cookie
        </p>
      )}
    </div>
  );
};

export default CookieAuthTest;
