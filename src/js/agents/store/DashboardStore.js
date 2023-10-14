// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
import { useHistory } from 'react-router-dom';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert, onErrorAlert} from '../utils/sweetAlert'
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
import { fetchAgentNewGlobalFunc } from '../services/localstorage/agent.service';
// Defines
const MyDashboardContext = createContext();

// React hook
const useMyDashboard = () => {
  const context = useContext(MyDashboardContext)
  if (!context) {
    throw new Error('Can not run without "MyDashboardProvider"');
  }
  return context;
}

const MyDashboardProvider = (props) => {
  // state
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState([])
  const [targets, setTargets] = useState([])
  const [objectives, setObjectives] = useState([])
  const [performanceInfo, setPerformanceInfo] = useState([])
  const [todayTask, setTodayTask] = useState([])
  const history = useHistory()

  // Helpers

  const FetchAgentPerformanceInfo = async () => {

    const agentId = fetchAgentNewGlobalFunc(history);

    let val = {
      agentId: agentId,
    }

    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Dashboard',
      funcName: 'PerformanceInfo',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      //debugger;
      setPerformanceInfo(data.data.clientProfileObj.Totals)
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const FetchComponentVisits = async () => {
      const agentId = fetchAgentNewGlobalFunc(history)
      let val = {
        agentId: parseInt(agentId),
      }
      setLoading(true);
      const valAjax = {
        point: 'agents_app/index',
        classPoint:'Dashboard',
        funcName: 'VisitsComponent',
        val:val
      };
      try {

        const data = await ajax(valAjax);
        //debugger;
        setVisits(data.data)
      } catch (error) {
        console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      } finally {
        setLoading(false);
      }
  }

  const FetchComponentTargets = async () => {
      const agentId = fetchAgentNewGlobalFunc(history)

      let dt = new Date();

      let val = {
        agentId: agentId,
        year : new Date().getFullYear(),
      }
      setLoading(true);
      const valAjax = {
        point: 'agents_app/index',
        classPoint:'Dashboard',
        funcName: 'TargetsComponent',
        val:val
      };

      try {
        const data = await ajax(valAjax);
       // setTargets(data.data)
      } catch (error) {
        console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
      } finally {
        setLoading(false);
      }
  }

  const FetchComponentObjectives = async () => {
    const agentId = fetchAgentNewGlobalFunc(history)
    let val = {
      agentId: agentId,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Dashboard',
      funcName: 'ObjectiveComponent',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      setObjectives(data.data)
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const FetchTaskLists = async () => {
    const agentId = fetchAgentNewGlobalFunc(history)
    let val = {
      agentId: agentId,
      year : 2023,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Dashboard',
      funcName: 'fetchListOfTodayTask',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      setTodayTask(data.data)
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const FetchAllFuncs = () => {

      FetchAgentPerformanceInfo()
      FetchComponentVisits()
      //FetchComponentTargets()
      FetchComponentObjectives()
      FetchTaskLists()
  }
      

  // Exports
  const MyDashboardMethods = {
    FetchAllFuncs
  };
  const value = {
    performanceInfo,
    MyDashboardMethods,
    loading,
    visits,
    targets,
    objectives,
    todayTask
    

  };

  return (<MyDashboardContext.Provider value={value} {...props} />);
};

export { useMyDashboard, MyDashboardProvider };