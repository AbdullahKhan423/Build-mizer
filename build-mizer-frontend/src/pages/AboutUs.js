import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { Box, Typography } from '@mui/material';
import Footer from '../components/Footer';
import team from '../media/team.jpg';
import '../css/styles.css';
function AboutUs() {
  return (
    <div><ResponsiveAppBar></ResponsiveAppBar>
    <section style={{ position: 'relative' }}>
        <img src={team} alt="Section Background" style={{ width: '100%', height: 'auto' }} />
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
            alignItems: 'center',
            padding: '10%', // Adjust the padding to control the area covered by the cover
            boxSizing: 'border-box',
          }}
        ><Typography variant="h3" color="white" marginTop={'15rem'}style={{animation:'slideUp 1s forwards',borderBottom: '1px solid white'}}>About us</Typography></Box></section>
    <Footer></Footer>
    </div>
  )
}

export default AboutUs