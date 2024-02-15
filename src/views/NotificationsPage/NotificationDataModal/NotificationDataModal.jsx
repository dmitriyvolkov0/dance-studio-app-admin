import React from 'react';
import BottomModal from '@components/BottomModal/BottomModal';

export default function NotificationDataModal({data, setActiveModal}) {
  return (
    <BottomModal title={data.title} setActiveModal={setActiveModal}>
        <p className='px-[15px] text-[#333]'>
            {data.message}
        </p>
    </BottomModal>
  )
}
