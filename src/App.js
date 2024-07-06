import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import axios from 'axios';
import Navbar from './comonenets/Navbar';
import Home from './comonenets/Home';
import Redeem from './comonenets/Redeem';
import Rewards from './comonenets/Rewards';
import Register from './comonenets/Register';
import Login from './comonenets/Login';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('https://green-rewards-api-7th4.vercel.app/api/auth/me', {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout}/>
      <Container sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser}/>} />
          <Route path="/rewards" element={<Rewards user={user} setUser={setUser}/>} />
          <Route path="/redeem" element={<Redeem user={user} setUser={setUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
