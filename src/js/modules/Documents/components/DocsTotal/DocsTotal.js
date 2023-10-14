import React from 'react';
import { numberWithCommas } from '../../helpers/numberWithCommas';
import useDocuments from '../../store/DocumentsStore';
const DocsTotal = () => {
    const {documentsItemsLength,documentsItemsSum,documentsItemsDiscount,documentsItemsPriceAfterDiscount,documentsItemsTax,documentsItemsTotalAfter} = useDocuments()
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
                            <p>{documentsItemsLength}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>סה״כ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(documentsItemsSum).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>הנחה כללית</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{parseFloat(documentsItemsDiscount).toFixed(1)+ '%'}</p>
                            </div>
                        </li>
                    
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>אחרי הנחה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(documentsItemsPriceAfterDiscount).toFixed(1)) +  ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>מע״מ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(documentsItemsTax).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>לתשלום</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(parseFloat(documentsItemsTotalAfter).toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DocsTotal;