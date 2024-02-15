import React, { useEffect, useState } from 'react';
import BottomModal from '@components/BottomModal/BottomModal';
import MoneyImg from '@assets/money.webp';
import { Button } from '@mui/material';

export default function HowMuchModal({setActiveModal, activity}) {
    const [sum, setSum] = useState(0);
    useEffect(() => {
        activity.users && setSum(Object.values(activity.users).length * activity.price);
    }, []);

    return (
        <BottomModal title="Доход от занятия" setActiveModal={setActiveModal}>
            <div className='flex flex-col justify-center items-center px-[15px]'>
                <img className="w-full max-w-[160px] mx-auto" src={MoneyImg} alt="Доход" />
                {activity.users ? //Если хоть кто-то записан на занятие
                    <>
                        <span className="text-gradient-1 text-[48px] font-bold text-center">{sum} Р</span>
                        <span className='text-[18px] text-medium text-center mt-2 mb-4'>Такую сумму вы заработаете с данного занятия!</span>
                    </>
                    : //Если никто не записан
                    <span className='text-medium text-center mt-2 mb-4'>Когда кто-нибудь запишется на данное занятие, то в этом разделе появится информация о доходе </span>
                }
                
                <Button onClick={() => setActiveModal(false)} className="w-[170px]" variant='contained'>Хорошо</Button>
            </div>
        </BottomModal>
    )
}

