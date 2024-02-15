import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Title from '@components/Title/Title';

export default function Sum({sum, setSum, balance}) {
  return (
    <div className='w-full'>
        <Title>Укажите сумму</Title>
        <span className='text-[48px] font-bold block mx-auto w-fit text-gradient-1'>
            {sum} Р
        </span>

        <Box sx={{ width: '90%', margin:'0 auto' }}>
            <Slider 
                onChange={(e) => setSum(e.target.value)}
                value={sum} 
                aria-label="Default" 
                valueLabelDisplay="auto"
                step={10}
                min={300}
                max={balance}
            />
        </Box>
    </div>    
  )
}
