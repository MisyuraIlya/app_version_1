// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
import { useHistory } from 'react-router-dom';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert} from '../utils/sweetAlert'
import { setAgentUser, fetchAgentNewGlobalFunc } from '../services/localstorage/agent.service';
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';

// Defines

const MyAgentContext = createContext();

// React hook
const useMyAgent = () => {

  const context = useContext(MyAgentContext)
  if (!context) {
    throw new Error('Can not run without "MyAgentProvider"');
  }
  return context;
}

const MyAgentProvider = (props) => {

  // state
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const [agentInfo, setAgentInfo] = useState({})
  const [agentList, setAgentList] = useState([])

  // Helpers

  const chooseAgent = async (agentId) => {
    
    setLoading(true);
    let val = {
      id:agentId
    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Agents',
      funcName: 'FetchAgentUser',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setAgentInfo(data.data)

        // onSuccessAlert('כניסה', data.message)
        // history.push(`/targe/${agentId}`)
      }
    } catch (error) {

      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {

      setLoading(false);
    }
  }

  const fetchAgentList = async() => {

    setLoading(true);
    let val = {
      id: JSON.parse(localStorage.agent).Id
    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Agents',
      funcName: 'FetchAgentList',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setAgentList(data.data)
      }
    } catch (error) {

      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {

      setLoading(false);
    }

  }
  
  useEffect(() => {
    if(agentList.length  == 0) {
      fetchAgentList()
    }
  },[])

  useEffect(() => {
    chooseAgent(fetchAgentNewGlobalFunc(history))
  },[history.location.pathname])


  // Exports
  const MyAgentMethods = {
    chooseAgent,
    fetchAgentList
  };
  const value = {
    MyAgentMethods,
    loading,
    agentInfo,
    agentList

  };

  return (<MyAgentContext.Provider value={value} {...props} />);
};

export { useMyAgent, MyAgentProvider };