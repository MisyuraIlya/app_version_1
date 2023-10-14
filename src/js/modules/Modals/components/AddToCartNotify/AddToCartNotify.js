import React from 'react';
import { useNotificationModal } from '../../provider/NotificationModalProvider';
const AddToCartNotify = () => {
    const {addToCartNotify} = useNotificationModal()

    return (
        <div className={addToCartNotify ? "header-popup-main-cont active" : "header-popup-main-cont"} style={{display:'fixed'}}>
            <div className="header-popup-sub-cont">
                <h3 id='header-popup-id'>מוצר התווסף לסל הקניות</h3>
            </div>
        </div>
    );
};

export default AddToCartNotify;