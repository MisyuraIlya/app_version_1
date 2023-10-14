import React, {useEffect} from 'react';
import useDocuments from '../../store/DocumentsStore';
import { useDebounce } from 'use-debounce';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateUriFilter } from '../../helpers/updateUri';
import { decodeUri } from '../../helpers/decodeUri';
const DocsFilter = () => {
    const {
        dateFrom,
        dateTo, 
        setShowCalendar, 
        search, 
        setSearch, 
        documentTypes, 
        documentType, 
        setDocumentType, 
        GetDocuments, 
        urlNav,
        downloadKartesset,
        getCartesset
    } = useDocuments()

    const [valueDebounced] = useDebounce(search, 2000);
    const {page} = useParams()
    const history = useHistory()
    const isKartessetPage = history.location.pathname?.includes('docsKarteset')
    
    const handleDocument = (event) => {
        setDocumentType(event.target.value)
        let decode = decodeUri(history.location.search)
        let res = updateUriFilter(event.target.value,'filter',decode)
        GetDocuments(page)
        history.push(urlNav +1+'/'+'he' + res);
    }

    const handleCloseSearch = () => {
        GetDocuments(1)
        setSearch('')
        let decode = decodeUri(history.location.search)
        let res = updateUriFilter('','search',decode)
        history.push(history.location.pathname + res);
    }

    const handleSearchClick = () => {
        if(isKartessetPage) {
            getCartesset()
        } else {
            GetDocuments(1)
            history.push(urlNav +1+'/'+'he' + history.location.search)
        }

    }

    //TODO SEARCH NOT RELEVANT IN PRIORITY
    // useEffect(() => {
    //     if(valueDebounced){
    //         setSearch(valueDebounced)
    //         let decode = decodeUri(history.location.search)
    //         let res = updateUriFilter(valueDebounced,'search',decode)
    //         history.push(urlNav +1+'/'+'he' + res);
    //         GetDocuments(page)
    //     }
    // },[valueDebounced])


    return (
        <div className="for-calendar flex-container card">
            <div className="flex-container right-side-header col-lg-7">
                <div className={"flex-container col-lg-12 docs-agent-header-cls"}>
                    <div className="cal-cls  right-side-comp">
                        <div className="open-calendar">
                            <p className="inline-cls">מתאריך</p>
                            <button className="inline-cls" onClick={() => setShowCalendar('from')}>
                            <img src={globalFileServer + 'icons/calendar.svg'} alt=""/>
                            <span>{dateFrom.toLocaleDateString('he-IL').split('.').join('/')}</span>
                            </button>
                        </div>
                    </div>
                    <div className="cal-cls  right-side-comp">
                        <div className="open-calendar">
                            <p className="inline-cls">לתאריך</p>
                            <button className="inline-cls" onClick={() => setShowCalendar('to')}>
                                <img src={globalFileServer + 'icons/calendar.svg'} alt=""/>
                                <span>{dateTo.toLocaleDateString('he-IL').split('.').join('/')}</span>
                            </button>
                        </div>
                    </div>
                    <div onClick={()=> handleSearchClick()} className="cal-cls searchBtn-cont">
                    <p>חפש</p>
                    </div>
                </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
                <div className="userInfo-cls flex-container">
                    <div className="left-side-comp header-btn-cont col-pay">
                        {isKartessetPage ?
                            <>
                            <div className="select-cont first">
                                <div className="file-cont" onClick={() => downloadKartesset('pdf')}>
                                <span className="material-symbols-outlined">picture_as_pdf</span>
                                </div>
                            </div>
                            <div className="select-cont second">
                                <div className="file-cont" onClick={() => downloadKartesset('xls')}>
                                <img src={globalFileServer + 'icons/excel.svg'} />
                                </div>
                            </div>
                            </>
                        :
                            <>
                            
                            {/* <div className="clientsAgentSearchWrapper">
                                <div className="search-cont">
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    type="text"
                                    placeholder="חיפוש..."
                                />
                                {search ?
                                    <span className="material-symbols-outlined search-img"
                                    onClick={() => handleCloseSearch()}>close</span>
                                    :
                                    <span className="material-symbols-outlined search-img">search</span>
                                }
                                </div>
                            </div> */}
                            <div className="select-cont">
                                <select value={documentType} onChange={(e) => handleDocument(e)}>
                                {documentTypes?.map((ele, ind) => {
                                    return (
                                    <option key={ind} id={parseInt(ind)} value={ele}>{ele}</option>
                                    )
                                })}
                                </select>
                            </div>
                            </>
                        }

                    </div>

                </div>
            </div>
        </div>
    );
};

export default DocsFilter;