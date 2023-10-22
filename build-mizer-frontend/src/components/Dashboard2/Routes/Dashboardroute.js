import React from 'react';
import { Route, Routes } from 'react-router-dom';
 // Import your page components
import Projects from '../Projects';


const DashboardRoutes = () => {
  return (
    <Routes>
      
      <Route path="/projects/:projectId" element={<Projects />} />
     
      {/* Define routes for other pages */}
    </Routes>
  );
};

export default DashboardRoutes;
