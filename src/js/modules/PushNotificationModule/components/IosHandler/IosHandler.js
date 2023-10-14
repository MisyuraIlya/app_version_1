import React from 'react';
import { useNotifications } from '../../provider/PushNotification';
import { BROWSER_TPYES } from '../../types/browserTypes';
import './IosHandler.styles.scss'
import IssueHandler from '../IssueHandler/IssueHandler';
const IosHandler = () => {
    const {NotificationsMethods, isPwa, removeIosPromt} = useNotifications()
    const iconFirst = 'https://shanishenhav.online/app/img/shareSafariIcon.png'
    function isUsingChromeOniPhone() {
        const userAgent = window.navigator.userAgent;
        return /CriOS/i.test(userAgent);
      }
    return (
        <>
            {NotificationsMethods.detectBrowser() === BROWSER_TPYES.SAFARI && !isUsingChromeOniPhone() ?  
                <>
                    {!isPwa &&
                        <>
                            {removeIosPromt ?
                                <div className='IosHandler' onClick={() => NotificationsMethods.handleRemoveIosPromt()}>
                                    <div className='content'> 
                                        <span style={{textAlign:'center'}}>להורדה של אפליקציה לאייפון שלך: לחץ <img src={iconFirst} alt='icon' width={20}/> לאחר הוסף לדף הבית </span> 
                                    </div>
                                    <div className='centered'>
                                        <div className="triangle-down"></div>
                                    </div>
                
                                </div>
                            : null}
                        </>
                    }

                </>

            
                :
                <IssueHandler title={'אנחנו תומכים רק בדפדפן SAFARI'} needPlatrofm={'safari'}/> 
            }
        </>
    );
};

export default IosHandler;