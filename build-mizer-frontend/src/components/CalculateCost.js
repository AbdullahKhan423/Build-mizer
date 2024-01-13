import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SizeSlider from './SizeSlider'; // You'll need to create this component

function CalculateCost() {
  // State variables to store user input values
  const [size, setSize] = useState(0);
  const [measurementType, setMeasurementType] = useState('marla');
  const [budget, setBudget] = useState('');
  const [numFloors, setNumFloors] = useState('single');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [costData, setCostData] = useState(null);

  // Function to handle the calculation
  const handleCalculate = () => {
    // Get the values from the state
    const squareFeet = size * (measurementType === 'marla' ? 225 : 1); // Assuming 1 Marla = 225 sq.ft

    // Add logic to handle different number of floors if needed
    const floorMultiplier =
      numFloors === 'single' ? 1 : numFloors === 'double' ? 1.5 : 2;

    const adjustedSquareFeet = squareFeet * floorMultiplier;

    // Your calculations based on the provided logic
    const sandRate = 70;  // Set your default values
    const crushRate = 160;  // Set your default values
    const bricksRate = 17;  // Set your default values
    const cementRate = 1300;  // Set your default values
    const steelRate =  258000;

    const persqsandQuantity = (3497 / 2250);
    const persqsteelQuantity= (4/2250);
    const persqcrushQuantity = (1913 / 2250);
    const persqbricksQuantity = (65039 / 2250);
    const persqcementQuantity = (699 / 2250);

    const sandCost = Math.floor(sandRate * persqsandQuantity * adjustedSquareFeet);
    const crushCost = Math.floor(crushRate * persqcrushQuantity * adjustedSquareFeet);
    const brickCost = Math.floor(bricksRate * persqbricksQuantity * adjustedSquareFeet);
    const cementCost = Math.floor(cementRate * persqcementQuantity * adjustedSquareFeet);
    const steelCost = Math.floor(steelRate * persqsteelQuantity * adjustedSquareFeet);

    const sandQuantity= Math.floor(persqsandQuantity*adjustedSquareFeet);
    const bricksQuantity=Math.floor(persqbricksQuantity*adjustedSquareFeet);
    const cementQuantity=Math.floor(persqcementQuantity*adjustedSquareFeet);
    const crushQuantity=Math.floor(persqcrushQuantity*adjustedSquareFeet);
    const steelQuantity=(persqsteelQuantity *adjustedSquareFeet).toFixed(3);
    
    const totalCost = sandCost + crushCost + brickCost + cementCost + steelCost;

    const newCostData = {
      sandCost,
      crushCost,
      brickCost,
      cementCost,
      steelCost,
      totalCost,
      sandQuantity,
      bricksQuantity,
      cementQuantity,
      crushQuantity,
      steelQuantity
    };

    // Log or display the results as needed
    

    // Update state with the calculated values
    setCostData(newCostData);

    // You might want to update the state or perform any other actions here
    setIsDialogOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        <Typography variant="h5">Construction Cost Estimator</Typography>
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Size (in {measurementType})</Typography>
            <SizeSlider value={size} onChange={(newValue) => setSize(newValue)} />
            <TextField
              type="number"
              label="Size Value"
              variant="outlined"
              fullWidth
              value={size}
              onChange={(e) => setSize(parseFloat(e.target.value) || 0)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Measurement Type</Typography>
            <Select
              value={measurementType}
              onChange={(e) => setMeasurementType(e.target.value)}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="marla">Marla</MenuItem>
              {/* Add other measurement types if needed */}
            </Select>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Typography>Budget (optional)</Typography>
        <TextField
          type="number"
          label="Budget"
          variant="outlined"
          fullWidth
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || '')}
        />
      </Box>
      <Box mt={3}>
        <Typography>No. of Floors</Typography>
        <RadioGroup
          row
          value={numFloors}
          onChange={(e) => setNumFloors(e.target.value)}
        >
          <FormControlLabel
            value="single"
            control={<Radio />}
            label="Single"
          />
          <FormControlLabel
            value="double"
            control={<Radio />}
            label="Double"
          />
          <FormControlLabel
            value="triple"
            control={<Radio />}
            label="Triple"
          />
        </RadioGroup>
      </Box>
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </Box>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        
        <DialogContent>
          {costData && (
            <TableContainer component={Paper}>
              <Table aria-label="construction-cost-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <Typography variant="h6">Construction Cost</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    
                    <TableCell>Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Replace the following rows with your actual data */}
                  <TableRow>
                    <TableCell>Bricks (Unit)</TableCell>
                    <TableCell>{costData.bricksQuantity}</TableCell>
                    
                    <TableCell>{costData.brickCost} Rs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cement(number of bags)</TableCell>
                    <TableCell>{costData.cementQuantity}</TableCell>
                   
                    <TableCell>{costData.cementCost} Rs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Steel (Ton)</TableCell>
                    <TableCell>{costData.steelQuantity}</TableCell>
                    
                    <TableCell>{costData.steelCost} Rs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sand  (CFT)</TableCell>
                    <TableCell>{costData.sandQuantity}</TableCell>
                   
                    <TableCell>{costData.sandCost} Rs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Crush (CFT)</TableCell>
                    <TableCell>{costData.crushQuantity}</TableCell>
                    
                    <TableCell>{costData.crushCost} Rs</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell><Typography variant="h6">Total</Typography></TableCell>
                    <TableCell></TableCell>
                    
                    <TableCell><Typography variant="h6">{costData.totalCost} Rs</Typography></TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CalculateCost;
