import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import '../../css/userinfo.css';
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 400,
  height: 400,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function UserAnalytics() {
  return (
    <div>
      <div className='main-container'>
        <div className='card'><DemoPaper variant="elevation">default variant</DemoPaper></div>
        <div className='card'><DemoPaper variant="outlined">outlined variant</DemoPaper></div>
      </div>
    </div>
  )
}
