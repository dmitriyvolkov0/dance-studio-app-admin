import React from 'react';
import Container from '@components/Container/Container';
import UserItem from './UserItem/UserItem';
import { CircularProgress } from '@mui/material';

export default function ChatPage({ chats }) {
    return (
        <Container className="gap-2">
            {chats && chats.map((dialog, index) => 
                <UserItem key={index} data={Object.values(dialog)[0]}/>
            )}

            {chats && chats.length === 0 && <div className='w-full h-screen fixed left-0 top-0 flex justify-center items-center'>Нет диалогов</div>}
            {chats === null && <div className='w-full h-screen fixed left-0 top-0 flex justify-center items-center'><CircularProgress/></div>}
        </Container>
    )
}
