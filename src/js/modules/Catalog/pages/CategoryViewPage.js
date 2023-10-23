import React from 'react';
import useCategories from '../store/CategoriesStore';
import ContactFooter from '../../../SharedComponents/ContactFooter';
import BreadCrubms from '../../../SharedComponents/BreadCrubms';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const CategoryViewPage = () => {
    const {categoriesLvl2, loading} = useCategories()
    const {lvl1, lvl2,lv3} = useParams() 
    
    return (
        <div className="page-container category-view">
            <div className="heading">
                {loading &&
                    <div className="spinner-wrapper">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                }
            </div>
            <div className="container categories">
                <BreadCrubms/>
                <div className="flex-container">
                    {categoriesLvl2?.map((element, index) => {
                        if(element?.parent?.id == lvl1) {
                            return(
                                <div key={index} className="col-lg-3">
                                    <NavLink to={ (`/category/catalog/${lvl1}/${element.Id}/0/1/0/he`)}>
                                        <div className="wrapper">
                                            {/* TODO IMPLEMENT */}
                                            <img src={element?.img ? globalFileServer + 'categories/' + element.Img : globalFileServer + 'placeholder.jpg'} />
                                            <h2>{element?.title}</h2>
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <ContactFooter/>
        </div>
    );
};

export default CategoryViewPage;