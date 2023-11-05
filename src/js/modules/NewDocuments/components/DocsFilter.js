import React from 'react';
import useDocuments from '../store/DocumentsStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import useCart from '../../Cart/store/CartStore';

const DocsFilter = () => {
    const {
        dateFrom,
        dateTo,
        setType,
        handleSearchClick,
        searchValue,
        setSearchValue,
        downloadDocument,
        handleRestoreCartFunction,
        getItems,
        documentTypes,
        selectedDocument,
        setSelectedDocument
    } = useDocuments()
    const {location,push} = useHistory()
    const isDocumentPage = location.pathname.includes('documentPage')
    const isKartessetPage = location.pathname.includes('kartessetPage')
    const isHistoryPage = location.pathname.includes('historyPage')
    const isDocumentItemPage = location.pathname.includes('documentItemPage')
    const isHistoryItemPage = location.pathname.includes('historyItemPage')
    const {id} = useParams()
    const {cart, setCart} = useCart()

    const handleResoreCart = async () => {
        const res = await handleRestoreCartFunction(id)
        setCart(res)
        push('/cart')
    }

    const handleDocument = async (file) => {
        const link = await downloadDocument(file, id)
        // console.log('link',link.url)
        window.open(link.url, '_blank');
    }

    return (
    <div className="for-calendar flex-container card">
        <div className="flex-container right-side-header col-lg-7">
            <div className={"flex-container col-lg-12 docs-agent-header-cls"}>
                {(!isHistoryItemPage && !isDocumentItemPage)  &&
                <>
                    <div className="cal-cls  right-side-comp">
                        <div className="open-calendar">
                            <p className="inline-cls">מתאריך</p>
                            <button className="inline-cls" onClick={() => setType('from')}>
                            <span className="material-symbols-outlined googleHoverIcon" style={{fontSize:'30px'}}>calendar_month</span>
                            {moment(dateFrom).format('DD/MM/YYYY')}
                            </button>
                        </div>
                    </div>
                    <div className="cal-cls  right-side-comp">
                        <div className="open-calendar">
                            <p className="inline-cls">לתאריך</p>
                            <button className="inline-cls" onClick={() => setType('to')}>
                                <span className="material-symbols-outlined googleHoverIcon" style={{fontSize:'30px'}}>calendar_month</span>
                                {moment(dateTo).format('DD/MM/YYYY')}
                            </button>
                        </div>
                    </div>
                    <div onClick={()=> getItems()} className="cal-cls searchBtn-cont">
                        <p>חפש</p>
                    </div>
                </>
                }
            </div>
        </div>
        <div className="flex-container left-side-header col-lg-5">
            <div className="userInfo-cls flex-container">
                <div className="left-side-comp header-btn-cont col-pay">
                    {/* {!isKartessetPage && !isDocumentPage &&
                        <>
                        <div className="clientsAgentSearchWrapper">
                            <div className="search-cont">
                                <input
                                onChange={(e) => setSearchValue(e.target.value)}
                                value={searchValue}
                                type="text"
                                placeholder="חיפוש..."
                                />
                                {searchValue ?
                                <span className="material-symbols-outlined search-img"
                                    onClick={() => setSearchValue('')}>close</span>
                                :
                                <span className="material-symbols-outlined search-img">search</span>
                                }
                            </div>
                        </div>
                        </>
                    } */}
                    {isDocumentPage &&
                    <div className="select-cont">
                        <select value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)}>
                        {documentTypes?.map((ele, ind) => {
                            return (
                            <option key={ind} id={parseInt(ind)} value={ele.value}>{ele.label}</option>
                            )
                        })}
                        </select>
                    </div>
                    }
                    {(isDocumentItemPage || isHistoryItemPage) &&
                        <>
                        <div className="select-cont first">
                            <div className="file-cont" onClick={()=>handleDocument('pdf')}>
                                <span className="material-symbols-outlined">picture_as_pdf</span>
                            </div>
                        </div>
                        {/* <div className="select-cont second">
                            <div className="file-cont" onClick={()=> downloadDocument('xls',id)}>
                                <span className="material-symbols-outlined">description</span>
                            </div>
                        </div> */}
                        <div className="select-cont">
                            <div className="file-cont" onClick={()=> handleResoreCart()}>
                                <span className="material-symbols-outlined">cloud_sync</span>
                            </div>
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