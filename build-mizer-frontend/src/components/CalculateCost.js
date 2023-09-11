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
} from '@mui/material';
import SizeSlider from './SizeSlider'; // You'll need to create this component
import ConstructionCostTable from './ConstructionCostTable';

function ConstructionCostEstimator() {
  // State variables to store user input values
  const [size, setSize] = useState(0);
  const [measurementType, setMeasurementType] = useState('marla');
  const [budget, setBudget] = useState('');
  const [numFloors, setNumFloors] = useState('single');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Function to handle the calculation
  const handleCalculate = () => {
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
        <DialogTitle>Construction Cost</DialogTitle>
        <DialogContent>
          <ConstructionCostTable />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ConstructionCostEstimator;
