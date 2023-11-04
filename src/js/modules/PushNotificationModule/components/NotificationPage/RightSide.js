import React from 'react';
import useNotificationStore from '../../store/notificationStore';
import moment from 'moment';
import NotificationItem from './notificationItem';

const RightSide = () => {
    const {items} = useNotificationStore()
    return (
        <div className={items.length > 0 ? "col-lg-8 right-side hide" : "col-lg-8 right-side"} style={{cursor:'pointer'}}>
            <div className="items">
                {items.map((element, index) => {
                    return (
                        <NotificationItem element={element} index={index} />
                    );
                })}
            </div>
        </div>
    );
};

export default RightSide;