import React, { useContext } from 'react';
import UserContext from '@components/contexts/User/UserContext';

import Nav from '@components/Nav/Nav';
import { useNavigate } from 'react-router-dom';
import { AUTH_PAGE } from '@utils/constants/routesConstants.js';
import MainPreloader from '@components/MainPreloader/MainPreloader';

// firebase
import { getDatabase, ref, onValue } from "firebase/database";

export default function PrivateRoutes({navTitle, backArrow, children}) {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    
    const isAdminLogged = localStorage.getItem('isAdminLogged');
    
    React.useEffect(() => {
        if(isAdminLogged) {
            //Получить данные админа
            const db = getDatabase();
            const usersRef = ref(db, `admin`);
            onValue(usersRef, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : false ;
                setUser(data);
            });
        }else{ 
            navigate(AUTH_PAGE);
        }
    }, []);

    return (
        <>
            {
                user === null ? <MainPreloader/>
                :
                <>
                    <Nav navTitle={navTitle} backArrow={backArrow}/>
                    {children}
                </>
            }

            
        </>
  )
}
