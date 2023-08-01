import React from 'react';
import { useNavigate } from 'react-router-dom';
import FetchStudyPlans from './FetchStudyPlan';
import { Typography, Button, Container, Box } from '@mui/material';

const Welcome = ({ user, onLogout }) => {
  const navigate = useNavigate();
 

  const handleLogout = () => {
    // Perform any logout-related actions, e.g., clearing session data
    onLogout();
    navigate('/'); // Navigate to the landing page after logout
  };

  const handlePlan = () => {
   
    navigate('/add-study-plan')
  };

  return (
    <Container >
      <Box display="flex" flexDirection="column" alignItems="center" mt={4} mx={4}>
        <Box display="flex" justifyContent="space-between" flexWrap='wrap' alignItems="center" width="100%">
          <Typography variant="h4" gutterBottom>
            Welcome, {user.username}!
          </Typography>
          <Button variant="contained" color="success" onClick={handlePlan} >
          Add Study Plan
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        
        <FetchStudyPlans user={user} />
        
      </Box>
    </Container>
  );
};

export default Welcome;
