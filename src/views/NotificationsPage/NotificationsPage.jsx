import React, {useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import Container from '@components/Container/Container';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Title from '@components/Title/Title';

import NotificationsList from './NotificationsList/NotificationsList';

// modals
import NotificationDataModal from './NotificationDataModal/NotificationDataModal';

// firebase
import {sendNotification} from '@services/firebase/firebaseApi.js';

export default function NotificationsPage({sentedNotifications}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [isActiveNotificationDataModal, setIsActiveNotificationDataModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(false);


  // Отправить уведомление
  const onSendNotificationClick = () => {
    if(title.trim().length > 0 && message.trim().length > 0){
      sendNotification(title, message).then(()=>{
        alert('Уведомление успешно отправлено!');
        setTitle('');
        setMessage('');
      }).catch(()=>{
        alert('Возникла ошибка при отправке уведомления! Пожалуйста сообщите об этом нам.');
      })
    }else{
      alert('Заголовок и сообщение должны быть заполнены!');
    }
  }

  // Читать отправленное уведомление
  const onClickReadNotification = (notification) => {
    setSelectedNotification(notification);
    setIsActiveNotificationDataModal(true)
  }
  
  return (
    <>
      <AnimatePresence>
        {
          isActiveNotificationDataModal && 
            <NotificationDataModal 
              data={selectedNotification} 
              setActiveModal={setIsActiveNotificationDataModal}
            />
        }
      </AnimatePresence>
      
      <Container className="gap-4">
        <Title>Создать уведомление</Title>

        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full'
          label="Заголовок уведомления"
        />

        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full'
          label="Сообщение"
          multiline
          rows={4}
        />

        <Button onClick={onSendNotificationClick} className="w-full" variant='contained'>Отправить уведомление</Button>
        <p className="text-[#777] text-center">Хотите сообщить своим пользователям что-то важное? Отправьте им уведомление!</p>


        <NotificationsList sentedNotifications={sentedNotifications} onClickReadNotification={onClickReadNotification}/>
      </Container>
    </>
  )
}
