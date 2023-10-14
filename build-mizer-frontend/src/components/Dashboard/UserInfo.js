import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import '../../css/userinfo.css';
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(1),
  ...theme.typography.body2,
  textAlign: 'center',
}));


export default function () {
  return (
    <div>
      <div className='main-container'>
        <div className='card'><DemoPaper variant="elevation">default variant</DemoPaper></div>
        <div className='card'><DemoPaper variant="outlined">outlined variant</DemoPaper></div>
        <div className='card'><DemoPaper variant="outlined">outlined variant</DemoPaper></div>
        <div className='card'><DemoPaper variant="outlined">outlined variant</DemoPaper></div>
      </div>
    </div>
  )
}
