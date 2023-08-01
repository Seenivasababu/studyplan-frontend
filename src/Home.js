import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      textAlign="center"
      paddingTop={10}
      paddingBottom={8}
      minHeight="100vh"
     
    >
      <h1>Welcome to Our Study App!</h1>
      <Box marginTop={4}>
        <Link to="/signup">
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outlined" color="primary" sx={{ marginLeft: 2 }}>
            Log In
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
