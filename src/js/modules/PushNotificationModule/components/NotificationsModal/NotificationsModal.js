import React from 'react';
import './NotificationsModal.styles.scss'
import { useNotifications } from '../../provider/PushNotification';
import NotificationsModalHead from '../NotificationsModalHead/NotificationsModalHead';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
const NotificationsModal = () => {
    const {NotificationMethods, isMobile} = useNotifications()

    return (
        <>
            {/*
            {isMobile &&
               <div className='NotificationModules_background' onClick={() => NotificationMethods.handleNotificationModal()}></div> 
            }*/}
           <div className='WrapperNotification'>
                {/*
                {isMobile &&
                    <NotificationsModalHead/>            
                }
                */}
                <NotificationContainer/>
           </div>
        </>
    );
};

export default NotificationsModal;