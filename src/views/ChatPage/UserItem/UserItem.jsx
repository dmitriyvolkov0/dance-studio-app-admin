import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { CHAT_WITH_USER_PAGE } from '@utils/constants/routesConstants.js';

export default function UserItem({data}) {
  return (
    <Link 
        to={CHAT_WITH_USER_PAGE + `${data.userUid}`}
        className='
            flex gap-2 items-center 
            rounded-[5px] 
            w-full 
            bg-white 
            p-4 
            cursor-pointer
            shadow-lg
            active:translate-x-1 duration-300
    '>
        <Avatar sx={{width: 25, height: 25, bgcolor: '#CE5EFF', fontSize: 15}}>
            {data.userEmail[0].toUpperCase()}
        </Avatar>
        {data.userEmail}
    </Link>
  )
}
