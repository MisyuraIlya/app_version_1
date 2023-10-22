import React from 'react';

const OrderItemHead = () => {
    return (
    <tr className="heading">
                       
        <th className="col-cont sticky-col">
        <p>מוצר</p>
        </th>
        <th className="col-cont sticky-col">
        <p>יח' במארז</p>
        </th>
        <th className="col-cont">
        <p>מחיר מומלץ</p>
        </th>
       
        <th className="col-cont">
        <p>כמות</p>
        </th>
        <th className="col-cont">
        <p>מחיר יח'</p>
        </th>
        <th className="col-cont">
        <p>הנחה</p>
        </th>
        <th className="col-cont">
        <p>סה״כ</p>
        </th>
    </tr>
    );
};

export default OrderItemHead;