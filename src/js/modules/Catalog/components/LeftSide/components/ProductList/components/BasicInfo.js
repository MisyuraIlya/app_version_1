import React from 'react';
import { useAuth } from '../../../../../../Auth/providers/AuthProvider';
import { useModals } from '../../../../../../Modals/provider/ModalsProvider';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useCatalog from '../../../../../store/CatalogStore';

const BasicInfo = ({product}) => {
    const {user} = useAuth()
    const {selectProduct} = useModals()
    const {loading} = useCatalog()
    return (
    <div className={'img-text-container'} onClick={() => selectProduct(product)}>
        <div className="img-cont">
            {/* SET PLAVEHOLDER IMAGE */}
            {loading ?
                <Skeleton style={{height:'120px'}} />
            :
                <img className="img" src={product.ImgPath ? product.defaultImagePath : globalFileServer + 'products/' + product.defaultImagePath}/>
            }
        </div>
        {loading ?
        <Skeleton style={{height:'60px'}} count={2}/>
        :
        <div className={user ? "prod-data-cont user" : "prod-data-cont"}>
        <h3 className="p-title">{product?.title}</h3>
        <div className="barcode-cont">
          <div>
            <p className="row-title">מק״ט: </p>
            <p className="Mask-long">{product?.sku}</p>
          </div>
          {product?.barcode ?
              <div>
                  <p className="row-title">ברקוד: </p>
                  <p className="Mask">{product.barcode}</p>
              </div>
          : null}
          <div>
              <p className="row-title">מארז: </p>
              <p className="Mask-long">{product?.packQuantity + " יח'"}</p>
          </div>
          {/* {product.OnHand && isAgent ?
              <div className="">
                  <p className="row-title highlight-p-cls">{stockTitle}</p>
                  <p className="Mask ltr highlight-p-cls">{product.OnHandPreview}</p>
                  <p className="highlight-p-cls">{" יח'"}</p>
              </div>
          : null} */}
        </div>

        {/* {this.props.match.params.type=='regular' ? 
            <div className="last-price-cont">
                <div className="last-price-row">
                    <p className="row-title">{'נרכש לאחרונה:'}</p>
                    <p className="Mask">{product.LastPriceDate ? product.LastPriceDate : ''}</p>
                </div>
                <div className="last-price-row">
                    <p className="row-title">{'מחיר אחרון:'}</p>
                    <p className="Mask">{product.LastPriceVal ? product.LastPriceVal : ''}</p>
                </div>
            </div>
        :null} */}
      </div>
        }


    </div>
    );
};

export default BasicInfo;