import React from 'react';
import './NotificationsModalHead.styles.scss'
import { useNotifications } from '../../provider/PushNotification';

const NotificationsModalHead = () => {
    const {NotificationsMethods, choosedType, isMobile} = useNotifications()
    return (
        <>
        <div className='NotificationHead ' style={{marginTop:'10px'}}>
            <div className='flex-container' style={{width:'100%'}}>
                <div className='col-lg-2'></div>
                <div className='col-lg-5 readAllBtnBlack pointer'>
                    <div>
                        {NotificationsMethods.checkIsAllRead() ?
                            <img src={globalFileServer + 'notificationsIcons/readAll_black.svg'}/>
                        :
                            <img src={globalFileServer + 'notificationsIcons/unreadAll.svg'} onClick={() => {NotificationsMethods.handleReadAll()}}/>
                        }
                    </div>
                    <span>קראתי הכל</span>
                </div>
                <div className='col-lg-4 flex-container'>
                    <div className='col-lg-6' style={{position:'relative'}}> 
                        {choosedType === 'note' ?
                            <div className='myCenter' >
                                <div className='pointer'>
                                        <span className="material-symbols-outlined" onClick={() => NotificationsMethods.handelChoosedType('note')}>
                                        notifications
                                        </span>
                                    {/* <img src={globalFileServer + 'notificationsIcons/bell_unlink_black.svg'} onClick={() => NotificationsMethods.handelChoosedType('note')}/> */}
                                    <div className='NotedividerBlack'></div>
                                </div>    
                            </div>
                        :
                            <div className='myCenter pointer' >
                                <span className="material-symbols-outlined" onClick={() => NotificationsMethods.handelChoosedType('note')}>
                                    notifications
                                </span>
                                {/* <img src={globalFileServer + 'notificationsIcons/bell_unlink.svg'} onClick={() => NotificationsMethods.handelChoosedType('note')}/> */}
                            </div>
                        }

                    </div>
                    <div className='col-lg-6' style={{position:'relative'}}> 
                        {choosedType === 'clock' ?
                            <div className='myCenter'>
                                <div className='pointer'>
                                    <span className="material-symbols-outlined"  onClick={() => NotificationsMethods.handelChoosedType('clock')}>
                                    history
                                    </span>
                                    {/* <img src={globalFileServer + 'notificationsIcons/clock_clicked_black.svg'}  onClick={() => NotificationsMethods.handelChoosedType('clock')}/> */}
                                    <div className='NotedividerBlack'></div>
                                </div>    
                            </div>
                        :
                            <div className='myCenter pointer'>
                                <span className="material-symbols-outlined"  onClick={() => NotificationsMethods.handelChoosedType('clock')}>
                                    history
                                </span>
                                {/* <img src={globalFileServer + 'notificationsIcons/clock.svg'}  onClick={() => NotificationsMethods.handelChoosedType('clock')}/> */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        
        </>

    );
};

export default NotificationsModalHead;