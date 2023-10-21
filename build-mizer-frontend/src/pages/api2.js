import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import axios from 'axios';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Footer from '../components/Footer';

function Api2() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://zarea.pk/wp-json/wp/v2/pages/6356');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  function modifyContent(content) {
    // Manipulate the content as needed
    return content.replace(/oldWord/g, 'newWord');
  }
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  };

  const errorStyle = {
    color: 'red',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'blue',
  };

  const contentStyle = {
    marginBottom: '15px',
  };
  function extractTableContent(content) {
    // Use a regular expression to match the table content
    const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/;
    const tableHTML = content.match(tableRegex);
    console.log("hello");
    // If a table was found, return it; otherwise, return an empty string
    return tableHTML ? tableHTML[0] : '';
  }

  return (
    <div>
      <ResponsiveAppBar />

      <Container maxWidth="lg">
        <Typography variant="h3" align="center" style={{ marginTop: '20px', marginBottom: '10px' }}>
          {data && data.title.rendered}
        </Typography>

        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          {error && (
            <Typography variant="body1" style={{ color: 'red' }}>
              Error: {error.message}
            </Typography>
          )}

          {data && (
            <div>
              <Typography variant="h4" style={{ fontSize: '24px', marginBottom: '20px', color: 'blue' }}>
                {data.title.rendered}
              </Typography>

              {/* Extract and display the table content */}
              <div
                dangerouslySetInnerHTML={{ __html: extractTableContent(data.content.rendered) }}
                style={{ marginBottom: '15px' }}
              />
            </div>
          )}
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Api2;
