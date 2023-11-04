import React, { useEffect } from 'react';
import RightSide from '../components/NotificationPage/RightSide';
import LeftSide from '../components/NotificationPage/LeftSide';
import useNotificationStore from '../store/notificationStore';
import useClientStore from '../../Admin/store/ClientsStore';

const NotificationPage = () => {
    const {addItem,fetchItems} = useNotificationStore()
    const {getClients} = useClientStore()
    useEffect(() => {
        fetchItems()
        getClients(true)
    },[ ])
    return (
        <div className='page-container notification'>
            <div className="container">
                <div className="flex-container">
                    <div className="add-mobile">
                        <button onClick={() => addItem()}>
                            <img src={globalFileServer + 'icons/plus-white.svg'} />
                            <span>צור הודעה חדשה</span>
                        </button>
                    </div>
                    <RightSide/>
                    <LeftSide/>
                </div>
            </div>
        </div>
    
    );
};

export default NotificationPage;