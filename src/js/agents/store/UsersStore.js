// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert, onErrorAlert} from '../utils/sweetAlert'
import { useHistory } from 'react-router-dom';
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
// Defines
const MyUsersContext = createContext();

// React hook
const useMyUsers = () => {
  const context = useContext(MyUsersContext)
  if (!context) {
    throw new Error('Can not run without "MyUsersProvider"');
  }
  return context;
}

const MyUsersProvider = (props) => {
  // state
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([])

  // Helpers
  const filterByUser = async (filterValue) => {
    
    setLoading(true);
    let val = {
      value:filterValue
    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Users',
      funcName: 'FilterByNameAndUserExId',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setFilteredUsers(data.data)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      setError({ isError: true, message: error.message });
    } finally {
      setLoading(false);
    }
  }



  // Exports
  const MyUsersMethods = {
    filterByUser,
  };
  const value = {
    MyUsersMethods,
    loading,
    filteredUsers


  };

  return (<MyUsersContext.Provider value={value} {...props} />);
};

export { useMyUsers, MyUsersProvider };