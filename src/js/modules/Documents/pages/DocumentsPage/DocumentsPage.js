import React, { useEffect } from 'react';
import DocsHead from '../../components/DocsHead/DocsHead';
import DocsFilter from '../../components/DocsFilter/DocsFilter';
import DocsList from '../../components/DocsList/DocsList';
import useDocuments from '../../store/DocumentsStore';
import Calendar from 'react-calendar';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { decodeUri } from '../../helpers/decodeUri';
import moment from 'moment-timezone';
import { updateUriFilter,updateUriNew } from '../../helpers/updateUri';
import { UrlHandler } from '../../helpers/UrlHandler';
import Pagination from '../../../../SharedComponents/Pagination';

const DocumentsModule = () => {
    const {
        dateFrom,
        dateTo, 
        setDateFrom, 
        setDateTo, 
        search,
        documentType,  
        setSearch, 
        setDocumentType, 
        GetDocuments, 
        loading, 
        handleChangeCalendar, 
        type, 
        choosedDate, 
        showCalendar,
        setShowCalendar,
        setFilter,
        setPag,
        totalPages,
        page,
        lastPage,
        nextPage,
        previousPage,
        setPage
    } = useDocuments()
    const history = useHistory()
    const handleCalendar = (date) => {
        const urlSearchParams = new URLSearchParams(history.location.search);
        if(type === 'from') {
            urlSearchParams.set('from',moment(date).format('YYYY-MM-DD'));
        } else {
            urlSearchParams.set('to',moment(date).format('YYYY-MM-DD'));
        }
        const updatedUrl = '?' + urlSearchParams.toString();
        history.push(history.location.pathname + updatedUrl)
        setShowCalendar(false)
    }

    useEffect(() => {
        // console.log('asdasd',!UrlHandler.isThereParams(history.location.search))
        if(!UrlHandler.isThereParams(history.location.search)) {
            let from= moment().subtract(1, 'months').format('YYYY-MM-DD');
            let to =  moment().format('YYYY-MM-DD');
            let search= '';
            let documentType = 'all'
            let page = 1
            const url = UrlHandler.createUrl(history.location.search,page,from,to,documentType,search)
            history.push(history.location.pathname + url);
            setDateFrom(from)
            setDateTo(to)
            setSearch(search)
            setDocumentType(documentType)
            setPage(page)
        } else {
            const {page, from, to, documentType, search} = UrlHandler.getUrlParams(history.location.search)
            const url = UrlHandler.createUrl(history.location.search,page,from,to,documentType,search)
            history.push(history.location.pathname + url);
            setDateFrom(from)
            setDateTo(to)
            setSearch(search)
            setDocumentType(documentType)
            setPage(page)
        }
        GetDocuments()

    },[history.location.search])

    return (
 		<div className="page-container history admin-history docs ">
            <div className="docs-sub-cont">
                {loading ?
                    <div className="spinner-wrapper">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                : null}
                <Calendar
                    onChange={(date) => handleCalendar(date)}
                    value={new Date(choosedDate)}
                    calendarType="Hebrew"
                    locale="he-IL"
                    className={showCalendar ? 'active' : null}
                />
                <DocsHead/>
                <DocsFilter/>
                <DocsList/>
                <Pagination totalPages={totalPages} page={page} lastPage={lastPage} nextPage={nextPage} previousPage={previousPage}/>
            </div>
        </div>
    );
};

export default DocumentsModule;