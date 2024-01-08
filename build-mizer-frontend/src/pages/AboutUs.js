import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { Box, Typography, Avatar, Grid } from '@mui/material';
import Footer from '../components/Footer';
import team from '../media/team.jpg';
import abdullahImage from '../media/abdullah.jpg';
import daniyalImage from '../media/daniyal.jpg';
import moizImage from '../media/moiz.jpeg';
import before from '../media/before.jpg'
import after from '../media/after.jpg'
import '../css/styles.css';
function AboutUs() {
  return (
    <div><ResponsiveAppBar></ResponsiveAppBar>
    <section style={{ position: 'relative' }}>
        <img src={team} alt="Section Background" style={{ width: '100%', height: '500px' }} />
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

      <section style={{ padding: '2rem' }}>
      <Typography variant="h4" align="center" style={{ margin: '20px' }}> Our Team </Typography>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          We are a team of three computer science students from COMSATS University:
        </Typography>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Avatar alt="Moiz fayyaz" src={daniyalImage} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="body1" color="textSecondary" align="center" paragraph>
              Danyal Hamid
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Avatar alt="Abdullah Dilawar Khan" src={abdullahImage} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="body1" color="textSecondary" align="center" paragraph>
              Abdullah Dilawar Khan
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Avatar alt="Daniyal Hamid" src={moizImage} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="body1" color="textSecondary" align="center" paragraph>
              Moiz Fayyaz</Typography>
          </Grid>
        </Grid>

        <Box
  sx={{
    backgroundColor: '#D3D3D3', // Set the background color to blue
    padding: '20px', // Add padding to create spacing within the box
     margin: '20px'
  }}
>
        <Typography variant="h4" align="center" style={{ margin: '20px' }}>
         Our Mission
           </Typography>
        <Typography variant="body1" align="center" paragraph>
          We are passionate about web development and decided to build Build-Mizer to address issues we encountered in construction projects.
        </Typography>
        <Typography variant="body1"  align="center" paragraph>
          We faced challenges in keeping track of project costs and calculating expenditures manually.
        </Typography>
        <Typography variant="body1"  align="center" paragraph>
          Build-Mizer is our solution, offering an online material ledger to simplify calculations and make project management more efficient.
        </Typography>
        <Typography variant="body1"  align="center" paragraph>
          Say goodbye to handwritten rough calculations and embrace the convenience of Build-Mizer.
        </Typography>
        </Box>
      </section>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '0 20px' }}>
  <div style={{ flex: 1, textAlign: 'center', height: '300px', maxWidth: '100%' }}>
    <h2>Before Build Mizer</h2>
    <img src={before} alt="Before Build Mizer" style={{ width: '100%', height: '100%', maxWidth: '100%' }} />
  </div>
  <div style={{ flex: 1, textAlign: 'center', height: '300px', maxWidth: '100%' }}>
    <h2>After Build Mizer</h2>
    <img src={after} alt="After Build Mizer" style={{ width: '100%', height: '100%', maxWidth: '100%' }} />
  </div>
</div>



    <Footer></Footer>
    </div>
  )
}

export default AboutUs