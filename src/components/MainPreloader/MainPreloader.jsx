import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function MainPreloader() {
  return (
    <div className='flex w-full h-screen items-center justify-center'>
        <div className='flex flex-col  justify-center items-center gap-3 bg-white shadow-1 py-[40px] px-[50px] rounded-[15px]'>
            <CircularProgress size={35}/>
            <span className='text-[#555]'>Загрузка</span>
        </div>
    </div>
  )
}
