import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import cheerio from 'cheerio';
function Api2() {
  const [selectedCategory, setSelectedCategory] = useState('Cement');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://zarea.pk/wp-json/wp/v2/pages/6352'
          
        );
        console.log(response.data.content.rendered);
        const $ = cheerio.load(response.data.content.rendered);
        const tableRows = $('table#tablepress-1 tbody tr');

        const newData = tableRows.map((index, row) => {
          const columns = $(row).find('td');
          return {
            id: $(columns[0]).text(),
            name: $(columns[1]).text(),
            brand: $(columns[2]).text(),
            date: $(columns[3]).text(),
            unit: $(columns[4]).text(),
            price: $(columns[5]).text(),
          };
        }).get();

        setData(newData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    return `${selectedCategory} Price in Pakistan`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Assuming data is the entire response object from your API
const items = data.content; // Adjust this based on your data structure

let categoryData = null;

// Check if items is an array before using map

  


  return (
    <div>
      <ResponsiveAppBar />
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

</Tabs>
        </Box>
        <Paper>
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
                
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={categoryData ? categoryData.data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Api2;
