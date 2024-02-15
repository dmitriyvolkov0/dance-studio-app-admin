import React from 'react';
import UserItem from './UserItem/UserItem';
import CircularProgress from '@mui/material/CircularProgress';

export default function UsersList({ filteredUsers, onShowUserClick }) {
    return (
        <div className='flex flex-col gap-3 w-full mt-4'>
            {filteredUsers && filteredUsers.map((user, index) => <UserItem user={user} key={index} onShowUserClick={onShowUserClick}/>)}
            {filteredUsers && filteredUsers.length === 0 && <span className="text-[#aaa] text-center">Пользователи не найдены!</span>}
            {filteredUsers === null && <CircularProgress className='my-4 mx-auto'/>}
        </div>
    )
}
