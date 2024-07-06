import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    CircularProgress,
    Paper,
    Slide,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Snackbar,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

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

const Redeem = ({ user, setUser }) => {
    const [rewardCoins, setRewardCoins] = useState(0);
    const [vouchers, setVouchers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

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
                    setRewardCoins(res.data.rewardCoins);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        const fetchVouchers = async () => {
            try {
                // Assuming you have 6 images named 1.jpg, 2.jpg, ..., 6.jpg in public/vouchers folder
                const voucherImages = Array.from({ length: 6 }, (_, index) => ({
                    image: `${index + 1}.jpg`,
                    points: Math.floor(Math.random() * (5000 - 800 + 1)) + 800,
                }));
                setVouchers(voucherImages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
        fetchVouchers();
    }, []);

    const handleBuyVoucher = (voucherPoints) => {
        if (rewardCoins >= voucherPoints) {
            // Deduct voucherPoints from rewardCoins
            const updatedRewardCoins = rewardCoins - voucherPoints;
            setRewardCoins(updatedRewardCoins);

            // Display success message
            setSnackbarMessage('Voucher successfully purchased.');
            setSnackbarOpen(true);

            // Example: Update user's reward points on the server
            const token = localStorage.getItem('token');
            if (token) {
                axios.put('https://green-rewards-api-7th4.vercel.app/api/auth/updatecoins', { rewardCoins: updatedRewardCoins }, {
                    headers: {
                        'x-auth-token': token,
                    },
                }).then(response => {
                    // Handle successful update on server if needed
                }).catch(error => {
                    console.error(error);
                });
            }

        } else {
            // Display insufficient points message
            setSnackbarMessage('Insufficient points to buy this voucher.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            {!user && <Login />}
            {user &&
                <Container maxWidth="md">
                    <Box sx={{ my: 4 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Redeem Vouchers
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary">
                            Total Reward Coins = <MonetizationOnOutlinedIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> {rewardCoins}
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {vouchers.map((voucher, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`/vouchers/${voucher.image}`} // Assumes images are in public/vouchers folder
                                            alt={`Voucher ${index + 1}`}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Voucher {index + 1}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {voucher.points} Reward Points
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Button onClick={() => handleBuyVoucher(voucher.points)} fullWidth variant="contained" color="primary">
                                        Buy
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleCloseSnackbar}
                        message={snackbarMessage}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    />
                </Container>
            }
        </>
    );
};

export default Redeem;
