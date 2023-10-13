import React from 'react'
import  ResponsiveAppBar from '../components/ResponsiveAppBar'
import Cover from '../components/Cover'
import ConstructionIcon from '@mui/icons-material/Construction';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import BalanceIcon from '@mui/icons-material/Balance';
import Footer from '../components/Footer'
import { Typography, Box, Container } from '@mui/material';
import cover from '../media/cover.jpg'
import '../css/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselComponent from '../components/CarouselComponent';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";




function HomePage() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/signin");
      }
      
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;

      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/signin"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Cover imageSrc={cover}></Cover>
       
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
     
        <Container maxWidth="x1">
      <Box sx={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1rem' }}>
        <Typography variant="h4" color="black" style={{ textTransform: 'capitalize', animation: 'slideUp 1s forwards' }}>
          Your premium platform for Construction <br></br> cost estimation and management.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <ConstructionIcon sx={{ fontSize: 100, animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Updated Pricing</Typography>
          <Typography variant="body2">Stay informed with real-time pricing information for construction materials.</Typography>
        </Box>
        <CalculateIcon sx={{ fontSize: 100, marginLeft: '2rem', animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Calculation Cost Calculator</Typography>
          <Typography variant="body2">Estimate the total cost of your construction project, including materials and labor.</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <ContentPasteSearchIcon sx={{ fontSize: 100, animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Cost tracker</Typography>
          <Typography variant="body2">Monitor and manage your construction expenses as your project progresses.</Typography>
        </Box>
        <HomeRepairServiceIcon sx={{ fontSize: 100, marginLeft: '8rem', animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Material ledger</Typography>
          <Typography variant="body2">Keep a detailed record of all construction materials used, ensuring accurate inventory and project tracking.</Typography>
        </Box>
      </Box>
    </Container>

    <Container maxWidth="x1">
      <Box sx={{ textAlign: 'center', marginTop: '6rem', paddingTop: '1rem' }}>
        <Typography variant="h4" color="black" style={{ textTransform: 'capitalize', animation: 'slideUp 1s forwards' }}>
          Why use Build-Mizer?
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <WidgetsIcon sx={{ fontSize: 100, animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Comprehensive Features</Typography>
          <Typography variant="body2">Access updated pricing, use the construction cost calculator, track expenses, and maintain a material ledger all in one platform.</Typography>
        </Box>
        <AccessTimeIcon sx={{ fontSize: 100, marginLeft: '2rem', animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Time and Cost Efficiency</Typography>
          <Typography variant="body2">Save time and reduce costs with accurate estimations, real-time pricing, and efficient expense tracking.</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <SentimentSatisfiedAltIcon sx={{ fontSize: 100, animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">User-Friendly Interface</Typography>
          <Typography variant="body2">Our platform is designed with a user-friendly interface, making it easy for anyone to use, from homeowners to contractors.</Typography>
        </Box>
        <BalanceIcon sx={{ fontSize: 100, marginLeft: '2rem', animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Stay Organized</Typography>
          <Typography variant="body2">Keep construction projects organized with material ledger, ensuring efficient inventory management</Typography>
        </Box>
      </Box>
    </Container>



  
    <Container maxWidth="x1">
    <Box sx={{ textAlign: 'center', marginTop: '6rem', paddingTop: '1rem' }}>
        <Typography variant="h4" color="black" style={{ textTransform: 'capitalize', animation: 'slideUp 1s forwards' }}>
         Updated Pricing
        </Typography>
      </Box>
    </Container>

    <Container>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2rem',
      flexDirection: ['column', 'row'], // Change direction to column on small screens
    }}
  >
    <ConstructionIcon
      sx={{
        fontSize: 100,
        animation: 'slideLeft 1s forwards',
        marginBottom: ['1rem', '0'], // Add margin for spacing on small screens
        marginLeft: ['0', '1rem'], // Add margin for spacing on small screens
      }}
    />
    <Box sx={{ marginLeft: ['0', '1rem'] }}>
      <Typography variant="h6">Updated Pricing</Typography>
      <Typography variant="body2">Stay informed with real-time pricing information for construction materials.</Typography>
    </Box>
    <CalculateIcon
      sx={{
        fontSize: 100,
        marginLeft: ['0', '2rem'], // Add margin for spacing on small screens
        animation: 'slideLeft 1s forwards',
      }}
    />
    <Box sx={{ marginLeft: ['0', '1rem'] }}>
      <Typography variant="h6">Calculation Cost Calculator</Typography>
      <Typography variant="body2">Estimate the total cost of your construction project, including materials and labor.</Typography>
    </Box>
    <ContentPasteSearchIcon sx={{ fontSize: 100, animation: 'slideLeft 1s forwards' }} />
    <Box sx={{ marginLeft: '1rem' }}></Box>
    <Typography variant="h6">Cost tracker</Typography>
          <Typography variant="body2">Monitor and manage your construction expenses as your project progresses.</Typography>
        </Box>
        <HomeRepairServiceIcon sx={{ fontSize: 100, marginLeft: '10rem', animation: 'slideLeft 1s forwards' }} />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">Material ledger</Typography>
          <Typography variant="body2">Keep a detailed record of all construction materials used, ensuring accurate inventory and project tracking.</Typography>
  </Box>
</Container>


<Container>
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2rem',
      flexDirection: ['column', 'row'], // Change to column on small screens
    }}
  >
    <ConstructionIcon
      sx={{
        fontSize: 100,
        animation: 'slideLeft 1s forwards',
        marginBottom: ['1rem', '0'], // Add margin for spacing on small screens
        marginLeft: ['0', '1rem'], // Add margin for spacing on small screens
        width: ['100%', 'auto'], // Full width on small screens, auto width on larger screens
      }}
    />
    <Box sx={{ marginLeft: ['0', '1rem'] }}>
      <Typography variant="h6">Updated Pricing</Typography>
      <Typography variant="body2">Stay informed with real-time pricing information for construction materials.</Typography>
    </Box>
    <CalculateIcon
      sx={{
        fontSize: 100,
        marginLeft: ['0', '2rem'], // Add margin for spacing on small screens
        animation: 'slideLeft 1s forwards',
        width: ['100%', 'auto'], // Full width on small screens, auto width on larger screens
      }}
    />
    <Box sx={{ marginLeft: ['0', '1rem'] }}>
      <Typography variant="h6">Calculation Cost Calculator</Typography>
      <Typography variant="body2">Estimate the total cost of your construction project, including materials and labor.</Typography>
    </Box>
    <ContentPasteSearchIcon
      sx={{
        fontSize: 100,
        animation: 'slideLeft 1s forwards',
        marginBottom: ['1rem', '0'], // Add margin for spacing on small screens
        marginLeft: ['0', '1rem'], // Add margin for spacing on small screens
        width: ['100%', 'auto'], // Full width on small screens, auto width on larger screens
      }}
    />
    <Box sx={{ marginLeft: ['0', '1rem'] }}>
      <Typography variant="h6">Cost tracker</Typography>
      <Typography variant="body2">Monitor and manage your construction expenses as your project progresses.</Typography>
    </Box>
    <HomeRepairServiceIcon
      sx={{
        fontSize: 100,
        animation: 'slideLeft 1s forwards',
        marginLeft: ['0', '2rem'], // Add margin for spacing on small screens
        width: ['100%', 'auto'], // Full width on small screens, auto width on larger screens
      }}
    />
    <Box sx={{ marginLeft: ['0', '1rem'] }}>
      <Typography variant="h6">Material ledger</Typography>
      <Typography variant="body2">Keep a detailed record of all construction materials used, ensuring accurate inventory and project tracking.</Typography>
    </Box>
  </Box>
</Container>



    <Box >
   <CarouselComponent ></CarouselComponent></Box>
    <Footer ></Footer>
    
    </div>
    
  )
}

export default HomePage