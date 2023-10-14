import React,{useEffect} from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import useCart from '../../../Cart/store/CartStore';
import { onErrorAlert, onSuccessAlert } from '../../../../agents/utils/sweetAlert';

const PayPopUp = ({active, setActive}) => {
    
    const {calculateFinalPrice, sendOrder} = useCart()
    
    const recievingMessages = (e) => {
        if (e.data && e.data.res === 'SuccessVerifon') {
            setActive(false)
            sendOrder()
            //TODO
        }

        if (e.data && e.data.res === 'ErrorVerifon') {
            onErrorAlert('העסקה נכשלה', 'אנא בדקו את פרטי הכרטיס או נסו כרטיס אחר')
        }

        if (e.data === 'CancelVerifon') {
            setActive(false)
        }
    };

    useEffect(() => {
        window.addEventListener('message', recievingMessages, true);
        return () => {
          window.removeEventListener('message', recievingMessages, true);
        };
      }, []);

      
    return (
        // <ModalWrapper active={active} setActive={setActive}>
            <div className="pay-popup">
                <div className="popup" id="payPopup">
                    <div className="popup-wrapper">
                        <div className="wrapp">
                            <div onClick={() => setActive(false)} className="close-popup">
                                <img src={globalFileServer + 'icons/close.svg'} alt="" />
                            </div>
                            <div className="wrapper">
                                <iframe src={'https://churishop.co.il/iframe?val=' + calculateFinalPrice()} framborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </ModalWrapper>

    );
};

export default PayPopUp;