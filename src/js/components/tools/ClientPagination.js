import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

const Pagination = params => {
  let title1 = 'מציג ';
  let title2 = ' מתוך ';
  let title3 = ' לקוחות';
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
              <NavLink to={params.urlNav + '1/' + params.headProps.lang + params.headLocation}>
                <p>{"<<"}</p>
              </NavLink>

            </div>
            <div className="pageBtn glbBtn">
              {params.paginateObj.PreviosPage ?
                <NavLink to={params.urlNav +  params.paginateObj.PreviosPage +'/'+params.headProps.lang + params.headLocation}>
                  <p>{"<"}</p>
                </NavLink>
              :
                <p>{"<"}</p>
              }
            </div>
            {params.paginateObj.pageViewArr ? params.paginateObj.pageViewArr.map((item, index) => {
              return(
                <div key={index} className="pageBtn">
                  <NavLink to={params.urlNav +item+'/'+params.headProps.lang + params.headLocation}>
                    <p className={item == params.paginateObj.PageChosen ? 'active' : null}>{item}</p>
                  </NavLink>
                </div>
              )
            }):null}
            <div className="pageBtn glbBtn">
              {params.paginateObj.NextPage ?
                <NavLink to={params.urlNav + params.paginateObj.NextPage +'/'+params.headProps.lang + params.headLocation}>
                  <p>{">"}</p>
                </NavLink>
              :
                <p>{">"}</p>
              }


            </div>
            <div className="pageBtn glbBtn">
              <NavLink to={params.urlNav +(params.paginateObj.LastPage)+'/'+params.headProps.lang + params.headLocation}>
                <p>{">>"}</p>
              </NavLink>
            </div>

          </div>
        </div>
        <div className="paginate-info-main col-lg-4">
          <p>{title1 + params.paginateObj.prodRange + title2 + params.paginateObj.ProdTtlCount}</p>
        </div>
      </div>
    </div>
	)
}

export default Pagination;
