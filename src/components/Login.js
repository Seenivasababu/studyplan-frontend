import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const response = await fetch('https://study-plan.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); // The response from the server, including the logged-in user

      if (response.ok) {
        onLogin(data.user); // Assuming the response contains the user object
        setSuccess(data.message);
        setError(null);
        // Redirect to the welcome page after successful login
        setTimeout(()=>{
            navigate('/welcome');
        },600)
       
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      setSuccess(null);
      console.error('Error during login:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Log In
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
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            Log In
          </Button>
          <Typography>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
