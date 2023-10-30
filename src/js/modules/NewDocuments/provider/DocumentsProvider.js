// Global
import React,{ createContext, useContext, useEffect } from 'react';

// Local
import { useHistory } from 'react-router-dom';
import useDocuments from '../store/DocumentsStore';
import moment from 'moment';
const DocumentsContext = createContext();

// React hook
const useDocumentsProvider = () => {
  const context = useContext(DocumentsContext)
  if (!context) {
    throw new Error('Can not run without "DocumentsProvider"');
  }
  return context;
}

const DocumentsProvider = (props) => {
    const {
        setShowCalendar,
        type,
        setPage,
        setDateFrom,
        setDateTo,
        getItems,
        setDocumentType,
    } = useDocuments()

    const {location,push} = useHistory()
    const isDocumentPage = location.pathname.includes('documentPage')
    const isKartessetPage = location.pathname.includes('kartessetPage')
    const isHistoryPage = location.pathname.includes('historyPage')

    const handleCalendar = (date) => {
        const urlSearchParams = new URLSearchParams(location.search);
        urlSearchParams.get('page');

        if(type === 'from') {
            setDateFrom(date)
        urlSearchParams.set('from',moment(date).format('YYYY-MM-DD'));
        urlSearchParams.get('to');
        }
        if(type === 'to') {
            setDateTo(date)
        urlSearchParams.set('to',moment(date).format('YYYY-MM-DD'));
        urlSearchParams.get('from');
        }
        const updatedUrl = '?' + urlSearchParams.toString();
        push(updatedUrl)
        setShowCalendar(false)
    }

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const page = urlSearchParams.get('page');
        const from = urlSearchParams.get('from');
        const to = urlSearchParams.get('to');
        setPage(page)
        setDateFrom(from)
        setDateTo(to)
        if(isDocumentPage) {
          setDocumentType('document')
        }
        if(isKartessetPage){
          setDocumentType('kartesset')
        }
        if(isHistoryPage){
          setDocumentType('history')
        }
        getItems()

    },[location.search,location.pathname])

  const value = {
    handleCalendar
  };

  return (<DocumentsContext.Provider value={value} {...props} />);
};

export { useDocumentsProvider, DocumentsProvider };