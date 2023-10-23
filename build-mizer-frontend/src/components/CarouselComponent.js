import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import carousel styles
import brick from '../media/brick.jpg';
import cement from '../media/cement.jpeg';
import crush from '../media/crush.jpg';
import steel from '../media/steel.jpg';
import sand from '../media/sand.jpeg';
const ItemCard = ({ image, itemName, onClick }) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    
  };

  const imageStyle = {
    width: '100%', // Make sure the image takes up the full width of the container
    height: '200px', // Allow the image to scale proportionally
    objectFit: 'cover',
    marginBottom: '10px',
  };


  const buttonStyle = {
    backgroundColor: '#007bff', // Change button color
    color: '#fff', // Change text color
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <div style={cardStyle}>
      <img src={image} alt={itemName} style={imageStyle} />
     
      <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{itemName}</h3>
      <button style={buttonStyle} >
        <Link to="Daily Pricing" style={{buttonStyle, textDecoration: 'none',color:'white'}}>View Updated Price</Link>
      </button>
      
    </div>
  );
};

const CarouselComponent = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>Browse Through Items</h2>
      <Carousel
        autoPlay={1000}
        infinite
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        responsive={responsive}
      >
         <ItemCard
          image={brick}
          itemName="Brick"
          onClick={() => console.log('View updated price 2')}
        />
        <ItemCard
          image={sand}
          itemName="Sand"
          onClick={() => console.log('View updated price 2')}
        />
        <ItemCard
          image={cement}
          itemName="Cement"
          onClick={() => console.log('View updated price 2')}
        />
        <ItemCard
          image={crush}
          itemName="Crush"
          onClick={() => console.log('View updated price 2')}
        />
        <ItemCard
          image={steel}
          itemName="steel"
          onClick={() => console.log('View updated price 2')}
        />
        {/* Add more items */}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;