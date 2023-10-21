import React, {useState} from 'react';
import { Container, Grid,Typography, TextField, Select, MenuItem, Button, FormControl } from '@mui/material';




function Converter() {



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
    
    
    
    const handleConversion = () => {
      if (inputValue !== '') {
        const valueInSquareFoot = inputValue / conversionFactors[fromUnit];
        const convertedValue = valueInSquareFoot * conversionFactors[toUnit];
        setConvertedValue(convertedValue.toFixed(10));
      } else {
        setConvertedValue('');
      }
    };
    




  return (
    <div>
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
    </div>
  );
}

export default Converter;
