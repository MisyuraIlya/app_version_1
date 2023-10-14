// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import SweetAlert from 'sweetalert2';
// Local
import { ajax } from '../utils/MyAjax';
import {onSuccessAlert} from '../utils/sweetAlert'
// Defines
const MyModalContext = createContext();

// React hook
const useMyModal = () => {
  const context = useContext(MyModalContext)
  if (!context) {
    throw new Error('Can not run without "MyModalProvider"');
  }
  return context;
}

const MyModalProvider = (props) => {
  // state
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  // Helpers



  // Exports
  const MyModalMethods = {
    setModalOpen
  };
  const value = {
    MyModalMethods,
    loading,
    modalOpen
  };

  return (<MyModalContext.Provider value={value} {...props} />);
};

export { useMyModal, MyModalProvider };