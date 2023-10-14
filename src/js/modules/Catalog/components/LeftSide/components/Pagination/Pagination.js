import React from 'react';
import useCatalog from '../../../../store/CatalogStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Pagination = () => {
  const { paginateObj } = useCatalog();
  const { lang, lvl1, lvl2, lvl3, page, parent, type } = useParams();
  const { location } = useHistory();
  let title1 = 'מציג ';
  let title2 = ' מתוך ';
  let title3 = ' מוצרים';

  return (
    <div className="paginate-main-cont">
      <div className="paginate-sub-cont flex-container">
        <div className="paginate-controller-main col-lg-8">
          <div className="paginate-controller-sub">
            <div className="pageBtn glbBtn">
              <NavLink to={`/category/${type}/${lvl1}/${lvl2}/${lvl3}/1/0/${lang}${location.search}`}>
                <p>{"<<"}</p>
              </NavLink>
            </div>
            <div className="pageBtn glbBtn">
              {paginateObj?.PreviosPage ? (
                <NavLink to={`/category/${type}/${lvl1}/${lvl2}/${lvl3}/${paginateObj?.PreviosPage}/0/${lang}${location.search}`}>
                  <p>{"<"}</p>
                </NavLink>
              ) : (
                <p>{"<"}</p>
              )}
            </div>
            {paginateObj?.pageViewArr?.map((item, index) => (
              <div key={index} className="pageBtn">
                <NavLink to={`/category/${type}/${lvl1}/${lvl2}/${lvl3}/${item}/0/${lang}${location.search}`}>
                  <p className={item === paginateObj?.PageChosen ? 'active' : null}>{item}</p>
                </NavLink>
              </div>
            ))}
            <div className="pageBtn glbBtn">
              {paginateObj?.NextPage ? (
                <NavLink to={`/category/${type}/${lvl1}/${lvl2}/${lvl3}/${paginateObj?.NextPage}/0/${lang}${location.search}`}>
                  <p>{">"}</p>
                </NavLink>
              ) : (
                <p>{">"}</p>
              )}
            </div>
            <div className="pageBtn glbBtn">
              <NavLink to={`/category/${type}/${lvl1}/${lvl2}/${lvl3}/${paginateObj?.LastPage}/0/${lang}${location.search}`}>
                <p>{">>"}</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="paginate-info-main col-lg-4">
          {paginateObj?.ProdTtlCount &&
            <p>{`${title1}${paginateObj?.prodRange}${title2}${paginateObj?.ProdTtlCount}${title3}`}</p>        
          }
        </div>
      </div>
    </div>
  );
};

export default Pagination;
