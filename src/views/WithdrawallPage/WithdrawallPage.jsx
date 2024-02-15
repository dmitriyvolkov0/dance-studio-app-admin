import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FINANCE_PAGE } from '@utils/constants/routesConstants.js';
import Container from '@components/Container/Container';
import Sum from './Sum/Sum';
import Bank from './Bank/Bank';
import MethodTabs from './MethodTabs/MethodTabs';
import InsufficientFunds from './InsufficientFunds/InsufficientFunds';
import { Button } from '@mui/material';

// firebase
import {sendWithdrawall} from '../../services/firebase/firebaseApi.js';

export default function WithdrawallPage({user}) {
    const navigate = useNavigate();

    const [sum, setSum] = useState(300);
    const [bank, setBank] = useState('sber');
    const [phone, setPhone] = useState('');
    const [card, setCard] = useState('');
    const [method, setMethod] = React.useState('phone');

    const [isActiveBut, setIsActiveBut] = useState(true);

    const onSendWithdrawall = () => {
        const withdrawallObj = {
            sum: sum,
            bank: bank,
            phone: method === 'phone' ? phone : null,
            card: method === 'card' ? card : null,
            method: method,
            isProcessed: false
        }
        sendWithdrawall(withdrawallObj).then(response => {
            response ? alert("Вы успешно отправили заявку на вывод средств! Скоро мы её обработаем!") : alert('Вы уже отправили заявку на вывод!');
            navigate(FINANCE_PAGE);
        }).catch(()=>{
            alert('Возникла ошибка! Пожалуйста сообщите об этом нам.');
        })
    }

    return (
        <Container className="gap-4">
            {
                user.balance >= 300 ?
                <>
                    <Sum sum={sum} setSum={setSum} balance={user.balance} />
                    <Bank bank={bank} setBank={setBank}/>
                    <MethodTabs 
                        method={method}
                        setMethod={setMethod}
                        phone={phone} 
                        setPhone={setPhone} 
                        card={card} 
                        setCard={setCard}
                        isActiveBut={isActiveBut}
                        setIsActiveBut={setIsActiveBut}
                    />
                    <Button onClick={onSendWithdrawall} disabled={!isActiveBut} className="w-full" variant='contained'>Вывести средства</Button>
                </>
                :
                <InsufficientFunds/>
            }
        </Container>
    )
}
