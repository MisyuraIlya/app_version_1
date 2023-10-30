import React from 'react';
import useDocuments from '../store/DocumentsStore';
import moment from 'moment';

const HistoryList = () => {

    const {
        items,
        showCalendar,
        searchActive,
        loading,
    } = useDocuments()
    return (
        <div className={showCalendar ? 'doc-container active card' : 'doc-container card'}>
        {!showCalendar && items.length === 0?
          <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
        :null}
        {(items.length === 0 && !loading)?
          <h1 className="no-products">לא נמצאו מסמכים בטווח תאריכים</h1>
        :null}
        {searchActive && searchActive.length == 0 ? <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1> : null}
        {items.length > 0 ? 
          <div id='lines-main-cont' className="lines-main-cont">
            <table className="lines-sub-cont">
             <tbody>
                <tr className="heading">
                    <th className="col-cont sticky-col">
                      <p>#</p>
                    </th>
                    <th className="col-cont sticky-col">
                      <p>לקוח</p>
                    </th>
                    <th className="col-cont">
                      <p>סוג</p>
                    </th>
                    <th className="col-cont">
                      <p>ת.ערך</p>
                    </th>
                    <th className="col-cont">
                      <p>ת.תשלום</p>
                    </th>
                  
                    <th className="col-cont">
                      <p>סה״כ</p>
                    </th>
                    <th className="col-cont">
                      <p>סטאטוס</p>
                    </th>
                </tr>
                {items?.map((element, index) => {
                  let docAllowed = true;
                  if( ( docAllowed == true) ){
                    return(
                        <tr key={index} className={"item"} id={'docRow_' + element.id} onClick={() => push(`/docsHistoryItems/${element.id}`)}>
                            <th className="col-cont sticky-col">
                              <p className='AccountKey no-margin'>{'#' + element?.id}</p>
                            </th>
                            <th className="col-cont sticky-col">
                              <p className='AccountKey no-margin'>{'#' + element?.user?.extId}</p>
                              <p className='AccountName  no-margin'>{element?.user?.name}</p>      
                            </th>
                            <th className="col-cont">
                              <p>{element?.documentType}</p>
                            </th>
                            <th className="col-cont">
                              <p>{moment(element?.createdAt).format('DD-MM-YYYY')}</p>
                            </th>
                            <th className="col-cont">
                              <p>{moment(element?.updatedAt).format('DD-MM-YYYY')}</p>
                            </th>
                            <th className="col-cont">
                              <p>{parseFloat(element?.total).toFixed(1)}</p>
                            </th>
                            <th className="col-cont col-approved">
                              {element?.orderStatus ?
                                <p className='Active'>{element?.orderStatus ? element?.orderStatus : 'אושר'}</p>
                                :
                                <p className='NotActive'>ממתין</p>
                              }
                            </th>
                        </tr>
                    );
                  }
                })}

              </tbody>
            </table>
          </div>
        :null}
        </div>
    );
};

export default HistoryList;