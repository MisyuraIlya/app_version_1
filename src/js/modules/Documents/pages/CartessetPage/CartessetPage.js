import React, {useEffect} from 'react';
import Calendar from 'react-calendar';
import DocsHead from '../../components/DocsHead/DocsHead';
import DocsFilter from '../../components/DocsFilter/DocsFilter';
import DocsList from '../../components/DocsList/DocsList';
import KartessetList from '../../components/KartessetList/KartessetList';
import useDocuments from '../../store/DocumentsStore';
import { decodeUri } from '../../helpers/decodeUri';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment-timezone';
import { kartessetUri, kartessetUriNew } from '../../helpers/updateUri';
import PdfViwer from '../../components/PdfViwer/PdfViwer';
const CartessetPage = () => {
    const {loading, choosedDate, showCalendar, type, handleChangeCalendar, setDateFrom, setDateTo, getCartesset, pdfViewer} = useDocuments()
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
            getCartesset()
        } else {
            setDateFrom(new Date( moment(fromDate,'DD/MM/YYYY').format('YYYY-MM-DD')))
            setDateTo(new Date( moment(toDate,'DD/MM/YYYY').format('YYYY-MM-DD')))
            getCartesset()
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
                {pdfViewer &&
                    <PdfViwer/>            
                }
                <Calendar
                    onChange={(date) => handleCalendar(date)}
                    value={choosedDate}
                    calendarType="Hebrew"
                    locale="he-IL"
                    className={showCalendar ? 'active' : null}
                />
                <DocsHead/>
                <DocsFilter/>
                <KartessetList/>
            </div>
        </div>
    );
};

export default CartessetPage;