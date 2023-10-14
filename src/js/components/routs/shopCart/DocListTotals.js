import React, { useEffect, useState } from 'react';

const CartTotalsSuperAgent = ({items, props}) => {


    let ttlSum = 0;
    items.map((element, index) => {
        ttlSum += parseFloat(element.TFtal);
    });

    
    


    const numberWithCommas = (x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const selectInput = (id) =>{
        setTimeout(() => {
            $(id).select();
        }, 300);
    }
    return (
        <div className='cartTotalSuperAgent-main-cls'>
            <div className='cartTotalSuperAgent-sub-cls'>
                <div className='cartTotalSuperAgent-subber-cls'>
                    <h1>סיכום עמוד</h1>
                    <ul>
                        <li className='row-cls flex-container top-border'>
                            <div className='title-cls col-lg-8'>
                            <p>סה״כ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p className='left'>{numberWithCommas(ttlSum.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartTotalsSuperAgent;