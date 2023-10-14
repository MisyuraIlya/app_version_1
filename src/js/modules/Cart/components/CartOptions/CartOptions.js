import React from 'react';
import useCart from '../../store/CartStore';
import { onAsk } from '../../../../agents/utils/sweetAlert';
import { removeProductsFromStorage } from '../../helpers/localstorage';
const CartOptions = () => {
    const {cart, setCart,saveAsDraft,goToDrafts, selectedMode} = useCart()

    const askDelete = async () => {
        const ask = await onAsk('האם אתה בטוח?','כל המוצרים בעגלה יימחקו')
        if(ask) {
            setCart([])
            removeProductsFromStorage()
        }
    }
    
    return (
        <div className="first-line-cont">
        {cart.length > 0 &&
            <div className="draft-btn-cont reset">
                <p onClick={() => askDelete()}>מחק סל</p>
            </div>
        }
        {/* {cart.length > 0 && selectedMode == 1 ?
            <div className="draft-btn-cont">
                <p onClick={() => saveAsDraft()}>שמור טיוטה</p>
            </div>
            : null} */}
        {/* {selectedMode == 1 ?
            <div className="draft-btn-cont">
                <p onClick={() => goToDrafts()}>טען טיוטה</p>
            </div>
        : null} */}
        </div>
    );
};

export default CartOptions;