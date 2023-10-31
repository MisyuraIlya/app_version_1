import React from 'react';
import useDocuments from '../store/DocumentsStore';
import moment from 'moment';
const KartessetLst = () => {
    const {items,loading} = useDocuments()
    return (
        <div id='lines-main-cont' className="lines-main-cont">
            <table className="lines-sub-cont">
            <tbody>
                <tr className="heading">
                    <th className="col-cont sticky-col">
                    <p>כותרת</p>
                    </th>
                    <th className="col-cont">
                    <p>תנועה</p>
                    </th>
                    <th className="col-cont">
                    <p>מנה</p>
                    </th>
                    <th className="col-cont">
                    <p>ס״ת</p>
                    </th>
                    <th className="col-cont">
                    <p>ח-ן נגדי</p>
                    </th>
                    <th className="col-cont">
                    <p>ת.אסמכתא</p>
                    </th>
                    <th className="col-cont">
                    <p>ת.ערך</p>
                    </th>
                    <th className="col-cont">
                    <p>אסמכתא</p>
                    </th>
                    <th className="col-cont">
                    <p>אסמכתא 2</p>
                    </th>
                    <th className="col-cont">
                    <p>פרטים</p>
                    </th>
                    <th className="col-cont">
                    <p>חובה/זכות</p>
                    </th>
                    <th className="col-cont">
                    <p>יתרה</p>
                    </th>
                </tr>
                <div className='myCenter'>
                {(items?.length === 0 && !loading)?
                <h1 className="no-products">לא נמצאו מסמכי כרטסת בטווח תאריכים</h1>
                :null}
                </div>
                {items?.map((element, index) => {
                if(element.Show){
                    return(
                        
                        <tr key={index} className={"item"} id={'docRow_' + element?.Id} >
                            <th className="col-cont sticky-col">
                                <p className='AccountKey no-margin'>{ element?.TransID}</p>
                            </th>
                            <th className="col-cont">
                                <p> {element?.ID}</p>
                            </th>
                            <th className="col-cont">
                                <p>{element?.BatchNo}</p>
                            </th>
                            <th className="col-cont">
                                <p>{element?.TransType}</p>
                            </th>
                            
                            <th className="col-cont">
                                <p>{element?.TransCredID}</p>
                            </th>
                            <th className="col-cont">
                                <p>{moment(element?.ValueDate).format('DD-MM-YYYY')}</p>
                            </th>
                            <th className="col-cont">
                                <p>{moment(element?.DueDate).format('DD-MM-YYYY')}</p>
                            </th>
                            <th className="col-cont">
                                <p>{element?.Referance}</p>
                            </th>
                            <th className="col-cont">
                                <p>{element?.Ref2}</p>
                            </th>
                            <th className="col-cont desc">
                                <p>{element?.Description}</p>
                            </th>
                            <th className="col-cont">
                                <p>{element?.suF ? parseFloat(element.suF).toFixed(2) : ''}</p>
                            </th>
                            <th className="col-cont">
                                <p>{element?.Balance ? element.Balance.toFixed(2) : ''}</p>
                            </th>
                        </tr>
                    );
                }
                })}
            </tbody>
            </table>
        </div>
    );
};

export default KartessetLst;