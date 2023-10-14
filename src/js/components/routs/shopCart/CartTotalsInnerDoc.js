import React, { useEffect, useState } from 'react';

const CartTotalsInnerDoc = ({items, orderObject, props}) => {

    let discountPerc = parseFloat(orderObject.Discount);
    let initPrice = parseFloat(orderObject.PriceNoVat) * 100 / (100-discountPerc);

    let vatSum = parseFloat(orderObject.Total) - parseFloat(orderObject.PriceNoVat);


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
                            <p>{parseFloat(orderObject.Discount).toFixed(1)+ '%'}</p>
                            </div>
                        </li>
                    
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>אחרי הנחה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(orderObject.PriceNoVat).toFixed(1)) +  ' ₪'}</p>
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
                            <p>{numberWithCommas(parseFloat(orderObject.Total).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartTotalsInnerDoc;