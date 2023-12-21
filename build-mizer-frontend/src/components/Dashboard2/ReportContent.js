import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BarChart from './Charts/BarChart';
import './reportcontent.css';
function ReportContent() {
   
    const [loading, setLoading] = useState(true);
    const [totalCost, setTotalCost] = useState();
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
    const [actualBricksCost, setActualBricksCost] = useState(0);
    const [actualCementCost, setActualCementCost] = useState(0);
    const [actualCrushCost, setActualCrushCost] = useState(0);
    const [actualSandCost, setActualSandCost] = useState(0);
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

            setActualBricksQuantity(data.actualBricksQuantity || 0);
            setActualCementQuantity(data.actualCementQuantity || 0);
            setActualCrushQuantity(data.actualCrushQuantity || 0);
            setActualSandQuantity(data.actualSandQuantity || 0);
            setActualBricksCost(data.actualBricksCost || 0);
            setActualCementCost(data.actualCementCost || 0);
            setActualCrushCost(data.actualCrushCost || 0);
            setActualSandCost(data.actualSandCost || 0);
            setBrickCost(data.brickCost);
            setBricksQuantity(data.brickQuantity);
            setCementCost(data.cementCost);
            setCementQuantity(data.cementQuantity);
            setCrushCost(data.crushCost);
            setCrushQuantity(data.crushQuantity);
            setSandCost(data.sandCost);
            setSandQuantity(data.sandQuantity);

            setUserData((prevUserData) => ({
              ...prevUserData,
              datasets: [
                {
                  ...prevUserData.datasets[0],
                  data: [bricksQuantity, actualBricksQuantity],
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
        
      },[projectId]);

      const [userData, setUserData] = useState({
        labels: ['Bricks Quantity', 'Actual Bricks Quantity'],
        datasets: [
          {
            label: 'Material Quantity',
            data: [ ],
            backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
            borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
            borderWidth: 1,
          },
        ],
      }); 
  return (
    <div className="dashboard">
    
    <div className="section-container">{actualBricksCost}
      <div className="section"> 
      {userData.datasets[0].data && userData.datasets[0].data.length > 0 ? (
            <BarChart chartData={userData} />
          ) : (
            <p>Loading chart...</p>
          )}
         </div> 
      <div className="section">Section 2</div>
      <div className="section">Section 3</div>
    </div>

    {/* Second div below the first div */}
    <div className="second-section">
      {/* Add your content for the second div here */}
    </div>
    <div className="third-section">
        <div className="lower-left-div">
          <div className="vertical-align-section">Vertical Align Section 1</div>
          <div className="full-width-section">Full Width Section</div>
        </div>
        <div className="lower-right-div">
          <div className="remaining-space-section">Remaining Space Section</div>
        </div>
      </div>
    </div>
  
);
  
}

export default ReportContent