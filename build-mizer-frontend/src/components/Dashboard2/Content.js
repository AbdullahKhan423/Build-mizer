import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { useUser } from '../../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const modalStyle = {
  position: 'absolute',
  width: 550,
  borderRadius: '8px',
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function ProjectManager() {
  const [showInputForm, setShowInputForm] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    location: '',
   
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [squareFeet, setSquareFeet] = useState('');
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [projects, setProjects] = useState([]);
  const token = Cookies.get('token');

  const numericRegex = /^[0-9]*$/;

// Function to handle input change with regex validation
const handleSquareFeetChange = (e) => {
  const inputValue = e.target.value;

  // Check if the input matches the numeric regex
  if (numericRegex.test(inputValue)) {
    // Update the state only if it's a valid input
    setSquareFeet(inputValue);
  }
};
  const { user } = useUser();
  useEffect(() => {
    const verifyCookie = async () => {
      setLoading(true);
      if (!cookies.token) {
        navigate("/signin");
        return; // Return to exit the function if the token is missing.
      }
      
      
      try {  
    // Assuming you're using a library like 'jsonwebtoken'
       // Extract the user's ID from the decoded token
        
      const response = await axios.get(`http://localhost:4000/projects`, {
        withCredentials: true,
      });
        console.log(response);
        const { status, data } = response;
        
        if (status) {
          setProjects(data); // Set the project data in the state.
          toast("Projects fetched successfully", {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error:", error);
        removeCookie("token");
        navigate("/signin");
      }finally{
        setLoading(false);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  


  const handleAddProjectClick = () => {
    setShowInputForm(true);
  };

  const handleSubmitProject = async () => {
    console.log(cookies.token);
    if (!projectData.name) {
      setNameError(true);
      return;
    }
  
    let projectResponse;  // Declare projectResponse outside the try block
  
    try {
      // Clear the form and update projects
      projectResponse = await fetch('http://localhost:4000/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData),
      });
  
      if (projectResponse.ok) {
        // Handle a successful response (status code 200) from the server
        
        console.log('Project submitted successfully!');
  
        // Clear the form and update local state
        const projectDataWithId = await projectResponse.json();
        setProjects([...projects, projectDataWithId]);
        setShowInputForm(false);
        setIsNavigating(true);
  
        // Simulate navigation to a different tab or route after a delay
        setTimeout(() => {
          setIsNavigating(false);
          // Use routing to navigate to a different tab
        }, 3000);
  
        // Step 2: Make a separate Axios request for square feet
        const squareFeetResponse = await axios.post(`http://localhost:4000/calculator/${projectDataWithId._id}`, {
          squareFeet,
        });
        console.log('Square feet submitted successfully:', squareFeetResponse.data);
      } else {
        // Handle errors or other responses from the server
        console.error('Error submitting project');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };
  

  const handleDelete = (projectId) => {
    console.log(projectId);
    fetch(`http://localhost:4000/projects/${projectId}`, {
      method: 'DELETE',
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        if (response.status === 204) {
          window.location.reload();
          // Update your state or perform any necessary actions
        } else {
          // Handle errors, e.g., project not found or server error
        }
      })
      .catch((error) => {
        // Handle network or request error
      });
  };

  const linkStyles = {
    textDecoration: 'none', // Remove underline
   // Smooth color transition on hover

    
  };
  

  return (
    <>
  {loading ? (
    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '60%' }} />
  ) : (

  
    <>
      <Paper sx={{ marginTop: '2%' }}>
      <TableContainer component={Paper}>
      <Table>
      <TableHead>
  <TableRow>
    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black' }}>Project Name</TableCell>
    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black' }}>Project Description</TableCell>
    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black' }}>Project Location</TableCell>
    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black' }}></TableCell>
    {/* Add table headers for other project details */}
  </TableRow>
</TableHead>
  <TableBody>
    {projects.map((project, index) => (
      <TableRow key={index}>
        <TableCell>
        <Link to={`/projects/${project._id}`} style={linkStyles} className="project-link">
        {project.name}
      </Link>        </TableCell>
        <TableCell>{project.description}</TableCell>
        <TableCell>{project.location}</TableCell>
        <TableCell>
         
  <Button variant="contained" color="error" onClick={() => handleDelete(project._id)}> Delete</Button>
   
         </TableCell> 
        {/* Display other project details in table cells */}
      </TableRow>
    ))}
  </TableBody>
</Table>
      </TableContainer>
      <Modal open={showInputForm} onClose={() => setShowInputForm(false)}>
        <Box sx={modalStyle}>
          <h2>Add Project</h2>
          <TextField
            label="Project Name"
            value={projectData.name}
            onChange={(e) => {
              setProjectData({ ...projectData, name: e.target.value });
              setNameError(false); // Reset the name error when the user starts typing.
            }}
            error={nameError}
            sx={{  mx:1,my:1 }}
           
          />
          <TextField
            label="Project Description"
            value={projectData.description}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            sx={{  mx:1,my:1 }}
          />
          <TextField
            label="Project Location"
            value={projectData.location}
            onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
            sx={{  mx:1,my:1 }}
          />
           <Tooltip title="Enter the covered area for construction in square feet" arrow>
      <TextField
        label="Square Feet"
        value={squareFeet}
        onChange={handleSquareFeetChange}
        sx={{ mx: 1, my: 1 }}
      />
    </Tooltip>
         
          {/* Add more input fields for other project details */}
          <Button sx={{mx:20}} variant ="contained"  onClick={handleSubmitProject}>Submit Project</Button>
        </Box>
      </Modal>
      {isNavigating && <div>Navigating to a different tab...</div>}
      
      
      
    </Paper>
      <div style={{ display: 'flex' ,justifyContent: 'center', marginBottom: '10px' }}>
      <Button onClick={handleAddProjectClick} variant="contained" sx={{ ml: 'auto', m: 2 }}>
      Add Project
      </Button>
      </div>
      </>
    )}
  </>
  );
}

export default ProjectManager;
