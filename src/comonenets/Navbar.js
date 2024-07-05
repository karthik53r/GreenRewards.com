import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Navbar = ({ user, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GreenRewards
        </Typography>
        <Button color="inherit" component={NavLink} to="/" exact>
          Home
        </Button>
        {user && (
          <Button color="inherit" component={NavLink} to="/rewards" exact>
            <MonetizationOnOutlinedIcon sx={{ marginRight: 1 }} />
            {user.rewardCoins}
          </Button>
        )}
        {user && (
          <Button color="inherit" component={NavLink} to="/redeem">
            Redeem
          </Button>
        )}
        {!user && (
          <Button color="inherit" component={NavLink} to="/register">
            Register
          </Button>
        )}
        {user ? (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
