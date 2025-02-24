import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'; // Import your CSS file

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      toast.error('Username and password are required.');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/users/register`, formData);
      if (response.status === 201) {
        toast.success('Registered successfully! Please login.');
        navigate('/login');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Registration failed');
        toast.error(err.response.data?.message || 'Registration failed');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
        toast.error('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred.');
      }
      console.log('Register error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Register</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login" style={styles.linkText}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Poppins", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    animation: 'slideIn 1s ease-out',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2.5rem',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '1rem',
    fontWeight: '500',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '14px',
    width: '100%',
    border: '2px solid #3498db',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    background: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05), inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  button: {
    padding: '12px 25px',
    background: 'linear-gradient(45deg, #3498db, #2980b9)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    boxShadow: '0 8px 20px rgba(52, 152, 219, 0.5)',
    transition: 'all 0.3s ease',
    animation: 'pulse 1.5s infinite',
  },
  link: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#7f8c8d',
    fontSize: '1rem',
  },
  linkText: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Register;