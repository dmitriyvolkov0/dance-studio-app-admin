import React from 'react';
import { Button } from '@mui/material';

export default function NotificationItem({data, onClickReadNotification}) {
    let typeText = '';
    switch (data.type) {
        case 'money':
            typeText = 'Денежные операции'
            break;
        case 'admin_message':
            typeText = 'Сообщение от администратора'
            break;
        default:
            break;
    }

    let date = new Date(data.notificationCreated);
        date = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth()+1).padStart(2, '0') + '.' + String(date.getFullYear());
        
    return (
        <div className='relative px-[20px] pt-[30px] pb-[20px] shadow-1 bg-white rounded-[10px] w-full'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-[2px]'>
                    <span className='text-[18px] font-medium'>{data.title}</span>
                    <span className='text-[12px] text-[#777]'>{typeText}</span>
                </div>

                {data.type === 'money' &&
                    <span className='text-[20px] text-[#00C744] font-bold'>
                        +{data.amount} Р
                    </span>
                }
            </div>

            <Button onClick={() => onClickReadNotification(data)} className="w-full" sx={{marginTop: '15px'}} variant="contained">Читать</Button>

            <span className='absolute top-0 right-0 text-[13px] px-[5px] py-[3px] text-white bg-brand ml-auto rounded-tr-[10px] rounded-bl-[10px]'>
                {date}
            </span>

        </div>
    )
}
