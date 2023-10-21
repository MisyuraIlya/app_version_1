import React, { useEffect } from 'react';
import BreadCrumbs from '../../../components/tools/BreadCrumbs';
import OrdersFilter from '../components/Orders/OrdersFilter';
import OrdersList from '../components/Orders/OrdersList';
import useAdminOrders from '../store/OrdersStore';

const Orders = () => {
    const {getOrders} = useAdminOrders()

    useEffect(() => {
        getOrders()
    },[])
    return (
        <div className="page-container history admin-history docs agent-docs agent-docs-approvePage karteset gviya">
            <div className="docs-sub-cont">
                {/* <BreadCrumbs/> */}
                {/* <Calendar
                    onChange={(date) => this.calendarChange(date)}
                    value={this.state.date}
                    calendarType="Hebrew"
                    locale="he-IL"
                    className={this.state.showCalendar ? 'active' : null}
                /> */}
                <OrdersFilter/>
                <OrdersList/>
            </div>
        </div>
    );
};

export default Orders;