// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert,onErrorAlert} from '../utils/sweetAlert'
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
import { fetchPage } from '../services/localstorage/pagination.service';
// Defines
const MyVisitsContext = createContext();

// React hook
const useMyVisits = () => {
  const context = useContext(MyVisitsContext)
  if (!context) {
    throw new Error('Can not run without "MyVisitsProvider"');
  }
  return context;
}

const MyVisitsProvider = (props) => {
  // state
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchValueDebounced] = useDebounce(searchValue, 1000);
  const [paginationObject, setPaginationObject] = useState([])
  // Helpers
  const fetchVisitsList = async () => {
    const agentId = FetchHistoryAgentId(history)
    setLoading(true);
    let val = {
      agentId:agentId,
      page: fetchPage(history),

    }
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Visits',
      funcName: 'FetchAgentVisits',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setPaginationObject(data.data.paginateObj)
        setVisits(data.data.data)

      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const editVisits = async (visitsObjectId, clientName,week1,week2,week3,week4,choosedDayHebrew,hourFrom,hourTo) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      visitId: visitsObjectId,
      clientName: clientName,
      week1: week1,
      week2: week2,
      week3: week3,
      week4: week4,
      choosedDayHebrew:choosedDayHebrew,
      hourFrom:hourFrom,
      hourTo:hourTo
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Visits',
      funcName: 'EditVisit',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('עודכן',data.message)
        fetchVisitsList()
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const creatreVisit = async (userObject,week1,week2,week3,week4,choosedDayHebrew,hourFrom,hourTo) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      userObject: userObject,
      week1: week1,
      week2: week2,
      week3: week3,
      week4:week4,
      choosedDayHebrew:choosedDayHebrew,
      hourFrom,hourFrom,
      hourTo:hourTo
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Visits',
      funcName: 'CreateVisit',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('עודכן',data.message)
        fetchVisitsList()
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

  const unpublishVisit = async (id) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      visitId: id,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Visits',
      funcName: 'UnpublishVisit',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('בוטל',data.message)
        fetchVisitsList()
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const filterAgentVisits = async () => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      page: fetchPage(history),
      searchValue: searchValueDebounced
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'Visits',
      funcName: 'filterVisits',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setPaginationObject(data.data.paginateObj)
        setVisits(data.data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(searchValueDebounced){
      filterAgentVisits()
    }
  },[searchValueDebounced])

  // useEffect(() => {
  //   if(!searchValueDebounced){
  //     fetchVisitsList()
  //   }
  // },[searchValueDebounced])


  // Exports
  const MyVisitsMethods = {
    fetchVisitsList,
    editVisits,
    creatreVisit,
    unpublishVisit,
    setSearchValue
  };
  const value = {
    MyVisitsMethods,
    paginationObject,
    loading,
    visits,
    searchValueDebounced

  };

  return (<MyVisitsContext.Provider value={value} {...props} />);
};

export { useMyVisits, MyVisitsProvider };