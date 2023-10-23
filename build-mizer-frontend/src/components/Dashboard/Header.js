import React from 'react';
import '../../css/header.css';
import SearchIcon from '@mui/icons-material/Search';
export default function Header() {
  return (
    <div className='header-container'>
      <div className='flex-container'>
        <div className='icon'><SearchIcon></SearchIcon></div>
        <div className='searchBar'> <input
            type="text"
            placeholder="Search for data users..."
            style={{ width: '100%', border: 'none', outline: 'none' }}
          /></div>
          
      </div>
      <div className='flex-row'>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  )
}
