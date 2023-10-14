import React, { useEffect } from 'react';
import NotificationCard from '../NotificationCard/NotificationCard';
import { useNotifications } from '../../provider/PushNotification';
import './NotificationContainer.styles.scss'

const NotificationContainer = () => {
    const {notifications, NotificationsMethods} = useNotifications()
    useEffect(() => {
        NotificationsMethods.getNotificationsLength()
    },[ ])
    return (
        <div className='NotificationContainer'>
            <div className='notificationWrapper'>
            {notifications && notifications.map((element,index) => 
                <NotificationCard element={element} index={index}/>

            )}
            </div>
        </div>
    );
};

export default NotificationContainer;