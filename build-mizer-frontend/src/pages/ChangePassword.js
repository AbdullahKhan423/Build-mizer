import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, CssBaseline } from '@mui/material';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = () => {
    // Simple password validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    // Password change logic goes here
    // You can send a request to your server to change the password

    // If the password change is successful, show a success message
    setSuccessMessage('Password changed successfully.');

    // Clear the form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#8EBEE2' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form style={{ width: '100%', marginTop: '20px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              style={{ marginTop: '20px' }}
            >
              Change Password
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default ChangePassword;
