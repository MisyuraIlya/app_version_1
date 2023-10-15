import React from 'react';
import useCatalog from '../../../../store/CatalogStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Pagination = () => {
  const { currentPage, nextPage, previous, totalPages, totalItems, toShow, goToPage, lastPage } = useCatalog();
  const { lang, lvl1, lvl2, lvl3, page, parent, type } = useParams();
  const { pathname,location,push } = useHistory();
  let title1 = 'מציג ';
  let title2 = ' מתוך ';
  let title3 = ' מוצרים';
  console.log('currentPage',currentPage)
  const getPageNumbers = () => {
    const halfRange = Math.floor(7 / 2);
    const start = Math.max(1, currentPage - halfRange);
    const end = Math.min(totalPages, start + 7 - 1);

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleGoToPage = (page) => {
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('page', page);
    const updatedUrl = '?' + urlSearchParams.toString();
    goToPage(updatedUrl)
    push(location.pathname+updatedUrl)

  }

  return (
    <div className="paginate-main-cont">
      <div className="paginate-sub-cont flex-container">
        <div className="paginate-controller-main col-lg-8">
          <div className="paginate-controller-sub">
            <div className="pageBtn glbBtn">
                <p onClick={() => handleGoToPage(1)}  >{"<<"}</p>
            </div>
            <div className="pageBtn glbBtn" >
              {previous ? (
                  <p onClick={() => handleGoToPage(previous)}>{"<"}</p>
              ) : (
                <p>{"<"}</p>
              )}
            </div>
            {getPageNumbers()?.map((item, index) => (
              <div key={index} className="pageBtn">
                  <p className={item == currentPage ? 'active' : null} onClick={() => handleGoToPage(item)}>{item}</p>
              </div>
            ))}
            <div className="pageBtn glbBtn">
              {nextPage ? (
                  <p onClick={() => handleGoToPage(nextPage)}>{">"}</p>
              ) : (
                <p>{">"}</p>
              )}
            </div>
            <div className="pageBtn glbBtn">
                <p onClick={() => handleGoToPage(lastPage)}>{">>"}</p>
            </div>
          </div>
        </div>
        <div className="paginate-info-main col-lg-4">
          {/* {totalItems &&
          //TODO
            // <p>{`מציג ${toShow}- `}</p>        
          } */}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
