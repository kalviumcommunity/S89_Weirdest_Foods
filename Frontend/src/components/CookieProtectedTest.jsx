import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
const ROUTES_URL = `${API_URL}/routes`;

const CookieProtectedTest = () => {
  const [cookieRouteResult, setCookieRouteResult] = useState(null);
  const [dualRouteResult, setDualRouteResult] = useState(null);
  const [loading, setLoading] = useState({ cookie: false, dual: false });
  const [error, setError] = useState({ cookie: null, dual: null });

  const testCookieProtectedRoute = async () => {
    setLoading(prev => ({ ...prev, cookie: true }));
    setError(prev => ({ ...prev, cookie: null }));
    
    try {
      const response = await axios.get(`${ROUTES_URL}/cookie-protected`, { withCredentials: true });
      setCookieRouteResult(response.data);
    } catch (err) {
      console.error('Error accessing cookie-protected route:', err);
      setError(prev => ({ 
        ...prev, 
        cookie: err.response?.data?.message || 'Failed to access cookie-protected route' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, cookie: false }));
    }
  };

  const testDualProtectedRoute = async () => {
    setLoading(prev => ({ ...prev, dual: true }));
    setError(prev => ({ ...prev, dual: null }));
    
    try {
      const response = await axios.get(`${ROUTES_URL}/dual-protected`, { withCredentials: true });
      setDualRouteResult(response.data);
    } catch (err) {
      console.error('Error accessing dual-protected route:', err);
      setError(prev => ({ 
        ...prev, 
        dual: err.response?.data?.message || 'Failed to access dual-protected route' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, dual: false }));
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      margin: '20px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0 }}>Test Protected Routes</h3>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <button 
            onClick={testCookieProtectedRoute}
            disabled={loading.cookie}
            style={{
              padding: '10px 16px',
              backgroundColor: '#4A6FFF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading.cookie ? 'not-allowed' : 'pointer',
              opacity: loading.cookie ? 0.7 : 1,
              fontWeight: '500'
            }}
          >
            {loading.cookie ? 'Testing...' : 'Test Cookie-Protected Route'}
          </button>
          
          {error.cookie && (
            <div style={{ 
              marginTop: '10px', 
              color: '#dc3545',
              padding: '10px',
              backgroundColor: '#fff8f8',
              borderRadius: '4px',
              border: '1px solid #ffebeb'
            }}>
              {error.cookie}
            </div>
          )}
          
          {cookieRouteResult && (
            <div style={{ 
              marginTop: '10px', 
              padding: '10px',
              backgroundColor: '#e6f7ff',
              borderRadius: '4px',
              border: '1px solid #91caff'
            }}>
              <p><strong>Message:</strong> {cookieRouteResult.message}</p>
              <p><strong>Username:</strong> {cookieRouteResult.user?.username}</p>
              <p><strong>Email:</strong> {cookieRouteResult.user?.email}</p>
              <p><strong>Role:</strong> {cookieRouteResult.user?.role}</p>
            </div>
          )}
        </div>
        
        <div style={{ flex: 1 }}>
          <button 
            onClick={testDualProtectedRoute}
            disabled={loading.dual}
            style={{
              padding: '10px 16px',
              backgroundColor: '#4A6FFF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading.dual ? 'not-allowed' : 'pointer',
              opacity: loading.dual ? 0.7 : 1,
              fontWeight: '500'
            }}
          >
            {loading.dual ? 'Testing...' : 'Test Dual-Protected Route'}
          </button>
          
          {error.dual && (
            <div style={{ 
              marginTop: '10px', 
              color: '#dc3545',
              padding: '10px',
              backgroundColor: '#fff8f8',
              borderRadius: '4px',
              border: '1px solid #ffebeb'
            }}>
              {error.dual}
            </div>
          )}
          
          {dualRouteResult && (
            <div style={{ 
              marginTop: '10px', 
              padding: '10px',
              backgroundColor: '#e6f7ff',
              borderRadius: '4px',
              border: '1px solid #91caff'
            }}>
              <p><strong>Message:</strong> {dualRouteResult.message}</p>
              <p><strong>Username:</strong> {dualRouteResult.user?.username}</p>
              <p><strong>Email:</strong> {dualRouteResult.user?.email}</p>
              <p><strong>Role:</strong> {dualRouteResult.user?.role}</p>
              <p><strong>Auth Method:</strong> {dualRouteResult.authMethod}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieProtectedTest;
