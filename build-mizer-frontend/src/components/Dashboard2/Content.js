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
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleAddProjectClick = () => {
    setShowInputForm(true);
  };

  const handleSubmitProject = () => {
    if (!projectData.name) {
      setNameError(true);
      return;
    }

    // Send a POST request to the backend to save projectData
    // After a successful response, update the projects state with the new project
    // Simulating the request here for demonstration

    // Clear the form and update projects
    setProjects([...projects, projectData]);
    
    setShowInputForm(false);
    setIsNavigating(true);

    // Navigate to a different tab or route after a delay
    setTimeout(() => {
      setIsNavigating(false);
      // Use routing to navigate to a different tab
    }, 3000);
  };

  {/*}useEffect(() => {
    // Simulate fetching projects from the server on component mount
    // Replace this with an actual API request to retrieve existing projects
    const fetchData = async () => {
      // Simulated data
      const response = await fetch('api/projects');
      const data = await response.json();
      setProjects(data);
    };

    fetchData();
  }, []);{*/}

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
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{project.type}</TableCell>
                <TableCell>{project.size}</TableCell>
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
