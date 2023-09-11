import React from 'react';
import { Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Logo from '../media/image.png';
const Footer = () => {
  const footerStyle = {
    backgroundColor: '#333', // Background color
    color: '#fff', // Text color
    padding: '20px 0', // Padding
    marginTop: '6rem',
  };

  const iconStyle = {
    fontSize: '1.5rem', // Icon size
    marginRight: '10px', // Margin between icons
  };

  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* Replace this with your company logo */}
            <img src={Logo} alt="Company Logo" style={{ maxWidth: 200 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h6">Quick Links</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h6">Contact Us</Typography>
              <Typography>Email: example@email.com</Typography>
              <Typography>Phone: +1 (123) 456-7890</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography variant="h6">Follow Us</Typography>
              <IconButton aria-label="Facebook" color="inherit">
                <Facebook style={iconStyle} />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit">
                <Twitter style={iconStyle} />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit">
                <Instagram style={iconStyle} />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit">
                <LinkedIn style={iconStyle} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
