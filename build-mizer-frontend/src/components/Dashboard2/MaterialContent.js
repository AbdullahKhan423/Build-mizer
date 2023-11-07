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
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MaterialContent() {
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showCustomMaterialForm, setShowCustomMaterialForm] = useState(false);
  const [customMaterialType, setCustomMaterialType] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  // i introduced this state and now i am going to replace materialtype with materialName
  const [materialName,setMaterialName]=useState('');
  const [customEntries, setCustomEntries] = useState({});
  const [materials, setMaterials] = useState([]);
  const token = Cookies.get('token');
  const [materialData, setMaterialData] = useState({
    name: '',
    unitCost: '',
    quantity: '',
    
  });
  
  const [bricks, setBricks] = useState([]);
  const [brick, setBrick] = useState({
    date: '',
    status: '',
    supplier: '',
    brand: '',
    type: '',
    quantity: 0,
    unit_cost: 0,
    payment: 0,
    payment_type: 'cash',
  });
  const [showBrickForm, setShowBrickForm] = useState(false);

  const { projectId } = useParams(); 
  const handleNameTypeChange = (event) => {
    const selectedName = event.target.value;
    if (selectedName === 'Bricks') {
      setShowBrickForm(true);
    } else {
      setShowBrickForm(false);
    }
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
          const groupedMaterials = {};
          materialsResponse.forEach((material) => {
            const name = material.name;
            if (!groupedMaterials[name]) {
              groupedMaterials[name] = [];
            }
            groupedMaterials[name].push(material);
          });
          setMaterials(groupedMaterials);
        } catch (error) {
          console.error('Error fetching materials', error);
        }
      }
      fetchMaterials();
      const getAllBricks = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/brick/${projectId}`);
          setBricks(response.data);
        } catch (error) {
          console.error('Error fetching bricks:', error);
        }
      };
      getAllBricks();
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
          
        } else {
        
        }
      })
      .catch((error) => {
       
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

  const handleBrickSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/brick/${projectId}`, brick);
  
      if (response.status === 200) {
        // Add the newly created brick to the state
        setBricks([...bricks, response.data]);
  
        // Reset the brick state
        setBrick({
          date: '',
          status: '',
          supplier: '',
          brand: '',
          type: '',
          quantity: 0,
          unit_cost: 0,
          payment: 0,
          payment_type: 'cash',
        });
        
        setShowBrickForm(false);
        window.location.reload();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error in handleBrickSubmit:', error);
    }
  };

  const handleBrickDelete = async (entry) => {
    try {
      // Send a DELETE request to your server to delete the brick entry by its ID
      console.log(entry);
      const response = await axios.delete(`http://localhost:4000/brick/${entry}`);
  
      if (response.status === 204) {
        // If the request is successful (status 204), remove the brick entry from your state
        const updatedBricks = bricks.filter((brick) => brick._id !== entry._id);
        setBricks(updatedBricks);
        window.location.reload();
      } else {
        // Handle errors or provide user feedback if the deletion was unsuccessful
        console.error('Failed to delete brick entry');
      }
    } catch (error) {
      console.error('An error occurred while deleting brick entry:', error);
    }
  };
  
  const handleBrickUpdate=async(entry)=>{

  }

  const openBrickForm = () => {
   
    setShowBrickForm(true);
    
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
              {materialName==='Bricks'&&(
                 <Modal open={showBrickForm}    onClose={() =>{ setShowBrickForm(false);setMaterialName(''); }}>
                <Paper style={{ padding: '20px', textAlign: 'center',maxHeight: '100vh', overflowY: 'auto', margin: 'auto', width: '50%' }}>
                <h2 style={{ marginBottom: '20px' }}>Add Brick</h2>
                
                {/* Add a form to collect brick data */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField
                    label="Date"
                    type="date"
                    value={brick.date}
                    onChange={(e) => setBrick({ ...brick, date: e.target.value })}
                  />
                  <TextField
                    label="Supplier"
                    value={brick.supplier}
                    onChange={(e) => setBrick({ ...brick, supplier: e.target.value })}
                  />
                  <TextField
                    label="Brand"
                    value={brick.brand}
                    onChange={(e) => setBrick({ ...brick, brand: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={brick.status}
                    onChange={(e) => setBrick({ ...brick, status: e.target.value })}
                  >
                    <MenuItem value="ordered">Ordered</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                  </Select>
                  <Select
                    label="Type"
                    value={brick.type}
                    onChange={(e) => setBrick({ ...brick, type: e.target.value })}
                  >
                    <MenuItem value="awal">Awal</MenuItem>
                    <MenuItem value="dom">Dom</MenuItem>
                    <MenuItem value="som">Som</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={brick.quantity}
                    onChange={(e) => setBrick({ ...brick, quantity: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Unit Cost"
                    type="number"
                    value={brick.unit_cost}
                    onChange={(e) => setBrick({ ...brick, unit_cost: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Payment"
                    type="number"
                    value={brick.payment}
                    onChange={(e) => setBrick({ ...brick, payment: parseInt(e.target.value) })}
                  />
                  <Select
                    label="Payment Type"
                    value={brick.payment_type}
                    onChange={(e) => setBrick({ ...brick, payment_type: e.target.value })}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="account">Account</MenuItem>
                  </Select>
                  <Button variant="contained" onClick={handleBrickSubmit}>
                    Submit Brick
                  </Button>
                </div>
                    </Paper>
                    </Modal>
              )}
                  
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
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
              Brick
            </h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Date</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Status</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Supplier</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Brand</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Type</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Quantity</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Unit Cost</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Total Cost</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Payment</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Payment Type</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Outstanding Payment</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}></TableCell>
                  <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bricks.map((brick, brickIndex) => (
                  <TableRow key={brickIndex}>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.date}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.status}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.supplier}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.brand}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.quantity}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.unit_cost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.totalCost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.payment}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.payment_type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{brick.payment_outstanding}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleBrickDelete(brick._id)}>Delete</button></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleBrickUpdate(brick._id)}>Update</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </Paper>
      
  <div>
   
  
  
</div>

    </>
  );}

  export default MaterialContent;