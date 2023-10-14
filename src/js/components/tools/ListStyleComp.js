import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink } from "react-router-dom";

let timeoutId;


const ListStyleComp = params => {
  const [activeSort, setActiveSort] = useState(false);
  const [activeProdsPerPage, setActiveProdsPerPage] = useState(false);
  const [activeSortPerPage, setActiveSortPerPage] = useState(false);
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  const setProdsPerPage = (val) =>{
    localStorage.ProdsPerPage = val;
    params.setProdsPerPage(val);
    setActiveProdsPerPage(false);
  }
  const setSortPerPage = (val, hebVal, engVal) =>{
    setActiveSortPerPage(false);

    let searchSplit;
    let searchString = '';
    let search = params.props.history.location.search;



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
    let par = params.props.match.params;
    path = par.lvl1+'/'+par.lvl2+'/'+par.lvl3+'/'+'1'+'/'+par.parent+'/'+par.lang;

    params.props.history.push('/category/'+ par.type + '/' +path + searchString);

    let finalVal;
    params.lang == 'he' ? finalVal = hebVal : finalVal = engVal;
    params.setSortPerPage(finalVal);

  }

  const setWord = word => {
    clearTimeout(timeoutId);
		params.setSearchProdVal(word);
    timeoutId = setTimeout(() => goInactive(word), 1000);
	}
  const goInactive = word => {
		params.searchPhpFunc(word);
	}
  const emptySearch = () => {
    setWord('');
  }

	return(
    <div className="view-mode-cont">
      <div className="view-mode-rightcont flex-container">

        <div className="block quant-main">
          {params.lang =='he' ?
            <p>{'נמצאו: ' + params.prodQuant + ' מוצרים'}</p>
          :
            <p>{'Found: ' + params.prodQuant + ' Products'}</p>
          }
          {/*
          {localStorage.role || localStorage.agent && ((params.props.match.params.lvl2 && params.props.match.params.lvl2!='0') || params.props.match.params.type.includes('brand')) ?
            <div className="file-main-cont">
              <div className="file-cont" onClick={()=> params.downloadExcelPdf('xls', params.breadCrumbsNav)}>
                <img src={globalFileServer + 'icons/excel.svg'} />
              </div>
              <div className="file-cont" onClick={()=> params.downloadExcelPdf('pdf', params.breadCrumbsNav)}>
                <span className="material-symbols-outlined">picture_as_pdf</span>
              </div>
            </div>
        :null}*/}
        </div>
        <div className="search-block block">
          <input
            type="text"
            onChange={ e => setWord(e.target.value) }
            value={params.searchProdVal}
            placeholder={params.lang == 'he' ? "חיפוש מוצר..." : "Search"}
          />
          {params.searchProdVal == "" ?
            <span className="material-symbols-outlined search-img">search</span>
          :
            <span className="material-symbols-outlined search-img" onClick={()=> emptySearch()}>close</span>
          }
        </div>

        <div className="block sort-main">
          <div className="sort-sub">
            <p className="p-title">{params.lang == 'he' ? 'מוצרים:' : 'Per Page:'}</p>
            <div className="drop-down-main">
              <div className="select-main" onClick={()=> setActiveProdsPerPage(!activeProdsPerPage)}>
                <p>{params.prodsPerPage}</p>
                <img src={globalFileServer + "icons/down-chevron.svg"} alt=""/>
              </div>
              {activeProdsPerPage ?
                <div className="drop-down-open-cont">
                  <ul>
                    <li onClick={()=> setProdsPerPage('24')}>24</li>
                    <li onClick={()=> setProdsPerPage('48')}>48</li>
                    <li onClick={()=> setProdsPerPage('96')}>96</li>
              {/*
                    <li onClick={()=> setProdsPerPage('192')}>192</li>
              */}
                  </ul>
                </div>
              :null}
            </div>
          </div>
        </div>

        <div className="block sort-main">
          <div className="sort-sub">
            <p className="p-title">{params.lang == 'he' ? 'מיון:' : 'Sort:'}</p>
            <div className="drop-down-main">
              <div className="select-main" onClick={()=> setActiveSortPerPage(!activeSortPerPage)}>
                <p>{params.sortProdSetting}</p>
                <img src={globalFileServer + "icons/down-chevron.svg"} alt=""/>
              </div>
              {activeSortPerPage ?
                <div className="drop-down-open-cont">
                  <ul>
                    <li onClick={()=> setSortPerPage('recommended','מומלץ','Recommended')}>{params.lang == 'he' ? 'מומלץ' : 'Recommended'}</li>
                    <li onClick={()=> setSortPerPage('title','שם','Title')}>{params.lang == 'he' ? 'שם' : 'Title'}</li>
                    <li onClick={()=> setSortPerPage('sku','מק״ט','Sku')}>{params.lang == 'he' ? 'מק״ט' : 'Sku'}</li>
                  </ul>
                </div>
              :null}
            </div>
          </div>
        </div>
        <div className="block check-box-sub-cont check-row view-main">
          <p>{params.lang == 'he' ? 'תצוגה: ' : 'View: '}</p>
          <div className={params.props.state.listView == 'false' ? "view-img-cont actice" : "view-img-cont  not-active"} onClick={()=> params.props.setView("false")}>
            <img src={globalFileServer + 'icons/grid-view.svg'} />
          </div>
          <div className={params.props.state.listView == 'true' ? "view-img-cont actice" : "view-img-cont not-active"} onClick={()=> params.props.setView("true")}>
            <img src={globalFileServer + 'icons/list-view.svg'} />
          </div>
        </div>
      </div>
    </div>
	)
}

export default ListStyleComp;
