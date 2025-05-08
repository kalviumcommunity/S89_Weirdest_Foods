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
      const response = await loginUser(formData);
      console.log('Login successful:', response.data);

      // Force a small delay to ensure token is set in localStorage
      setTimeout(() => {
        // Redirect to home page
        navigate('/');
        // Reload the page to ensure all components recognize the authentication state
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.data) {
        setLoginError(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        borderRadius: '12px',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(to right, #4A6FFF, #77AAFF)'
        }}></div>

        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '600',
          color: '#333'
        }}>Welcome Back</h2>

        {loginError && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FFF5F5',
            color: '#E53E3E',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #FED7D7',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '8px', fontWeight: 'bold' }}>!</span>
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#4A5568'
            }}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.email ? '1px solid #E53E3E' : '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#FAFAFA',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.email && (
              <div style={{ color: '#E53E3E', fontSize: '14px', marginTop: '6px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label htmlFor="password" style={{
                fontWeight: '500',
                color: '#4A5568'
              }}>Password</label>
              <a href="#" style={{
                color: '#4A6FFF',
                textDecoration: 'none',
                fontSize: '14px'
              }}>Forgot password?</a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.password ? '1px solid #E53E3E' : '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#FAFAFA',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.password && (
              <div style={{ color: '#E53E3E', fontSize: '14px', marginTop: '6px' }}>
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isSubmitting ? '#A0AEC0' : '#4A6FFF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginBottom: '24px',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(74, 111, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </button>

          <div style={{
            textAlign: 'center',
            color: '#718096',
            fontSize: '15px'
          }}>
            <p>
              Don't have an account? <Link to="/signup" style={{
                color: '#4A6FFF',
                fontWeight: '600',
                textDecoration: 'none'
              }}>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
