import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    userType: 'CUSTOMER',
    document: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      userType: 'CUSTOMER',
      document: '',
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (isSignup && formData.name.trim() === '') newErrors.name = 'Name is required';
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (isSignup && !/^\d{10}$/.test(formData.phone)) newErrors.phone = '10 digit number';
    if (isSignup && formData.address.trim() === '') newErrors.address = 'Address required';
    if (isSignup && formData.userType === 'SERVICE_PROVIDER' && formData.document.trim() === '') {
      newErrors.document = 'Document is required for verification';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const apiUrl = isSignup
      ? 'http://localhost:8080/auth/register'
      : 'http://localhost:8080/auth/login';

    try {
      const response = await axios.post(apiUrl, formData);

      let userName, userType;

      if (isSignup) {
        alert("Registration successful! Please log in.");
        setIsSignup(false); // ✅ Switch to login form
        setLoading(false);
        return;
      } else {
        const { message, name, userType: returnedType } = response.data;
        userName = name;
        userType = returnedType;

        alert(message); // Show backend message
      }

      // Store user info
      localStorage.setItem('userName', userName);
      localStorage.setItem('userType', userType);
      localStorage.setItem('token', 'dummy-token');

      // Redirect based on userType
      if (userType === 'ADMIN') navigate('/admin');
      else if (userType === 'SERVICE_PROVIDER') navigate('/vendor');
      else navigate('/user');

    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <p className="error-text small-text">{errors.name}</p>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <p className="error-text small-text">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
          required
        />
        {errors.password && <p className="error-text small-text">{errors.password}</p>}

        {isSignup && (
          <>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              required
            />
            {errors.phone && <p className="error-text small-text">{errors.phone}</p>}

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              required
            />
            {errors.address && <p className="error-text small-text">{errors.address}</p>}

            <label>User Type</label>
            <select name="userType" value={formData.userType} onChange={handleChange} required>
              <option value="CUSTOMER">Customer</option>
              <option value="SERVICE_PROVIDER">Service Provider</option>
            </select>
          </>
        )}

        {isSignup && formData.userType === 'SERVICE_PROVIDER' && (
          <>
            <textarea
              name="document"
              placeholder="Enter your document (text only)"
              value={formData.document}
              onChange={handleChange}
              className={errors.document ? 'error' : ''}
              required
            />
            {errors.document && <p className="error-text small-text">{errors.document}</p>}
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <p onClick={toggleForm} className="toggle-text">
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default LoginSignup;
