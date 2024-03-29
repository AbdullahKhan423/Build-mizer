import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';
import './reportcontent.css';
function ReportContent() {
   
    const [loading, setLoading] = useState(true);
    const [totalCost, setTotalCost] = useState();
    const [actualCost,setActualCost]=useState();
    const [brickCost, setBrickCost] = useState(0);
    const [sandCost, setSandCost] = useState(0);
    const [steelCost, setSteelCost] = useState(0);
    const [cementCost, setCementCost] = useState(0);
    const [crushCost, setCrushCost] = useState(0);
    const [bricksQuantity,setBricksQuantity]=useState();
    const [cementQuantity,setCementQuantity]=useState();
    const [sandQuantity,setSandQuantity]=useState();
    const [steelQuantity,setSteelQuantity]=useState();
    const [crushQuantity,setCrushQuantity]=useState();
    const [bricksQuantityDifference, setBricksQuantityDifference] = useState(0);
    const [cementQuantityDifference, setCementQuantityDifference] = useState(0);
    const [crushQuantityDifference, setCrushQuantityDifference] = useState(0);
    const [sandQuantityDifference, setSandQuantityDifference] = useState(0);
    const [brickCostDifference, setBrickCostDifference] = useState(0);
    const [cementCostDifference, setCementCostDifference] = useState(0);
    const [crushCostDifference, setCrushCostDifference] = useState(0);
    const [sandCostDifference, setSandCostDifference] = useState(0);
    const [actualBricksQuantity, setActualBricksQuantity] = useState(0);
    const [actualCementQuantity, setActualCementQuantity] = useState(0);
    const [actualCrushQuantity, setActualCrushQuantity] = useState(0);
    const [actualSandQuantity, setActualSandQuantity] = useState(0);
    const [actualSteelQuantity, setActualSteelQuantity]=useState(0);
    const [actualBricksCost, setActualBricksCost] = useState(0);
    const [actualCementCost, setActualCementCost] = useState(0);
    const [actualCrushCost, setActualCrushCost] = useState(0);
    const [actualSandCost, setActualSandCost] = useState(0);
    const [actualSteelCost, setActualSteelCost]= useState(0);
    const [open, setOpen] = useState(false);
  
    const handleClose = () => {
        setOpen(false);
    };


      const { projectId } = useParams(); 
      useEffect(()=>{
        
        setLoading(true);
        const getCalculation = async () => {
            
            console.log(projectId);
            try {
              const response = await axios.get(`http://localhost:4000/calculator/${projectId}`);
              console.log(response.data);
          
              if (response.data && response.data.data && response.data.data.length > 0) {
                const calculationData = response.data.data[0];
                console.log(calculationData);
          
                if (calculationData && calculationData.totalCost !== undefined) {
                  const totalCost = calculationData.totalCost;
                  const bricksQuantity=calculationData.bricksQuantity;
                  
                  const cementQuantity=calculationData.cementQuantity;
                  
                  const crushQuantity=calculationData.crushQuantity;
                  
                  const sandQuantity=calculationData.sandQuantity;
                  
                  const steelQuantity=calculationData.steelQuantity;
                  
                  const brickCost=calculationData.brickCost;
                  const cementCost=calculationData.cementCost;
                  const crushCost=calculationData.crushCost;
                  const steelCost=calculationData.steelCost;
                  const sandCost=calculationData.sandCost;
                  const bricksQuantityDifference=calculationData.brickQuantityDifference;
                  const cementQuantityDifference=calculationData.cementQuantityDifference;
                  const crushQuantityDifference=calculationData.crushQuantityDifference;
                  const sandQuantityDifference=calculationData.sandQuantityDifference;
                  const steelQuantityDifference=calculationData.steelQuantityDifference;
                  setTotalCost(totalCost);
                  
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
        const calculatedifference = async () => {
          try {
            
            
        
            // Make your API call to calculate differences
            const response = await axios.post(`http://localhost:4000/calculator/${projectId}/calculate-differences/`);
            
            // Process your data or update state as needed
            const { data } = response;
            console.log(data);
            // Assuming the data structure includes properties like bricksQuantityDifference, cementQuantityDifference, etc.
            setBricksQuantityDifference(data.brickQuantityDifference);
            setCementQuantityDifference(data.cementQuantityDifference);
            setCrushQuantityDifference(data.crushQuantityDifference);
            setSandQuantityDifference(data.sandQuantityDifference);
            
            setBrickCostDifference(data.brickCostDifference);
            setCementCostDifference(data.cementCostDifference);
            setCrushCostDifference(data.crushCostDifference);
            setSandCostDifference(data.sandCostDifference);
            setActualCost(data.actualCost)
            setActualBricksQuantity(data.actualBricksQuantity || 0);
            setActualCementQuantity(data.actualCementQuantity || 0);
            setActualCrushQuantity(data.actualCrushQuantity || 0);
            setActualSandQuantity(data.actualSandQuantity || 0);
            setActualSteelQuantity(data.actualSteelQuantity || 0);
            setActualBricksCost(data.actualBricksCost || 0);
            setActualCementCost(data.actualCementCost || 0);
            setActualCrushCost(data.actualCrushCost || 0);
            setActualSandCost(data.actualSandCost || 0);
            setActualSteelCost(data.actualSteelCost || 0);
            setBrickCost(data.brickCost);
            setBricksQuantity(data.brickQuantity);
            setCementCost(data.cementCost);
            setCementQuantity(data.cementQuantity);
            setCrushCost(data.crushCost);
            setCrushQuantity(data.crushQuantity);
            setSandCost(data.sandCost);
            setSandQuantity(data.sandQuantity);
            setSteelCost(data.steelCost);
            setSteelQuantity(data.steelQuantity);
            setCostData((prevUserData)=>({
              ...prevUserData,
              datasets:[{
                ...prevUserData.datasets[0],
                data: [totalCost, actualCost],
              },],
            }));
            setBrickQuantityData((prevUserData) => ({
              ...prevUserData,
              datasets: [
                {
                  ...prevUserData.datasets[0],
                  data: [bricksQuantity, actualBricksQuantity],
                },
              ],
            }));
            setSteelQuantityData((prevUserData) => ({
              ...prevUserData,
              datasets: [
                {
                  ...prevUserData.datasets[0],
                  data: [steelQuantity, actualSteelQuantity],
                },
              ],
            }));
            setCrushQuantityData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [crushQuantity, actualCrushQuantity],
                },
              ],
            }));
            setSandQuantityData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [sandQuantity, actualSandQuantity],
                },
              ],
            }));
            
            setCementQuantityData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [cementQuantity, actualCementQuantity],
                },
              ],
            }));
            setBrickCostData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [brickCost, actualBricksCost],
                },
              ],
            }));
            setSteelCostData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [steelCost, actualSteelCost],
                },
              ],
            }));
            setCrushCostData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [crushCost, actualCrushCost],
                },
              ],
            }));
            
            setSandCostData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [sandCost, actualSandCost],
                },
              ],
            }));
            
            setCementCostData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [cementCost, actualCementCost],
                },
              ],
            }));
            
          } catch (error) {
            // Handle error scenarios if needed
            console.error('Error calculating differences:', error);
          } finally {
            
          }
        };
        calculatedifference();
        
      },[ projectId,
        bricksQuantity,
        actualBricksQuantity,
        crushQuantity,
        actualCrushQuantity,
        sandQuantity,
        actualSandQuantity,
        cementQuantity,
        actualCementQuantity,
        steelQuantity,
        actualSteelQuantity,
        brickCost,
        actualBricksCost,
        crushCost,
        actualCrushCost,
        sandCost,
        actualSandCost,
        cementCost,
        actualCementCost,
        steelCost,
        actualSteelCost,
        actualCost,
        totalCost ]);

        const [costData, setCostData] = useState({
          labels: ['Estimated Cost', 'Cost Spent'],
          datasets: [
            {
              label: 'Material Cost',
              data: [],
              backgroundColor: ['#235789', '#00A878'], // Replace with your desired color codes
              borderColor: ['#235789', '#00A878'], // Replace with your desired color codes
              borderWidth: 1,
            },
          ],
        });
        
      const [brickQuantityData, setBrickQuantityData] = useState({
        labels: ['Bricks Quantity', 'Actual Bricks Quantity'],
        datasets: [
          {
            label: 'Material Quantity',
            data: [ ],
            backgroundColor: ['#A3320B', '#D5E68D'],
            borderColor: ['#A3320B', '#D5E68D'],
            borderWidth: 1,
          },
        ],
      }); 
      const [cementQuantityData, setCementQuantityData] = useState({
        labels: ['Cement Quantity', 'Actual Cement Quantity'],
        datasets: [
          {
            label: 'Material Quantity',
            data: [],
            backgroundColor: ['#36393B', '#545E75'],
            borderColor: ['#36393B', '#545E75'],
            borderWidth: 1,
          },
        ],
      });
      
      const [sandQuantityData, setSandQuantityData] = useState({
        labels: ['Sand Quantity', 'Actual Sand Quantity'],
        datasets: [
          {
            label: 'Material Quantity',
            data: [],
            backgroundColor: ['#FAFFFD', '#342E37'],
            borderColor:['#FAFFFD', '#342E37'],
            borderWidth: 1,
          },
        ],
      });
      
      const [crushQuantityData, setCrushQuantityData] = useState({
        labels: ['Crush Quantity', 'Actual Crush Quantity'],
        datasets: [
          {
            label: 'Material Quantity',
            data: [],
            backgroundColor: ['#878E88', '#588B8B'],
            borderColor: ['#878E88', '#588B8B'],
            borderWidth: 1,
          },
        ],
      });
      const [steelQuantityData, setSteelQuantityData] = useState({
        labels: ['Steel Quantity', 'Actual Steel Quantity'],
        datasets: [
          {
            label: 'Material Quantity',
            data: [],
            backgroundColor: ['#878E88', '#588B8B'],
            borderColor: ['#878E88', '#588B8B'],
            borderWidth: 1,
          },
        ],
      });
      const chartData = {
        labels: ['Cement', 'Sand', 'Brick', 'Crush','Steel'],
        datasets: [
          {
            data: [cementCost, sandCost, brickCost, crushCost, steelCost],
            backgroundColor: ['#FF5733', '#33FF57', '#3366FF', '#FF3366'], // Replace with your desired color codes
            hoverBackgroundColor: ['#FF5733', '#33FF57', '#3366FF', '#FF3366'],
          },
        ],
      };
      const [brickCostData, setBrickCostData] = useState({
        labels: ['Brick Cost', 'Actual Brick Cost'],
        datasets: [
          {
            label: 'Material Cost',
            data: [],
            backgroundColor: ['#A3320B', '#D5E68D'],
            borderColor: ['#A3320B', '#D5E68D'],
            borderWidth: 1,
          },
        ],
      });
      
      const [cementCostData, setCementCostData] = useState({
        labels: ['Cement Cost', 'Actual Cement Cost'],
        datasets: [
          {
            label: 'Material Cost',
            data: [],
            backgroundColor: ['#36393B', '#545E75'],
            borderColor: ['#36393B', '#545E75'],
            borderWidth: 1,
          },
        ],
      });
      
      const [sandCostData, setSandCostData] = useState({
        labels: ['Sand Cost', 'Actual Sand Cost'],
        datasets: [
          {
            label: 'Material Cost',
            data: [],
            backgroundColor: ['#FAFFFD', '#342E37'],
            borderColor:['#FAFFFD', '#342E37'],
            borderWidth: 1,
          },
        ],
      });
      
      const [crushCostData, setCrushCostData] = useState({
        labels: ['Crush Cost', 'Actual Crush Cost'],
        datasets: [
          {
            label: 'Material Cost',
            data: [],
            backgroundColor: ['#878E88', '#588B8B'],
            borderColor: ['#878E88', '#588B8B'],
            borderWidth: 1,
          },
        ],
      });
      const [steelCostData, setSteelCostData] = useState({
        labels: ['Steel Cost', 'Actual Steel Cost'],
        datasets: [
          {
            label: 'Material Cost',
            data: [],
            backgroundColor: ['#878E88', '#588B8B'],
            borderColor: ['#878E88', '#588B8B'],
            borderWidth: 1,
          },
        ],
      });
      
      
  return (
    <>
     {loading ? (
      <CircularProgress sx={{ position: 'absolute', top: '50%', left: '60%' }} />
    ) : (
    <div className="dashboard">
      
    
            <BarChart chartData={costData} />
          
     <div className="section-container">
    <div className='section'>
            <BarChart chartData={brickQuantityData} />
          </div>
    <div className="section">
      
            <BarChart chartData={brickCostData} />
         
      </div>
      </div>
    <div className="section-container">
      <div className="section"> 
      
            <BarChart chartData={cementQuantityData} />
          
         </div> 
      <div className="section"> 
            <BarChart chartData={cementCostData} />
          </div>
    </div>
    <div className="section-container">
      <div className="section"> 
      
            <BarChart chartData={crushQuantityData} />
          
         </div> 
      <div className="section">
            <BarChart chartData={crushCostData} />
          </div>
      
    </div>
    <div className="section-container">
      <div className="section"> 
      
            <BarChart chartData={sandQuantityData} />
         
         </div> 
      <div className="section">
            <BarChart chartData={sandCostData} />
          </div>
      
    </div>
    <div className="section-container">
      <div className="section"> 
      
            <BarChart chartData={steelQuantityData} />
          
         </div> 
      <div className="section">
            <BarChart chartData={steelCostData} />
          </div>
      
    </div>

    
    <div className="second-section">
      
    </div>
    <div className="third-section">
        
        <div className="lower-right-div">
          <div className="remaining-space-section">Breakdown of Total  Cost : {totalCost}Rs<PieChart chartData={chartData} />;</div>
        </div>
      </div>
    </div>
    )}
    </>
);
  
}

export default ReportContent



