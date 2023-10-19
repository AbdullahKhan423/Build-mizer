// Panel.js
import React from 'react';
import { Tabs, Tab, Paper } from '@mui/material';
import '../css/Dashboard.css'



function Panel({ activeTab, setActiveTab }) { // Add activeTab to the parameters
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };



  return (
    <Paper className="panel-container" elevation={3}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        orientation="vertical"
       
      >
        
        <Tab label="Dashboard" value="Dashboard" />
        <Tab label="Account" value="Account" />
        <Tab label="Generate Report" value="Generate Report" />
       
      </Tabs>
    </Paper>
  );
}

export default Panel;
