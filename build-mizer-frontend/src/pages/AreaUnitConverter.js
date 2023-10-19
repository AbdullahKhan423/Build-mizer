import React, {useState} from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Footer from '../components/Footer';
import calculator from '../media/calculator.jpeg';
import { Container, Grid,Divider,Typography, TextField, Select, MenuItem, Button, FormControl, Table,TableHead,TableBody,TableRow,TableCell, } from '@mui/material';


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

  


  
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Square Foot');
    const [toUnit, setToUnit] = useState('Square Meter');
    const [convertedValue, setConvertedValue] = useState('');
  
    const conversionFactors = {
      'Square Foot': 1,
      'Square Yard': 0.11111111,
      'Square Meter': 0.09290227,
      'Marla': 0.0044444,
      'Kanal': 0.00022222,
      'Acre': 0.000027778,
    };
  

    const conversionFactor = {
      'Square Foot': 225,
      'Square Yard': 25,
      'Square Meter': 21,
      'Marla': 1,
      'Kanal': 0.05,
      'Acre': 0.00625001,
    };
    const handleConversion = () => {
      if (inputValue !== '') {
        const valueInSquareFoot = inputValue / conversionFactors[fromUnit];
        const convertedValue = valueInSquareFoot * conversionFactors[toUnit];
        setConvertedValue(convertedValue.toFixed(10));
      } else {
        setConvertedValue('');
      }
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

      <Typography variant="h4" align="center">
        Please Enter Units To Convert
      </Typography>
      <Container fixed style={{ textAlign: 'center', marginTop: '40px',border: '2px solid #000',padding: '100px' }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              variant="outlined"
              fullWidth
              placeholder="Enter value"
            />

          </Grid> 

         <Grid item xs={3}>
    <FormControl variant="outlined" fullWidth>
      <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
        {Object.keys(conversionFactors).map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

  <Grid item xs={1}>
    {/* Add 'TO' label here */}
    <h4 textAlign='center'>To</h4>
  </Grid>

  <Grid item xs={3}>
    <FormControl variant="outlined" fullWidth>
      <Select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
        {Object.keys(conversionFactors).map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
</Grid>
        <Button variant="contained" color="primary" onClick={handleConversion} style={{ marginTop: '20px' }}>
          Convert
        </Button>
        <TextField
          type="text"
          value={convertedValue}
          variant="outlined"
          readOnly
          fullWidth
          style={{ marginTop: '20px' }}
        />
        </Container>


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
