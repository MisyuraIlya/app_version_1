import React from 'react';
import useAdminOrders from '../../store/OrdersStore';
import moment from 'moment';

const OrdersFilter = () => {
    const {
        serach,
        setSearch,      
        dateFrom,
        dateTo, 
        setType,
    } = useAdminOrders()
    console.log('vdateFrom',dateFrom)
    return (
        <div className="for-calendar flex-container card">
            <div className="flex-container right-side-header col-lg-7">
                <div className={"flex-container col-lg-12 docs-agent-header-cls"}>
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
                    <div onClick={()=> handleSearchClick()}  className="cal-cls searchBtn-cont">
                        <p>חפש</p>
                    </div>
                </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
                {/* <div className="userInfo-cls flex-container">
                    <div className="left-side-comp header-btn-cont col-pay">
                        <div className="clientsAgentSearchWrapper">
                            <div className="search-cont">
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={serach}
                                    type="text"
                                    placeholder="חיפוש לקוח..."
                                />
                                {serach ?
                                    <span className="material-symbols-outlined search-img"
                                    onClick={() => setSearch('')}>close</span>
                                    :
                                    <span className="material-symbols-outlined search-img">search</span>
                                }
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default OrdersFilter;