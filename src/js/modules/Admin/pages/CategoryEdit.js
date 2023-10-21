import React from 'react';
import CategoriesEditList from '../components/CategoryEdit/CategoriesEditList';
import useCategories from '../../Catalog/store/CategoriesStore';
import CategoryEditBreadCrumbs from '../components/CategoryEdit/CategoryEditBreadCrumbs';
import CategoryEditFilters from '../components/CategoryEdit/CategoryEditFilters';
const CategoryEdit = () => {
    return (
        <div className="category-edit">
            <CategoryEditBreadCrumbs/>
            <div className="container items-container">
                <CategoryEditFilters/>
                <CategoriesEditList/>
            </div>
        </div>
    );
};

export default CategoryEdit;