import React from 'react';
import useCatalog from '../../../../store/CatalogStore';
import useCart from '../../../../../Cart/store/CartStore';
import { useAuth } from '../../../../../Auth/providers/AuthProvider';
import PriceBlock from './components/PriceBlock';
import BasicInfo from './components/BasicInfo';
import Tags from './components/Tags';
import useSearchStore from '../../../../store/SearchStore';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ProductList = () => {
  const { products, toShow, listView } = useCatalog();
  const {documentType} = useParams()
  const {productsFilter} = useSearchStore()
  const { getCartItem } = useCart();
  return (
    <div className={!listView  ? "category-wrapper" : "category-wrapper category-wrapper-list"}>
      <div id="navFix" className={"flex-container products-view"}>
        {products?.length === 0 && (
          <h1 className="hide-on-desctop no-product">לא קיימים מוצרים</h1>
        )}
        {((productsFilter?.length > 0 && documentType === 'search')? productsFilter : products)?.map((product, index) => {
          if (index <= toShow) {
            return (
              <div key={index} className={product.Unpublished ? "col-lg-3 wrapper-cont unpublished main-product-wrapper-cont" : "wrapper-cont main-product-wrapper-cont col-lg-3"}>
                <div className={!product.ActualQuan ? "wrapper main-product-wrapper" : "wrapper main-product-wrapper disable"}>
                    <Tags product={product}/>
                    <BasicInfo product={product}/>
                    <PriceBlock product={product}/>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProductList;
