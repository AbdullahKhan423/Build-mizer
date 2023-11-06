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
  const [measuringUnit, setMeasuringUnit] = useState('');
  const [materialEntries, setMaterialEntries] = useState({});
  const [customEntries, setCustomEntries] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleMaterialTypeChange = (event) => {
    setMaterialType(event.target.value);
  };

  const handleMaterialSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const totalCost = (parseFloat(unitCost) * parseFloat(quantity)).toFixed(2);

    const newMaterialEntry = {
      materialType,
      unitCost,
      quantity: `${quantity} ${measuringUnit}`,
      totalCost,
      entryDate: formattedDate,
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
              {Object.entries(summary).map(([materialType, { totalQuantity, totalCost }], index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: 'center' }}>{materialType}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{totalQuantity}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{totalCost.toFixed(2)}</TableCell>
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
  
              <TextField label="Unit Cost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
              <TextField label="Measuring Unit" value={measuringUnit} onChange={(e) => setMeasuringUnit(e.target.value)} />
              <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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