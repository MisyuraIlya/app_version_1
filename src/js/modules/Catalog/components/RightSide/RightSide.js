import React, {useState, useEffect} from 'react';
import useCatalog from '../../store/CatalogStore';
import { NavLink, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Filters from './components/Filters';
import useCategories from '../../store/CategoriesStore';
import useSearchStore from '../../store/SearchStore';

const RightSide = () => {
    const {categories} = useCategories()
    const {setCurrentPage} = useCatalog()
    const {categoriesFilter} = useSearchStore()
    // const {categoriesLvl1, categoriesLvl2, categoriesLvl3, getCategories} = useCatalog()
    const [open, setOpen] = useState(false);
    const {lvl1, lvl2, lvl3, page, parent, type } = useParams()
    const {location} = useHistory()
    const {documentType} = useParams()
    const {push} = useHistory()

    const isSearchDocument = documentType === 'search'
    return (
      <>
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
                <h2>{'סינון מוצרים'}</h2>
              </div>
              <div className="category-slidebar-subcont">
                <div className="category-list-cont">
                  <div className="category-list-subcont"  onClick={()=> setOpen(!open)}>
                    {(categoriesFilter?.length > 0 ? categoriesFilter : categories ).map((categoryLvl1, index1) => {
                      if(categoryLvl1.lvlNumber === 1){
                        return (
                          <div className="lvl-cont" key={index1}>
                            <div  onClick={() => {isSearchDocument ? 
                              push(`/client/${documentType}/${categoryLvl1.id}/0/0${location.search}`)
                              :
                              push(`/client/${documentType}/${categoryLvl1.id}/0/0?page=1`)
                            }}>
                              <h3 className={lvl1 == categoryLvl1.id ? 'lvl1 active' : 'lvl1'}>
                                {categoryLvl1.title}
                              </h3>
                            </div>
                            {categoryLvl1?.categories?.map((categoryLvl2, index2) => {
                                return (
                                  <div key={index2} className={categoryLvl1.id == lvl1 ?"col active" : "col"}>
                                    <div  onClick={() => {
                                      isSearchDocument ?
                                      push(`/client/${documentType}/${categoryLvl1.id}/${categoryLvl2.id}/0${location.search}`)
                                      :
                                      push(`/client/${documentType}/${categoryLvl1.id}/${categoryLvl2.id}/0?page=1`)
                                      }}>
                                      <h3  className={lvl2 ==  categoryLvl2.id ? "active" : null} >{categoryLvl2.title}</h3>
                                    </div>
                                    <ul className={categoryLvl2.id == lvl2 ? "active" : null}>
                                      {categoryLvl2?.categories?.map((categoryLvl3, index3) => {
                                          return (
                                            <li key={index3}>
                                              <div className={lvl3 == categoryLvl3.id ? 'active-a' : null} 
                                              onClick={() => {
                                                isSearchDocument ?
                                                push(`/client/${documentType}/${categoryLvl1.id}/${categoryLvl2.id}/${categoryLvl3.id}${location.search}`)
                                                :
                                                push(`/client/${documentType}/${categoryLvl1.id}/${categoryLvl2.id}/${categoryLvl3.id}?page=1`)
                                                }}>
                                                { categoryLvl3.title}
                                                </div>
                                            </li>
                                          );
                                      })}
                                    </ul>
                                  </div>
                                );
                            }
                            )}
                          </div>
                        )}
                      }
                    )}
                  </div>
                </div>
              </div>
              <Filters/>
            </div>
          </div>
        </div>
      </div>
      </>
    );
};

export default RightSide;