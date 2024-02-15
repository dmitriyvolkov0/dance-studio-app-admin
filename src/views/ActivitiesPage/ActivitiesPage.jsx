import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import CircularProgress from '@mui/material/CircularProgress';
import Title from '@components/Title/Title';
import Container from '@components/Container/Container';
import ActivityCard from '@components/ActivityCard/ActivityCard';
import CreateActivityButton from './CreateActivityButton/CreateActivityButton';
import { Button } from '@mui/material';

// modals
import ConfirmCancelModal from './ConfirmCancelModal/ConfirmCancelModal';
import WhoGoingModal from './WhoGoingModal/WhoGoingModal';
import ChangeActivityModal from './ChangeActivityModal/ChangeActivityModal';
import CreateActivityModal from './CreateActivityModal/CreateActivityModal';
import HowMuchModal from './HowMuchModal/HowMuchModal';

// firebase
import { cancelActivity, getWhoGoing, saveActivity, createActivity } from '@services/firebase/firebaseApi.js';

export default function ActivitiesPage({futureActivities, pastActivities}) {
  const [isCancelQuestionModal, setIsCancelQuestionModal] = useState(false);
  const [selectedCancelActivity, setSelectedCancelActivity] = useState(null); //Выбранное занятие для отмены
  
  const [isWhoGoingModal, setIsWhoGoingModal] = useState(false);
  const [whoGoingList, setWhoGoingList] = useState(null);

  const [isChangeActivityModal, setIsChangeActivityModal] = useState(false);
  const [selectedChangeActivity, setSelectedChangeActivity] = useState(null); //Выбранное занятие для изменения
  
  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false);

  const [isHowMuchModal, setIsHowMuchModal] = useState(false);
  const [selectedHowMuchActivity, setSelectedHowMuchActivity] = useState(null); //Выбранное занятие для изменения


  const [perFuture, setPerFuture] = useState(5);
  const [perPast, setPerPast] = useState(5);

  // Клик по "отменить"
  const onClickCancelActivity = (activity) => {
    setIsCancelQuestionModal(true);
    setSelectedCancelActivity(activity);
  }

  // Отменить занятие
  const onCancelActivity = () => {
    cancelActivity(selectedCancelActivity)
    .then(() => {
      alert('Занятие успешно отменено! Денежные средства вернулись на баланс пользователей.');
    }).catch( () => {
      alert('Возникла ошибка при отмене занятия! Пожалуйста сообщите нам о возникшей проблеме.');
    });
  }

  // Получить список тех, кто идет на занятие
  const onWhoGoingClick = (activity) => {
    getWhoGoing(activity).then(response => {
      setWhoGoingList(response);
    }).catch(() => {
      alert('Возникла ошибка! Пожалуйста сообщите нам о возникшей проблеме.');
    });
    setIsWhoGoingModal(true);
  }

  // Изменить данные о занятии
  const onChangeActivityClick = (activity) =>{
    setSelectedChangeActivity(activity);
    setIsChangeActivityModal(true);
  }

  //Сохранить изменения
  const onSaveChangesActivity = (activity) => {
    saveActivity(activity).then(() => {
      alert('Изменения успешно сохранены!');
    }).catch(()=> {
      alert('Во время сохранения занятия возникла ошибка! Пожалуйста сообщите нам о возникшей проблеме.');
    })
    setIsChangeActivityModal(false);
  }

  // Создать занятие
  const onCreateActivity = (date, totalPlaces, price, groupType) => {
    createActivity(date, totalPlaces, price, groupType).then(() => {
      alert('Занятие успешно создано!');
    }).catch(() => {
      alert('Во время создания занятия возникла ошибка! Пожалуйста сообщите нам о возникшей проблеме.');
    });
    setIsCreateActivityModal(false);
  }

  // Узнать сколько будет заработано с выбранного занятия
  const onHowMachClick = (activity) => {
    setSelectedHowMuchActivity(activity);
    setIsHowMuchModal(true);
  }

  return (
    <>
      <AnimatePresence>
        {/* Модальное окно подтверждения отмены занятия */}
        { isCancelQuestionModal && 
          <ConfirmCancelModal 
            setActiveModal={setIsCancelQuestionModal} 
            setIsCancelQuestionModal={setIsCancelQuestionModal} 
            onCancelActivity={onCancelActivity}
          /> 
        }

        {/* Модальное окно со списком тех, кто идет на занятие */}
        {isWhoGoingModal && 
          <WhoGoingModal 
            setActiveModal={setIsWhoGoingModal} 
            whoGoingList={whoGoingList}
          />
        }

        {/* Модальное окно изменения задания */}
        {isChangeActivityModal && 
          <ChangeActivityModal 
            setActiveModal={setIsChangeActivityModal} 
            selectedChangeActivity={selectedChangeActivity} 
            onSaveChangesActivity={onSaveChangesActivity}
          />
        }

        {/* Модальное окно создания задания */}
        {isCreateActivityModal && 
          <CreateActivityModal 
            setActiveModal={setIsCreateActivityModal} 
            onCreateActivity={onCreateActivity}
          />
        }

        {/* Модальное окно для получения информации о зарабке на данном занятии */}
        { isHowMuchModal && <HowMuchModal setActiveModal={setIsHowMuchModal} activity={selectedHowMuchActivity}/> }
      </AnimatePresence>


      <Container className="gap-4 pb-[35px]">
        {/* Предстоящие */}
        {
          futureActivities && <>
            {futureActivities.length > 0 && <Title>Предстоящие</Title>}
            {futureActivities.map((item, index) => 
              index < perFuture &&
                <ActivityCard 
                  data={item} 
                  key={index} 
                  onClickCancelActivity={onClickCancelActivity} 
                  onWhoGoingClick={onWhoGoingClick}
                  onChangeActivityClick={onChangeActivityClick}
                  onHowMachClick={onHowMachClick}
                />
            )}
          </>
        }
        {futureActivities && futureActivities.length > perFuture && <Button onClick={() => setPerFuture(perFuture + 5)} variant="contained" className="w-full">Загрузить еще</Button>}
        {futureActivities === null && <CircularProgress className='my-4'/>}
        
        {/* Прошедшие */}
        {
          pastActivities && <>
            {pastActivities.length > 0 && <Title>Прошедшие</Title>}
            {pastActivities.map((item, index) => 
              index < perPast &&
                <ActivityCard
                  data={item}
                  key={index}
                  isPastActivity={true}
                  onWhoGoingClick={onWhoGoingClick}
                  onChangeActivityClick={onChangeActivityClick}
                  onHowMachClick={onHowMachClick}
                />
            )}
          </>
        }
        {pastActivities && pastActivities.length > perPast && <Button onClick={() => setPerPast(perPast + 5)} variant="contained" className="w-full">Загрузить еще</Button>}
        {pastActivities === null && <CircularProgress className='my-4'/>}
      </Container>

      <CreateActivityButton onClick={() => setIsCreateActivityModal(true)}/>
    </>
  )
}
