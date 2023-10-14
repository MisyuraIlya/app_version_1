import React from 'react';
import './NotificationIcon.styles.scss'
import { useNotifications } from '../../provider/PushNotification';
import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';
import CircleCount from '../CircleCount/CircleCount';
const NotificationIcon = ({handleOpen, isOpen}) => {
    const {lengthNotifications, NotificationsMethods, modalNotification} = useNotifications()
    const onHandleOpen = () => {
        handleOpen()
        NotificationsMethods.getNotifications()
        console.log('isOpen',isOpen)
    }

    const handleClose = () => {
        NotificationsMethods.clearNotifications()
        handleOpen()
    }
    return (
        <>
            {isOpen ?
                <div onClick={() => handleClose()} className="fake-notification"></div>
            : null}

            {getCurrentUserId() &&
                <li className={"left"}>
                    <button className="icon" onClick={() => onHandleOpen()}>
                            <span
                                className="not-circle">
                                    <CircleCount/>
                                </span>
                        <span className="material-symbols-outlined">campaign</span>
                    </button>
                </li>
            }	
        {/* <div className='not_with_circle' onClick={() => NotificationsMethods.handleNotificationModal()} >
            <span className="material-symbols-outlined">campaign</span>
            <div className='not_cirlce'>
                <p>{lengthNotifications}</p>
            </div>
        </div> */}
        </>

    );
};

export default NotificationIcon;