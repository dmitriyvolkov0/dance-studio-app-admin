import React, { useState, useEffect } from 'react';
import { getCurrentTime } from '@utils/helpers/timeFunctions.js';

import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

export default function ActivityCard({ data, isPastActivity, onWhoGoingClick, onClickCancelActivity, onChangeActivityClick, onHowMachClick }) {
    const [tooltipIsOpen, setTooltipOpen] = useState(false);
    const [signedUsers, setSignedUsers] = useState(0);
    
    const date = new Date(data.date);
    const day = date.getDate();
    const time = getCurrentTime(date);
    let week = date.getDay();
    let month = date.getMonth();

    useEffect(()=>{
        setSignedUsers(data.users ? Object.values(data.users).length : 0);
    }, [data]);
    
    switch (week) {
        case 0: week = 'воскресенье'; break;
        case 1: week = 'понедельник'; break;
        case 2: week = 'вторник'; break;
        case 3: week = 'среда'; break;
        case 4: week = 'четверг'; break;
        case 5: week = 'пятница'; break;
        case 6: week = 'суббота'; break;
        default: month = 'Ошибка!'; break;
    }
    
    switch (month) {
        case 0: month = 'января'; break;
        case 1: month = 'февраля'; break;
        case 2: month = 'марта'; break;
        case 3: month = 'апреля'; break;
        case 4: month = 'мая'; break;
        case 5: month = 'июня'; break;
        case 6: month = 'июля'; break;
        case 7: month = 'августа'; break;
        case 8: month = 'сентября'; break;
        case 9: month = 'октября'; break;
        case 10: month = 'ноября'; break;
        case 11: month = 'декабря'; break;
        default: month = 'Ошибка!'; break;
    }

    return (
        <div className='
            shadow-1
            bg-white
            rounded-[20px]
            relative
            w-full
            py-[25px] px-[10px]
            [330px]:px-[15px]
            [350px]:px-[20px]
            [360px]:px-[25px]
        '>
            <div className='flex items-center justify-between'>
                {data.groupType === 'open' ? 
                    <span className={`${ data.isCanceled ? 'bg-[#ccc]' : 'bg-[#62e233]'} absolute right-0 top-0 text-[14px] rounded-bl-[10px] rounded-tr-[20px] px-[8px] py-[4px] text-white`}>открытая группа</span>
                    : 
                    <span className={`${ data.isCanceled ? 'bg-[#ccc]' : 'bg-[#FF6376]'} absolute right-0 top-0 text-[14px] rounded-bl-[10px] rounded-tr-[20px] px-[8px] py-[4px] text-white`}>закрытая группа</span>
                }
        
                <div className='flex items-center gap-2 font-medium'>
                    <span className={`text-[50px] ${ data.isCanceled ? 'text-[#ccc]' : 'text-[#333]'}`}>
                        {day}
                    </span>
                    <div className='flex flex-col text-[16px]'>
                        <span className={data.isCanceled ? 'text-[#ccc]' : 'text-[#333]'}>
                            {week}
                        </span>
                        <span className={data.isCanceled ? 'text-[#ccc]' : 'text-[#333]'}>
                            {month}
                        </span>
                    </div>
                </div>
                    
                <div className='flex flex-col font-medium'>
                    <span className={data.isCanceled ? 'text-[#ccc]' : 'text-[#333]'}>
                        Время: <span>{time}</span>
                    </span>
                    <span className={data.isCanceled ? 'text-[#ccc]' : 'text-[#333]'}>
                        Мест: <span> {data.totalPlaces - signedUsers} из {data.totalPlaces} </span>
                    </span>
                </div>

                <span className={`
                    absolute 
                    bottom-0 right-0 
                    py-1 pl-[25px] pr-[10px]
                    text-[18px] text-white font-medium 
                    rounded-tl-[100px] rounded-br-[20px]
                    ${data.isCanceled ? 'bg-[#ccc]' : 'bg-[#333]'}
                `}>
                    {data.price} Р
                </span>
            </div>

            {data.isCanceled ?  //Если занятие отменено
                <>
                    <div className="flex gap-2 justify-start items-center pb-2">
                        <Button size="small" variant='contained' color="error" disabled>Отменено</Button>
                        <Button size="small" variant='contained' disabled>
                            {isPastActivity ? 'Кто был?' : 'Кто идет?' }
                        </Button>
                        <IconButton color="primary" aria-label="Edit" disabled>
                            <EditCalendarRoundedIcon />
                        </IconButton>
                        <div className='absolute left-[3px] top-[3px]'>
                            <Tooltip 
                                title="Занятие отменено! Средства вернулись пользователям на баланс."
                                open={tooltipIsOpen}
                                arrow
                                onClick={() => setTooltipOpen(true)}
                                onClose={() => setTooltipOpen(false)}
                            >
                                <IconButton color="primary" aria-label="Edit">
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </>
                : //Если занятие не отменено
                <div className="flex gap-2 justify-start items-center pb-2">
                    {!isPastActivity &&  <Button onClick={() => onClickCancelActivity(data)} size="small" variant='contained' color="error">Отменить</Button> }
                    
                    <Button onClick={() => onWhoGoingClick(data)} size="small" variant='contained'>
                        {isPastActivity ? 'Кто был?' : 'Кто идет?' }
                    </Button>
                    
                    <IconButton onClick={() => onChangeActivityClick(data)} color="primary" aria-label="Edit">
                        <EditCalendarRoundedIcon />
                    </IconButton>

                    <IconButton onClick={() => onHowMachClick(data)} color="primary" aria-label="How match?">
                        <CurrencyRubleIcon/>
                    </IconButton>
                </div>
            }

        </div>
    )
}
