import React from 'react';
import useCatalog from '../../../store/CatalogStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Filters = () => {
    const {filters, setChoosedFilter, setUrlSearch, getCategories} = useCatalog()
    const history = useHistory()
    const {lang, lvl1, lvl2, lvl3, page, parent, type } = useParams()

    const handleFilter = (main, sub) => {
        //TODO FIX
        let path = history.location.pathname;
        let search = history.location.search;
        let searchString = '';
        let searchStart = '?';
        let filterQuery = '';
        let filterStart = '?Filter=';
    
        let filterObj = filters;
        filterObj.map((filterMainItem) => {
          if(filterMainItem.Title == main.Title){
            filterMainItem.Values.map((filterSubItem) => {
              if(filterSubItem.Title == sub.Title){
                filterSubItem.Selected = !filterSubItem.Selected;
              }
            })
          }
        })
    
        filterObj.map((filterMainItem) => {
          filterMainItem.Values.map((filterSubItem) => {
            if(filterSubItem.Selected){
              filterQuery+=filterMainItem.Title + '=' + filterSubItem.Title + ',';
            }
          })
        })
    
        if(filterQuery.length){
          filterQuery = filterQuery.slice(0, -1);
          filterQuery = filterStart + filterQuery + '%26';
        }

        let searchSplit;

        if(search.includes('%26')){
          searchSplit = search.split('%26');
          searchSplit.map((searchSplitRec) => {
            if(!searchSplitRec.includes('Filter') && searchSplitRec!=""){
              searchString += searchSplitRec + '%26';
            }
          })
    
        }

        if(searchString.length || filterQuery.length){
          if(searchString.includes('?')){
            searchString = searchString.replace('?','&')
          }else{
            searchString = searchString.replace('&','?')
    
          }
          searchString = filterQuery + searchString;
        }
        
        path = lvl1+'/'+lvl2+'/'+lvl3+'/'+'1'+'/'+parent+'/'+lang;
        history.push('/category/'+ type + '/' +path + searchString);
        setUrlSearch(searchString)
        setChoosedFilter(sub);
    }
  
    return (
        <>
        {filters?.map((filterEle,filterKey) => {
                return(
                <div key={filterKey} className="filter-cont">
                    <h2 className="filter-main_title">{filterEle.Title}</h2>
                    <div className="filter-box-cont">
                    {filterEle.Values && filterEle.Values.length ? filterEle.Values.map((filterItem,filterItemKey) => {
                        if(filterItemKey<40 ){
                        return(
                            <div key={filterItemKey} className="filter-row" onClick={()=>handleFilter(filterEle,filterItem )}>
                            <div className={filterItem.Selected ? "checkBox active" : "checkBox"}></div>
                            <p>{filterItem.Title}</p>
                            </div>
                        )
                        }
                    }):null}
                    </div>
                    {/* {!viewBrands && filterKey==0 && filterEle.Values.length > 9 ?
                    <div className="show-more">
                        <p onClick={()=>setViewBrands(true)}>{'הצג עוד'}</p>
                    </div>
                    :null}
                    {viewBrands && filterKey==0 && filterEle.Values.length > 9  ?
                    <div className="show-more">
                        <p onClick={()=>setViewBrands(false)}>{'הצג פחות'}</p>
                    </div>
                    :null} */}
                </div>
                )
            })
        }   
        </>
    );
};

export default Filters;