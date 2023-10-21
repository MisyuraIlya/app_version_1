import React from 'react';
import Head from './Head';
import useClientStore from '../../store/ClientsStore';
import ClientItem from './ClientItem';

const ClientsList = () => {
    const {clients} = useClientStore()
    return (
        <div className="clients-wrapper">
            <Head/>
            {clients?.map((element, index) => {
                return (
                    <ClientItem element={element} index={index}/>
                );
            })}
        </div>
    );
};

export default ClientsList;