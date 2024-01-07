import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const ConstructionCostTable = ({ costs }) => {
  const {
    sandCost,
    crushCost,
    brickCost,
    cementCost,
    steelCost,
    sandQuantity,
    bricksQuantity,
    cementQuantity,
    crushQuantity,
    steelQuantity,
    totalCost,
  } = costs;
  return (
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
            <TableCell>Category A+</TableCell>
            <TableCell>Category A</TableCell>
            <TableCell>Category B</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Replace the following rows with your actual data */}
          <TableRow>
            <TableCell>Bricks</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>{sandCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cement(number of bags)</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>steel (kg)</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>sand chenab (sq.ft)</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>sand ravi (sq. ft)</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>crush magalla (sq. ft)</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>rush sargodha (sq.ft)</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>3000</TableCell>
            <TableCell>4000</TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConstructionCostTable;
