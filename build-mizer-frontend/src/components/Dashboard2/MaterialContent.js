import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import {Backdrop}  from '@mui/material';
import Slide from '@mui/material/Slide';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';

function formatCurrency(number) {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'PKR', // Assuming INR as the currency, you can change it accordingly
    notation: 'compact',
    compactDisplay: 'long',
  });

  return formatter.format(number);
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MaterialContent() {
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showCustomMaterialForm, setShowCustomMaterialForm] = useState(false);
  const [customMaterialType, setCustomMaterialType] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hasBrickEntries, setHasBrickEntries] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState();
  const [brickCost, setBrickCost] = useState(0);
  const [sandCost, setSandCost] = useState(0);
  const [steelCost, setSteelCost] = useState(0);
  const [cementCost, setCementCost] = useState(0);
  const [crushCost, setCrushCost] = useState(0);
  const [bricksRate,setBricksRate]=useState();
  const [bricksQuantity,setBricksQuantity]=useState();
  const [cementRate, setCementRate]=useState();
  const [cementQuantity,setCementQuantity]=useState();
  const [sandRate,setSandRate]=useState();
  const [sandQuantity,setSandQuantity]=useState();
  const [steelQuantity,setSteelQuantity]=useState();
  const [steelRate,setSteelRate]=useState();
  const [crushQuantity,setCrushQuantity]=useState();
  const [crushRate, setCrushRate]=useState();
  const [hasSandEntries,setHasSandEntries]=useState(false);
  const [hasCrushEntries,setHasCrushEntries]=useState(false);
  const [hasCementEntries,setHasCementEntries]=useState(false);
  const [hasSteelEntries,setHasSteelEntries]=useState(false);
  const [materialName,setMaterialName]=useState('');
  const [customEntries, setCustomEntries] = useState({});
  const [materials, setMaterials] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [bricksQuantityDifference, setBricksQuantityDifference] = useState(0);
  const [cementQuantityDifference, setCementQuantityDifference] = useState(0);
  const [crushQuantityDifference, setCrushQuantityDifference] = useState(0);
  const [sandQuantityDifference, setSandQuantityDifference] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = async (projectId) => {
    try {
      setLoading(true);
      console.log("hello");
  
      // Make your API call to calculate differences
      const response = await axios.post(`http://localhost:4000/calculator/${projectId}/calculate-differences/`);
      
      // Process your data or update state as needed
      const { data } = response;
      
      // Assuming the data structure includes properties like bricksQuantityDifference, cementQuantityDifference, etc.
      setBricksQuantityDifference(data.brickQuantityDifference);
      setCementQuantityDifference(data.cementQuantityDifference);
      setCrushQuantityDifference(data.crushQuantityDifference);
      setSandQuantityDifference(data.sandQuantityDifference);
      
    } catch (error) {
      // Handle error scenarios if needed
      console.error('Error calculating differences:', error);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };
  
  const token = Cookies.get('token');
  const [materialData, setMaterialData] = useState({
    name: '',
    unitCost: '',
    quantity: '',
    
  });
  //for bricks
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
  // for cement
  const [cementEntries, setCementEntries] = useState([]); // State to store cement entries
  const [cementData, setCementData] = useState({
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
  const [showCementForm, setShowCementForm] = useState(false);

  const handleCementSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/cement/${projectId}`, cementData);
  
      if (response.status === 200) {
        // Add the newly created brick to the state
        setCementEntries([...cementEntries, response.data]);
  
        // Reset the brick state
        setCementData({
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
        
        setShowCementForm(false);
        window.location.reload();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error in handleCementSubmit:', error);
    }
  };

  const handleCementDelete = async (entry) => {
    try {
      // Send a DELETE request to your server to delete the brick entry by its ID
      console.log(entry);
      const response = await axios.delete(`http://localhost:4000/cement/${entry}`);
  
      if (response.status === 204) {
        // If the request is successful (status 204), remove the brick entry from your state
        const updatedCement = cementEntries.filter((cement) => cement._id !== entry._id);
        setCementEntries(updatedCement);
        window.location.reload();
      } else {
        // Handle errors or provide user feedback if the deletion was unsuccessful
        console.error('Failed to delete brick entry');
      }
    } catch (error) {
      console.error('An error occurred while deleting brick entry:', error);
    }
  };

  // for sand
  const [sandEntries, setSandEntries] = useState([]); // State to store sand entries
  const [sandData, setSandData] = useState({
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
  const [showSandForm, setShowSandForm] = useState(false);

  const handleSandSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/sand/${projectId}`, sandData);
  
      if (response.status === 200) {
        // Add the newly created brick to the state
        setSandEntries([...sandEntries, response.data]);
  
        // Reset the brick state
        setSandData({
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
        
        setShowSandForm(false);
        window.location.reload();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error in handleCementSubmit:', error);
    }
  };

  const handleSandDelete = async (entry) => {
    try {
      // Send a DELETE request to your server to delete the brick entry by its ID
      
      const response = await axios.delete(`http://localhost:4000/sand/${entry}`);
  
      if (response.status === 204) {
        // If the request is successful (status 204), remove the brick entry from your state
        const updatedSand = sandEntries.filter((sand) => sand._id !== entry._id);
        setSandEntries(updatedSand);
        window.location.reload();
      } else {
        // Handle errors or provide user feedback if the deletion was unsuccessful
        console.error('Failed to delete brick entry');
      }
    } catch (error) {
      console.error('An error occurred while deleting brick entry:', error);
    }
  };

  // for crush
  const [crushEntries, setCrushEntries] = useState([]); // State to store crush entries
  const [crushData, setCrushData] = useState({
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
  const [showCrushForm, setShowCrushForm] = useState(false);

  const handleCrushSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/crush/${projectId}`, crushData);
      console.log(response);
      if (response.status === 200) {
        // Add the newly created brick to the state
        setCrushEntries([...crushEntries, response.data]);
  
        // Reset the brick state
        setCrushData({
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
        
        setShowCrushForm(false);
        window.location.reload();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error in handleCementSubmit:', error);
    }
  };
  
  const handleCrushDelete = async (entry) => {
    try {
      // Send a DELETE request to your server to delete the brick entry by its ID
      
      const response = await axios.delete(`http://localhost:4000/crush/${entry}`);
  
      if (response.status === 204) {
        // If the request is successful (status 204), remove the brick entry from your state
        const updatedCrush = crushEntries.filter((crush) => crush._id !== entry._id);
        setCrushEntries(updatedCrush);
        window.location.reload();
      } else {
        // Handle errors or provide user feedback if the deletion was unsuccessful
        console.error('Failed to delete brick entry');
      }
    } catch (error) {
      console.error('An error occurred while deleting brick entry:', error);
    }
  };

  // for steel
  const [steelEntries, setSteelEntries] = useState([]); // State to store steel entries
  const [steelData, setSteelData] = useState({
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
  const [showSteelForm, setShowSteelForm] = useState(false);

  const handleSteelSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/steel/${projectId}`, steelData);
  
      if (response.status === 200) {
        // Add the newly created brick to the state
        setSteelEntries([...steelEntries, response.data]);
  
        // Reset the brick state
        setSteelData({
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
        
        setShowSteelForm(false);
        window.location.reload();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error in handleCrushSubmit:', error);
    }
  };

  const handleSteelDelete = async (entry) => {
    try {
      // Send a DELETE request to your server to delete the brick entry by its ID
      
      const response = await axios.delete(`http://localhost:4000/steel/${entry}`);
  
      if (response.status === 204) {
        // If the request is successful (status 204), remove the brick entry from your state
        const updatedSteel = steelEntries.filter((steel) => steel._id !== entry._id);
        setSteelEntries(updatedSteel);
        window.location.reload();
      } else {
        // Handle errors or provide user feedback if the deletion was unsuccessful
        console.error('Failed to delete brick entry');
      }
    } catch (error) {
      console.error('An error occurred while deleting brick entry:', error);
    }
  };



  const { projectId } = useParams(); 
  const handleNameTypeChange = (event) => {
    const selectedName = event.target.value;
    if (selectedName === 'Bricks') {
      setShowBrickForm(true);
    } else if (selectedName === 'Cement') {
      setShowCementForm(true);
    } else if(selectedName==='Sand'){
      setShowSandForm(true);
    }else if(selectedName==='Crush'){
      setShowCrushForm(true);
    }else if(selectedName==='Steel'){
      setShowSteelForm(true);
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
      setLoading(true);
      const getAllBricks = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/brick/${projectId}`);
          console.log(response);
          setBricks(response.data);
         const brickData=response.data;
          if (brickData && brickData.length > 0) {
            setHasBrickEntries(true);
          }
        } catch (error) {
          console.error('Error fetching bricks:', error);
        }
      };
      getAllBricks();
      const getAllCement=async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/cement/${projectId}`);
          setCementEntries(response.data);
          console.log(response.data);
         const cementData=response.data;
          if (cementData && cementData.length > 0) {
            setHasCementEntries(true);
          }
        } catch (error) {
          console.error('Error fetching bricks:', error);
        }
      };
      getAllCement();
      const getAllSand=async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/sand/${projectId}`);
          setSandEntries(response.data);
          console.log(response.data);
         const SandData=response.data;
          if (SandData && SandData.length > 0) {
            setHasSandEntries(true);
          }
        } catch (error) {
          console.error('Error fetching bricks:', error);
        }
      };
      getAllSand();

      const getAllCrush=async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/crush/${projectId}`);
          setCrushEntries(response.data);
          console.log(response.data);
         const CrushData=response.data;
          if (CrushData && CrushData.length > 0) {
            setHasCrushEntries(true);
          }
        } catch (error) {
          console.error('Error fetching bricks:', error);
        }
      };
      getAllCrush();

      const getAllSteel=async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/steel/${projectId}`);
          setSteelEntries(response.data);
          console.log(response.data);
         const SteelData=response.data;
          if (SteelData && SteelData.length > 0) {
            setHasSteelEntries(true);
          }
        } catch (error) {
          console.error('Error fetching bricks:', error);
        }
      };
      getAllSteel();
      const getCalculation = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/calculator/${projectId}`);
          console.log(response.data);
      
          if (response.data && response.data.data && response.data.data.length > 0) {
            const calculationData = response.data.data[0];
            console.log(calculationData);
      
            if (calculationData && calculationData.totalCost !== undefined) {
              const totalCost = calculationData.totalCost;
              const bricksQuantity=calculationData.bricksQuantity;
              const bricksRate=calculationData.bricksRate;
              const cementQuantity=calculationData.cementQuantity;
              const cementRate=calculationData.cementRate;
              const crushQuantity=calculationData.crushQuantity;
              const crushRate=calculationData.crushRate;
              const sandQuantity=calculationData.sandQuantity;
              const sandRate=calculationData.sandRate;
              const steelQuantity=calculationData.steelQuantity;
              const steelRate=calculationData.steelRate;
              const brickCost=calculationData.brickCost;
              const cementCost=calculationData.cementCost;
              const crushCost=calculationData.crushCost;
              const steelCost=calculationData.steelCost;
              const sandCost=calculationData.sandCost;
              const bricksQuantityDifference=calculationData.brickQuantityDifference;
              const cementQuantityDifference=calculationData.cementQuantityDifference;
              const crushQuantityDifference=calculationData.crushQuantityDifference;
              const sandQuantityDifference=calculationData.sandQuantityDifference;
              
              setTotalCost(totalCost);
              setBricksQuantity(bricksQuantity);
              setBricksRate(bricksRate);
              setCementQuantity(cementQuantity);
              setCementRate(cementRate);
              setCrushQuantity(crushQuantity);
              setCrushRate(crushRate);
              setSandQuantity(sandQuantity);
              setSandRate(sandRate);
              setSteelQuantity(steelQuantity);
              setSteelRate(steelRate);
              setBrickCost(brickCost);
              setSandCost(sandCost);
              setSteelCost(steelCost);
              setCementCost(cementCost);
              setCrushCost(crushCost);
              setBricksQuantityDifference(bricksQuantityDifference);
              setCementQuantityDifference(cementQuantityDifference);
              setCrushQuantityDifference(crushQuantityDifference);
              setSandQuantityDifference(sandQuantityDifference);


            } else {
              console.error('Total cost is undefined or not present in the response');
            }
          } else {
            console.error('Invalid or empty response data');
          }
        } catch (error) {
          console.error('Error fetching calculation', error);
        } finally {
          // Regardless of success or error, set loading to false
          setLoading(false);
        }
      };
      
      getCalculation();
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

  const openCementForm=()=>{
    setShowCementForm(true);
  }

  return (
    <>
     {loading ? (
      <CircularProgress sx={{ position: 'absolute', top: '50%', left: '60%' }} />
    ) : (
      <>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', padding: '5px' }}>
  <Accordion style={{ width: '100%', maxWidth: '1000px' }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        {totalCost !== undefined ? `Total Estimated Cost of Grey Structure: ${formatCurrency(totalCost)}` : 'Loading...'}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Bricks</TableCell>
              <TableCell>{bricksRate}/Unit</TableCell>
              <TableCell>{bricksQuantity}</TableCell>
              <TableCell>{brickCost} Rs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cement</TableCell>
              <TableCell>{cementRate}/Bag</TableCell>
              <TableCell>{cementQuantity}</TableCell>
              <TableCell>{cementCost} Rs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Crush</TableCell>
              <TableCell>{crushRate}/Cft</TableCell>
              <TableCell>{crushQuantity}</TableCell>
              <TableCell>{crushCost} Rs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sand</TableCell>
              <TableCell>{sandRate}/Cft</TableCell>
              <TableCell>{sandQuantity}</TableCell>
              <TableCell>{sandCost} Rs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Steel</TableCell>
              <TableCell>{steelRate}</TableCell>
              <TableCell>{steelQuantity}</TableCell>
              <TableCell>{steelCost} Rs</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </AccordionDetails>
  </Accordion>
</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', padding: '5px' }}>
        <Button variant="contained" onClick={openMaterialForm} style={{ marginRight: '10px' }}>
          Add Material
        </Button>
       
        <Button variant="contained" onClick={openCustomMaterialForm} style={{ marginRight: '10px' }}>
          Add Custom Material
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px', padding: '5px' }}>
  <Button variant="contained" color="success" onClick={() => handleOpen(projectId)}>Track Progress</Button>
  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    fullWidth
    maxWidth="md"
  >
    <DialogTitle>Your Table Title</DialogTitle>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Estimated Quantity</TableCell>
            <TableCell>Remaining Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Brick</TableCell>
            <TableCell>{bricksQuantity}</TableCell>
            <TableCell>{bricksQuantityDifference}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sand</TableCell>
            <TableCell>{sandQuantity}</TableCell>
            <TableCell>{sandQuantityDifference}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cement</TableCell>
            <TableCell>{cementQuantity}</TableCell>
            <TableCell>{cementQuantityDifference}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Crush</TableCell>
            <TableCell>{crushQuantity}</TableCell>
            <TableCell>{crushQuantityDifference}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Dialog>
      </div>

      <Paper style={{ maxWidth: '800px', margin: 'auto', overflowX: 'auto' }}>
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
              {materialName === 'Cement' && (
                  <Modal open={showCementForm} onClose={() =>{ setShowCementForm(false);setMaterialName(''); }} >
                    <Paper style={{ padding: '20px', textAlign: 'center',maxHeight: '100vh', overflowY: 'auto', margin: 'auto', width: '50%' }}>
                <h2 style={{ marginBottom: '20px' }}>Add Cement</h2>
                
                {/* Add a form to collect brick data */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField
                    label="Date"
                    type="date"
                    value={cementData.date}
                    onChange={(e) => setCementData({ ...cementData, date: e.target.value })}
                  />
                  <TextField
                    label="Supplier"
                    value={cementData.supplier}
                    onChange={(e) => setCementData({ ...cementData, supplier: e.target.value })}
                  />
                  <TextField
                    label="Brand"
                    value={cementData.brand}
                    onChange={(e) => setCementData({ ...cementData, brand: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={cementData.status}
                    onChange={(e) => setCementData({ ...cementData, status: e.target.value })}
                  >
                    <MenuItem value="ordered">Ordered</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                  </Select>
                  <Select
                    label="Type"
                    value={cementData.type}
                    onChange={(e) => setCementData({ ...cementData, type: e.target.value })}
                  >
                    <MenuItem value="awal">Awal</MenuItem>
                    <MenuItem value="dom">Dom</MenuItem>
                    <MenuItem value="som">Som</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={cementData.quantity}
                    onChange={(e) => setCementData({ ...cementData, quantity: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Unit Cost"
                    type="number"
                    value={cementData.unit_cost}
                    onChange={(e) => setCementData({ ...cementData, unit_cost: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Payment"
                    type="number"
                    value={cementData.payment}
                    onChange={(e) => setCementData({ ...cementData, payment: parseInt(e.target.value) })}
                  />
                  <Select
                    label="Payment Type"
                    value={cementData.payment_type}
                    onChange={(e) => setCementData({ ...cementData, payment_type: e.target.value })}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="account">Account</MenuItem>
                  </Select>
                  <Button variant="contained" onClick={handleCementSubmit}>
                    Submit Cement
                  </Button>
                </div>
                    </Paper>
                  </Modal>
                )}

                {materialName === 'Sand' && (
                  <Modal open={showSandForm} onClose={() => {setShowSandForm(false); setMaterialData('')}}>
                    <Paper style={{ padding: '20px', textAlign: 'center',maxHeight: '100vh', overflowY: 'auto', margin: 'auto', width: '50%' }}>
                <h2 style={{ marginBottom: '20px' }}>Add Sand</h2>
                
                {/* Add a form to collect brick data */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField
                    label="Date"
                    type="date"
                    value={sandData.date}
                    onChange={(e) => setSandData({ ...sandData, date: e.target.value })}
                  />
                  <TextField
                    label="Supplier"
                    value={sandData.supplier}
                    onChange={(e) => setSandData({ ...sandData, supplier: e.target.value })}
                  />
                  <TextField
                    label="Brand"
                    value={sandData.brand}
                    onChange={(e) => setSandData({ ...sandData, brand: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={sandData.status}
                    onChange={(e) => setSandData({ ...sandData, status: e.target.value })}
                  >
                    <MenuItem value="ordered">Ordered</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                  </Select>
                  <Select
                    label="Type"
                    value={sandData.type}
                    onChange={(e) => setSandData({ ...sandData, type: e.target.value })}
                  >
                    <MenuItem value="awal">Awal</MenuItem>
                    <MenuItem value="dom">Dom</MenuItem>
                    <MenuItem value="som">Som</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={sandData.quantity}
                    onChange={(e) => setSandData({ ...sandData, quantity: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Unit Cost"
                    type="number"
                    value={sandData.unit_cost}
                    onChange={(e) => setSandData({ ...sandData, unit_cost: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Payment"
                    type="number"
                    value={sandData.payment}
                    onChange={(e) => setSandData({ ...sandData, payment: parseInt(e.target.value) })}
                  />
                  <Select
                    label="Payment Type"
                    value={sandData.payment_type}
                    onChange={(e) => setSandData({ ...sandData, payment_type: e.target.value })}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="account">Account</MenuItem>
                  </Select>
                  <Button variant="contained" onClick={handleSandSubmit}>
                    Submit Sand
                  </Button>
                </div>
                    </Paper>
                  </Modal>
                )}

                {materialName === 'Crush' && (
                  <Modal open={showCrushForm} onClose={() => {setShowCrushForm(false); setMaterialData('');}}>
                    <Paper style={{ padding: '20px', textAlign: 'center',maxHeight: '100vh', overflowY: 'auto', margin: 'auto', width: '50%' }}>
                <h2 style={{ marginBottom: '20px' }}>Add Crush</h2>
                
                {/* Add a form to collect brick data */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField
                    label="Date"
                    type="date"
                    value={crushData.date}
                    onChange={(e) => setCrushData({ ...crushData, date: e.target.value })}
                  />
                  <TextField
                    label="Supplier"
                    value={crushData.supplier}
                    onChange={(e) => setCrushData({ ...crushData, supplier: e.target.value })}
                  />
                  <TextField
                    label="Brand"
                    value={crushData.brand}
                    onChange={(e) => setCrushData({ ...crushData, brand: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={crushData.status}
                    onChange={(e) => setCrushData({ ...crushData, status: e.target.value })}
                  >
                    <MenuItem value="ordered">Ordered</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                  </Select>
                  <Select
                    label="Type"
                    value={crushData.type}
                    onChange={(e) => setCrushData({ ...crushData, type: e.target.value })}
                  >
                    <MenuItem value="awal">Awal</MenuItem>
                    <MenuItem value="dom">Dom</MenuItem>
                    <MenuItem value="som">Som</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={crushData.quantity}
                    onChange={(e) => setCrushData({ ...crushData, quantity: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Unit Cost"
                    type="number"
                    value={crushData.unit_cost}
                    onChange={(e) => setCrushData({ ...crushData, unit_cost: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Payment"
                    type="number"
                    value={crushData.payment}
                    onChange={(e) => setCrushData({ ...crushData, payment: parseInt(e.target.value) })}
                  />
                  <Select
                    label="Payment Type"
                    value={crushData.payment_type}
                    onChange={(e) => setCrushData({ ...crushData, payment_type: e.target.value })}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="account">Account</MenuItem>
                  </Select>
                  <Button variant="contained" onClick={handleCrushSubmit}>
                    Submit Crush
                  </Button>
                </div>
                    </Paper>
                  </Modal>
                )}
                {materialName==='Steel'&&(
                  <Modal open={showSteelForm} onClose={()=>{setShowSteelForm(false); setMaterialData('');}}>
                    <Paper style={{ padding: '20px', textAlign: 'center',maxHeight: '100vh', overflowY: 'auto', margin: 'auto', width: '50%' }}>
                <h2 style={{ marginBottom: '20px' }}>Add Steel</h2>
                
                {/* Add a form to collect brick data */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField
                    label="Date"
                    type="date"
                    value={steelData.date}
                    onChange={(e) => setSteelData({ ...steelData, date: e.target.value })}
                  />
                  <TextField
                    label="Supplier"
                    value={steelData.supplier}
                    onChange={(e) => setSteelData({ ...steelData, supplier: e.target.value })}
                  />
                  <TextField
                    label="Brand"
                    value={steelData.brand}
                    onChange={(e) => setSteelData({ ...steelData, brand: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={steelData.status}
                    onChange={(e) => setSteelData({ ...steelData, status: e.target.value })}
                  >
                    <MenuItem value="ordered">Ordered</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                  </Select>
                  <Select
                    label="Type"
                    value={steelData.type}
                    onChange={(e) => setSteelData({ ...steelData, type: e.target.value })}
                  >
                    <MenuItem value="awal">Awal</MenuItem>
                    <MenuItem value="dom">Dom</MenuItem>
                    <MenuItem value="som">Som</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={steelData.quantity}
                    onChange={(e) => setSteelData({ ...steelData, quantity: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Unit Cost"
                    type="number"
                    value={steelData.unit_cost}
                    onChange={(e) => setSteelData({ ...steelData, unit_cost: parseInt(e.target.value) })}
                  />
                  <TextField
                    label="Payment"
                    type="number"
                    value={steelData.payment}
                    onChange={(e) => setSteelData({ ...steelData, payment: parseInt(e.target.value) })}
                  />
                  <Select
                    label="Payment Type"
                    value={steelData.payment_type}
                    onChange={(e) => setSteelData({ ...steelData, payment_type: e.target.value })}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="account">Account</MenuItem>
                  </Select>
                  <Button variant="contained" onClick={handleSteelSubmit}>
                    Submit Steel
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
          {hasBrickEntries && (
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
          )}

          {hasCementEntries && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
              Cement
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
                {cementEntries.map((cement, cementIndex) => (
                  <TableRow key={cementIndex}>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.date}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.status}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.supplier}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.brand}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.quantity}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.unit_cost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.totalCost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.payment}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.payment_type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{cement.payment_outstanding}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleCementDelete(cement._id)}>Delete</button></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleBrickUpdate(cement._id)}>Update</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          {hasSandEntries && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
              Sand
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
                {sandEntries.map((sand, sandIndex) => (
                  <TableRow key={sandIndex}>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.date}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.status}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.supplier}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.brand}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.quantity}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.unit_cost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.totalCost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.payment}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.payment_type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{sand.payment_outstanding}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleSandDelete(sand._id)}>Delete</button></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleBrickUpdate(sand._id)}>Update</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          {hasSteelEntries && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
              Steel
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
                {steelEntries.map((steel, steelIndex) => (
                  <TableRow key={steelIndex}>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.date}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.status}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.supplier}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.brand}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.quantity}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.unit_cost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.totalCost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.payment}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.payment_type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{steel.payment_outstanding}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleSteelDelete(steel._id)}>Delete</button></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleBrickUpdate(steel._id)}>Update</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          {hasCrushEntries && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center', color: 'black', padding: '10px' }}>
              Crush
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
                {crushEntries.map((crush, crushIndex) => (
                  <TableRow key={crushIndex}>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.date}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.status}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.supplier}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.brand}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.quantity}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.unit_cost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.totalCost}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.payment}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.payment_type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{crush.payment_outstanding}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleCrushDelete(crush._id)}>Delete</button></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}><button onClick={() => handleBrickUpdate(crush._id)}>Update</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}
        </TableContainer>
      </Paper>
    
  <div>
</div>
</>
    )}
</>
  );}

  export default MaterialContent;