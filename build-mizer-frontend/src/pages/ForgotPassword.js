import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = () => {
    if (email) {
      setSuccessMessage(`Your Password is successfully sent to your given email: ${email}`);
      setErrorMessage(''); // Clear any previous error message

      // Automatically clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } else {
      setSuccessMessage('');
      setErrorMessage('Please enter your email before resetting your password');
      // Automatically clear the error message after 2 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#8EBEE2' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #333', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', background: 'white', height: '400px' }}>
        <h2>Forgot Your Password?</h2>
        <p>Enter your email address below to reset your password.</p>

        <form style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email Address"
            style={{ width: '95%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </form>

        {successMessage && (
          <Alert severity="success" style={{ marginTop: '10px' }}>
            <AlertTitle>Success</AlertTitle>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" style={{ marginTop: '10px' }}>
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}

        <p style={{ marginTop: '10px' }}>
          Remember your password? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
