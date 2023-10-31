import React from 'react';
import useDocuments from '../store/DocumentsStore';
import { numberWithCommas } from '../../Documents/helpers/numberWithCommas';
const HistoryCardList = () => {
    const {showCalendar,orderItems,searchItemsValue} = useDocuments()
    return (
        <div className={showCalendar ? 'doc-container active card' : 'doc-container card'}>
            <div id='lines-main-cont' className="lines-main-cont">
                <table className="lines-sub-cont">
                    <tbody>
                        <tr className="heading">
                            <th className="col-cont sticky-col">
                            <p>מוצר</p>
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
                        {orderItems?.map((element, index) => {
                        let docAllowed = true;
                        if( ( docAllowed == true) ){
                            if(searchItemsValue && !element.title.includes(searchItemsValue)) return
                            return(
                                <tr key={index} className={"item"} id={'docRow_' + index}>
                                    <th className="col-cont sticky-col">
                                    <p className='AccountKey  no-margin'>{'#' + element?.product?.sku}</p>
                                    <p className='AccountName  no-margin'>{element?.product?.title}</p>
                                    </th>
                                    <th className="col-cont">
                                    <p>{element?.quantity}</p>
                                    </th>
                                    <th className="col-cont">
                                    <p>{numberWithCommas(parseFloat(element?.singlePrice).toFixed(1))}</p>
                                    </th>
                                    <th className="col-cont">
                                    <p>{parseFloat(element?.discount).toFixed(1)  + '%'}</p>
                                    </th>
                                    <th className="col-cont">
                                    <p>{numberWithCommas(parseFloat(element?.total).toFixed(1)) }</p>
                                    </th>
                                </tr>
                            );
                        }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryCardList;