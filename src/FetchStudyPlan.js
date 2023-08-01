import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const FetchStudyPlans = ({ user }) => {
  const [studyPlans, setStudyPlans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudyPlans = async () => {
      try {
        const response = await axios.get('https://study-plan.onrender.com/api/study-plans');
        var data = response.data;
        data = data.filter((item) => {
          return item.user === user._id;
        });
        setStudyPlans(data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching study plans:', error);
      }
    };

    fetchStudyPlans();
  }, []);

  const handleEdit = (studyPlanId) => {
    console.log("Editing");
    navigate(`/edit-study-plan/${studyPlanId}`);
  };

  const handleDelete = async (studyPlanId) => {
    try {
      const response = await axios.delete(`hhttps://study-plan.onrender.com/api/study-plans/${studyPlanId}`);
      console.log('Study plan deleted:', response.data);
      // You can update the study plans list after deletion if needed
      setStudyPlans((prevStudyPlans) => prevStudyPlans.filter((studyPlan) => studyPlan._id !== studyPlanId));
    } catch (error) {
      console.error('Error deleting study plan:', error);
    }
  };

  if (studyPlans.length === 0) {
    return <div>No data found...</div>;
  }

  const isSinglePlan = studyPlans.length === 1;
  const gridItemXs = isSinglePlan ? 12 : 6;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Grid container spacing={2}>
        {studyPlans.map((studyPlan) => (
          <Grid key={studyPlan._id} item xs={12} sm={12} md={gridItemXs} >
            <Card  sx={{ background: '#F5F5F6' }}>
              <CardContent>
                <Typography variant="h5" component="h3">
                  Goal: {studyPlan.goal}
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={2} p={0.2}>
                  <b>Specific:</b> {studyPlan.specific}
                </Typography>
                <Typography variant="body1" color="text.secondary" p={0.2}>
                <b>Measurable:</b> {studyPlan.measurable}
                </Typography>
                <Typography variant="body1" color="text.secondary" p={0.2}>
                 <b>Achievable:</b>  {studyPlan.achievable}
                </Typography>
                <Typography variant="body1" color="text.secondary" p={0.2}>
                <b>Relevant:</b> {studyPlan.relevant}
                </Typography>
                <Typography variant="body1" color="text.secondary" p={0.2}>
                <b>Time-Bound:</b> {studyPlan.timeBound}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button onClick={() => handleEdit(studyPlan._id)} variant="contained" color="primary">
                    Edit
                  </Button>

                  <Button onClick={() => handleDelete(studyPlan._id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FetchStudyPlans;
