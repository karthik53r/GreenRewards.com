import React from 'react';
import { Container, Typography, Grid, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

const RootContainer = styled(Container)({
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
});

const StyledPaper = styled(Paper)({
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
});

const StyledButton = styled(Button)({
    marginTop: '1rem',
});

const IntroText = () => {
    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between', // Aligns divs side by side
                width: '100%',
                textAlign: 'left',
                paddingRight: '1rem', // Add padding for spacing between columns
            }}>
                <div style={{ width: '45%' }}>
                    <Typography variant="h4" gutterBottom>
                        Start Recycling, Start Earning
                    </Typography>
                    <StyledPaper elevation={3}>
                        <Typography variant="body1">
                            Join our reverse vending machine web application and turn your recyclables into rewards that you can use for movie tickets, vouchers, and more!
                        </Typography>
                    </StyledPaper>
                </div>
                <div style={{ width: '45%' }}>
                    <Typography variant="h4" gutterBottom>
                        Get Rewarded for Recycling!
                    </Typography>
                    <StyledPaper elevation={3}>
                        <Typography variant="body1">
                            Turn your recyclables into rewards with our innovative reverse vending machine web application.
                            Simply upload an image of your item and start earning reward coins to use for movie tickets,
                            vouchers, and more.
                        </Typography>
                    </StyledPaper>
                </div>
            </Box>
        </Slide>
    );
};

const Step = ({ number, title, description }) => {
    return (
        <Grid item xs={12} sm={6}>
            <Box textAlign="center">
                <Typography variant="h4" style={{ marginTop: '1em' }}>{number}</Typography>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <Typography variant="body1">
                    {description}
                </Typography>
            </Box>
        </Grid>
    );
};

const Steps = () => {
    return (
        <Grid container spacing={3} paddingBottom={7}>
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
    );
};

const Home = ({ user }) => {
    const navigate=useNavigate();
    return (
        <>
            <RootContainer maxWidth="lg">
                <IntroText />
                {user ? (<StyledButton variant="contained" color="primary" size="large" onClick={()=>navigate('/rewards')}>
                    Get Started
                </StyledButton>):(<StyledButton variant="contained" color="primary" size="large" onClick={()=>navigate('/login')}>
                    Get Started
                </StyledButton>)}
            </RootContainer>
            <Container maxWidth="lg">
                <Steps />
            </Container>
        </>
    );
};

export default Home;
