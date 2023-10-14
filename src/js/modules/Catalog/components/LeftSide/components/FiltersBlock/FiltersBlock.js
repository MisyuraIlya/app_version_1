import React, { useEffect } from 'react';
import useCatalog from '../../../../store/CatalogStore';
import { useAuth } from '../../../../../Auth/providers/AuthProvider';
import { useDebounce } from 'use-debounce';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const FiltersBlock = () => {
    const{
        loading,
        paginateObj,
        prodsPerPage, 
        setProdsPerPage, 
        activeProdsPerPage, 
        setActiveProdsPerPage,
        activeSortPerPage,
        setActiveSortPerPage,
        sortProdSetting,
        setSortProdSetting,
        listView,
        setListView,
        searchParam,
        setSearchParam,
        getCatalog,
        setUrlSearch
    } = useCatalog()

    const {isAgent} = useAuth()
    const [searchDebounce] = useDebounce(searchParam, 1000);
    const [prodsPerPageDebounce] = useDebounce(prodsPerPage, 1000);
    const {lang, lvl1, lvl2, lvl3, page, parent, type } = useParams()
    const history = useHistory()

    const handleOrderBy = (val, hebVal, engVal) => {

      //TODO FIX
      let searchSplit;
      let searchString = '';
      let search = history.location.search;
      if(search.includes('%26')){
        searchSplit = search.split('%26');
        searchSplit.map((searchSplitRec) => {
          if(!searchSplitRec.includes('OrderBy') && searchSplitRec!=""){
            searchString += searchSplitRec + '%26';
          }
        })
      }
      if(searchString==""){
        searchString = '?OrderBy=';
      }else{
        searchString = searchString + '&OrderBy=';
      }
      searchString = searchString + val + '%26';
  
      let path = search;
      path = lvl1+'/'+lvl2+'/'+lvl3+'/'+'1'+'/'+parent+'/'+lang;
      history.push('/category/'+ type + '/' + path + searchString);
      setSortProdSetting(hebVal)
      setActiveSortPerPage(false)
    }

    useEffect(() => {
      if(searchDebounce){
        getCatalog()

      }
    },[searchDebounce])
    
    return (
    <div className="view-mode-cont">
        <div className="view-mode-rightcont flex-container">
          <div className="block quant-main">
            
              <p> {loading ? '' : 'נמצאו: ' + paginateObj?.ProdTtlCount + ' מוצרים'}</p>
            {isAgent && ((params.props.match.params.lvl2 && params.props.match.params.lvl2!='0') || params.props.match.params.type.includes('brand')) ?
              <div className="file-main-cont">
                <div className="file-cont" onClick={()=> params.downloadExcelPdf('xls', params.breadCrumbsNav)}>
                  <img src={globalFileServer + 'icons/excel.svg'} />
                </div>
                <div className="file-cont" onClick={()=> params.downloadExcelPdf('pdf', params.breadCrumbsNav)}>
                  <span className="material-symbols-outlined">picture_as_pdf</span>
                </div>
              </div>
          :null}

          </div>
          <div className="search-block block">
            <input
              type="text"
              onChange={ e => setSearchParam(e.target.value) }
              value={searchParam}
              placeholder={"חיפוש מוצר..."}
            />
            {searchParam  == "" ?
              <span className="material-symbols-outlined search-img">search</span>
            :
              <span className="material-symbols-outlined search-img" onClick={()=> {setSearchParam('');  getCatalog()}}>close</span>
            }
          </div>
  
          <div className="block sort-main">
            <div className="sort-sub">
              <p className="p-title">{'מוצרים:'}</p>
              <div className="drop-down-main">
                <div className="select-main" onClick={()=> setActiveProdsPerPage(!activeProdsPerPage)}>
                  <p>{prodsPerPage}</p>
                  <img src={globalFileServer + "icons/down-chevron.svg"} alt=""/>
                </div>
                {activeProdsPerPage ?
                  <div className="drop-down-open-cont">
                    <ul>
                      <li onClick={()=> setProdsPerPage('24')}>24</li>
                      <li onClick={()=> setProdsPerPage('48')}>48</li>
                    </ul>
                  </div>
                :null}
              </div>
            </div>
          </div>
  
          <div className="block sort-main">
            <div className="sort-sub">
              <p className="p-title">{'מיון:'}</p>
              <div className="drop-down-main">
                <div className="select-main" onClick={()=> setActiveSortPerPage(!activeSortPerPage)}>
                  <p>{sortProdSetting}</p>
                  <img src={globalFileServer + "icons/down-chevron.svg"} alt=""/>
                </div>
                {activeSortPerPage ?
                  <div className="drop-down-open-cont">
                    <ul>
                      <li onClick={()=> handleOrderBy('recommended','מומלץ','Recommended')}>{'מומלץ'}</li>
                      <li onClick={()=> handleOrderBy('title','שם','Title')}>{'שם'}</li>
                      <li onClick={()=> handleOrderBy('sku','מק״ט','Sku')}>{'מק״ט'}</li>
                    </ul>
                  </div>
                :null}
              </div>
            </div>
          </div>
          <div className="block check-box-sub-cont check-row view-main">
            <p>{'תצוגה:'}</p>
            <div className={!listView ? "view-img-cont actice" : "view-img-cont  not-active"} onClick={()=> setListView(false)}>
              <img src={globalFileServer + 'icons/grid-view.svg'} />
            </div>
            <div className={listView ? "view-img-cont actice" : "view-img-cont not-active"} onClick={()=> setListView(true)}>
              <img src={globalFileServer + 'icons/list-view.svg'} />
            </div>
          </div>
        </div>
    </div>
    );
};

export default FiltersBlock;