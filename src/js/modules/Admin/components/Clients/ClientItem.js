import React from 'react';
import { useModals } from '../../../Modals/provider/ModalsProvider';
import useClientStore from '../../store/ClientsStore';

const ClientItem = ({element, index}) => {
    const {clientsInfo,setClientsInfo,setClientOptions} = useModals()
    const {setSelectedClient} = useClientStore()
    return (
        <div className="client-item" key={index}>
            <div className="flex-container user-info">
                <div className="col-lg-2 num-col">
                    <div className="wrapp">
                        <p>{element?.extId}</p>
                    </div>
                </div>
                <div className="col-lg-4 name-col">
                    <div className="wrapp">
                        <p>{element.name}</p>
                    </div>
                </div>
                <div className="col-lg-2 status">
                    <div className="wrapp">
                    {!element.isRegistered && !element.isBlocked? <p className='NotActive'>לא פעיל</p>:null}
                    {element.isBlocked ? <p className='Blocked'>חסום</p>:null}
                    {element.isRegistered && !element.isBlocked ? <p className='Active'>פעיל</p>:null}
                    </div>
                </div>
                <div className="col-lg-1 info-col MyCenetred"> 
                    <div className="wrapp" style={{cursor:'pointer'}}>
                        <span className="material-symbols-outlined MyCenetred googleIconHover" onClick={() => {setClientsInfo(true);setSelectedClient(element)}} src={globalFileServer + 'icons/info.svg'}>info</span>
                    </div>
                </div>
                <div className="col-lg-1 MyCenetred">
                    <div className="wrapp" style={{cursor:'pointer'}}>
                        <span className="material-symbols-outlined googleIconHover" onClick={() => {setClientOptions(true);setSelectedClient(element)}}>settings</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientItem;