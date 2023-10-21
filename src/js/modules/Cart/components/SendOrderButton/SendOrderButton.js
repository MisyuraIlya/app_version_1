import React from 'react';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import useCart from '../../store/CartStore';
import { CART_CONFIG } from '../../config/custom';
import { useModals } from '../../../Modals/provider/ModalsProvider';
const SendOrderButton = () => {
    const {userType, isUserBlocked} = useAuth()
    const {
        selectedMode,  
        cart, 
        comment,
        setComment,
        sendOrder,
        priceBeforeTax,

    } = useCart()

    const {openPopUpPay, setOpenPopUpPay} = useModals()

    const handlePay = () => {
        setOpenPopUpPay(true)
    }

    const handleSendOrder = () => {
        sendOrder()
    }
    
    return (
        <div>
            {!isUserBlocked && ((cart.length > 0 && CART_CONFIG.MIN_PRICE <= priceBeforeTax()) || selectedMode != '1') ?
                <div className="pay-btn-cont">
                    <div className={!comment ? 'comments empty' : 'comments'}>
                        <textarea
                            placeholder={'הערות למסמך'}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                    </div>
                    
                    <div className="btn-container flex-container">
                        <div className="btn-subcontainer col-lg-12">
                            <button onClick={() => handleSendOrder()}className="to-pay">{ 'שלח'}</button>
                        </div>
                    </div>
                    <div className="btn-container flex-container">
                        <div className="btn-subcontainer col-lg-12">
                            <button onClick={() => handlePay()}className="to-pay">{'שלם'}</button>
                        </div>
                    </div>
                </div>
            : null}
        </div>
    );
};

export default SendOrderButton;