import React from 'react';
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper';
import useClientStore from '../../../Admin/store/ClientsStore';
import moment from 'moment';
const ClientsInfo = ({active, setActive}) => {
    const {selectedClient} = useClientStore()
    return (
        <ModalWrapper active={active} setActive={setActive} height={40} width={40}>
            <div className="user-info-wrapp">
                <div className="popup-contant">
                    <div className="popup-contant-header flex-container">
                        <div className="col-lg-10" >
                            <p>מידע לקוח</p>
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
                        {selectedClient?.exId ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>מס' לקוח</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient?.extId}</p>
                            </div>
                            </div>
                        :null}
                        {selectedClient?.email ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>שם משתמש</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient?.email}</p>
                            </div>
                            </div>
                        :null}
                        {selectedClient?.phone ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>טלפון</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{selectedClient?.phone}</p>
                            </div>
                            </div>
                        :null}
                        {selectedClient?.updatedAt ?
                            <div className="flex-container row-cont">
                            <div className="col-lg-4 title">
                                <p>עודכן לאחרונה</p>
                            </div>
                            <div className="col-lg-8 value">
                                <p>{moment(selectedClient?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</p>
                            </div>
                            </div>
                        :null}
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ClientsInfo;