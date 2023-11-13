import React from 'react';
import useAdminOrders from '../../store/OrdersStore';
import Pagination from '../../../../SharedComponents/Pagination';
import OrderItem from './OrderItem';
import moment from 'moment';
const OrdersList = () => {
    const {
        orders,
        showCalendar,
        totalPages,
        page,
        lastPage,
        nextPage,
        previousPage,
        setPage
    } = useAdminOrders()

    return (
        <div className={showCalendar ? 'doc-container active card' : 'doc-container card'}>
        {/* {!this.state.searchActive ?
          <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
        :null} */}
        {/* {this.state.searchActive && this.state.tempItems.length == 0 ? <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1> : null} */}
            {orders.length > 0 && 
            <div id = "lines-main-cont" className="lines-main-cont">
                <table className="lines-sub-cont">
                    <tbody>
                        <tr className="heading">
                            <th className="col-cont sticky-col">
                            <p>לקוח</p>
                            </th>
                            <th className="col-cont">
                            <p></p>
                            </th>
                            <th className="col-cont">
                            <p>#</p>
                            </th>
                            <th className="col-cont">
                            <p>סוג</p>
                            </th>
                        
                            <th className="col-cont">
                            <p>תאריך</p>
                            </th>
                            <th className="col-cont">
                            <p>סה״כ</p>
                            </th>
                            <th className="col-cont">
                            <p>אסמכתא</p>
                            </th>
                            <th className="col-cont">
                            <p>סטאטוס</p>
                            </th>
                        </tr>
                        {orders?.map((element, index) => {
                            return(
                                <OrderItem element={element} index={index} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            }
            <Pagination totalPages={totalPages} page={page} lastPage={lastPage} nextPage={nextPage} previousPage={previousPage}/>
        </div>
    );
};

export default OrdersList;