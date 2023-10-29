import React, { useEffect } from 'react';
import useDocuments from '../../store/DocumentsStore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { kartessetUri } from '../../helpers/updateUri';
import Calendar from 'react-calendar';
import HistoryList from '../../components/HistoryList/HistoryList';
import DocsFilter from '../../components/DocsFilter/DocsFilter';
import DocsHead from '../../components/DocsHead/DocsHead';
import { decodeUri } from '../../helpers/decodeUri';
import moment from 'moment-timezone';
import { kartessetUriNew } from '../../helpers/updateUri';
const HistoryPage = () => {
    const {loading, choosedDate, showCalendar, type, handleChangeCalendar, setDateFrom, setDateTo, getHistory} = useDocuments()
    const history = useHistory()

    const handleCalendar = (date) => {
        handleChangeCalendar(date)
        let typeUrl = type == 'from' ? 'fromDate' : 'toDate'
        let decode = decodeUri(history.location.search)
        let res = kartessetUri(moment(date).format('DD/MM/YYYY'),typeUrl,decode)
        history.push(history.location.pathname + res);
    }

    useEffect(() => {

        const {filter,fromDate,toDate} = decodeUri(history.location.search)

        if(!filter && !fromDate &&!toDate)
        {
            let fromDateNew = moment().subtract(6, 'months').format('DD/MM/YYYY');
            let toDateNew =  moment().format('DD/MM/YYYY');
            const query = kartessetUriNew(fromDateNew, toDateNew)
            history.push(history.location.pathname + query);
            setDateFrom(new Date( moment().subtract(1, 'months').format('YYYY-MM-DD')))
            setDateTo(new Date( moment(toDateNew,'DD/MM/YYYY').format('YYYY-MM-DD')))
            getHistory()
        } else {
            setDateFrom(new Date( moment(fromDate,'DD/MM/YYYY').format('YYYY-MM-DD')))
            setDateTo(new Date( moment(toDate,'DD/MM/YYYY').format('YYYY-MM-DD')))
            getHistory()
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
                <HistoryList/>
            </div>
        </div>
    );
};

export default HistoryPage;