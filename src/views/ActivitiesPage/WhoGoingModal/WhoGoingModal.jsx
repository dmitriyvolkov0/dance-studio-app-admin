import React from 'react';
import BottomModal from '@components/BottomModal/BottomModal';
import UserItem from './UserItem/UserItem';
import CircularProgress from '@mui/material/CircularProgress';

export default function WhoGoingModal({setActiveModal, whoGoingList}) {
    
  return (
    <BottomModal title="Кто идет?" setActiveModal={setActiveModal} isFullScreen={true}>
        <div className='flex flex-col gap-4 px-[15px]'>
            
            {whoGoingList && whoGoingList.map((user, index) => 
                <UserItem user={user} key={index}/>
            )}

            {whoGoingList === null && <CircularProgress/>}
            {whoGoingList && whoGoingList.length === 0 && <p className='text-[18px] text-center text-[#777]'>Пока никто не записался на это занятие</p>}
        </div>
    </BottomModal>
  )
}
