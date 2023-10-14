import React from 'react';
import { useNotifications } from '../../provider/PushNotification';

const CloseIcon = ({handleOpen}) => {
    const {NotificationsMethods} = useNotifications()

    const handleClose = () => {
        NotificationsMethods.clearNotifications()
        handleOpen()
    }

    return (
        <div className="close-cart-cont" onClick={() => handleClose()}>
            <span className="close-cart material-symbols-outlined">close</span>
        </div>

    );
};

export default CloseIcon;