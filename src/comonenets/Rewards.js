import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Slide,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
const Step = ({ number, title, description }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mr: 2 }}>
          {number}
        </Typography>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const Rewards = ({ user, setUser }) => {
  const [rewardCoins, setRewardCoins] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(res.data);
          setRewardCoins(res.data.rewardCoins);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, [setUser]);

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', imageFile);

    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5000/api/auth/addcoins', { coins: 10 }, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      setRewardCoins(res.data.rewardCoins);
      setShowCelebration(true); // Show celebration animation on successful upload
      setUser(user);
      // Hide celebration message after 2 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!user && <Login />}
      {user &&
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 4, mt: '12rem' }}>
                <Typography variant="body1" gutterBottom>
                  Reward Coins: {rewardCoins}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{ width: '80%' }}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleImageUpload}
                        sx={{ width: '80%' }}
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                {/* Celebrating animation */}
                <Slide
                  direction={showCelebration ? 'right' : 'left'}
                  in={showCelebration}
                  mountOnEnter
                  unmountOnExit
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      mt: 4
                    }}
                  >
                    🎉 Congratulations on your rewards! 🎉
                  </Typography>
                </Slide>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} mt={'5rem'}>
              <Step
                number="01"
                title="Capture Image"
                description="Use the reverse vending machine web application to capture an image of the item you want to recycle."
              />
              <Step
                number="02"
                title="Receive Reward Coins"
                description="Once the image is processed, you will receive reward coins that can be used for movie tickets, vouchers, and more."
              />
              <Step
                number="03"
                title="Redeem Rewards"
                description="Redeem your reward coins for exciting rewards and benefits."
              />
              <Step
                number="04"
                title="Enjoy Benefits"
                description="Use your reward coins to enjoy discounts on movie tickets, vouchers, and other offers."
              />
            </Grid>
          </Grid>
        </Container>
      }
    </>
  );
};

export default Rewards;
