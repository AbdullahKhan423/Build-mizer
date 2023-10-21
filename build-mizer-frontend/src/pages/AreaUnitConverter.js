import React, {useState} from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Footer from '../components/Footer';
import calculator from '../media/calculator.jpeg';
import { Container,Divider,Typography, Table,TableHead,TableBody,TableRow,TableCell, } from '@mui/material';
import Converter from '../components/Converter';

function AreaUnitConverter() {
  const containerStyle = {
    backgroundImage: `url(${calculator})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  
  };

  const textStyles = {
    textAlign: 'center',
  };

    const conversionFactor = {
      'Square Foot': 225,
      'Square Yard': 25,
      'Square Meter': 21,
      'Marla': 1,
      'Kanal': 0.05,
      'Acre': 0.00625001,
    };
   
 

    const generateTableRows = () => {
      const rows = [];
  
      for (let i = 1; i <= 20; i++) {
        const marla = i;
        const kanal = (i * conversionFactor['Kanal']).toFixed(2);
        const sqFoot = (i * conversionFactor['Square Foot']).toFixed(2);
        const sqMeter = (i * conversionFactor['Square Meter']).toFixed(2);
        const sqYards = (i * conversionFactor['Square Yard']).toFixed(2);
  
        rows.push(
          <TableRow key={i}>
            <TableCell align="center">{marla}</TableCell>
          <TableCell align="center">{kanal}</TableCell>
          <TableCell align="center">{sqFoot}</TableCell>
          <TableCell align="center">{sqMeter}</TableCell>
          <TableCell align="center">{sqYards}</TableCell>

          </TableRow>
        );
      }
  
      return rows;
    };



  return (
    <>
      <ResponsiveAppBar />
      <div style={containerStyle}>
        <div className="header-text" style={textStyles}>
          <h1>Area Unit Converter</h1>
          <p>Easy and convenient way to convert and compare various units of measurements of area sizes</p>
        </div>
      </div>

      <Divider sx={{ width: '50%', mx: 'auto', mt: 6,mb: 6, backgroundColor: 'gray' }} />

      

       <Converter/>


        <Container fixed style={{ textAlign: 'center', marginTop: '20px',border: '2px solid #000',padding: '30px' }}>
        <Typography variant="h4" align="center" marginBottom='20px'>
        In Pakistan
      </Typography>
<Table>
          <TableHead>
          <TableRow style={{ backgroundColor: '#00c853', color: 'white' }}>
              <TableCell align="center">Marla</TableCell>
              <TableCell align="center">Kanal</TableCell>
              <TableCell align="center">Sq Foot</TableCell>
              <TableCell align="center">Sq Meter</TableCell>
              <TableCell align="center">Sq Yards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{generateTableRows()}</TableBody>
        </Table>
        </Container>


      <Footer />
    </>
  );
}

export default AreaUnitConverter;
