import React from 'react';
import useAdminOrders from '../store/OrdersStore';
import BreadCrumbs from '../components/BreadCrumbs';
import OrderItemList from '../components/OrderItemPage/OrderItemList';

const OrderItemPage = () => {
    const {loading, showCalendar} = useAdminOrders()
    return (
        <div className="page-container history admin-history docs agent-docsItems-approvePage">
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
                <BreadCrumbs/>
                <div className={showCalendar ? 'doc-container active card' : 'doc-container card'}>
                    <div id='lines-main-cont' className="lines-main-cont">
                        <OrderItemList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItemPage;