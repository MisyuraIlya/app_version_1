import React from 'react';
import { useNotifications } from '../../provider/PushNotification';

const CircleCount = () => {
    const {lengthNotifications} = useNotifications()
    return (
        <>
            {lengthNotifications}
        </>
    );
};

export default CircleCount;