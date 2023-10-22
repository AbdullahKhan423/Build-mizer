import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
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
    type: '',
    size: '',
    phase: '',
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/signin");
        return; // Return to exit the function if the token is missing.
      }
  
      try {
        const response = await axios.get("http://localhost:4000/projects", {
          withCredentials: true,
        });
  
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
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  


  const handleAddProjectClick = () => {
    setShowInputForm(true);
  };

  const handleSubmitProject = () => {
   console.log(cookies.token);
    if (!projectData.name) {
      setNameError(true);
      return;
    }
    // Clear the form and update projects
    fetch('http://localhost:4000/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
      .then(response => {
        if (response.ok) {
          // Handle a successful response (status code 200) from the server
          console.log('Project submitted successfully!');
          // Clear the form and update local state
          setProjects([...projects, projectData]);
          setShowInputForm(false);
          setIsNavigating(true);
  
          // Simulate navigation to a different tab or route after a delay
          setTimeout(() => {
            setIsNavigating(false);
            // Use routing to navigate to a different tab
          }, 3000);
        } else {
          // Handle errors or other responses from the server
          console.error('Error submitting project');
        }
      })
      .catch(error => {
        // Handle network errors
        console.error('Network error:', error);
      });
  };



  return (
    <Paper sx={{ marginTop: '2%' }}>
      <Button onClick={handleAddProjectClick} variant="contained" sx={{ mx: 2, mt: 2 }}>
        Add Project
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Project Description</TableCell>
              <TableCell>Project Location</TableCell>
              <TableCell>Project Type</TableCell>
              <TableCell>Project Size</TableCell>
              {/* Add table headers for other project details */}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow  key={index}>
                 <Link to={`/projects/${project._id}`}>{project.name}</Link>
                <TableCell sx={{ textAlign: 'center' }}>{project.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.location}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.type}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.size}</TableCell>
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
          <TextField
            label="Project Type"
            value={projectData.type}
            onChange={(e) => setProjectData({ ...projectData, type: e.target.value })}
            sx={{  mx:1,my:1 }}
          />
          <TextField
            label="Project Size"
            value={projectData.size}
            onChange={(e) => setProjectData({ ...projectData, size: e.target.value })}
            sx={{  mx:1,my:1 }}
          />
          <TextField
            label="Project Phase"
            value={projectData.phase}
            onChange={(e) => setProjectData({ ...projectData, phase: e.target.value })}
            sx={{  mx:1,my:1 }}
          />
          {/* Add more input fields for other project details */}
          <Button sx={{mx:20}} variant ="contained" onClick={handleSubmitProject}>Submit Project</Button>
        </Box>
      </Modal>
      {isNavigating && <div>Navigating to a different tab...</div>}
    </Paper>
  );
}

export default ProjectManager;
