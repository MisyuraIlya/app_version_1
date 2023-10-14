import React, { useEffect, useState } from 'react';

const CartTotalsDoc = ({items, orderObject, props}) => {

    let discountPerc = parseFloat(orderObject.DiscountPrc);
    let initPrice = parseFloat(orderObject.TFtalVat) * 100 / (100-discountPerc);
    let vatSum = parseFloat(orderObject.TFtal) - parseFloat(orderObject.TFtalVat);

    const numberWithCommas = (x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className='cartTotalSuperAgent-main-cls'>
            <div className='cartTotalSuperAgent-sub-cls'>
                <div className='cartTotalSuperAgent-subber-cls'>
                    <h1>סיכום</h1>
                    <ul>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>כמות שורות</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{items ? items.length : '0'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>סה״כ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(initPrice).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>הנחה כללית</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{parseFloat(orderObject.DiscountPrc).toFixed(1)+ '%'}</p>
                            </div>
                        </li>
                    
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>אחרי הנחה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(orderObject.TFtalVat).toFixed(1)) +  ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>מע״מ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(vatSum).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>לתשלום</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(orderObject.TFtal).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartTotalsDoc;