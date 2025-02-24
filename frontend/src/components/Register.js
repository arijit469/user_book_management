import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData); // Adjust URL if using your render.com API
      toast.success('Registered successfully! Redirecting to login...', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay">
        <div className="register-card animate-slide-up">
          <h1 className="register-title animate-text">Join Book Haven</h1>
          <p className="register-subtitle animate-text">Start Your Literary Journey</p>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="register-input"
              />
              <span className="input-border"></span>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="register-input"
              />
              <span className="input-border"></span>
            </div>
            <div className="input-wrapper">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="register-select"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <span className="input-border"></span>
            </div>
            <button type="submit" className="register-btn">Sign Up</button>
          </form>
          <p className="login-text">
            Already have an account? <Link to="/login" className="login-link">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;