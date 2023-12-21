import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function ProjectManager() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [projects, setProjects] = useState([]);
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
        <Link to={`/report/${project._id}`} style={linkStyles} className="project-link">
        {project.name}
      </Link>        </TableCell>
        <TableCell>{project.description}</TableCell>
        <TableCell>{project.location}</TableCell>
        <TableCell>
         
   
         </TableCell> 
        {/* Display other project details in table cells */}
      </TableRow>
    ))}
  </TableBody>
</Table>
      </TableContainer>
      
 
    </Paper>
      <div style={{ display: 'flex' ,justifyContent: 'center', marginBottom: '10px' }}>
      </div>
      </>
    )}
  </>
  );
}

export default ProjectManager;
