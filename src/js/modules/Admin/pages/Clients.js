import React, { useEffect } from 'react';
import ClientsFilter from '../components/Clients/ClientsFilter';
import ClientsList from '../components/Clients/ClientsList';
import useClientStore from '../store/ClientsStore';
import Pagination from '../../../SharedComponents/Pagination';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Clients = () => {
    const {
        getClients,
        totalPages,
        page,
        lastPage,
        nextPage,
        previousPage,
        setPage
    } = useClientStore()
    const history = useHistory()
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(history.location.search);
        const page = urlSearchParams.get('page');
        const updatedUrl = '?' + urlSearchParams.toString();
        setPage(page)
        history.push(history.location.pathname + updatedUrl);
        getClients()
    },[history.location.search])
    return (
        <div className="page-container clients">
            <div className="wrapper container">
                <h1 className="title">לקוחות</h1>
                <ClientsFilter/>
                <ClientsList/>
                <Pagination totalPages={totalPages} page={page} lastPage={lastPage} nextPage={nextPage} previousPage={previousPage}/>
            </div>
        </div>
    );
};

export default Clients;