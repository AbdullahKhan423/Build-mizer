// Dashboard.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Panel from '../components/Panel';
import Content from '../components/Content';
import '../css/Dashboard.css'
function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div>
      <div className="dashboard-container">
      <Header />
      </div>
      <div className='content-container'>
      <div className="panel-content">
        <Panel setActiveTab={setActiveTab} />
        </div>
        <div className='dashboard-content'>
        <Content activeTab={activeTab} />
        </div>
        </div>
      </div>
    
  );
}

export default Dashboard;
