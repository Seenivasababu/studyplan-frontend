import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { Link ,useNavigate } from 'react-router-dom';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://study-plan.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        onLogin(data.user)
        // Clear the form after successful signup
        setFormData({ username: '', email: '', password: '' });
        setTimeout(()=>{
            navigate('/welcome');
        },600)
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      setError('Error during signup. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <TextField
            required
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Typography>
            Already have an account? <Link to="/login">Log In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
