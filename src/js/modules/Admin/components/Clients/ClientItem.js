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
                <div className="col-lg-1 info-col">
                    <div className="wrapp info info-icon">
                        <img className="info-icon-img" onClick={() => {setClientsInfo(true);setSelectedClient(element)}} src={globalFileServer + 'icons/info.svg'} />
                    </div>
                </div>
                <div className="col-lg-1 more">
                    <div className="wrapp" >
                        <img src={globalFileServer + 'icons/more.svg'} onClick={() => {setClientOptions(true);setSelectedClient(element)}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientItem;