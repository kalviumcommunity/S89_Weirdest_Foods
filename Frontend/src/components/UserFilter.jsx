import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api';

const UserFilter = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        if (response.data && response.data.data) {
          setUsers(response.data.data);
        }
        setError('');
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    onUserSelect(userId || null); // Pass null if "All Users" is selected
  };

  // Find the selected user for display
  const selectedUser = selectedUserId
    ? users.find(user => user._id === selectedUserId)
    : null;

  if (loading) {
    return (
      <div className="user-filter-loading" style={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        color: '#4A6FFF',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <div className="loading-spinner" style={{
          width: '20px',
          height: '20px',
          border: '3px solid rgba(74, 111, 255, 0.2)',
          borderTop: '3px solid #4A6FFF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff8f8',
        border: '1px solid #ffebeb',
        color: '#dc3545',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(220,53,69,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      marginBottom: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <label htmlFor="userFilter" style={{
          fontWeight: '600',
          color: '#4A5568',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Filter by Creator
        </label>

        {selectedUserId && (
          <button
            onClick={() => handleUserChange({ target: { value: '' } })}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#4A6FFF',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              padding: '6px 10px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 111, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Clear filter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Clear filter
          </button>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <select
          id="userFilter"
          value={selectedUserId}
          onChange={handleUserChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          style={{
            width: '100%',
            padding: '14px 16px',
            paddingRight: '45px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FAFAFA',
            appearance: 'none',
            fontSize: '16px',
            color: '#4A5568',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isOpen ? '0 0 0 3px rgba(74, 111, 255, 0.2)' : 'none',
            outline: 'none'
          }}
          aria-label="Select user to filter by"
        >
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>

        <div style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
          pointerEvents: 'none',
          color: '#4A6FFF',
          transition: 'transform 0.2s ease'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {selectedUser && (
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          backgroundColor: 'rgba(74, 111, 255, 0.08)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          color: '#4A5568',
          animation: 'fadeIn 0.3s ease'
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-5px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#4A6FFF',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            {selectedUser.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: '600' }}>{selectedUser.username}</div>
            <div style={{ fontSize: '12px', color: '#718096' }}>{selectedUser.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilter;
