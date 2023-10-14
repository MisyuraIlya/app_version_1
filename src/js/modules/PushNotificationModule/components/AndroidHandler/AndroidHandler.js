import React from 'react';
import { useNotifications } from '../../provider/PushNotification';
import './AndroidHandler.styles.scss'
import IssueHandler from '../IssueHandler/IssueHandler';
import { BROWSER_TPYES } from '../../types/browserTypes';
const AndroidHandler = () => {
    const {NotificationsMethods} = useNotifications()
    return (
        <>
            {NotificationsMethods.detectBrowser() !== BROWSER_TPYES.CHROME &&
                <IssueHandler title={'אנחנו תומכים רק בדפדפן CHROME'} link={'https://play.google.com/store/apps/details?id=com.android.chrome'} needPlatrofm={'chrome'}/>
            }
        </>
    );
};

export default AndroidHandler;