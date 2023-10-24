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
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MaterialContent() {
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showCustomMaterialForm, setShowCustomMaterialForm] = useState(false);
  const [materialType, setMaterialType] = useState('Bricks');
  const [customMaterialType, setCustomMaterialType] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [entryDate,setEntryDate]= useState('');
  const [measuringUnit, setMeasuringUnit] = useState('');
  const [materialEntries, setMaterialEntries] = useState({});
  const [customEntries, setCustomEntries] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [materials, setMaterials] = useState([]);
  const { projectId } = useParams();
  console.log(projectId);
  const handleMaterialTypeChange = (event) => {
    setMaterialType(event.target.value);
  };

 
    // Inside the effect, make the API request to fetch materials when the component mounts or when projectId changes.
    useEffect(() => {
      async function fetchMaterials() {
        try {
          const response = await axios.get(`http://localhost:4000/materials/${projectId}`);
          const materialsResponse = response.data;
          console.log(materialsResponse);
    
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
          console.log(groupedMaterials);
    
          // You can set this grouped data in your state
          setMaterialEntries(groupedMaterials);
        } catch (error) {
          console.error('Error fetching materials', error);
        }
      }
      fetchMaterials();
    }, [projectId]);
    

  const handleMaterialSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const totalCost = (parseFloat(unitCost) * parseFloat(quantity)).toFixed(2);

    const newMaterialEntry = {
      name:'',
      unitCost,
      quantity: `${quantity} ${measuringUnit}`,
      totalCost,
      entryDate:formattedDate,
    };

    setMaterialEntries((prevEntries) => ({
      ...prevEntries,
      [materialType]: [...(prevEntries[materialType] || []), newMaterialEntry],
    }));

    setMaterialType('Bricks');
    setUnitCost('');
    setMeasuringUnit('');
    setQuantity('');

    setShowMaterialForm(false);
  };

  const handleCustomMaterialSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const totalCost = (parseFloat(unitCost) * parseFloat(quantity)).toFixed(2);

    const newCustomMaterialEntry = {
      name: customMaterialType,
      unitCost,
      quantity: `${quantity} ${measuringUnit}`,
      totalCost,
      entryDate:formattedDate,
    };

    setCustomEntries((prevEntries) => ({
      ...prevEntries,
      [customMaterialType]: [...(prevEntries[customMaterialType] || []), newCustomMaterialEntry],
    }));

    setCustomMaterialType('');
    setUnitCost('');
    setMeasuringUnit('');
    setQuantity('');

    setShowCustomMaterialForm(false);
  };

  const openMaterialForm = () => {
    setShowMaterialForm(true);
  };

  const openCustomMaterialForm = () => {
    setShowCustomMaterialForm(true);
  };

  const generateSummary = () => {
    setShowSummary(true);
  };

  const closeSummary = () => {
    setShowSummary(false);
  };

  const generateSummaryTable = () => {
    const summary = {};
    
    // Collect and summarize data
    for (const entry of Object.values(materialEntries).flat().concat(Object.values(customEntries).flat())) {
      if (!summary[entry.materialType]) {
        summary[entry.materialType] = {
          totalQuantity: 0,
          totalCost: 0,
        };
      }
      const quantity = parseFloat(entry.quantity.split(' ')[0]);
      const cost = parseFloat(entry.totalCost);
      summary[entry.materialType].totalQuantity += quantity;
      summary[entry.materialType].totalCost += cost;
    }

    return (
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Material Type</TableCell>
                <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Total Quantity</TableCell>
                <TableCell sx={{ backgroundColor: '#FFB802', color: 'black', textAlign: 'center' }}>Total Cost</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(summary).map(([name, { totalQuantity }], index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: 'center' }}>{name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{totalQuantity}</TableCell>
                  
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </div>
    );
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
        
        <Button variant="contained" onClick={generateSummary}>
          Summary
        </Button>
      </div>
  
      {showSummary && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Button variant="contained" onClick={closeSummary}>
            Close Summary
          </Button>
          {generateSummaryTable()}
        </div>
      )}
      
      <Paper>
        <Modal open={showMaterialForm} onClose={() => setShowMaterialForm(false)}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>Add Material</h2>
  
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Select label="Material Type" value={materialType} onChange={handleMaterialTypeChange}>
                {["Bricks", "Sand", "Crush", "Cement", "Steel"].map((material) => (
                  <MenuItem key={material} value={material}>
                    {material}
                  </MenuItem>
                ))}
              </Select>
  
              <TextField label="Unit Cost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
              <TextField label="Measuring Unit" value={measuringUnit} onChange={(e) => setMeasuringUnit(e.target.value)} />
              <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <TextField label="Quantity" value={entryDate} onChange={(e) => setQuantity(e.target.value)} />
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
              <TextField label="Measuring Unit" value={measuringUnit} onChange={(e) => setMeasuringUnit(e.target.value)} />
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
          {Object.entries(materialEntries).map(([name, entries], index) => (
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((entry, entryIndex) => (
                    <TableRow key={entryIndex}>
                      <TableCell sx={{ textAlign: 'center' }}>{entry.materialType}</TableCell>
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