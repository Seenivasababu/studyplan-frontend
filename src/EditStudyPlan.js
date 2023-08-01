import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, Box } from '@mui/material';

import { useParams } from 'react-router-dom';

const EditStudyPlan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studyPlan, setStudyPlan] = useState({
    _id:'',
    goal: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
    user:''
  });

  useEffect(() => {
    const fetchStudyPlans = async () => {
      try {
        const response = await axios.get(`https://study-plan.onrender.com/api/study-plans/${id}`);
        setStudyPlan(response.data)
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching study plans:', error);
      }
    };

    fetchStudyPlans();
  }, []);
  

  const handleChange = (event) => {
    console.log('Changing')
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
        const {  user,goal, specific, measurable, achievable, relevant, timeBound } = studyPlan;
        const updatedStudyPlan = {
          user,
          goal,
          specific,
          measurable,
          achievable,
          relevant,
          timeBound,
        };
    
        const response = await axios.put(`http://localhost:3001/api/study-plans/${id}`, updatedStudyPlan);
        console.log('Study plan updated:', response.data);
    
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
        Edit Study Plan
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
            Edit Study Plan
          </Button>
        </Box>
      </Box>
      
    </Container>
    
  );
};

export default EditStudyPlan;
