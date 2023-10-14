// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
// Local
import { ajax } from '../utils/MyAjax';
import { useHistory } from 'react-router-dom';
import {onSuccessAlert,onErrorAlert} from '../utils/sweetAlert'
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
// Defines
const MyObjectiveContext = createContext();

// React hook
const useMyObjective = () => {
  const context = useContext(MyObjectiveContext)
  if (!context) {
    throw new Error('Can not run without "MyObjectiveProvider"');
  }
  return context;
}

const MyObjectiveProvider = (props) => {
  // state
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date())
  const [hourFrom, setHourFrom] = useState('')
  const [hourTo, setHourTo] = useState('')
  const [mission, setMission] = useState('')

  // Helpers
  const fetchObjectivs = async () => {
    setLoading(true);
    let val = {
      id: FetchHistoryAgentId(history)
    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Agents',
      funcName: 'FetchAgentUser',
      val:val
    };

    try {
      const data = await ajax(valAjax);
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      setError({ isError: true, message: error.message });
    } finally {
      setLoading(false);
    }
  }

  const createObjective = async(data) => {
    const agentId = FetchHistoryAgentId(history)
    setLoading(true);
    let val = {
      agentId: agentId,
      date: moment(date).format('YYYY-MM-DD'),
      hourFrom: data.HoursFromSelect.value,
      hourTo: data.HoursToSelect.value,
      missions: data.text
    }

    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Objectives',
      funcName: 'CreateObjective',
      val:val
    };
    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('הוקם',data.message)
        fetchTargetList()
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      setError({ isError: true, message: error.message });
    } finally {
      setLoading(false);
    }
  }

  

  // Exports
  const MyObjectiveMethods = {
    createObjective,
    setDate,
    setHourFrom,
    setHourTo,
    setMission
  };
  const value = {
    MyObjectiveMethods,
    loading,
    date,
    hourFrom,
    hourTo,
    mission

  };

  return (<MyObjectiveContext.Provider value={value} {...props} />);
};

export { useMyObjective, MyObjectiveProvider };