import React, { useEffect } from 'react';
import CategoriesEditList from '../components/CategoryEdit/CategoriesEditList';
import CategoryEditFilters from '../components/CategoryEdit/CategoryEditFilters';
import BreadCrumbs from '../components/BreadCrumbs';
import useCategories from '../../Catalog/store/CategoriesStore';
const CategoryEdit = () => {
    const {getAllCategories} = useCategories()

    useEffect(() => {
        getAllCategories()
    },[])
    return (
        <div className="category-edit">
            <BreadCrumbs/>
            <div className="container items-container">
                <CategoryEditFilters/>
                <CategoriesEditList/>
            </div>
        </div>
    );
};

export default CategoryEdit;