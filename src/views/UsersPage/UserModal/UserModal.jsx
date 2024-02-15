import React, { useState } from 'react';
import BottomModal from '@components/BottomModal/BottomModal';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export default function UserModal({setActiveModal, selectedUser, onSaveUserClick}) {
    const [name, setName] = useState(selectedUser.name);
    const [email, setEmail] = useState(selectedUser.email);
    const [uid, setUid] = useState(selectedUser.uid);
    const [balance, setBalance] = useState(selectedUser.balance);
    const [isBlocked, setIsBlocked] = useState(selectedUser.isBlocked);

    const onSaveUserHandleClick = () => {
        let userObj = JSON.parse(JSON.stringify(selectedUser));
        userObj.name = name;
        userObj.isBlocked = isBlocked;
        onSaveUserClick(userObj);
    }

    return (

        <BottomModal title="Кто идет?" setActiveModal={setActiveModal} isFullScreen={true}>
            <div className='flex flex-col gap-5 px-[15px]'>
                <TextField
                    label="Имя пользователя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    disabled
                    label="Email"
                    value={email}
                />

                <TextField
                    disabled
                    label="UID"
                    value={uid}
                />

                <TextField
                    disabled
                    label="Баланс"
                    value={balance}
                />

                <div className='flex flex-col gap-3'>
                    {isBlocked ? 
                        <>
                            <Button onClick={() => setIsBlocked(!isBlocked)} variant="contained" color="success">Разблокировать</Button>
                            <span className="text-red-500 text-[13px] -mt-[5px] mx-auto">Пользователь заблокирован</span>    
                        </>
                        :    
                        <Button onClick={() => setIsBlocked(!isBlocked)} variant="contained" color="error">Заблокировать</Button>
                    }
                    <Button onClick={onSaveUserHandleClick} variant="contained" color="primary">Сохранить изменения</Button>
                    <Button variant="contained" color="primary">Отменить изменения</Button>
                </div>
                
            </div>
        </BottomModal>
    )
}
