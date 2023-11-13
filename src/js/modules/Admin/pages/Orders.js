import React, { useEffect } from 'react';
import BreadCrumbs from '../../../components/tools/BreadCrumbs';
import OrdersFilter from '../components/Orders/OrdersFilter';
import OrdersList from '../components/Orders/OrdersList';
import useAdminOrders from '../store/OrdersStore';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Orders = () => {
    const {
        loading,
        getOrders,
        choosedDate,
        showCalendar,
        setShowCalendar,
        type,
        setDateFrom,
        setDateTo,
        setSearch,
        setDocumentType,
        setPage
    } = useAdminOrders()
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
        const urlSearchParams = new URLSearchParams(history.location.search);
        const page = urlSearchParams.get('page');
        const from = urlSearchParams.get('from');
        const to = urlSearchParams.get('to');
        setPage(page)
        setDateFrom(from)
        setDateTo(to)
        getOrders()
    },[history.location.search])
    return (
        <div className="page-container history admin-history docs agent-docs agent-docs-approvePage karteset gviya">
            <div className="docs-sub-cont">
                {/* <BreadCrumbs/> */}
                {loading && 
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            }
                <Calendar
                    onChange={(date) => handleCalendar(date)}
                    value={new Date(choosedDate)}
                    calendarType="Hebrew"
                    locale="he-IL"
                    className={showCalendar ? 'active' : null}
                />
                <OrdersFilter/>
                <OrdersList/>
            </div>
        </div>
    );
};

export default Orders;