// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
import { useHistory } from 'react-router-dom';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert, onErrorAlert} from '../utils/sweetAlert'
// import { setScheduleCalendarUser, fetchScheduleCalendarUser } from '../services/localstorage/ScheduleCalendar.service';
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
import { GetWeekNumberFromThisMonth } from '../utils/helpers/GetWeekNumberFromThisMonth';
// Defines
const MyScheduleCalendarContext = createContext();

// React hook
const useMyScheduleCalendar = () => {

  const context = useContext(MyScheduleCalendarContext)
  if (!context) {
    throw new Error('Can not run without "MyScheduleCalendarProvider"');
  }
  return context;
}

const MyScheduleCalendarProvider = (props) => {

  // state
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false)
  const [ScheduleCalendarInfo, setScheduleCalendarInfo] = useState([])
  const [weekFrom, setWeekFrom] = useState(moment().weekday(0).format('L'))
  const [weekTo, setWeekTo] = useState(moment().endOf('week').format('L'))
  const [currentTable, setCurrentTable] = useState('')
  const [currentDocumentId, setCurrentDocumentId] = useState('')
  const [modalInfo, setModalInfo] = useState([])
  const history = useHistory();
  // Helpers
  
  const fetchAgentCalendar = async (weekFromIn, weekToIn) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      weekFrom:weekFromIn || weekFrom,
      weekTo:weekToIn || weekTo,
      weekInMonthNumber:GetWeekNumberFromThisMonth(new Date(weekFromIn), new Date(weekToIn))
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'ScheduleCalendar',
      funcName: 'fetchAgentCalendar',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setScheduleCalendarInfo(data.data)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const switchCalendarBackWeek = () => {
    const weekFromUp = moment(weekFrom).subtract(1, 'week').day(0).format('L')
    const weekToUp = moment(weekFrom).subtract(1, 'week').day(6).format('L')
    setWeekFrom(weekFromUp)
    setWeekTo(weekToUp)
    fetchAgentCalendar(weekFromUp, weekToUp)
  }

  const switchCalendarForwardWeek = () => {
    const weekFromUp = moment(weekFrom).add(1, 'week').day(0).format('L')
    const weekToUp = moment(weekFrom).add(1, 'week').day(6).format('L')
    setWeekFrom(weekFromUp)
    setWeekTo(weekToUp)
    fetchAgentCalendar(weekFromUp, weekToUp)
  }

  const fetchInfoModal = async (tableName,documentId) => {
    const agentId = FetchHistoryAgentId(history)
    setCurrentTable(tableName)
    setCurrentDocumentId(documentId)
    let val = {
      agentId: agentId,
      tableName:tableName,
      documentId:documentId,
    }
    setModalLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'ScheduleCalendar',
      funcName: 'FetchInfoModal',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setModalInfo(data.data)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setModalLoading(false);
    }
  }

  const fetchInfoModal2 = (data) => {
    setModalInfo(data)
  }

  const editDocument = async (data,documentId, tableName) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      tableName:tableName,
      documentId:documentId,
      data:data
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'ScheduleCalendar',
      funcName: 'EditDocumentTable',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('עודכן בהצלחה',data.message)
        fetchAgentCalendar(weekFrom,weekTo)
      } else {
        onErrorAlert('שגיאה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (tableName, documentId,status) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      tableName:tableName,
      documentId:documentId,
      status:status,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'ScheduleCalendar',
      funcName: 'UpdateCompletedDocument',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('עודכן בהצלחה',data.message)
        fetchAgentCalendar(weekFrom,weekTo)
      } else {
        onErrorAlert('שגיאה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const unpublushMission = async (tableName, documentId) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      tableName:tableName,
      documentId:documentId,
      status:status,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'ScheduleCalendar',
      funcName: 'unpublishMission',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('עודכן בהצלחה',data.message)
        fetchAgentCalendar(weekFrom,weekTo)
      } else {
        onErrorAlert('שגיאה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }



  // Exports
  const MyScheduleCalendarMethods = {
    fetchAgentCalendar,
    switchCalendarBackWeek,
    switchCalendarForwardWeek,
    fetchInfoModal,
    fetchInfoModal2,
    editDocument,
    updateStatus,
    unpublushMission
  };
  const value = {
    MyScheduleCalendarMethods,
    loading,
    ScheduleCalendarInfo,
    weekFrom,
    weekTo,
    modalInfo,
    modalLoading
  };

  return (<MyScheduleCalendarContext.Provider value={value} {...props} />);
};

export { useMyScheduleCalendar, MyScheduleCalendarProvider };