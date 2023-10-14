// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';

// Local
import { ajax } from '../../../helpers/ajaxFunc';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { getRefreshToken, getUserFromStorage, removeFromStorage, saveToStorage, saveTokensStorage, updateAccessToken } from '../helpers/auth.helper';
import { onErrorAlert, onSuccessAlert } from '../../../agents/utils/sweetAlert';
import { getPayloadToken } from '../helpers/auth.helper';
// Defines
const AuthContext = createContext();

// React hook
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Can not run without "AuthProvider"');
  }
  return context;
}

const AuthProvider = (props) => {
  // state
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const userType = getUserFromStorage()?.Type;
  const isUserBlocked = getUserFromStorage()?.Blocked;
  const user = getUserFromStorage();
  const isAgent = getPayloadToken()?.type === 'agent'
  const isSuperAgent = getPayloadToken()?.type === 'agentSuper'
  // Helpers
  const login = async (username, password) => {
    try {
      setLoading(true)
      const response = await AuthService.login(username, password)
      if(response.status === 'success') {
        saveToStorage(response.data)
        onSuccessAlert('ברוכים הבאים',response.message)
        setTimeout(() => {
          location.reload();

        },"1000")
        
      } else {
        onErrorAlert('שגיאה', response.message)
      }
    } catch (error) {
        console.error('[AuthProvider] error login', error)
    } finally {
      setLoading(false);
    }
  }

  const getAccessToken = async () => {
    const user = getUserFromStorage()
    if(user) {
      const refreshToken = getRefreshToken()
      try {
          const response = await AuthService.getAccessToken(refreshToken)
          if(response.status === 'success') {
              updateAccessToken(response.data.accessToken)
          } else {
              logOut()
          }
      } catch (error) {
          console.error('[AuthProvider] error getAccessToken', error)
      } 
    }else{
      // logOut();
    }
  }

  const registerClient = async (data) => {
    try {
      setLoading(true)
      console.log('data',data)
      const response = await AuthService.registerNewClient(data)
      if(response.status === 'success') {
        login(data.email,data.password)
      } else {
        onErrorAlert('שגיאה', response.message)
      }
    } catch (error) {
        console.error('[AuthProvider] error login', error)
    } finally {
      setLoading(false);
    }
  }

  const logOut = () => {
    removeFromStorage()
    history.push('/')
    location.reload();
  }

  useEffect(() => {
      const interval = setInterval(getAccessToken, 60000); 
      return () => {
        clearInterval(interval);
      };
  }, []);



  // Exports

  const value = {
    login,
    loading,
    registerClient,
    userType,
    isUserBlocked,
    isAgent,
    isSuperAgent,
    user

  };

  return (<AuthContext.Provider value={value} {...props} />);
};

export { useAuth, AuthProvider };