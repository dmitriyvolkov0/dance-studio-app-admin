import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import ChatIcon from '@mui/icons-material/Chat';

import { ACTIVITES_PAGE, USERS_PAGE, NOTIFICATIONS_PAGE, FINANCE_PAGE, CHAT_PAGE } from '@utils/constants/routesConstants.js';

export default function Menu() {
  const gradients = [
    "bg-gradient-to-b from-cyan-500 to-blue-500 text-blue-500",
    "bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-purple-500",
    "bg-gradient-to-b from-[#FF7F7E] to-[#FFB13D] text-[#FF7F7E]",
    "bg-gradient-to-b from-blue-500 to-green-400 text-blue-400",
    "bg-gradient-to-b from-[#B190BA] to-[#F89999] text-[#F89999]",
  ];
  return (
    <div className='grid grid-cols-2 gap-[12px] w-full'>
      <MenuItem title="Пользователи" gradient={gradients[0]} icon={<PersonIcon/>} link={USERS_PAGE}/>
      <MenuItem title="Занятия" gradient={gradients[1]} icon={<CalendarMonthIcon/>} link={ACTIVITES_PAGE}/>
      <MenuItem title="Уведомления" gradient={gradients[2]} icon={<NotificationsIcon/>} link={NOTIFICATIONS_PAGE}/>
      <MenuItem title="Финансы" gradient={gradients[3]} icon={<CurrencyRubleIcon/>} link={FINANCE_PAGE}/>
      <MenuItem title="Чат" gradient={gradients[4]} icon={<ChatIcon/>} link={CHAT_PAGE}/>
    </div>
  )
}
