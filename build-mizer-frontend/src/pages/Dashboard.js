import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Build-Mizer Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Project Management Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Project Management</Typography>
            {/* Project list */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Project entries */}
              </TableBody>
            </Table>
            <Button variant="contained" color="primary" fullWidth>
              Create New Project
            </Button>
          </Paper>
        </Grid>

        {/* Material Ledger Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Material Ledger</Typography>
            {/* Material list */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Material entries */}
              </TableBody>
            </Table>
            <Button variant="contained" color="primary" fullWidth>
              Add Material
            </Button>
          </Paper>
        </Grid>

        {/* Expense Tracking Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Expense Tracking</Typography>
            {/* Expense list */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Expense Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Expense entries */}
              </TableBody>
            </Table>
            <Button variant="contained" color="primary" fullWidth>
              Add Expense
            </Button>
          </Paper>
        </Grid>

        {/* User Profile Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">User Profile</Typography>
            <Avatar alt="User Avatar" src="user-avatar.jpg" style={{ width: 100, height: 100, margin: '0 auto' }} />
            <TextField label="Full Name" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Password" fullWidth margin="normal" type="password" />
            <Button variant="contained" color="primary" fullWidth>
              Save Profile
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
    </Container>
    
  );
};

export default Dashboard;
