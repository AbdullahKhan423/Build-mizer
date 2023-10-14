import React from 'react'
import '../css/dashboard.css';
import Panel from '../components/Dashboard/Panel';
import Header from '../components/Dashboard/Header';
import Main from '../components/Dashboard/MainContent';
import UserInfo from '../components/Dashboard/UserInfo';
import UserAnalytics from '../components/Dashboard/UserAnalytics';
export default function Dashboard() {
  return (
   
        <div class="grid-container">
            <div class="item2">
                <div className='panel-flex'><Panel></Panel>    
                </div>
            </div>
            <div class="item1"><Header></Header></div>
            <div class="item3"><Main></Main></div>  
            <div class="item4"><UserInfo></UserInfo></div>
            <div class="item5"><UserAnalytics></UserAnalytics></div>
        </div>
  )
}
