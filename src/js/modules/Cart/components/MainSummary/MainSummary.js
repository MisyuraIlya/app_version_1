import React from 'react';
import useCart from '../../store/CartStore';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import { getUserFromStorage } from '../../../Auth/helpers/auth.helper';
import { CART_CONFIG } from '../../config/custom';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';
const MainSummary = () => {
    const {userType, isUserBlocked} = useAuth()
    const {
        setSpecialSettingsPop,
        selectedMode,  
        cart, 
        deliveryPrice,
        discount,
        totalBasket,
        comment,
        setComment,
        sendOrder,
        sendNoApproval,
        b2bPickupDiscount,
        priceBeforeTax,
        calucalteDiscountTotal,
        calculatePriceAfterDiscount,
        calculateTax,
        calculateFinalPrice,
        getTotalDiscountPrecet
    } = useCart()

    const {openCartSettings, setOpenCartSettings} = useNotificationModal()
    return (
        
    <>
        <ul className="first-price">
            <li className="li-border">
                <span className="title">{'כמות שורות'}</span>
                <span className="price hidePrice">{cart.length}</span>
            </li>
            
            {userType == 1 &&
                <li>
                    <span
                        className="title">{'סה״כ לפני מע״מ'}</span>
                    <span className="price">{(priceBeforeTax()).toFixed(1)}</span>
                </li>
            }
            {userType == 2 &&
                <li>
                    <span className="title">{'סה״כ'}</span>
                    <span className="price">{(priceBeforeTax()).toFixed(1)}</span>
                </li>
            }
            {calucalteDiscountTotal() !== 0 &&
            <div>
                {userType == 1 &&
                    <li className="">
                        <span className="title">{"הנחה כללית: " + getTotalDiscountPrecet() + "%"}</span>
                        <span className="price">{calucalteDiscountTotal().toFixed(1)}</span>
                    </li>
                }
            </div>
            }


            {userType == 1  && calucalteDiscountTotal() !== 0  &&
                <li>
                    <span className="title">{'סה״כ אחרי הנחה'}</span>
                    <span className="price">{(calculatePriceAfterDiscount()).toFixed(1)}</span>
                </li>
            }
            
                <li>
                    <span className="title">דמי משלוח</span>
                    <span className="price">{deliveryPrice}</span>
                </li>

            {userType == 1 ?
                <li>
                    <span className="title">{'מע״מ'}</span>
                    <span
                        className="price">{calculateTax().toFixed(1)}</span>
                </li>
                : null}

        </ul>

        <h4>
            <span className="title">{'מחיר לתשלום'}</span>
            <span className="price">{calculateFinalPrice().toFixed(1)}</span>
        </h4>

        <ul className='first-price'>	
            <li>
                <span className="title black">{'הגדרות לאספקה'}</span>
                <span onClick={()=> setOpenCartSettings(!openCartSettings)} className="icon material-symbols-outlined">settings</span>
            </li>
        </ul>

        {selectedMode =='2' &&
            <ul className='first-price'>	
                <li>
                    <span className="title black">{'ללא אישור מנהל'}</span>
                    <div 
                        className={sendNoApproval ? "checkBox active" : "checkBox"}
                        onClick={() => setSendNoApproval(!sendNoApproval)}
                    ></div>							
                </li>
            </ul>
        }

        {totalBasket > getUserFromStorage().MaxObligo &&
        <div className="obligo-alert-cont">
            {totalBasket > getUserFromStorage().MaxObligo &&
                <p>{'חריגת אובליגו. צור קשר עם סוכן / משרד'}</p>
            }
        </div>
        }

        {CART_CONFIG.MIN_PRICE > priceBeforeTax() && selectedMode == '1' ?
            <div className="minPrice-class">
                <p>{"עליך לצבור עוד " + Math.abs(priceBeforeTax() - CART_CONFIG.MIN_PRICE).toFixed(1) + " ש״ח עד למינימום הזמנה"}</p>
            </div>
        : null}
    </>
    );
};

export default MainSummary;