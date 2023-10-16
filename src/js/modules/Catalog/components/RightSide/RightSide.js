import React, {useState, useEffect} from 'react';
import useCatalog from '../../store/CatalogStore';
import { NavLink, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Filters from './components/Filters';
import useCategories from '../../store/CategoriesStore';

const RightSide = () => {
    const {categories} = useCategories()
    // const {categoriesLvl1, categoriesLvl2, categoriesLvl3, getCategories} = useCatalog()
    // const [open, setOpen] = useState(false);
    const {lvl1, lvl2, lvl3, page, parent, type } = useParams()
    const history = useHistory()

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
                    {categories.map((categoryLvl1, index1) => {
                      return (
                        <div className="lvl-cont" key={index1}>
                          <NavLink to={'/catalog/' + categoryLvl1.id + "/0/0" + history.location.search}>
                            <h3 className={lvl1 == categoryLvl1.id ? 'lvl1 active' : 'lvl1'}>
                              {categoryLvl1.title}
                            </h3>
                          </NavLink>
                          {/* {categoriesLvl2.map((categoryLvl2, index2) => {
                            if((categoryLvl1.Id == categoryLvl2.ParentId)){
                              return (
                                <div key={index2} className={categoryLvl1.Id == lvl1 ?"col active" : "col"}>
                                  <NavLink to={'/category/' + type + '/'  + categoryLvl1.Id + "/" + categoryLvl2.Id + "/0/1/0/" + "he" + history.location.search}>
                                    <h3  className={lvl2 ==  categoryLvl2.Id ? "active" : null} >{categoryLvl2.Title}</h3>
                                  </NavLink>
                                  <ul className={categoryLvl2.Id == lvl2 ? "active" : null}>
                                    {categoriesLvl3.map((categoryLvl3, index3) => {
                                      if(categoryLvl3.ParentId == categoryLvl2.Id) {
                                        return (
                                          <li key={index3}>
                                            <NavLink className={lvl3 == categoryLvl3.Id ? 'active-a' : null} to={'/category/' + type + '/'  + categoryLvl1.Id + "/" + categoryLvl2.Id + "/" + categoryLvl3.Id + "/1/0/" + "he" + history.location.search}>
                                              { categoryLvl3.Title}
                                              </NavLink>
                                          </li>
                                        );
                                      }
                                    })}
                                  </ul>
                                </div>
                              );
                            }
                          }
                          )} */}
                        </div>
                      )}
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