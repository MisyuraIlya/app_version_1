import { ajaxService } from '../../../../helpers/ajaxService';
import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';

const URL = 'https://digitrade.host/helpers/onesignal/src/index.php'
const classPoint = 'OneSignal'

export const NotificationsServices =  {
    
    async getKeys(clientName){
        const valAjax = {
            classPoint: classPoint,
            funcName: 'getClientKeys',
            clientName,
            url: URL
          };
    
        try {
          const data = await ajaxService(valAjax);
          return data
        } catch (error) {
          console.error('[state/Products/loadProducts] Failed to load Productss', { error });
        } 
    },

    async registerClient(clientName,appId,platform,isSubscribed,userExId,isAllowed,type){

        const valAjax = {
            classPoint: classPoint,
            funcName: 'registerClient',
            clientName,
            appId,
            platform,
            isSubscribed,
            userExId,
            isAllowed,
            type,
            url: URL
          };
    
        try {
          const data = await ajaxService(valAjax);
          return data
        } catch (error) {
          console.error('[state/Products/loadProducts] Failed to load Productss', { error });
        } 
    },

    async getOrdersPerClient(clientName){
      const valAjax = {
        classPoint: classPoint,
        funcName: 'fetchNotificationPerClient',
        clientName,
        userExId: getCurrentUserId(),
        url: URL
      };

      try {
        const data = await ajaxService(valAjax);
        return data
      } catch (error) {
        console.error('[state/Products/loadProducts] Failed to load Productss', { error });
      } 
    },

    async fetchNotificationLengthPerClient(clientName){
      const valAjax = {
        classPoint: classPoint,
        funcName: 'fetchNotificationLengthPerClient',
        clientName,
        userExId: getCurrentUserId(),
        url: URL
      };

      try {
        const data = await ajaxService(valAjax);
        return data
      } catch (error) {
        console.error('[state/Products/loadProducts] Failed to load Productss', { error });
      } 
    },


    async handleIsRead(clientName, notificationId, isRead){
      const valAjax = {
        classPoint: classPoint,
        funcName: 'handleIsRead',
        clientName,
        notificationId,
        isRead,
        url: URL
      };

      try {
        const data = await ajaxService(valAjax);
        return data
      } catch (error) {
        console.error('[state/Products/loadProducts] Failed to load Productss', { error });
      } 
    },

    async handleIsFlag(clientName, notificationId, isFlag){
      const valAjax = {
        classPoint: classPoint,
        funcName: 'handleIsFlag',
        clientName,
        notificationId,
        isFlag,
        url: URL
      };

      try {
        const data = await ajaxService(valAjax);
        return data
      } catch (error) {
        console.error('[state/Products/loadProducts] Failed to load Productss', { error });
      } 
    },

    async handleReadAll(clientName, userExId) {
      const valAjax = {
        classPoint: classPoint,
        funcName: 'handleReadAll',
        clientName,
        userExId,
        url: URL
      };

      try {
        const data = await ajaxService(valAjax);
        return data
      } catch (error) {
        console.error('[state/Products/loadProducts] Failed to load Productss', { error });
      } 
    },

    async optionsPerClient(clientName, userExId,isAllowMail,isAllowNotification,isAllowSms) {
      const valAjax = {
        classPoint: classPoint,
        funcName: 'syncOptions',
        clientName,
        userExId,
        isAllowMail,
        isAllowNotification,
        isAllowSms,
        url: URL
      };

      try {
        const data = await ajaxService(valAjax);
        return data
      } catch (error) {
        console.error('[state/Products/loadProducts] Failed to load Productss', { error });
      } 
    },


}