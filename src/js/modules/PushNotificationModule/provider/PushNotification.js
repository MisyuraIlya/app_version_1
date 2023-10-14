// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import { NotificationsServices } from '../services/notifications/notifications.service';
import OneSignal from 'react-onesignal';
import { BROWSER_TPYES } from '../types/browserTypes';
import NotificationsModal from '../components/NotificationsModal/NotificationsModal';
import { CLIENT_NAME, WEB_KEY } from '../config/enums';
import { getCurrentUserId, getCurrentUserType } from '../../Auth/helpers/getCurrentUserId';
// Local
// Defines
const NotificationsContext = createContext();

// React hook
const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('Can not run without "NotificationsProvider"');
  }

  return context;
}


const NotificationsProvider = ({children}) => {
    const isIPhone = /iPhone/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const ApiClientName = 'bfl'
    const isPwa = window.matchMedia('(display-mode: standalone)').matches;
    const userExId = getCurrentUserId();
    const [notifications, setNotifications] = useState()
    const [storeNotifications, setStoreNotifications] = useState() 
    const [lengthNotifications, setLengthNorifications] = useState(0)
    const [options, setOptions] = useState()
    const [choosedType, setChoosedType] = useState('note')
    const isMobile = innerWidth < 600
    const [modalNotification, setModalNotification] = useState(false)
    const [removeIosPromt, setRemoveIosPrompt] = useState(localStorage.removeIosPromt ? removeIosPromt : true)
    const [alreadyRegistered, setAlreadyRegistered] = useState(false)
    const [appId, setAppId] = useState('')
    const onHandleTag = (tag) => {
      console.log('Tagging')
      OneSignal.sendTag('tech',tag).then(() => {
        console.log('Tagged')
      })
    }
    
    const handleRemoveIosPromt = () => {
      localStorage.setItem('removeIosPromt', false)
      setRemoveIosPrompt(false)
    }

    const registerClient = async (appId,platform) => {

      try {
        const response = await NotificationsServices.registerClient(
          CLIENT_NAME, 
          appId, 
          platform, 
          true, 
          userExId, 
          true, 
          getCurrentUserType() 
          ) 
        console.log('response',response)
        if(response.message == 'User ex id with this App id exists') {
          setAlreadyRegistered(true)
        }
      } catch(e) {
        console.log('error register client',e)
      }
    }

    const getNotifications = async () => {
        try {
            const response = await NotificationsServices.getOrdersPerClient(CLIENT_NAME)
            if(response?.status == 'success') {
                console.log('response.data',response.data)
                setNotifications(response.data)
                // setNotifications(response.data)
                setStoreNotifications(response.data)
                setLengthNorifications(response.data.length)
                handleNotificationFilter(response.data)
            }
        } catch (e) {
            console.log('errorMe',e)
        }
    }

    const clearNotifications = () => {
      setTimeout(() => {
        setNotifications([])
        setStoreNotifications([])
        handleNotificationFilter([])
      },"500")

    }

    const getNotificationsLength = async () => {
      try {
        const response = await NotificationsServices.fetchNotificationLengthPerClient(CLIENT_NAME)
        if(response?.status == 'success') {
            setLengthNorifications(response.data)
        }
    } catch (e) {
        console.log('errorMe',e)
    }
    }

    const handleNotificationFilter = (newData) => {
      let choosed = localStorage.type 
      if(choosed === 'note') {
          let data = (newData ? newData : storeNotifications).filter((item) => item.is_read !== 1)
          setNotifications(data)
      }  else if (choosed === 'clock') {
          let data = (newData ? newData :  storeNotifications).filter((item) => item.is_read === 1)
          setNotifications(data)
      } 
    }

    const handleReadAll = async () => {
      try {
          const response = await NotificationsServices.handleReadAll(ApiClientName,  userExId)
          if(response.status == 'success') {
              // getNotifications()
          }
      } catch (e) {
          console.log('error',e)
      }
    }

    const detectBrowser = () => {
        const userAgent = navigator.userAgent;
        let browser = 'Unknown';
    
        if (userAgent.indexOf(BROWSER_TPYES.CHROME) > -1) {
          browser = BROWSER_TPYES.CHROME;
        } else if (userAgent.indexOf(BROWSER_TPYES.FIREFOX) > -1) {
          browser = BROWSER_TPYES.FIREFOX;
        } else if (userAgent.indexOf(BROWSER_TPYES.SAFARI) > -1) {
          browser = BROWSER_TPYES.SAFARI;
        } else if (userAgent.indexOf(BROWSER_TPYES.MICROSOFT) > -1) {
          browser = BROWSER_TPYES.MICROSOFT;
        } else if (userAgent.indexOf(BROWSER_TPYES.OPERA) > -1 || userAgent.indexOf('OPR') > -1) {
          browser = BROWSER_TPYES.OPERA;
        } else if (userAgent.indexOf(BROWSER_TPYES.EXPLORER) > -1) {
          browser = BROWSER_TPYES.EXPLORER;
        }
    
        return browser;
    };

    const handleBrowser = () => {
      setTimeout(() => {
        const appId = "ff5e7738-0527-4d59-9382-13901391053a";
        const requestNotificationPermission = async () => {
          try {
            if (window.OneSignal) {
              await window.OneSignal.registerForPushNotifications();
              const playerId = await window.OneSignal.getUserId();
              if (playerId) {
                setAppId(playerId)
                localStorage.setItem("appId", playerId);
              }
            } else {
              // alert("OneSignal is not available.");
            }
          } catch (error) {
            // alert("Error requesting notification permission: "+ error);
          }
        };
        window.OneSignal.init({
          appId: appId,
        });
    
        requestNotificationPermission();
    
        return () => {
            window.OneSignal.clearEventHandlers();
        };
    },"10000")
    };

    const handleNotificationModal = () => {
      setModalNotification(!modalNotification)
    }

    const checkIsAllRead = () => {
      const isCheckedAll = notifications?.every(notification => notification.is_read === 1);
      return isCheckedAll;
    }

    const handelChoosedType = (type) => {
      setChoosedType(type)
      localStorage.setItem('type', type)
    }

    const handleIsRead = async (notificationId, isRead) => {
      try {
          const response = await NotificationsServices.handleIsRead(ApiClientName,notificationId, isRead)
          getNotificationsLength()
          // getNotifications()
      } catch (e) {
          console.log('error',e)
      }
    }


    useEffect(() => {
        if(userExId){
            const intervalId = setInterval(getNotificationsLength, 60000);
            return () => clearInterval(intervalId);
        }
      }, []);

    useEffect(() => {
      if(!alreadyRegistered) {
        handleBrowser()
      }
    }, []);

    useEffect(() => {
      if(storeNotifications) {
          handleNotificationFilter()
      }
  },[choosedType])

    useEffect(() => {
      if(userExId && !alreadyRegistered){
          const localAppId = localStorage.appId
          registerClient(localAppId,'web')
      }
    },[userExId])

    useEffect(() => {
      if(!localStorage.appId) {
        setTimeout(() => {
          const localAppId = localStorage.appId
          registerClient(localAppId,'web')
        },"15000")
      }

    },[appId])


    const NotificationsMethods = {
        getNotifications,
        detectBrowser,
        handleNotificationModal,
        setChoosedType,
        handleIsRead,
        handelChoosedType,
        handleReadAll,
        checkIsAllRead,
        registerClient,
        handleRemoveIosPromt,
        getNotificationsLength,
        clearNotifications
    };
    const value = {
        NotificationsMethods,
        notifications,
        lengthNotifications,
        options,
        isIPhone,
        isAndroid,
        isPwa,
        modalNotification,
        choosedType,
        isMobile,
        removeIosPromt
    };

    return (
      <NotificationsContext.Provider value={value} >
        { modalNotification &&
          <NotificationsModal/>      
        }
        {children}
      </NotificationsContext.Provider>
    );
};

export { useNotifications, NotificationsProvider };