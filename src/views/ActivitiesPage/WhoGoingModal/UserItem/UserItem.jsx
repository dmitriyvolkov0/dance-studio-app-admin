import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserItem({user}) {
  return (
    <div>
        <div className="flex items-center gap-3">
            <AccountCircleIcon sx={{fontSize: 45}} className="text-brand"/>
            <div className='flex flex-col'>
                <span className='text-[15px] font-medium'>{user.name}</span>
                <span className='text-[13px] text-[#777]'>{user.email}</span>
            </div>
        </div>
    </div>
  )
}
