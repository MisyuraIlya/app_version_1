import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink, useParams } from "react-router-dom";
import UserContext from '../../UserContext';

const CategorySlideEcare = params => {

  const [open, setOpen] = useState(false);
  const [categoryPop, setCategoryPop] = useState(false);
  const [viewBrands, setViewBrands] = useState(false);

  const app = useContext(UserContext);
  let params2 = useParams();
  let { lvl1, lvl2, lvl3} = params2;

  useEffect(() => {
    //setActiveFiltersInit();
  }, []);

  let parentCategory = params.categories.filter(item => item.Id == lvl1)[0];
  let childCategory = params.categories.filter(item => item.Id == lvl2)[0];
  let subChildCategory = params.categories.filter(item => item.Id == lvl3)[0];
  let lvl1Categories = params.categories.filter(item => item.LvlNumber == '1');

  let firstLvl2 = false;
  if(lvl1Categories && lvl1Categories.length > 0){
    lvl1Categories.map((element,ind) => {
      firstLvl2 = params.categories.filter(item => item.LvlNumber == '2' && item.ParentId == element.Id)[0];
      if(firstLvl2){
        element.FirstLvl2 = firstLvl2.Id;
      }
    })
  }

  const getFirstLevel = () => {

    let firstLevel = params.categories.filter(item => item.LvlNumber=="1");

    return firstLevel;
  }

  const getSecondLavel = (lvl1Id) => {

		let secondLavel = params.categories.filter(item => item.LvlNumber=="2" && item.ParentId == lvl1Id);
		return secondLavel;
	}
  const setFilter = (main, sub) =>{


    let path = params.props.history.location.pathname;
    let search = params.props.history.location.search;
    let searchString = '';
    let searchStart = '?';
    let filterQuery = '';
    let filterStart = '?Filter=';

    let filterObj = params.filterObj;
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


    let par = params.props.match.params;
    path = par.lvl1+'/'+par.lvl2+'/'+par.lvl3+'/'+'1'+'/'+par.parent+'/'+par.lang;

    params.props.history.push('/category/'+ par.type + '/' +path + searchString);
    //params.setFilter();
  }

  let searchQuery = '';
  let searchQuerySplit;
  if(params.props.location.search.includes('Search')){
    if(params.props.location.search.includes('Filter')){
      searchQuerySplit = params.props.location.search.split('%26');
      searchQuerySplit.map((splitItem) => {
        if(splitItem.includes('Search')){
          searchQuery = splitItem + '%26';
        }
      })
    }else{
      searchQuery = params.props.location.search;
    }
  }
  return (
    <div className={open ? "category-slidebar-super-main-cont open" : "category-slidebar-super-main-cont closed"}>
      <div onClick={()=> setOpen(!open)} className="close-cont">
        {open ?
          <span className="material-symbols-outlined">close</span>
        :
          <span className="material-symbols-outlined">filter_list</span>
        }
      </div>

      <div className="category-slidebar-main-cont">
        <div className="category-slidebar-fixed-cont">
          <div className="category-slidebar-cont">
            <div className="slide-head-cont">
              <h2>{app.state.lang == 'he' ? 'סינון מוצרים' : 'Sort Products'}</h2>
            </div>
            {params.categories.length ?
              <div className="category-slidebar-subcont">
                <div className="category-list-cont">
                  <div className="category-list-subcont"  onClick={()=> setOpen(!open)}>
                    {getFirstLevel().map((elementLvl1, indexLvl1) => {
                      let childLvl2 = params.categories.filter($item => $item.ParentId == elementLvl1.Id && $item.LvlNumber == "2");
                      if(childLvl2){
                        return (
                          <div className="lvl-cont" key={indexLvl1}>
                            <NavLink to={'/category/'+ params.props.match.params.type + '/' + elementLvl1.Id + "/0/0/1/0/" + app.state.lang + searchQuery}>
                              <h3 className={parentCategory && parentCategory.Id == elementLvl1.Id ? 'lvl1 active' : 'lvl1'}>{app.state.lang == "he" ? elementLvl1.Title : elementLvl1.Decription}</h3>
                            </NavLink>
                            {parentCategory ? getSecondLavel(elementLvl1.Id).map((element, index) => {
                              let child = params.categories.filter($item => $item.ParentId == element.Id && $item.LvlNumber == "3");
                              if(child){
                                return (

                                  <div key={index} className={parentCategory && parentCategory.Id == elementLvl1.Id ? "col active" : "col"}>
                                    <NavLink to={'/category/' + params.props.match.params.type + '/'  + parentCategory.Id + "/" + element.Id + "/0/1/0/" + app.state.lang + searchQuery}>
                                      <h3  className={childCategory && element.Id == childCategory.Id ? "active" : null} >{app.state.lang == "he" ? element.Title : element.Decription}</h3>
                                    </NavLink>
                                    <ul className={childCategory && element.Id == childCategory.Id ? "active" : null}>
                                      {child.map((el, ind) => {
                                        return (
                                          <li key={ind}>
                                            <NavLink className={subChildCategory ? el.Id == subChildCategory.Id ? 'active-a' : null : null} to={'/category/' + params.props.match.params.type + '/'  + parentCategory.Id + "/" + element.Id + "/" + el.Id + "/1/0/" + app.state.lang + searchQuery}>{app.state.lang == "he" ? el.Title : el.Decription}</NavLink>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              }
                            }):null}
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
              :null}
            {params.filterObj && params.filterObj.length ? params.filterObj.map((filterEle,filterKey) => {
                return(
                  <div key={filterKey} className="filter-cont">
                    <h2 className="filter-main_title">{app.state.lang == "he" ? filterEle.Title : filterEle.Title}</h2>
                    <div className="filter-box-cont">
                      {filterEle.Values && filterEle.Values.length ? filterEle.Values.map((filterItem,filterItemKey) => {
                        if(filterItemKey<10 || viewBrands){
                          return(
                            <div key={filterItemKey} className="filter-row" onClick={()=>setFilter(filterEle,filterItem )}>
                              <div className={filterItem.Selected ? "checkBox active" : "checkBox"}></div>
                              <p>{app.state.lang == "he" ? filterItem.Title : filterItem.Title}</p>
                            </div>
                          )
                        }
                      }):null}
                    </div>
                    {!viewBrands && filterKey==0 && filterEle.Values.length > 9 ?
                      <div className="show-more">
                        <p onClick={()=>setViewBrands(true)}>{app.state.lang == "he" ? 'הצג עוד' : 'Show More'}</p>
                      </div>
                    :null}
                    {viewBrands && filterKey==0 && filterEle.Values.length > 9  ?
                      <div className="show-more">
                        <p onClick={()=>setViewBrands(false)}>{app.state.lang == "he" ? 'הצג פחות' : 'Show Less'}</p>
                      </div>
                    :null}
                  </div>
                )
              })
            :null}
          </div>
        </div>
      </div>
    </div>
  )

}
export default CategorySlideEcare;
