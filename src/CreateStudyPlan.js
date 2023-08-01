import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, Box } from '@mui/material';



const CreateStudyPlan = ({user}) => {
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState({
    goal: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudyPlan((prevStudyPlan) => ({
      ...prevStudyPlan,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Verifying")
    try {
      const response = await axios.post('https://study-plan.onrender.com/api/study-plans', {...studyPlan,user:user._id});
      console.log('Study plan created:', response.data);
      
      // You can handle success, redirect, or show a confirmation message here
    } catch (error) {
      console.error('Error creating study plan:', error);
      // You can handle errors and display appropriate messages to the user
    }
  
    navigate('/welcome')
    
  };

  return (
    <Container maxWidth="sm" >
      <Typography my={3}variant="h4" align="center" gutterBottom>
        Create Study Plan
      </Typography>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Box my={2}>
          <TextField fullWidth label="Goal" name="goal" value={studyPlan.goal} onChange={handleChange} />
        </Box>
        <Box my={2}>
          <TextField fullWidth label="Specific" name="specific" value={studyPlan.specific} onChange={handleChange} />
        </Box>
        <Box my={2}>
          <TextField fullWidth label="Measurable" name="measurable" value={studyPlan.measurable} onChange={handleChange} />
        </Box>
        <Box my={2}>
          <TextField fullWidth label="Achievable" name="achievable" value={studyPlan.achievable} onChange={handleChange} />
        </Box>
        <Box my={2}>
          <TextField fullWidth label="Relevant" name="relevant" value={studyPlan.relevant} onChange={handleChange} />
        </Box>
        <Box my={2}>
          <TextField fullWidth label="Time-Bound" name="timeBound" value={studyPlan.timeBound} onChange={handleChange} />
        </Box>
        <Box textAlign="center" mt={2}>
          <Button type="submit" variant="contained" color="primary" >
            Create Study Plan
          </Button>
        </Box>
      </Box>
      
    </Container>
    
  );
};

export default CreateStudyPlan;
