import React from 'react';
import './NotificationIcon.styles.scss'
import { useNotifications } from '../../provider/PushNotification';
import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';
import CircleCount from '../CircleCount/CircleCount';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import { useModals } from '../../../Modals/provider/ModalsProvider';
const NotificationIcon = () => {
    const {user} = useAuth()
    const {lengthNotifications, NotificationsMethods, modalNotification} = useNotifications()
    const {setLeftSideBar} = useModals()

    const onHandleOpen = () => {
        setLeftSideBar(true)
        NotificationsMethods.getNotifications()
    }

    const handleClose = () => {
        NotificationsMethods.clearNotifications()
        setLeftSideBar(false)
    }
    return (
        <>
            {false ?
                <div onClick={() => handleClose()} className="fake-notification"></div>
            : null}

            {user  &&
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