import React, { useState } from 'react';
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

function MaterialContent() {
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showCustomMaterialForm, setShowCustomMaterialForm] = useState(false);
  const [materialType, setMaterialType] = useState('Bricks'); // Default to 'Bricks'
  const [customMaterialType, setCustomMaterialType] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [materialEntries, setMaterialEntries] = useState({});
  const [customEntries, setCustomEntries] = useState({});

  const handleMaterialTypeChange = (event) => {
    setMaterialType(event.target.value);
  };

  const handleMaterialSubmit = () => {
    // Create a new object entry with the materialType as the key
    const newMaterialEntry = {
      materialType,
      unitCost,
      quantity,
    };

    setMaterialEntries((prevEntries) => ({
      ...prevEntries,
      [materialType]: [...(prevEntries[materialType] || []), newMaterialEntry],
    }));

    // Clear form fields
    setMaterialType('Bricks');
    setUnitCost('');
    setQuantity('');

    setShowMaterialForm(false);
  };

  const handleCustomMaterialSubmit = () => {
    // Create a new object entry with the customMaterialType as the key
    const newCustomMaterialEntry = {
      name: customMaterialType,
      unitCost,
      quantity,
    };

    setCustomEntries((prevEntries) => ({
      ...prevEntries,
      [customMaterialType]: [...(prevEntries[customMaterialType] || []), newCustomMaterialEntry],
    }));

    // Clear form fields
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
    <Paper>
      <Button variant="contained" onClick={openMaterialForm}>
        Add Material
      </Button>
      <Button variant="contained" onClick={openCustomMaterialForm}>
        Add Custom Material
      </Button>

      {/* Material Entry Form */}
      <Modal open={showMaterialForm} onClose={() => setShowMaterialForm(false)}>
        <Paper>
          <h2>Add Material</h2>
          <Select label="Material Type" value={materialType} onChange={handleMaterialTypeChange}>
            {["Bricks", "Sand", "Crush", "Cement", "Steel"].map((material) => (
              <MenuItem key={material} value={material}>
                {material}
              </MenuItem>
            ))}
          </Select>

          <TextField label="Unit Cost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
          <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <Button variant="contained" onClick={handleMaterialSubmit}>
            Submit Material
          </Button>
        </Paper>
      </Modal>

      {/* Custom entry form */}
      <Modal open={showCustomMaterialForm} onClose={() => setShowCustomMaterialForm(false)}>
        <Paper>
          <h2>Add Custom Material</h2>
          <TextField label="Name" value={customMaterialType} onChange={(e) => setCustomMaterialType(e.target.value)} />
          <TextField label="Unit Cost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} />
          <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <Button variant="contained" onClick={handleCustomMaterialSubmit}>
            Submit Custom Material
          </Button>
        </Paper>
      </Modal>

      {/* Material Entries Table */}
      <TableContainer>
        {Object.entries(materialEntries).map(([name, entries], index) => (
          <div key={index}>
            <h3>{name}</h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material Type</TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry, entryIndex) => (
                  <TableRow key={entryIndex}>
                    <TableCell>{entry.materialType}</TableCell>
                    <TableCell>{entry.unitCost}</TableCell>
                    <TableCell>{entry.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
        {Object.entries(customEntries).map(([name, entries], index) => (
          <div key={index}>
            <h3>{name}</h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry, entryIndex) => (
                  <TableRow key={entryIndex}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.unitCost}</TableCell>
                    <TableCell>{entry.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </TableContainer>
    </Paper>
  );
}

export default MaterialContent;
