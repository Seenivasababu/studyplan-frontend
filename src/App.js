import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './Home';
import SignUp from './components/Signup';
import Login from './components/Login';
import Welcome from './Welcome';
import CreateStudyPlan from './CreateStudyPlan';
import EditStudyPlan from './EditStudyPlan';

const App = () => {
  const [user, setUser] = useState(null);

  // Function to handle user login (You can implement this based on your backend API response)
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Container maxWidth="lg" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp onLogin={handleLogin}  />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/welcome"
            element={user ? <Welcome user={user} onLogout={handleLogout} /> : <Home />}
          />
          <Route path="/add-study-plan" element={<CreateStudyPlan user={user}/>} />
          <Route path="/edit-study-plan/:id" element={<EditStudyPlan/>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
