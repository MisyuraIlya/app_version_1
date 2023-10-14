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

const DocumentsModule = () => {
    const {GetDocuments, loading, handleChangeCalendar, type, choosedDate, showCalendar,setSearch,setFilter,setDateFrom,setDateTo,setPage,setDocumentType} = useDocuments()
    const {page, lang} = useParams()
    const history = useHistory()

    const handleCalendar = (date) => {
        handleChangeCalendar(date)
        let typeUrl = type == 'from' ? 'fromDate' : 'toDate'
        let decode = decodeUri(history.location.search)
        let res = updateUriFilter(moment(date).format('DD/MM/YYYY'),typeUrl,decode)
        history.push(history.location.pathname + res);
    }

    useEffect(() => {

        const {filter,fromDate,search,toDate} = decodeUri(history.location.search)

        if(!filter && !fromDate && !search &&!toDate)
        {
            let fromDateNew = moment().subtract(1, 'months').format('DD/MM/YYYY');
            let toDateNew =  moment().format('DD/MM/YYYY');
            let searchNew = '';
            let filterNw = 'הכל'
            const query = updateUriNew(fromDateNew,  toDateNew, searchNew, filterNw)
            history.push(history.location.pathname + query);
            setPage(page)
            setSearch(searchNew)
            setFilter(filterNw)
            setDocumentType(filterNw)
            setDateFrom(new Date( moment().subtract(1, 'months').format('YYYY-MM-DD')))
            setDateTo(new Date( moment(toDateNew,'DD/MM/YYYY').format('YYYY-MM-DD')))
            GetDocuments(page)
        } else {
            setPage(page)
            setSearch(search)
            setFilter(filter)
            setDocumentType(filter)
            setDateFrom(new Date( moment(fromDate,'DD/MM/YYYY').format('YYYY-MM-DD')))
            setDateTo(new Date( moment(toDate,'DD/MM/YYYY').format('YYYY-MM-DD')))
            GetDocuments(page)
        }



    },[history.location.pathname,history.location.search])
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
                    value={choosedDate}
                    calendarType="Hebrew"
                    locale="he-IL"
                    className={showCalendar ? 'active' : null}
                />
                <DocsHead/>
                <DocsFilter/>
                <DocsList/>
            </div>
        </div>
    );
};

export default DocumentsModule;