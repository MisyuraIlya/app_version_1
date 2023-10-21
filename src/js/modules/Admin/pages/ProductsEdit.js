import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Heading from '../components/ProductsEdit/Heading';
import ProductsEditList from '../components/ProductsEdit/ProductsEditList';

const ProductsEdit = () => {
    return (
        <div className="category-edit blog-edit">
            <BreadCrumbs/>
            <div className="container items-container">
                <div className="items">
                    <Heading/>
                    <ProductsEditList/>
                </div>
            </div>
        </div>
    );
};

export default ProductsEdit;