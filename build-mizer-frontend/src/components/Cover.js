import React from 'react';
import { Box, Typography,Button } from '@mui/material';
import { Link } from 'react-router-dom';
function Cover({imageSrc}) {
  return (
    <div>
      {/* Your other landing page content */}
      
      {/* Section where you want the opaque cover */}
      <section style={{ position: 'relative' }}>
        <img src={imageSrc} alt="Section Background" style={{ width: '100%', height: 'auto' }} />

        {/* Opaque cover */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust color and opacity as needed
            display: 'flex',
            flexDirection:'column',
            
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10%', // Adjust the padding to control the area covered by the cover
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h4" color="white">
          Build-Mizer
          </Typography>
          <Typography variant="body1" color="white">
          Building Cost Clarity, One Click at a Time.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button variant="contained" color="primary" sx={{ '&:hover': { backgroundColor: 'green' } }}>
            <Link to="Construction Cost Calculator" style={{ textDecoration: 'none', color: 'white' }}>
              Cost Calculator
            </Link>
            </Button>
            <Button variant="contained" color="secondary" sx={{ '&:hover': { backgroundColor: 'red' } }}>
            <Link to="Daily Pricing" style={{ textDecoration: 'none', color: 'white' }}>
            View Updated Price of materials
            </Link>
            </Button>
          </Box>
        </Box>
      </section>
      
      {/* Other content */}
    </div>
  );
}

export default Cover;
