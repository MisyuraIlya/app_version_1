import React from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import useClientStore from '../../../Admin/store/ClientsStore';

const ClientsInfo = ({active, setActive}) => {
    const {selectedClient} = useClientStore()
    console.log('selectedClient',selectedClient)
    return (
        <ModalWrapper active={active} setActive={setActive}>
            <div className="user-info-wrapp">
                <div className="popup-contant">
                    <div className="popup-contant-header flex-container">
                        <div className="col-lg-10" >
                            <p>שינוי סיסמה</p>
                        </div>
                        <div className="close-popup col-lg-2">
                            <div className="close-popup-cont" onClick={() => this.setState({userInfo: null})}>
                            <img src={globalFileServer + 'icons/close_purple.svg'} />
                            </div>
                        </div>
                    </div>
                    <div className="all-row-cont">
                        <div className="flex-container row-cont">
                        <div className="col-lg-4 title">
                            <p>שם הלקוח</p>
                            </div>
                            <div className="col-lg-8 value">
                            <p>{selectedClient?.name}</p>
                            </div>
                        </div>
                        {selectedClient?.Hp ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>ח.פ / ע.מ</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient?.hp}</p>
                            </div>
                            </div>
                        :null}
                        {selectedClient?.exId ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>מס' לקוח</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient?.exId}</p>
                            </div>
                            </div>
                        :null}
                        {selectedClient?.mail ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>שם משתמש</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient.mail}</p>
                            </div>
                            </div>
                        :null}
                        {/* {selectedClient.Password ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>סיסמה</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient.Password}</p>
                            </div>
                            </div>
                        :null} */}
                        {/* {selectedClient.Tel ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>טלפון</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient.Tel}</p>
                            </div>
                            </div>
                        :null} */}
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ClientsInfo;