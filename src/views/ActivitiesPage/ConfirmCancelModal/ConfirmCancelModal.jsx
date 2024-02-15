import React from 'react';
import CenterModal from '@components/CenterModal/CenterModal';
import { Button } from '@mui/material';

export default function ConfirmCancelModal({setActiveModal, setIsCancelQuestionModal, onCancelActivity}) {
  return (
    <CenterModal 
        type="question" 
        title="Вы уверены, что хотите отменить занятие?"
        setActiveModal={setActiveModal}
        >
        <p>В случае отмены, записавшиеся пользователи получат свои средства обратно на баланс. </p>
        <p>Восстановить эту запись будет невозможно!</p>
        <Button onClick={() => {setIsCancelQuestionModal(false); onCancelActivity(); }} variant="contained">Да</Button>
        <Button onClick={() => setIsCancelQuestionModal(false)} variant="contained">Нет</Button>
    </CenterModal>
  )
}
