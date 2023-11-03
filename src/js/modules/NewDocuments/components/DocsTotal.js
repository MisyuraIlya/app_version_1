import React from 'react';
import useDocuments from '../store/DocumentsStore';
import { numberWithCommas } from '../../../helpers/numberWithCommas';
const DocsTotal = () => {
    const {totalTax,totalPriceAfterTax,totalAfterDiscount,totalPrecent,itemsLength} = useDocuments()
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
                            <p>{itemsLength}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>סה״כ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(totalPriceAfterTax).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>הנחה כללית</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{parseFloat(totalPrecent).toFixed(1)+ '%'}</p>
                            </div>
                        </li>
                    
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>אחרי הנחה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(totalAfterDiscount).toFixed(1)) +  ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>מע״מ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(totalTax).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>לתשלום</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(totalPriceAfterTax).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DocsTotal;