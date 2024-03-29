import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useUser } from '../context/UserContext';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import {  toast } from "react-toastify";
import {Link,useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../media/logo.png';
import axios from "axios";
function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        Build-Mizer
      </Link>{' /'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { user, setUser } = useUser(); 
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
    });
    const { email, password } = inputValue;
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    };
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
    const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
    const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "bottom-left",
      });
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/login",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setSnackbarSeverity('success');
          setSnackbarMessage('Login Succesful');
          setSnackbarOpen(true);
          setUser(user);
          console.log("Hello",user);
          setTimeout(() => {
            navigate("/inventory");
          }, 1000);
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to update status for Sand');
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarSeverity('error');
          setSnackbarMessage('Wrong Credentials');
          setSnackbarOpen(true);
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ><Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
          <Link to='/'><img src={Logo} width="200px" alt="logo"></img></Link>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleOnChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={handleOnChange}
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/change-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )};
