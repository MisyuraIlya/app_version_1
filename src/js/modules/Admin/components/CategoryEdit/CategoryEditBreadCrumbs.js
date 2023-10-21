import React from 'react';
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const CategoryEditBreadCrumbs = () => {
    const {parentId, subId} = useParams()
    return (
    <div className="breadcrumbs">
        <div className="container">
            <div className="flex-container">
                <div className="col-lg-6">
                    <h1>ניהול קטגוריות</h1>
                </div>
                <div className="col-lg-6">
                    <ul>
                        <li>
                            <NavLink to="/"><img src={globalFileServer + 'icons/home.svg'} alt=""/></NavLink>
                        </li>
                        {/* {true ?
                            <>
                                <li>
                                    <NavLink to="/category-edit/0/0">כל הקטגוריות</NavLink>
                                </li>
                                {parentId ?
                                    <li>
                                    <NavLink to={"/category-edit/"+ mainParent[0].Id +"/0"}>
                                        <p>{mainParent[0].Title}</p>
                                    </NavLink>
                                    </li>
                                    :
                                    <li>
                                        <a>{parent[0].Title}</a>
                                    </li>
                                }
                                {subId ?
                                    <li>
                                    {parent[0].Title}
                                    </li>
                                :null}
                            </>
                        : */}
                        <li>
                            <span>כל הקטגוריות</span>
                        </li>
                        {/* } */}

                    </ul>
                </div>
            </div>
        </div>
    </div> 
    );
};

export default CategoryEditBreadCrumbs;