// Global
import React,{ createContext, useState, useContext, useEffect } from 'react';
import StockNotify from '../components/StockNotify/StockNotify';
import AddToCart from '../../Cart/components/AddToCart/AddToCart';
import AddToCartNotify from '../components/AddToCartNotify/AddToCartNotify';
import OrderSettings from '../components/OrderSettings/OrderSettings';
import ProductPopUp from '../components/ProductPopUp/ProductPopUp';
import useSelectedProduct from '../store/SelectedProductStore';
import TablePopUp from '../components/TablePopUp/TablePopUp';
import PayPopUp from '../components/PayPopUp/PayPopUp';
// Local

// Defines
const NotificationModalontext = createContext();

// React hook
const useNotificationModal = () => {
  const context = useContext(NotificationModalontext)
  if (!context) {
    throw new Error('Can not run without "NotificationModalProvider"');
  }
  return context;
}

const NotificationModalProvider = ({children}) => {
  const {setSelectedProd, loading, clearSubProducts} = useSelectedProduct()
  const [stockNotify, setStockNotify] = useState(false)
  const [addToCartNotify, setAddToCartNotify] = useState(false)
  const [openCartSettings, setOpenCartSettings] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(false)
  const [activeTablePopUp, setActiveTablePopUp] = useState(false)
  const [openPopUpPay, setOpenPopUpPay] = useState(false)

  const openStockNotify = () => {
    setStockNotify(true)
    setTimeout(() => {
      setStockNotify(false)
    }, 3000);
  }

  const openAddToCartTotify = () => {
    setAddToCartNotify(true)
    setTimeout(() => {
      setAddToCartNotify(false)
    }, 3000);
  }

  const selectProduct = (product) => {
    setSelectedProd(product)
    setSelectedProduct(true)
  }

  const onCloseSelectedProduct = (bool) => {
    setSelectedProduct(bool)
    if(!bool){
      clearSubProducts()
    }
  }

  const value = {
    stockNotify,
    addToCartNotify,
    openStockNotify,
    openAddToCartTotify,
    openCartSettings,
    setOpenCartSettings,
    selectedProduct,
    setSelectedProduct,
    selectProduct,
    setActiveTablePopUp,
    openPopUpPay,
    setOpenPopUpPay
  };

  return (
    <NotificationModalontext.Provider value={value} >
      <div style={{position:'fixed', width:'100%', zIndex:99}}>
        <StockNotify/>
        <AddToCartNotify/>   
      </div>
  
        <OrderSettings active={openCartSettings} setActive={setOpenCartSettings}/>     
        <ProductPopUp active={selectedProduct} setActive={onCloseSelectedProduct}/> 
        {/* {!loading && */}
          <TablePopUp active={activeTablePopUp} setActive={setActiveTablePopUp}/>       
        {/* } */}
        {openPopUpPay &&
          <PayPopUp active={openPopUpPay} setActive={setOpenPopUpPay} />
        }
        {children}
    </NotificationModalontext.Provider>
    );
};

export { useNotificationModal, NotificationModalProvider };