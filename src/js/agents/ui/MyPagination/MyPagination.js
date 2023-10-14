import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { fetchUrlWithourPagination } from '../../services/localstorage/pagination.service';
const Pagination = params => {

  const history = useHistory()
  const data = fetchUrlWithourPagination(history)
  let title1 = 'מציג ';
  let title2 = ' מתוך ';
  let title3 = ' מוצרים';

  if(params.lang!='he'){
    title1 = 'Showing ';
    title2 = ' Of ';
    title3 = ' Products';
  }

  console.log('params',params)
	return(
    <div className="paginate-main-cont">
      <div className="paginate-sub-cont flex-container">

        <div className="paginate-controller-main col-lg-8">
          <div className="paginate-controller-sub">
            <div className="pageBtn glbBtn">
              <div onClick={() => history.push(fetchUrlWithourPagination(history) +1)}>
                <p>{"<<"}</p>
              </div>

            </div>

            <div className="pageBtn glbBtn">
              {params.paginateObj.PreviosPage ?
                <div onClick={() => history.push(fetchUrlWithourPagination(history) + params.paginateObj.PreviosPage)}>
                  <p>{"<"}</p>
                </div>
              :
                <p>{"<"}</p>
              }
            </div>

            {params.paginateObj.pageViewArr ? params.paginateObj.pageViewArr.map((item, index) => {
              return(
                <div key={index} className="pageBtn" onClick={() => history.push(fetchUrlWithourPagination(history) + item)}>
                  <div to={'/category/' + params.headProps.type + '/' + params.headProps.lvl1+'/'+params.headProps.lvl2+'/'+params.headProps.lvl3+'/'+item+'/0/'+params.headProps.lang + params.headLocation}>
                    <p className={item == params.paginateObj.PageChosen ? 'active' : null}>{item}</p>
                  </div>
                </div>
              )
            }):null}
            <div className="pageBtn glbBtn">
              {params.paginateObj.NextPage ?
                <div onClick={() => history.push(fetchUrlWithourPagination(history) + params.paginateObj.NextPage)}>
                  <p>{">"}</p>
                </div>
              :
                <p>{">"}</p>
              }


            </div>
            <div className="pageBtn glbBtn">
              <div onClick={() => history.push(fetchUrlWithourPagination(history) + params.paginateObj.LastPage)}>
                <p>{">>"}</p>
              </div>
            </div>

          </div>
        </div>
        <div className="paginate-info-main col-lg-4">
          <p>{title1 + params.paginateObj.prodRange + title2 + params.paginateObj.ProdTtlCount+ title3}</p>
        </div>
      </div>
    </div>
	)
}

export default Pagination;
