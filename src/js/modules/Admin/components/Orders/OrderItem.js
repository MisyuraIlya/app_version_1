import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
const OrderItem = ({element,index}) => {
    const history = useHistory()
    return (
        <tr key={index} className={"item"} id={'docRow_' + element?.id} onClick={()=> history.push(`/admin/approveDocItems/${element.id}`)}>
            <th className="col-cont sticky-col">
                <p className='AccountKey no-margin'>{'#' + element?.orderExtId}</p>
                <p className='AccountName  no-margin'>{element?.user?.name}</p>                      
            </th>
            <th className="col-cont">
                {!element?.user ? 
                <span className="material-symbols-outlined search-img">{'support_agent'}</span>
                :
                <span className="material-symbols-outlined search-img">{'person'}</span>
                }
            </th>
            <th className="col-cont">
                <p>{element?.id}</p>
            </th>
            <th className="col-cont">
                <p>{'הזמנה'}</p>
            </th>
            <th className="col-cont">
                <p>{moment(element?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
            </th>

            <th className="col-cont">
                <p>{parseFloat(element?.total).toFixed(1)}</p>
            </th>
            <th className="col-cont">
                <p className='docId  no-margin'>{element.orderExtId ? '#' + element.orderExtId : '-'}</p>
                <p className='docNumber  no-margin'>{element?.orderStatus ? '#' + element?.orderStatus : ''}</p>
            </th>
            <th className="col-cont col-approved">
                <p className={''}>{element?.orderStatus}</p>
            </th>

        </tr>
    );
};

export default OrderItem;