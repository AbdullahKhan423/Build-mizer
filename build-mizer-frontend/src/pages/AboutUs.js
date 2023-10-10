import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { Box, Typography, Avatar, Grid } from '@mui/material';
import Footer from '../components/Footer';
import team from '../media/team.jpg';
import moizImage from '../media/brick.jpg';
import abdullahImage from '../media/brick.jpg';
import daniyalImage from '../media/brick.jpg';
import {Container} from '@mui/material';
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

      <section style={{ padding: '2rem' }}>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          We are a team of three computer science students from COMSATS University:
        </Typography>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={4}>
            <Avatar alt="Moiz Fayyaz" src={moizImage} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="body1" color="textSecondary" align="center" paragraph>
              Moiz Fayyaz
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Avatar alt="Abdullah Dilawar Khan" src={abdullahImage} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="body1" color="textSecondary" align="center" paragraph>
              Abdullah Dilawar Khan
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Avatar alt="Daniyal Hamid" src={daniyalImage} sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="body1" color="textSecondary" align="center" paragraph>
              Daniyal Hamid
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          We are passionate about web development and decided to build Build-Mizer to address issues we encountered in construction projects.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          We faced challenges in keeping track of project costs and calculating expenditures manually.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          Build-Mizer is our solution, offering an online material ledger to simplify calculations and make project management more efficient.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          Say goodbye to handwritten rough calculations and embrace the convenience of Build-Mizer.
        </Typography>
      </section>


      <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Center vertically
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
      Zarea employs technology to streamline raw material procurement in the construction industry.

      A one stop procurement solution for businesses and retailers, enabling better prices and
       transparency, quality assurance, intelligent inventory management, faster delivery and flexible
        payment options as well as extensive online and offline assistance. For our suppliers, we help
         them achieve a bigger client base, high order volumes and advance payments.
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Missions
      </Typography>
      <Typography variant="body1" paragraph>
      Zarea’s mission is to make procurement simple and easy.
      </Typography>
      </Container>



    <Footer></Footer>
    </div>
  )
}

export default AboutUs