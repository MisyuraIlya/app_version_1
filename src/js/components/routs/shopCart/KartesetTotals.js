import React, { useEffect, useState } from 'react';

const CartTotalsSuperAgent = ({items, props, dataObject}) => {


    let dept = dataObject.glbDeptTtL;
    let credit = dataObject.glbCredTtl;
    let ttl = dataObject.glbFinalttl;


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
                    <h1>סיכום</h1>
                    <ul>
                       
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>חובה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p className='left'>{numberWithCommas(dept.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                      
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>זכות</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p className='left'>{numberWithCommas(credit.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                       
                        <li className='row-cls flex-container top-border'>
                            <div className='title-cls col-lg-8'>
                                <p>הפרש</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p className='left'>{ttl.toFixed(1)  + ' ₪'}</p>
                            </div>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartTotalsSuperAgent;