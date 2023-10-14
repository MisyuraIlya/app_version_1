import React from 'react';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import useCart from '../../store/CartStore';
import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';
import { getUserFromStorage } from '../../../Auth/helpers/auth.helper';
import MainSummary from '../MainSummary/MainSummary';
import CustomSummary from '../CustomSummary/CustomSummary';
import SendOrderButton from '../SendOrderButton/SendOrderButton';

const Summary = () => {
    const {userType, isUserBlocked} = useAuth()
    const {
        isDeliveryOption, 
        areaChoosed, 
        adressPopup,
        setAdressPopup,
        address,
    } = useCart()

    
    return (
        <div className="wrapper">
            <div className="h1-cont">
                <h1 className="title">{'פרטי מסמך'}</h1>
            </div>

            {userType == 2 &&
                <div className="toggle-payment">
                    {isDeliveryOption &&
                        <h2 className="cart-title">בחירת משלוח</h2>
                    }
                    {isDeliveryOption &&
                        <div>
                            {address.length ?
                                <ul className="shipping">
                                    {address.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <span onClick={this.setActiveAddress.bind(this, item)}
                                                    className={item.active ? 'title active' : 'title'}>
                                                    {item.streetName + ' ' + item.streetNumber + ', ' + item.town}
                                                </span>
                                                <span className="delete"
                                                    onClick={this.removeAddress.bind(this, item)}>
                                                    <img src={globalFileServer + 'icons/delete.svg'} />
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                                : null}
                            {!address?
                                <div>
                                    {getCurrentUserId() ?
                                        <p onClick={(e) => setAdressPopup(!adressPopup)}
                                            className="select-shipping">בחר כתובת</p>
                                        :
                                        <p onClick={(e) => $('#signIn').click()}
                                            className="select-shipping">בחר כתובת</p>
                                    }
                                </div>
                                : null}
                        </div>
                    }
                </div>
            }
            {areaChoosed &&
                <div className="order-info">
                    <div className="prod-info-cont flex-container">
                        <div className="col-lg-4">
                            <p className="c-title">אספקה:</p>
                        </div>
                        <div className="col-lg-8 pack_quan">
                            <p className="c-nomber">{areaChoosed}</p>
                        </div>
                    </div>
                </div>
            }
                        
            {/* <div className="pickup-cont">
                <div className="checkboxes-and-radios">
                    <input type="checkbox"
                    onChange={(e)=> this.pickupSelectedFunc(e.target.checked)}
                    name="checkbox-cats" checked={this.state.pickupSelected}
                    id="checkbox-3" value="3" />
                    <label htmlFor="checkbox-3"></label>
                </div>
                <span>הנחת איסוף עצמי</span>
            </div> */}
            <div className='total'>
                <CustomSummary/>
                <MainSummary/>
                <SendOrderButton/>
            </div>

        </div>
    );
};

export default Summary;