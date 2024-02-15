import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MAIN_PAGE, ACTIVITES_PAGE, USERS_PAGE, NOTIFICATIONS_PAGE } from '@utils/constants/routesConstants.js';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';

export default function BottomNav() {
  const [value, setValue] = React.useState(MAIN_PAGE);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    setValue(currentPath);
  }, [navigate]);

  return (
    <div className='fixed bottom-0 left-0 w-full shadow-1 z-[999]'>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            // setValue(newValue);
            navigate(newValue);
          }}
        >
          <BottomNavigationAction value={MAIN_PAGE} label="Главная" icon={<HomeIcon />} />
          <BottomNavigationAction value={ACTIVITES_PAGE} label="Занятия" icon={<CalendarMonthIcon />} />
          <BottomNavigationAction value={USERS_PAGE} label="Пользователи" icon={<GroupIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}