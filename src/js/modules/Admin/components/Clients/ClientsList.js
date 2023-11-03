import React from 'react';
import Head from './Head';
import useClientStore from '../../store/ClientsStore';
import ClientItem from './ClientItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClientsList = () => {
    const {clients, loading} = useClientStore()
    console.log('loading',loading)
    return (
        <div className="clients-wrapper">
            <Head/>
            {loading &&
            <Skeleton style={{height:'30px', margin:'5px 0px'}} count={24}/>
            }
            {clients?.map((element, index) => {
                return (
                    <ClientItem element={element} index={index}/>
                );
            })}
        </div>
    );
};

export default ClientsList;