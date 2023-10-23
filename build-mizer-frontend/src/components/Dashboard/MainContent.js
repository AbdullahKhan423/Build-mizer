import React from 'react'
import '../../css/maincontent.css';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
export default function MainContent() {
  return (
    <div>
      <div className='top-container'>
        <div className='heading'>Accounts</div>
        <div className='heading-right'>
          <div>
        <Button variant="outlined" color="primary">
        Customise
        </Button></div>
        <div>
      <Button variant="contained" color="primary" style={{ marginRight:'2%' ,width: '200px' }}>
        Create New Project
      </Button></div>
        </div>
        
      </div>
      <div className='my-5'>
        <div>Rs 45,000</div>
        <div><Typography variant="caption" display="block" gutterBottom>
        Available Balance
      </Typography></div>
      </div>
    
    </div>
  )
}
