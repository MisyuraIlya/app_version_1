import React from 'react';
import IosHandler from './IosHandler/IosHandler';
import AndroidHandler from './AndroidHandler/AndroidHandler';
import { useNotifications } from '../provider/PushNotification';

const PushNotificationHandlers = () => {
    const { isAndroid, isIPhone} = useNotifications()
    return (
        <div>
            {isIPhone && 
            <IosHandler/>
            }
            {isAndroid && 
            <AndroidHandler/>
            } 
            
        </div>
    );
};

export default PushNotificationHandlers;