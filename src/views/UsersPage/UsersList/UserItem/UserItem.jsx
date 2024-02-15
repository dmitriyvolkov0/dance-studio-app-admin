import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import s from './UserItem.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function UserItem({user, onShowUserClick}) {
  return (
      <div 
        onClick={() => onShowUserClick(user)} 
        className={`
          flex justify-between items-center p-[10px] rounded-[5px] shadow-lg cursor-pointer ${s.userItem} ${user.isBlocked ? 'bg-[#ffcaca]' : 'bg-[#ffe5fc]'}`}
      >

          <div className='flex items-center gap-3'>
            <AccountCircleIcon sx={{fontSize: 45}} className="text-brand"/>
            <div className='flex flex-col'>
                <span className='text-[15px] font-medium capitalize'>{user.name}</span>
                <span className='text-[13px] text-[#777]'>{user.email}</span>
                {user.isBlocked && <span className="text-red-700 text-[12px]">Заблокирован</span>}
            </div>
          </div>

          <div className={`${s.nextBut} text-brand text-[12px] pr-[5px]`}>
            <ArrowForwardIosIcon/>
          </div>

      </div>
  )
}
