// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

// Local
import {onSuccessAlert,onErrorAlert} from '../utils/sweetAlert'
import { ajax } from '../utils/MyAjax';
import { FetchHistoryAgentId } from '../utils/helpers/FetchHistoryAgentId';
import { fetchPage } from '../services/localstorage/pagination.service';
// Defines
const MyQuestionDocsStoreContext = createContext();

// React hook
const useMyQuestionDocsStore = () => {
  const context = useContext(MyQuestionDocsStoreContext)
  if (!context) {
    throw new Error('Can not run without "MyQuestionDocsStoreProvider"');
  }
  return context;
}

const MyQuestionDocsStoreProvider = (props) => {
  // state
  const [loading, setLoading] = useState(false);
  const [questionsBank, setQuestionsBank] = useState([])
  const [agentForms, setAgentForms] = useState([])
  const [agetFormDetailed, setAgentFormDetailed] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchValueDebounced] = useDebounce(searchValue, 1000);

  const [paginationObject, setPaginationObject] = useState([])
  const [year, setYear] = useState('2023')
  const [month, setMonth] = useState('2')
  const [questionTypes, setQuestionTypes] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);

  const history = useHistory()

  //services
  const detailedEdit = (id,data) => {
    const newItems = agetFormDetailed.map((item) => {
      if (item.Id === id) {
        return { ...item, Response: data };
      } else {
        return item;
      }
    });
    setAgentFormDetailed(newItems);
  }

  // Helpers servers

  const CreateQuestion = async (question) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      question:question,
      type:selectedOption,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'createQuestionBank',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('הוקם',data.message)
        fetchQuestionsBank()
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const fetchQuestionsBank = async () => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'readQuestionBank',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setQuestionsBank(data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const createAgentFrom = async (clientName) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      formData:questionsBank,
      clientName:clientName
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'createAgentForm',
      val:val
    };

    try {
      const data = await ajax(valAjax);

      if(data.status == 'success'){
        onSuccessAlert('הוקם',data.message)
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const fetchAgentDetailedForm = async (id) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      formId:id,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'fetchOneFormDetailed',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setAgentFormDetailed(data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const editAgentsForm = async () => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      formData:agetFormDetailed,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'EditFormsDetailed',
      val:val
    };
    console.log(val)
    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        onSuccessAlert('הוקם',data.message)
        
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const fetchAgentsForms = async () => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      page: fetchPage(history),
      year: year,
      month: month
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'fetchAllForms',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setPaginationObject(data.data.paginateObj)
        setAgentForms(data.data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const filterQuestionAgentForms = async () => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      month: month,
      year: year,
      formData:agetFormDetailed,
      page:1
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'filterByDates',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        setPaginationObject(data.data.paginateObj)
        setAgentForms(data.data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const filterByClientNameAndExtId= async () => {

    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
      month: month,
      year: year,
      page: 1,
      searchValue: searchValueDebounced,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'filterByClientsName',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
        console.log(data.data)
        setPaginationObject(data.data.paginateObj)
        setAgentForms(data.data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }

  }

  const fetchQuestionTypesBank = async () => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId,
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'fetchQuestionTypesBank',
      val:val
    };

    try {
      const data = await ajax(valAjax);
      if(data.status == 'success'){
          console.log(data.data)
          setQuestionTypes(data.data)
      } 
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  const completeQuestionFrom = async (formData) => {
    const agentId = FetchHistoryAgentId(history)
    let val = {
      agentId: agentId ,
      clientId: '21161',
      formData:formData
    }
    setLoading(true);
    const valAjax = {
      point: 'agents_app/index',
      classPoint:'QuestionForm',
      funcName: 'completedFormCreation',
      val:val
    };

    try {
      const data = await ajax(valAjax);

      if(data.status == 'success'){
        onSuccessAlert('הוקם',data.message)
      } else {
        onErrorAlert('תקלה',data.message)
      }
    } catch (error) {
      console.error('[state/Machines/loadMachines] Failed to load Machiness', { error });
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if(!searchValueDebounced){
  //     fetchAgentsForms(1)
  //   }
  // },[searchValueDebounced])

  // Exports
  const MyQuestionDocsStoreMethods = {
    CreateQuestion,
    fetchQuestionsBank,
    createAgentFrom,
    fetchAgentsForms,
    fetchAgentDetailedForm,
    setAgentFormDetailed,
    detailedEdit,
    editAgentsForm,
    filterQuestionAgentForms,
    setSearchValue,
    filterByClientNameAndExtId,
    setYear,
    setMonth,
    fetchQuestionTypesBank,
    setSelectedOption,
    completeQuestionFrom
  };
  const value = {
    MyQuestionDocsStoreMethods,
    loading,
    questionsBank,
    agentForms,
    agetFormDetailed,
    searchValue,
    paginationObject,
    year,
    month,
    searchValueDebounced,
    questionTypes,
    selectedOption

  };

  return (<MyQuestionDocsStoreContext.Provider value={value} {...props} />);
};

export { useMyQuestionDocsStore, MyQuestionDocsStoreProvider };