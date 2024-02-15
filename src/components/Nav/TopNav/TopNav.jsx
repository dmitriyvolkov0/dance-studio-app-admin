import React from 'react';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import {useNavigate} from 'react-router-dom';

export default function TopNav({navTitle, backArrow}) {
  const navigate = useNavigate();

  return (
    <div className='
      fixed left-0 top-0 
      w-full h-[60px] 
      flex items-center justify-between 
      px-[20px] 
      bg-white 
      shadow-1
      mb-4 z-[999]
    '>
      <span className='flex items-center gap-2 text-[18px] font-medium'>
          {backArrow && <button onClick={() => navigate(-1)}><KeyboardBackspaceRoundedIcon sx={{fontSize: 22}}/></button>}
          <span>{navTitle}</span>
      </span>
    </div>
  )
}
