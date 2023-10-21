import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import CalculateCost from '../components/CalculateCost';
import Footer from '../components/Footer';
import '../css/styles.css';
import Converter from '../components/Converter';
function ConstructionCostCalculator() {
  return (
    <div><ResponsiveAppBar></ResponsiveAppBar>
    <CalculateCost></CalculateCost>
    <Converter/>
    <Footer></Footer>
    </div>
  )
}

export default ConstructionCostCalculator