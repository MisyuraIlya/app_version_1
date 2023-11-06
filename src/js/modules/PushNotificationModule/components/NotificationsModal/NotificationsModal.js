import React from 'react';
import './NotificationsModal.styles.scss'
import { useNotifications } from '../../provider/PushNotification';
import NotificationsModalHead from '../NotificationsModalHead/NotificationsModalHead';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
const NotificationsModal = () => {
    return (
        <>
           <div className='WrapperNotification'>
                <NotificationContainer/>
           </div>
        </>
    );
};

export default NotificationsModal;