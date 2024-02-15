import { ref, get, child, getDatabase, set, push } from "firebase/database";

// Вход
export async function signInAdmin(formData) {
    try {
        const login = formData.get('login');
        const password = formData.get('password');
        const admin = await getData('admin');
        if (login === admin.login && password === admin.password) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('err');
    }
}

// Получить коллекцию
export async function getData(collectionName){
    const dbRef = ref(getDatabase());
    const response = await get(child(dbRef, collectionName));
    if (response.exists()) {
        let result = response.val();
        // result = Object.values(result);
        return result;
    } else {
        return [];
    }
}

// Загрузить данные в БД
export async function pushData(collectionName, data) {
    const db = getDatabase();
    const collectionRef = await push(ref(db, collectionName));
    const uid = collectionRef.key;
    const newData = { ...data, uid }; // Добавляем uid в объект data
    return await set(collectionRef, newData);
}

// Загрузить данные в БД (без uid)
export async function setData(collectionName, data) {
    const db = getDatabase();
    const collectionRef = await ref(db, collectionName);
    return await set(collectionRef, { ...data });
}

// Отменить занятие
export async function cancelActivity(activity){
    return setData(`records/${activity.uid}`, {...activity, isCanceled: true}) //Помечаем занятие как отмененное
        .then(()=>{
            //Проходимся по пользователям и возвращаем средства на счет
            const price = activity.price;
            return getData(`records/${activity.uid}/users`).then(users => {
                users = Object.values(users);
                users.map(user => getData(`users/${user.uid}`).then(userData => {
                    setData(`users/${user.uid}`, {...userData, balance: userData.balance + price}); //Возвращаем деньги пользователю
                }));
            });
        })
}

// Кто идет на занятие
export async function getWhoGoing(activity) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersUidList = activity.users ? Object.values(activity.users).map(item => item.uid) : [];
        let usersDataList = [];
  
        await Promise.all(usersUidList.map(async uid => {
          const response = await getData(`users/${uid}`);
          usersDataList.push({name: response.name, uid: response.uid, email: response.email});
        }));
  
        resolve(usersDataList);
      } catch (error) {
        reject('err');
      }
    });
}

// Сохранить измененое занятие
export async function saveActivity(activity){
    return setData(`records/${activity.uid}`, {...activity});
}

// Создать занятие
export async function createActivity(date, totalPlaces, price, groupType){
    // uid создается автоматически внутри activityData
    const activityData = {
        date: String(date),
        groupType: groupType,
        isCanceled: false,
        places: 9,
        price: price,
        totalPlaces: totalPlaces,
        recordCreated: String(new Date())
    }
    return pushData(`records`, activityData);
}

// Сохранить пользователя
export async function saveUser(user){
    return setData(`users/${user.uid}`, {...user});
}

//Отправить уведомление пользователям
export async function sendNotification(title, message){
    let notification = {
        notificationCreated: String(new Date()), 
        title: title,
        message: message,
        type: 'admin_message'
    }

    return new Promise((resolve, reject) => {
        getData('users').then(users =>{
            users = Object.values(users);
            users.map(user => {
                //Отправить уведомление пользователям
                setData(`users/${user.uid}`, {...user, isReadNotifications: false});
                pushData(`users/${user.uid}/notifications`, notification).then(()=>{
                    resolve('ok');
                }).catch(()=>{
                    reject('err');
                });
            })
        }).catch(()=>{
            reject('err');
        });

        // Отправить данные об отправленном уведомлении админу
        pushData(`admin/sentedNotifications`, notification);
    });
}

// Отправить заявку на вывод средств
export async function sendWithdrawall(data){
        
    return new Promise((resolve, reject) => {
        getData(`admin/withdrawallRequests`).then(response => {
            let res = Object.values(response);
            let isExist = res.some(item => item.isProcessed === false); //Есть ли необработанные заявки вывода
            if(!isExist){
                pushData('admin/withdrawallRequests', data).then(()=> {
                    resolve(true);
                }).catch(()=> reject('err'))
            }else{
                resolve(false);
            }
        }).catch(()=> reject('err'))
    })
}

// Отправить сообщение в чат от тех.поддержки
export async function sendSupportMessage(userUid, message, date){
    return pushData(`supportChats/${userUid}`, {role: 'admin', message: message, date});
}

// Изменить поле "engineeringWorks" (ведутся технические работы на сайте)
export async function changeEngineeringWorks(appData, isActive){
    return setData(`app/`, {...appData, engineeringWorks: isActive});
}