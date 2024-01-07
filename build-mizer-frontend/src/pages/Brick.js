import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Brick = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://zarea.pk/wp-json/wp/v2/pages/6353');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

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
    color:'blue',
  };

  const contentStyle = {
    marginBottom: '15px',
  };

  return (
    <div style={containerStyle}>
      {error && <p style={errorStyle}>Error: {error.message}</p>}
      {data && (
        <div>
          <h1 style={headingStyle}>{data.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} style={contentStyle} />
          {/* Add your logic to further process and display the data */}
        </div>
      )}
    </div>
  );
};

export default Brick;
