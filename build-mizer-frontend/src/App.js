import React from 'react';
import SignIn from './pages/SignIn';
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConstructionCostCalculator from './pages/ConstructionCostCalculator';
import DailyPricing from './pages/DailyPricing';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import StayInTouch from './pages/StayInTouch';
import Dashboard from './pages/Dashboard';
import AreaUnitConverter from './pages/AreaUnitConverter';
import ForgetPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="signin" element={<SignIn></SignIn>} />
        <Route path="About us" element={<AboutUs></AboutUs>} />
        <Route path="Construction Cost Calculator" element={<ConstructionCostCalculator></ConstructionCostCalculator>} />
        <Route path="Daily Pricing" element={<DailyPricing></DailyPricing>} />
        <Route path="products" element={<Products></Products>} />
        <Route path="signup" element={<SignUp></SignUp>} />
        <Route path="Stay in Touch" element={<StayInTouch></StayInTouch>} />
        <Route path='Dashboard' element={<Dashboard></Dashboard>}/>
        <Route path='AreaUnitConverter' element={<AreaUnitConverter></AreaUnitConverter>}/>
        <Route path='forgot' element={<ForgetPassword></ForgetPassword>}/>
        <Route path='changepassword' element={<ChangePassword></ChangePassword>}/>
      </Routes>
    </Router>
  );
}

export default App;
