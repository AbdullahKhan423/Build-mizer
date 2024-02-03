import React from 'react';
import SignIn from './pages/SignIn';
import { UserProvider } from './context/UserContext';
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage';
import AreaUnit from './pages/AreaUnitConverter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConstructionCostCalculator from './pages/ConstructionCostCalculator';
import DailyPricing from './pages/DailyPricing';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import StayInTouch from './pages/StayInTouch';
import Cement from './pages/Cement';
import Steel from './pages/Steel';
import Crush from './pages/Crush';
import Sand from './pages/Sand';

import Brick from './pages/Brick';
import Report from './components/Dashboard2/ReportPaperbase';
import Paper from './components/Dashboard2/Paperbase';
import DashboardRoutes from './components/Dashboard2/Routes/Dashboardroute';
import ForgotPassword from './pages/ChangePassword';
function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="signin" element={<SignIn></SignIn>} />
        <Route path="About us" element={<AboutUs></AboutUs>} />
        <Route path="Construction Cost Calculator" element={<ConstructionCostCalculator></ConstructionCostCalculator>} />
        <Route path="Daily Pricing1" element={<DailyPricing></DailyPricing>} />
        <Route path="products" element={<Products></Products>} />
        <Route path="signup" element={<SignUp></SignUp>} />
        <Route path="Stay in Touch" element={<StayInTouch></StayInTouch>} />
        <Route path='AreaUnit' element={<AreaUnit></AreaUnit>}/>
       <Route path='Daily Pricing' element={<Steel></Steel>}/>
        <Route path='cement-price-in-pakistan' element={<Cement></Cement>}/>
        <Route path='crush-price-in-pakistan' element={<Crush></Crush>}/>
        <Route path='sand-price-in-pakistan' element={<Sand></Sand>}/>
        <Route path='steel-price-in-pakistan' element={<Steel></Steel>}/>
        <Route path='bricks-price-in-pakistan' element={<Brick></Brick>}/>
        <Route path='inventory' element={<Paper></Paper>}/>
        <Route path='reports' element={<Report></Report>}/>
        <Route path='change-password' element={<ForgotPassword></ForgotPassword>}/>
      </Routes>
      <DashboardRoutes></DashboardRoutes>
    </Router>
    </UserProvider>
  );
}

export default App;
