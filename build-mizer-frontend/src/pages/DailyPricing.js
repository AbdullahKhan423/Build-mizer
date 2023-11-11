import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  
} from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Footer from '../components/Footer';
function DailyPricing() {
  const [selectedCategory, setSelectedCategory] = useState('Cement'); // Default selected category
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const categories = ['Steel', 'Cement', 'Bricks', 'Crush/Bajri', 'Sand'];

  // Sample table data (replace with your actual data)
  // Sample table data (replace with your actual data)
  const tableData = [
    {
      category: 'Steel',
      data: [
        { id: 1, name: 'Ambrelli Sreel', price: 100 },
        { id: 2, name: 'Product 2', price: 150 },
      ],
    },
    {
      category: 'Cement',
      data: [
        { id: 3, name: 'Product 3', price: 120 },
        { id: 4, name: 'Product 4', price: 180 },
      ],
    },
    {
      category: 'Bricks',
      data: [
        { id: 5, name: 'Product 5', price: 50 },
        { id: 6, name: 'Product 6', price: 75 },
      ],
    },
    {
      category: 'Crush/Bajri',
      data: [
        { id: 7, name: 'Product 7', price: 90 },
        { id: 8, name: 'Product 8', price: 110 },
      ],
    },
    {
      category: 'Sand',
      data: [
        { id: 9, name: 'Product 9', price: 70 },
        { id: 10, name: 'Product 10', price: 95 },
      ],
    },
  ];


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const getTitle = () => {
    // Generate the title dynamically based on the selected category
    return `${selectedCategory} Price in Pakistan`;
  };

  return (
    <div><ResponsiveAppBar></ResponsiveAppBar>
     <Container maxWidth="lg">
      <Typography variant="h3" align="center" style={{ marginTop: '20px', marginBottom: '10px' }}>
      {getTitle()}
      </Typography>
      <Box borderBottom={1} mb={2} pb={2} borderColor="text.primary">
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {categories.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>
      <Paper>
      {tableData.map((categoryData) => (
  categoryData.category === selectedCategory && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
        {categoryData.data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
      </TableBody>
          </Table>
        </TableContainer>
        )))}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableData[selectedCategory] ? tableData[selectedCategory].length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
    <Footer></Footer>
    </div>
  )
}

export default DailyPricing