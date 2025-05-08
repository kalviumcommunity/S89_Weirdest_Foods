import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, isAuthenticated } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username cannot exceed 20 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    // Clear signup error when form changes
    if (signupError) {
      setSignupError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSignupError('');

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);
      console.log('Registration successful:', response.data);

      // Show success message
      alert('Registration successful! You are now logged in.');

      // Force a small delay to ensure token is set in localStorage
      setTimeout(() => {
        // Redirect to home page
        navigate('/');
        // Reload the page to ensure all components recognize the authentication state
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Signup error:', error);

      if (error.response && error.response.data) {
        setSignupError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setSignupError('Registration failed. Please try again later.');
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
        maxWidth: '500px',
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
        }}>Create Your Account</h2>

        {signupError && (
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
            {signupError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#4A5568'
            }}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.username ? '1px solid #E53E3E' : '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#FAFAFA',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.username && (
              <div style={{ color: '#E53E3E', fontSize: '14px', marginTop: '6px' }}>
                {errors.username}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
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

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#4A5568'
            }}>Password</label>
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
            {!errors.password && (
              <div style={{ fontSize: '13px', color: '#718096', marginTop: '6px' }}>
                Password must be at least 6 characters and contain at least one number
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#4A5568'
            }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.confirmPassword ? '1px solid #E53E3E' : '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#FAFAFA',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.confirmPassword && (
              <div style={{ color: '#E53E3E', fontSize: '14px', marginTop: '6px' }}>
                {errors.confirmPassword}
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
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          <div style={{
            textAlign: 'center',
            color: '#718096',
            fontSize: '15px'
          }}>
            <p>
              Already have an account? <Link to="/login" style={{
                color: '#4A6FFF',
                fontWeight: '600',
                textDecoration: 'none'
              }}>Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
