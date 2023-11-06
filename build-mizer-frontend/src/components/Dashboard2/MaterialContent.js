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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MaterialContent() {
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showCustomMaterialForm, setShowCustomMaterialForm] = useState(false);
  const [materialType, setMaterialType] = useState('Bricks');
  const [customMaterialType, setCustomMaterialType] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  const [quantity, setQuantity] = useState('');
  // i introduced this state and now i am going to replace materialtype with materialName
  const [materialName,setMaterialName]=useState();
  const [materialEntries, setMaterialEntries] = useState({});
  const [customEntries, setCustomEntries] = useState({});
  const [materials, setMaterials] = useState([]);
  const token = Cookies.get('token');
  const [materialData, setMaterialData] = useState({
    name: '',
    unitCost: '',
    quantity: '',
    
  });
  const { projectId } = useParams();
  const handleNameTypeChange = (event) => {
    const selectedName = event.target.value;

  // Use the state updater function to set the state based on the previous state
  setMaterialName(selectedName);
    
  // Update the materialData state as well
  setMaterialData((prevMaterialData) => ({
    ...prevMaterialData,
    name: selectedName,
   
  }));
  console.log(selectedName);
  };
  


 
    // Inside the effect, make the API request to fetch materials when the component mounts or when projectId changes.
    useEffect(() => {
      async function fetchMaterials() {
        try {
          const response = await axios.get(`http://localhost:4000/materials/${projectId}`);
          const materialsResponse = response.data;
          
          
          // Create an object to group materials by their name
          const groupedMaterials = {};
    
          // Iterate over the materialsResponse array
          materialsResponse.forEach((material) => {
            const name = material.name;
    
            if (!groupedMaterials[name]) {
              // If the name doesn't exist in groupedMaterials, initialize it as an array
              groupedMaterials[name] = [];
            }
    
            // Push the material to the array with that name
            groupedMaterials[name].push(material);
          });
    
          // Now, you have grouped materials by their name in groupedMaterials
          
    
          // You can set this grouped data in your state
          setMaterials(groupedMaterials);
        } catch (error) {
          console.error('Error fetching materials', error);
        }
      }
      fetchMaterials();
    }, [projectId]);
    

   const handleMaterialSubmit = async() => {
    const currentDate = new Date();
    
   const response = await fetch(`http://localhost:4000/materials/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(materialData),
      
    })
    console.log(materialData);
    
      
    if (response.ok) {
      const newMaterials = {
        ...materials,
        [materialName]: [...(materials[materialName] || []), materialData],
      };
      setMaterials(newMaterials);
      setUnitCost('');
      setQuantity('');
      
      setShowMaterialForm(false);
      window.location.reload();
    }
    }
    const handleMaterialUpdate = async()=>{

    }
    const handleMaterialDelete = (materialId)=>{
      console.log("Hello",materialId);
      fetch(`http://localhost:4000/materials/${materialId}`, {
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
    }
  const handleCustomMaterialSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const totalCost = (parseFloat(unitCost) * parseFloat(quantity)).toFixed(2);

    const newCustomMaterialEntry = {
      name: customMaterialType,
      unitCost,
      quantity: `${quantity}`,
      totalCost,
      entryDate:formattedDate,
    };

    setCustomEntries((prevEntries) => ({
      ...prevEntries,
      [customMaterialType]: [...(prevEntries[customMaterialType] || []), newCustomMaterialEntry],
    }));

    setCustomMaterialType('');
    setUnitCost('');
    
    setQuantity('');

    setShowCustomMaterialForm(false);
  };

  const openMaterialForm = () => {
    setShowMaterialForm(true);
  };

  const openCustomMaterialForm = () => {
    setShowCustomMaterialForm(true);
  };

  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', padding: '5px' }}>
        <Button variant="contained" onClick={openMaterialForm} style={{ marginRight: '10px' }}>
          Add Material
        </Button>
       
        <Button variant="contained" onClick={openCustomMaterialForm} style={{ marginRight: '10px' }}>
          Add Custom Material
        </Button>
      </div>
      <Paper>
        <Modal open={showMaterialForm} onClose={() => setShowMaterialForm(false)}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>Add Material</h2>
  
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <Select label="Material Type" value={materialName} onChange={handleNameTypeChange}>
                {["Bricks", "Sand", "Crush", "Cement", "Steel"].map((material) => (
                  <MenuItem key={material} value={material}>
                    {material}
                  </MenuItem>
                ))}
              </Select>
                
              {/*<TextField value={materialName} onChange={handleNameTypeChange}></TextField>*/}
              <TextField label="Unit Cost" value={materialData.unitCost} onChange={(e) => {setMaterialData({ ...materialData, unitCost: e.target.value });}} />
              <TextField label="Quantity" value={materialData.quantity} onChange={(e) => {setMaterialData({ ...materialData, quantity: e.target.value });}} />
              
            </div>
  
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button variant="contained" onClick={handleMaterialSubmit}>
                Submit Material
              </Button>
            </div>
          </Paper>
        </Modal>
  
        <Modal open={showCustomMaterialForm} onClose={() => setShowCustomMaterialForm(false)}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>Add Custom Material</h2>
  
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TextField label="Name" value={customMaterialType} onChange={(e) => setCustomMaterialType(e.target.value)} />
              <TextField label="Unit Cost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
              
              <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
  
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button variant="contained" onClick={handleCustomMaterialSubmit}>
                Submit Custom Material
              </Button>
            </div>
          </Paper>
        </Modal>
  
        <TableContainer>
          {Object.entries(materials).map(([name, entries], index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
                {name}
              </h3>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Material Type</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Unit Cost</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Quantity</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Total Cost</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Entry Date</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}></TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((entry, entryIndex) => (
                    <TableRow key={entryIndex}>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.name}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.unitCost}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.quantity}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.totalCost}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.createdAt}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><button onClick={handleMaterialUpdate}>Update</button></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleMaterialDelete(entry._id)}>Delete</button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
          {Object.entries(customEntries).map(([name, entries], index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
                {name}
              </h3>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Name</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Unit Cost</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Quantity</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Total Cost</TableCell>
                    <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Entry Date</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((entry, entryIndex) => (
                    <TableRow key={entryIndex}>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.name}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.unitCost}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.quantity}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.totalCost}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.entryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </TableContainer>
      </Paper>
    </>
  );}

  export default MaterialContent;