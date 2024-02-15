import React from 'react';
import InsufficientFundsImg from '@assets/money.webp';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function InsufficientFunds() {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] w-full -my-[80px]'>
        <img className="w-full max-w-[200px]" src={InsufficientFundsImg} alt="Недостаточно средств" />
        <span className="text-[#777] text-[18px] mb-4 mt-2">Недостаточно средств!</span>
        <Button onClick={() => navigate(-1)} variant='contained'>Назад</Button>
    </div>
  )
}
