import React from 'react';
import Title from '@components/Title/Title';
import NotificationItem from './NotificationItem/NotificationItem';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function NotificationsList({sentedNotifications, onClickReadNotification}) {
    const [notificationsPer, setNotificationsPer] = React.useState(6);
    return (
        <>
            {sentedNotifications && sentedNotifications.length > 0 && 
                <>
                <Title className="mt-3">Отправленные уведомления</Title>
                
                {sentedNotifications.map((notification, index) => 
                    index < notificationsPer &&
                    <NotificationItem data={notification} onClickReadNotification={onClickReadNotification} key={index}/>
                )}

                { sentedNotifications && sentedNotifications.length > notificationsPer &&  
                    <Button onClick={() => setNotificationsPer(notificationsPer + 3)} variant='contained' className="w-full">
                        Загрузить еще
                    </Button>}
                </>
            }

            {sentedNotifications === null && <CircularProgress className='my-4'/>}
        </>
  )
}
