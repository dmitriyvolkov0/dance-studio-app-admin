import React, {useEffect, useState} from 'react';
import Container from '@components/Container/Container';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Message from './Message/Message';
import { getFullCurrentDate, getCurrentTime } from '@utils/helpers/timeFunctions.js';
import SupportInput from './SupportInput/SupportInput';


// firebase
import { getDatabase, ref, onValue } from "firebase/database";
import { sendSupportMessage } from '../../services/firebase/firebaseApi.js';

export default function ChatWithUserPage() {
    const location = useLocation();
    const userUid = location.search.slice(1); //uid пользователя

    const [messages, setMessages] = useState(null);
    const [inputText, setInputText] = useState('');

    // Получить все сообщения этого чата
    useEffect(()=>{
        const db = getDatabase();
        const chatRef = ref(db, `supportChats/${userUid}`);
        onValue(chatRef, (snapshot) => {
        const data = Object.values(snapshot.val() ? snapshot.val() : {} );
            setMessages(data);
            setTimeout(() => window.scrollTo(0, document.body.scrollHeight + 100), 0);
        });
    }, [] );

    // Отправить сообщение
    const sendMessage = () => {
        if(inputText.trim() !== ''){
            const date = {
                full: getFullCurrentDate(),
                time: getCurrentTime()
              }
              setInputText('');
            sendSupportMessage(userUid, inputText, date);
        }
    }

  return (
    <Container className="gap-4 pb-[80px]">
        {
          messages && messages.map((item, index) => 
            <Message role={item.role} text={item.message} time={item.date.time} key={index}/>
          )
        }

        { messages === null && <div className='w-full h-screen fixed left-0 top-0 flex justify-center items-center'><CircularProgress/></div> }

        <SupportInput 
            sendMessage={sendMessage}
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder="Начните вводить"/>
    </Container>
  )
}
