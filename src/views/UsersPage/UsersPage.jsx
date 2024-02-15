import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Container from '@components/Container/Container';
import UsersList from './UsersList/UsersList';
import SearchInput from './SearchInput/SearchInput';

// modals
import UserModal from './UserModal/UserModal';

// firebase
import {saveUser} from '@services/firebase/firebaseApi.js';

export default function UsersPage({usersList}) {
  const [filteredUsers, setFilteredUsers] = useState(null);

  const [isUserModal, setUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Ввод в строку поиска
  const onChangeSearch = (value) => {
    let list = usersList.filter(item => item.email.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    setFilteredUsers(list);
  }

  useEffect(() => {
    setFilteredUsers(usersList);
  }, [usersList]);

  //Перейти к профилю 
  const onShowUserClick = (user) => {
    setUserModal(true);
    setSelectedUser(user);
  }

  // Сохранить данные пользователя
  const onSaveUserClick = (user) => {
    saveUser(user).then(()=>{
      alert('Данные пользователя успешно сохранены!');
    }).catch(()=>{
      alert('При сохранении изменений возникла ошибка! Пожалуйста сообщите об этом нам.');
    });
    setUserModal(false);
  }


  return (
    <>
      <AnimatePresence>
        {isUserModal && <UserModal setActiveModal={setUserModal} selectedUser={selectedUser} onSaveUserClick={onSaveUserClick}/>}
      </AnimatePresence>

      <Container>
        <SearchInput onChangeSearch={onChangeSearch}/>
        <UsersList filteredUsers={filteredUsers} onShowUserClick={onShowUserClick}/>
      </Container>
    </>
  )
}
