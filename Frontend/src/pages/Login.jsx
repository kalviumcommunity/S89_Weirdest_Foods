import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, isAuthenticated } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear login error when form changes
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      await loginUser(formData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '20px', 
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      
      {loginError && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          borderRadius: '4px',
          marginBottom: '15px' 
        }}>
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.email ? '1px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px'
            }}
          />
          {errors.email && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.password ? '1px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px'
            }}
          />
          {errors.password && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.password}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isSubmitting ? '#6c757d' : '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginBottom: '15px'
          }}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <p>
            Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
