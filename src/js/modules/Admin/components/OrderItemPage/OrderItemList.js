import React, { useEffect } from 'react';
import OrderItemHead from './OrderItemHead';
import OrderItemProd from './OrderItemProd';
import useAdminOrders from '../../store/OrdersStore';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const OrderItemList = () => {
    const {items,getItems} = useAdminOrders()
    const {id} = useParams()
    useEffect(() => {
        if(id){
            getItems(id)
        }
    },[])
    return (
        <table className="lines-sub-cont">
            <tbody>
            <OrderItemHead/>
            {items?.map((element, index) => {
                return(
                    <OrderItemProd element={element} index={index} />
                );
            })}
            </tbody>
        </table>
    );
};

export default OrderItemList;