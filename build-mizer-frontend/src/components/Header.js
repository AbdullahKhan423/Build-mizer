// Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { AccountCircle, Notifications, Palette } from '@mui/icons-material';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <div style={{ flex: 1 }}></div>
        <IconButton
          color="inherit"
          aria-label="Profile"
          onClick={handleMenuClick}
        >
          <Avatar src="path_to_user_profile_picture.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Account Preferences</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </Menu>
        <IconButton color="inherit" aria-label="Change Theme">
          <Palette />
        </IconButton>
        <IconButton color="inherit" aria-label="Notifications">
          <Notifications />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
