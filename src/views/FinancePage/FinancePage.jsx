import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_PAGE, WITHDRAWALL_PAGE } from '@utils/constants/routesConstants.js';

import Avatar from '@mui/material/Avatar';
import Container from '@components/Container/Container';
import { Button } from '@mui/material';
import Card from '@components/Card/Card';
import Title from '@components/Title/Title';

import Graphics from './Chart/Chart';


export default function FinancePage({user}) {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('isAdminLogged');
    navigate(AUTH_PAGE);
  }

  return (
    <div>
      <div className='fixed flex gap-4 flex-col items-center justify-center left-0 top-0 w-full h-full bg-white z-[99]'>
        <span>Данный раздел находится в разработке!</span>
        <Button onClick={() => navigate(-1)} variant='contained'>Назад</Button>
      </div>

      <Container className="gap-6">
        <div className='gradient-1 w-full h-[230px] absolute top-0 left-0 rounded-bl-[50px]'></div>

        <Card className="z-[9] mt-4">
            <Avatar className="shadow-1" sx={{ bgcolor: '#CE5EFF', width: 50, height: 50 }}>А</Avatar>
            <span className='text-[18px] text-[#333] font-medium mt-2'>Администратор</span>
            <span className='text-[13px] text-[#777] mb-3'>admin@dancestudio36.ru</span>
            <Button className="w-full" variant='contained' onClick={logout}>Выйти</Button>
        </Card>

        <Card>
            <Title>Баланс</Title>
            <span className='-mt-1 mb-2 text-gradient-1 text-[54px] font-bold'>{user.balance} Р</span>
            <Button className="w-full" onClick={() => navigate(WITHDRAWALL_PAGE)} disabled={user.balance < 300 && true} variant='contained'>Вывести</Button>
        </Card>

        <Graphics/>

      </Container>
    </div>
  )
}