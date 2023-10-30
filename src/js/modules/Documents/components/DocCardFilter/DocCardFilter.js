import React from 'react';
import useDocuments from '../../store/DocumentsStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const DocCardFilter = () => {
  const {DownloadXls, createNewCart, searchItemsValue, setSearchItemsValue} = useDocuments()
  const {id} = useParams()
  const history = useHistory()
  
  const handleRestoreCart = async () => {
    const res = await createNewCart(id)
    localStorage.setItem('products', JSON.stringify(res.data.products));
    history.push('/cart/he')
    location.reload() 
  }
  
  return (
        <>
            <div className="for-calendar flex-container card">
              <div className="flex-container right-side-header col-lg-7">
               
              </div>
              <div className="flex-container left-side-header col-lg-5">
              <div className="userInfo-cls flex-container">
                <div className="left-side-comp header-btn-cont col-pay">
                  
                    
                  <div className="clientsAgentSearchWrapper">
                    <div className="search-cont">
                      <input
                        onChange={(e) => setSearchItemsValue(e.target.value)}
                        value={searchItemsValue}
                        type="text"
                        placeholder="חיפוש..."
                      />
                      {searchItemsValue ?
                        <span className="material-symbols-outlined search-img"
                          onClick={() => setSearchItemsValue('')}>close</span>
                        :
                        <span className="material-symbols-outlined search-img">search</span>
                      }
                    </div>
                  </div>
                    <div className="select-cont first">
                      <div className="file-cont" onClick={()=>DownloadXls(id, 'pdf')}>
                        <span className="material-symbols-outlined">picture_as_pdf</span>
                      </div>
                    </div>
                    <div className="select-cont second">
                      <div className="file-cont" onClick={()=> DownloadXls(id, 'xls')}>
                        <img src={globalFileServer + 'icons/excel.svg'} />
                      </div>
                    </div>
                    <div className="select-cont">
                      <div className="file-cont" onClick={()=> handleRestoreCart()}>
                        <span className="material-symbols-outlined">cloud_sync</span>
                      </div>
                    </div>
                </div>

              </div>
               
              </div>
            </div>
        </>
    );
};

export default DocCardFilter;