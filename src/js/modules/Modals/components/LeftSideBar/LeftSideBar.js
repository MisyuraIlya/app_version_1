import React from 'react';
import NotificationsModal from '../../../PushNotificationModule/components/NotificationsModal/NotificationsModal';
import CloseIcon from '../../../PushNotificationModule/components/CloseIcon/CloseIcon';

const LeftSideBar = ({active, setActive}) => {
    return (
        <div className={active? "notification-view header-cart opened" : "notification-view header-cart closed"}>
            <div className="header-cart-wrapp">
                
                <div className="header-cart-wrapp-head flex-container">
                    <CloseIcon handleOpen={() => setActive()}/>

                    <div className="col-lg-12 text-cont">
                        <p>הודעות</p>
                    </div>

                </div>
                <div>
                    <NotificationsModal/>
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;