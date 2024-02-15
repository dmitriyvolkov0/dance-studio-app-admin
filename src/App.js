import React, {useEffect, useState, useContext} from 'react';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AUTH_PAGE, MAIN_PAGE, ACTIVITES_PAGE, USERS_PAGE, NOTIFICATIONS_PAGE, FINANCE_PAGE, WITHDRAWALL_PAGE, CHAT_PAGE, CHAT_WITH_USER_PAGE } from '@utils/constants/routesConstants.js';

import UserContext from '@components/contexts/User/UserContext';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

import {getHoursBetweenDates} from '@utils/helpers/timeFunctions.js';

// firebase
import './services/firebase/firebaseConfig.js';
import { getDatabase, ref, onValue } from "firebase/database";

// pages
import MainPage from './views/MainPage/MainPage';
import ActivitiesPage from './views/ActivitiesPage/ActivitiesPage';
import UsersPage from './views/UsersPage/UsersPage';
import AuthPage from './views/AuthPage/AuthPage';
import NotificationsPage from './views/NotificationsPage/NotificationsPage';
import FinancePage from './views/FinancePage/FinancePage';
import WithdrawallPage from './views/WithdrawallPage/WithdrawallPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import ChatPage from './views/ChatPage/ChatPage';
import ChatWithUserPage from './views/ChatWithUserPage/ChatWithUserPage';

export default function App() {
  const {user, setUser} = useContext(UserContext);
  const [futureActivities, setFutureActivities] = useState(null);
  const [pastActivities, setPastActivities] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [sentedNotifications, setSentedNotifications] = useState(null);
  const [chats, setChats] = useState(null);
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    // Записи
    const recordsRef = ref(db, `records`);
    onValue(recordsRef, (snapshot) => {
      const data = Object.values(snapshot.val() ? snapshot.val() : {} );

      const filteredFutureActivities = data.filter(item => getHoursBetweenDates(new Date(), item.date) >= 0); //Получаем записи, которые еще не наступили
      setFutureActivities(filteredFutureActivities);

      const filteredPastActivities = data.filter(item => getHoursBetweenDates(new Date(), item.date) < 0) //Получаем прошедшие записи
      setPastActivities(filteredPastActivities);
    });

    // Пользователи
    const usersRef = ref(db, `users`);
    onValue(usersRef, (snapshot) => {
      const data = Object.values(snapshot.val() ? snapshot.val() : {} );
      setUsersList(data.reverse());
    });

    // Отправленные уведомления
    const sentedNotificationsRef = ref(db, 'admin/sentedNotifications');
    onValue(sentedNotificationsRef, (snapshot) => {
      const data = Object.values(snapshot.val() ? snapshot.val() : {} );
      setSentedNotifications(data.reverse());
    });

    //Получить все диалоги
    const chatRef = ref(db, 'supportChats');
    onValue(chatRef, (snapshot) => {
      const data = Object.values(snapshot.val() ? snapshot.val() : {} );
      setChats(data);
    });

    // Получить данные приложения
    const appRef = ref(db, 'app');
    onValue(appRef, (snapshot) => {
      const data = snapshot.val();
      setAppData(data);
    });
  },[]);

  return (
    <Router>
      <Routes>
        <Route path={AUTH_PAGE} element={<AuthPage user={user} setUser={setUser}/>} />
        
        <Route path={MAIN_PAGE} element={<PrivateRoutes navTitle={'Главная'}> 
          <MainPage appData={appData}/> 
        </PrivateRoutes>}/>
        
        <Route path={ACTIVITES_PAGE} element={<PrivateRoutes navTitle={'Занятия'}> 
          <ActivitiesPage 
            futureActivities={futureActivities}
            pastActivities={pastActivities}
          /> 
        </PrivateRoutes>}/>

        <Route path={USERS_PAGE} element={<PrivateRoutes navTitle={'Пользователи'}> 
          <UsersPage usersList={usersList}/> 
        </PrivateRoutes>}/>

        <Route path={NOTIFICATIONS_PAGE} element={<PrivateRoutes backArrow={true} navTitle={'Уведомления'}> 
          <NotificationsPage sentedNotifications={sentedNotifications}/>
        </PrivateRoutes>}/>

        <Route path={FINANCE_PAGE} element={<PrivateRoutes backArrow={true} navTitle={'Финансы'}> 
          <FinancePage user={user}/>
        </PrivateRoutes>}/>

        <Route path={WITHDRAWALL_PAGE} element={<PrivateRoutes navTitle={'Вывод средств'} backArrow={true}> 
          <WithdrawallPage user={user}/>
        </PrivateRoutes>}/>

        <Route path={CHAT_PAGE} element={<PrivateRoutes navTitle={'Диалоги'} backArrow={true}> 
          <ChatPage chats={chats}/>
        </PrivateRoutes>}/>

        <Route path={CHAT_WITH_USER_PAGE} element={<PrivateRoutes navTitle={'Чат с пользователем'} backArrow={true}> 
          <ChatWithUserPage/>
        </PrivateRoutes>}/>

        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  )
}