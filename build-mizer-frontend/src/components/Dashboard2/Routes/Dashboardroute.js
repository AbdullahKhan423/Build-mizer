import React from 'react';
import { Route, Routes } from 'react-router-dom';
 // Import your page components
import Projects from '../Projects';
import Report from '../ReportContentPaperBase';

const DashboardRoutes = () => {
  return (
    <Routes>
      
      <Route path="/projects/:projectId" element={<Projects />} />
      <Route path="/report/:projectId" element ={<Report></Report>}/>
      {/* Define routes for other pages */}
    </Routes>
  );
};

export default DashboardRoutes;
