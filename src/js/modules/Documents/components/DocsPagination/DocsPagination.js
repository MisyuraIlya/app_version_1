import React from 'react';
import { NavLink } from "react-router-dom";
import useDocuments from '../../store/DocumentsStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const DocsPagination = () => {
    const { headProps, headLocation , paginateObj, setPage,GetDocuments, urlNav} = useDocuments()

    

    const {page, lang} = useParams()

    const history = useHistory()

    const handleChangePage = (page) => {
        setPage(page)
        GetDocuments(page)
    }

    let title1 = 'מציג ';
    let title2 = ' מתוך ';
    let title3 = ' לקוחות';

    return (
        <div className="paginate-main-cont">
            <div className="paginate-sub-cont flex-container">
    
            <div className="paginate-controller-main col-lg-8">
                <div className="paginate-controller-sub">
                <div className="pageBtn glbBtn">
                    <NavLink to={urlNav + '1/' + lang + history.location.search}>
                    <p>{"<<"}</p>
                    </NavLink>
    
                </div>
                <div className="pageBtn glbBtn">
                    {paginateObj?.PreviosPage ?
                    <NavLink to={urlNav +  paginateObj.PreviosPage +'/'+lang + history.location.search}>
                        <p>{"<"}</p>
                    </NavLink>
                    :
                    <p>{"<"}</p>
                    }
                </div>
                {paginateObj?.pageViewArr?.map((item, index) => {
                    return(
                    <div key={index} className="pageBtn">
                        <NavLink to={urlNav +item+'/'+lang + history.location.search} onClick={() => handleChangePage(item)}>
                        <p className={item == paginateObj.PageChosen ? 'active' : null}>{item}</p>
                        </NavLink>
                    </div>
                    )
                })}
                <div className="pageBtn glbBtn">
                    {paginateObj?.NextPage ?
                    <NavLink to={urlNav + paginateObj.NextPage +'/'+lang + history.location.search}>
                        <p>{">"}</p>
                    </NavLink>
                    :
                    <p>{">"}</p>
                    }
    
    
                </div>
                <div className="pageBtn glbBtn">
                    <NavLink to={urlNav +(paginateObj?.LastPage)+'/'+lang + history.location.search}>
                    <p>{">>"}</p>
                    </NavLink>
                </div>
    
                </div>
            </div>
            <div className="paginate-info-main col-lg-4">
                <p>{title1 + paginateObj?.prodRange + title2 + paginateObj?.ProdTtlCount}</p>
            </div>
            </div>
        </div>
    );
};

export default DocsPagination;