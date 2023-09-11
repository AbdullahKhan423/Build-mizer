import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import CalculateCost from '../components/CalculateCost';
import Footer from '../components/Footer';
import '../css/styles.css';
function ConstructionCostCalculator() {
  return (
    <div><ResponsiveAppBar></ResponsiveAppBar>
    <CalculateCost></CalculateCost>
    <Footer></Footer>
    </div>
  )
}

export default ConstructionCostCalculator