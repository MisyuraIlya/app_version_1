// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert, onErrorAlert} from '../utils/sweetAlert'
import { AutoCompleteTargetToAllMonth } from '../utils/helpers/AutoCompleteTargetToAllMonth';
import { useHistory } from 'react-router-dom';
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
// Defines
const MyTargetContext = createContext();

// React hook
const useMyTarget = () => {
  const context = useContext(MyTargetContext)
  if (!context) {
    throw new Error('Can not run without "MyTargetProvider"');
  }
  return context;
}

const MyTargetProvider = (props) => {
  // state
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [targets, setTargets] = useState([])
  const [years, setYears] = useState([])
  const [choosedYear, setChoosedYear] = useState(moment().year())
  const [error, setError] = useState([])

  // Helpers
  const fetchTargetList = async () => {
    const agentId = FetchHistoryAgentId(history)
    setLoading(true);
    let val = {
      agentId:agentId,
      year:choosedYear

    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Targets',
      funcName: 'FetchAgentTarget',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        const autoCompelete = AutoCompleteTargetToAllMonth(data.data,agentId,'2023')
        setTargets(autoCompelete)

      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      setError({ isError: true, message: error.message });
    } finally {
      setLoading(false);
    }
  }

  const fetchTargetYears = async (agentId) => {
    setLoading(true);
    let val = {
      agentId:agentId,
    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Targets',
      funcName: 'FetchYears',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setYears(data.data)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      setError({ isError: true, message: error.message });
    } finally {
      setLoading(false);
    }
  }

  const editTarget = async (monthNumber,currentValue,targetValue) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      monthNumber: monthNumber,
      currentValue: currentValue,
      targetValue: targetValue,
      year:choosedYear
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Targets',
      funcName: 'EditTarget',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('עודכן',data.message)
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

  //useEffect(() => {fetchTargetList()},[choosedYear])
  // Exports
  const MyTargetMethods = {
    fetchTargetList,
    fetchTargetYears,
    setChoosedYear,
    editTarget
  };
  const value = {
    MyTargetMethods,
    loading,
    targets,
    years,
    choosedYear

  };

  return (<MyTargetContext.Provider value={value} {...props} />);
};

export { useMyTarget, MyTargetProvider };