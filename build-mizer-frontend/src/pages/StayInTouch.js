import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import Footer from '../components/Footer'
import { Typography, Divider , Grid ,TextField, Button} from '@mui/material';
import '../css/styles.css';
import picture from "../media/picture.webp" 
import lahore from "../media/lahore.jpeg" 

function StayInTouch() {
  return (

    <div><ResponsiveAppBar></ResponsiveAppBar> 
    <Footer></Footer></div>

    
    <div>
    <ResponsiveAppBar></ResponsiveAppBar>
    <div className="centered-container">  
     <Typography sx={{ fontSize: 50,mt: 3,animation: 'slideUp 2s forwards' }}>
        Contact Us
    </Typography>

    <Divider sx={{ width: '50%', mx: 'auto', mt: 6,mb: 6, backgroundColor: 'gray' }} />

<Grid container spacing={2} alignItems="center" justify="center" sx={{padding : 7}}>

  <Grid item xs={12} sm={6}sx={{ animation: 'slideLeft 2s forwards'}}>
    {/* Image */}
    <img src={picture} alt="Contact" style={{ maxWidth: '90%' }} />
  </Grid>


  <Grid item xs={12} sm={6} sx={{ animation: 'slideRight 2s forwards'}}>
    {/* Text */}
    <Typography variant="h3" sx={{ padding: 3 }}>Get In Touch</Typography>
    <Typography variant="body1">
      Send us a note anytime — we welcome feedback and requests.
    </Typography>
    <Typography variant="h4" sx={{ padding: 2 }}>Give us a call</Typography>
    <Typography variant="body1">03087527322</Typography>
    <Typography variant="body2" sx={{ paddingBottom: 2 }}>Timing: 12PM TO 12AM</Typography>
    <Typography variant="body2" sx={{ paddingBottom: 1 }}>
      Email: <a href="mailto:daniyalhameed19@gmail.com">daniyalhameed19@gmail.com</a>
    </Typography>   
   </Grid>
</Grid>


<Grid container spacing={2} alignItems="center" justify="center" sx={{ padding: 3 , bgcolor: '#464A55',  color: '#fafafa' }}>
      
        <Grid item xs={12} sm={6} sx={{ animation: 'slideRight 2s forwards'}}>

          <Typography variant="h3" sx={{ padding: 3 }}>Come and Visit</Typography>
          <Typography variant="body1">
            We are Located In Lahore,Pakistan      
          </Typography>
          <Typography variant="h4" sx={{ padding: 2 }}>Opening hours</Typography>
          <Typography variant="body1">Monday to Saturday </Typography>
          <Typography variant="body2">Timing: 12PM TO 12AM</Typography>
          <Typography variant="h4" sx={{ padding: 2 }}>COMSATS University Lahore</Typography>
        </Grid>


        <Grid item xs={12} sm={6}sx={{ animation: 'slideLeft 2s forwards'}}>
          {/* Image */}
          <img src={lahore} alt="Contact" style={{ maxWidth: '90%' }} />
        </Grid>


      </Grid>


      <Typography variant="h3" sx={{ paddingBottom: 1, marginTop: 4 }}> Drop us a Line </Typography>
      <Typography variant="h5" sx={{ paddingBottom: 1, marginTop: 4 }}> We are here to help. Please complete the short form below and we’ll respond as soon as possible </Typography>
      <form >
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          sx={{m:5}}
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          margin="normal"
          sx={{m:5}}
        />
        <TextField
          
          label="Comments"
          variant="outlined"
          multiline
          rows={10}
          fullWidth
          margin="normal"
          sx={{ width: '80%' }} 
          

        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ width: '30%'}} 
        >
          Submit
        </Button>
      </form>
      <Divider sx={{ width: '0%', mx: 'auto', mt: 6,mb: 6, backgroundColor: 'gray' }} />







    </div>

    <Footer></Footer>
    </div>

  )
}

export default StayInTouch