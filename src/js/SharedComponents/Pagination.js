import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Pagination = ({totalPages, page, lastPage, nextPage, previousPage,}) => {

    const {location, push} = useHistory()
    const handleGoToPage = (page) => {
        const urlSearchParams = new URLSearchParams(location.search);
        urlSearchParams.set('page', page);
        const updatedUrl = '?' + urlSearchParams.toString();
        push(location.pathname+updatedUrl)
    }

    const getPageNumbers = () => {
        const halfRange = Math.floor(7 / 2);
        const start = Math.max(1, page - halfRange);
        const end = Math.min(totalPages, start + 7 - 1);
    
        const pageNumbers = [];
        for (let i = start; i <= end; i++) {
          pageNumbers.push(i);
        }
        return pageNumbers;
      };
    
    return (
        <div className="paginate-main-cont">
            <div className="paginate-sub-cont flex-container">
                <div className="paginate-controller-main col-lg-8">
                    <div className="paginate-controller-sub">
                        <div className="pageBtn glbBtn">
                            <p onClick={() => handleGoToPage(1)}  >{"<<"}</p>
                        </div>
                        <div className="pageBtn glbBtn" >
                            {previousPage ? (
                                <p onClick={() => handleGoToPage(previousPage)}>{"<"}</p>
                            ) : (
                            <p>{"<"}</p>
                            )}
                        </div>
                        {getPageNumbers()?.map((item, index) => (
                            <div key={index} className="pageBtn">
                                <p className={item == page ? 'active' : null} onClick={() => handleGoToPage(item)}>{item}</p>
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
                    <p>{totalPages}</p>
                </div>
            </div>
        </div>
    );
};

export default Pagination;