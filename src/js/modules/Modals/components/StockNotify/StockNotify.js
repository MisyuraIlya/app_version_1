import React, { useEffect } from 'react';
import useModal from '../../store/SelectedProductStore';
import { useNotificationModal } from '../../provider/NotificationModalProvider';

const StockNotify = () => {
    // const {stockNotify} = useModal()
    const {stockNotify} = useNotificationModal()

    return (
        <div className={stockNotify ? "header-popup-main-cont active" : "header-popup-main-cont"}>
            <div className="header-popup-sub-cont">
                <h3 id='header-popup-id'>כמות מלאי אינה מספקת</h3>
            </div>
        </div>
    );
};

export default StockNotify;