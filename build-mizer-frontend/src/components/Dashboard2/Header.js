import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import {  toast } from "react-toastify";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';




const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");


    const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 



  
  
   useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/signin");
        }
        
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
  
        setUsername(user);
       
        return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
            })
          : (removeCookie("token"), navigate("/signin"));
      };
      verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
      removeCookie("token");
      navigate("/signup");
    };  
    const { onDrawerToggle } = props;
  
  

  return (
    <React.Fragment>
                  <AppBar color="primary" position="sticky" elevation={0} sx={{ backgroundColor: '#103556' }}>

          
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go To HomePage
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>






            <Grid item>
        <IconButton
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={handleAvatarClick} // Open the menu on Avatar click
        >
          <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={Logout}>Logout</MenuItem>
         </Menu>
      </Grid> 


            
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0, backgroundColor: '#103556' }}
            >    
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
  <Typography color="inherit" variant="h5" component="h1">
    Project Details
  </Typography>
</div>

          <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
            </Grid>
            <Grid item>
              
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0, backgroundColor: '#103556' }}>
                <Tabs value={0} textColor="inherit">
                    <Tab label="User" />
                </Tabs>
            </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;