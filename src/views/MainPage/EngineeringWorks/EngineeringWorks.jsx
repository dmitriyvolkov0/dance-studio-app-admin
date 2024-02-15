import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import {changeEngineeringWorks} from '@services/firebase/firebaseApi.js';

export default function EngineeringWorks({appData}) {
    const [isActive, setIsActive] = useState(false);

    React.useEffect(() => {
        appData &&  setIsActive(appData.engineeringWorks);
    }, [appData && appData.engineeringWorks])

    const handleChange = (e) => {
        setIsActive(e.target.checked);
        changeEngineeringWorks(appData, e.target.checked);
    }

    return (
        <div className='bg-white p-[12px] rounded-[10px] shadow-lg w-full'>
            <Switch checked={isActive} onChange={handleChange}/>
            <span className='text-[14px]'>Ведутся технические работы!</span>
            { isActive && 
                <span className='block text-[12px] text-red-500'>Включен режим технических работ! Находясь в этом режиме пользователи не могут взаимодействовать с сервисом!</span>
            }
        </div>
    )
}
