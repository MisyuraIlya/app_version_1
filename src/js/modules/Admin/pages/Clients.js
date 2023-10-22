import React, { useEffect } from 'react';
import ClientsFilter from '../components/Clients/ClientsFilter';
import ClientsList from '../components/Clients/ClientsList';
import useClientStore from '../store/ClientsStore';
import Pagination from '../../../SharedComponents/Pagination';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UrlHandler } from '../../Documents/helpers/UrlHandler';

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
        if(!UrlHandler.isThereParamsOnlyPage(history.location.search)) {
            let page = 1
            const url = UrlHandler.createUrl(history.location.search,page)
            history.push(history.location.pathname + url);
            setPage(page)
        } else {
            const {page} = UrlHandler.getUrlParams(history.location.search)
            const url = UrlHandler.createUrl(history.location.search,page)
            history.push(history.location.pathname + url);
            setPage(page)
        }
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