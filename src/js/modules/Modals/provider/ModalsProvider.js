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
import AuthPopUp from '../components/AuthPopUp/AuthPopUp';
import MobileSideBar from '../components/MobileSideBar/MobileSideBar';
import SideBar from '../components/SideBar/SideBar';

// ADMIN SIDEBARS
import AdminRightSideBar from '../adminComponents/AdminRightSideBar/AdminRightSideBar';
import ClientRightSideBar from '../adminComponents/ClientRightSideBar/ClientRightSideBar';
import Gallery from '../adminComponents/Galerry/Gallery';
import ClientsInfo from '../adminComponents/ClientsInfo/ClientsInfo';
import ClientOptions from '../adminComponents/ClientOptions/ClientOptions';
// Local

// Defines
const NotificationModalontext = createContext();

// React hook
const useModals = () => {
  const context = useContext(NotificationModalontext)
  if (!context) {
    throw new Error('Can not run without "ModalsProvider"');
  }
  return context;
}

const ModalsProvider = ({children}) => {
  const {setSelectedProd, loading, clearSubProducts} = useSelectedProduct()
  const [stockNotify, setStockNotify] = useState(false)
  const [addToCartNotify, setAddToCartNotify] = useState(false)
  const [openCartSettings, setOpenCartSettings] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(false)
  const [activeTablePopUp, setActiveTablePopUp] = useState(false)
  const [openPopUpPay, setOpenPopUpPay] = useState(false)
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false)
  const [openSideBar, setOpenSideBar] = useState(false)
  const [adminRightSideBar, setAdminRightSideBar] = useState(false)
  const [clientRightSideBar, setClientRightSideBar] = useState(false)

  //ADMINS 
  const [gallery, setGallery] = useState(false)
  const [clientsInfo, setClientsInfo] = useState(false) 
  const [clientOptions, setClientOptions] = useState(false)

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
    setOpenPopUpPay,
    openMobileSideBar,
    setOpenMobileSideBar,
    openSideBar,
    setOpenSideBar,
    openAuthModal,
    setOpenAuthModal,
    adminRightSideBar,
    setAdminRightSideBar,
    gallery,
    setGallery,
    clientsInfo,
    setClientsInfo,
    clientOptions,
    setClientOptions
  };

  return (
    <NotificationModalontext.Provider value={value} >
      <div style={{position:'fixed', width:'100%', zIndex:99}}>
        <StockNotify/>
        <AddToCartNotify/>   
      </div>
  
        <OrderSettings active={openCartSettings} setActive={setOpenCartSettings}/>     
        <ProductPopUp active={selectedProduct} setActive={onCloseSelectedProduct}/>
        {openAuthModal &&
          <AuthPopUp active={openAuthModal} setActive={setOpenAuthModal}/> 
        }
        <MobileSideBar active={openMobileSideBar} setActive={setOpenMobileSideBar}/>
        <SideBar active={openSideBar} setActive={setOpenSideBar}/>
        {/* {!loading && */}
          <TablePopUp active={activeTablePopUp} setActive={setActiveTablePopUp}/>       
        {/* } */}
        {openPopUpPay &&
          <PayPopUp active={openPopUpPay} setActive={setOpenPopUpPay} />
        }

        {/* SIDEBARDS */}
        <AdminRightSideBar active={adminRightSideBar} setActive={setAdminRightSideBar}/>
        <ClientRightSideBar active={clientRightSideBar} setActive={setClientRightSideBar} />

        {/* ADMINS */}
        <Gallery active={gallery} setActive={setGallery}/>
        <ClientsInfo active={clientsInfo} setActive={setClientsInfo}/>
        <ClientOptions active={clientOptions} setActive={setClientOptions}/>
        {children}
    </NotificationModalontext.Provider>
    );
};

export { useModals, ModalsProvider };