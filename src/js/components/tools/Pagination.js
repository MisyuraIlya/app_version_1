import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

const MyPagination = params => {
  let title1 = 'מציג ';
  let title2 = ' מתוך ';
  let title3 = ' מוצרים';
  if(params.lang!='he'){
    title1 = 'Showing ';
    title2 = ' Of ';
    title3 = ' Products';
  }

	return(
    <div className="paginate-main-cont">
      <div className="paginate-sub-cont flex-container">
        <div className="paginate-controller-main col-lg-8">
          <div className="paginate-controller-sub">
            <div className="pageBtn glbBtn">
              <NavLink to={'/category/' + params.headProps.type + '/' + params.headProps.lvl1+'/'+params.headProps.lvl2+'/'+params.headProps.lvl3+'/1/0/'+params.headProps.lang + params.headLocation}>
                <p>{"<<"}</p>
              </NavLink>

            </div>
            <div className="pageBtn glbBtn">
              {params.paginateObj.PreviosPage ?
                <NavLink to={'/category/' + params.headProps.type + '/' + params.headProps.lvl1+'/'+params.headProps.lvl2+'/'+params.headProps.lvl3+'/'+ params.paginateObj.PreviosPage +'/0/'+params.headProps.lang + params.headLocation}>
                  <p>{"<"}</p>
                </NavLink>
              :
                <p>{"<"}</p>
              }
            </div>
            {params.paginateObj.pageViewArr ? params.paginateObj.pageViewArr.map((item, index) => {
              return(
                <div key={index} className="pageBtn">
                  <NavLink to={'/category/' + params.headProps.type + '/' + params.headProps.lvl1+'/'+params.headProps.lvl2+'/'+params.headProps.lvl3+'/'+item+'/0/'+params.headProps.lang + params.headLocation}>
                    <p className={item == params.paginateObj.PageChosen ? 'active' : null}>{item}</p>
                  </NavLink>
                </div>
              )
            }):null}
            <div className="pageBtn glbBtn">
              {params.paginateObj.NextPage ?
                <NavLink to={'/category/' + params.headProps.type + '/' + params.headProps.lvl1+'/'+params.headProps.lvl2+'/'+params.headProps.lvl3+'/'+ params.paginateObj.NextPage +'/0/'+params.headProps.lang + params.headLocation}>
                  <p>{">"}</p>
                </NavLink>
              :
                <p>{">"}</p>
              }


            </div>
            <div className="pageBtn glbBtn">
              <NavLink to={'/category/' + params.headProps.type + '/' + params.headProps.lvl1+'/'+params.headProps.lvl2+'/'+params.headProps.lvl3+'/'+(params.paginateObj.LastPage)+'/0/'+params.headProps.lang + params.headLocation}>
                <p>{">>"}</p>
              </NavLink>
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

export default MyPagination;
