import React from 'react';
import { useAuth } from '../../../../../../Auth/providers/AuthProvider';
import useCart from '../../../../../../Cart/store/CartStore';
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart';
import AddToCartCatalog from '../../../../../../Cart/components/AddToCartCatalog/AddToCartCatalog';

const PriceBlock = ({product}) => {
    const {user, isAgent} = useAuth()
    const { getCartItem , selectedMode, calculateProductByQuantityAndPackage} = useCart();
    const inCart = getCartItem(product);
    return (
        <div className="price-and-addtocart-cont">
        {(user && selectedMode) && product.finalPrice && product.finalPrice != 0 && !product.IsParent && parseInt(product.stock) != 0 ?
            <div className="price-cont flex-container">
                <div className="price-cont-sub top col-lg-12 flex-container">
                    <div className="price-cont-sub-right-box col-lg-4">
                        <p className="row-title">{"מחיר יח'"}</p>
                        <p className="row-val price">{parseFloat(product.finalPrice).toFixed(1)}</p>
                    </div>
                    <div className="price-cont-sub-right-box  col-lg-4">
                        <p className="row-title">{'הנחה'}</p>
                        {isAgent && user && selectedMode ? 
                            <input id={"inputPrice_"+product.sku}
                                type="number"
                                onClick={()=> this.selectInput(product.sku, '#inputPrice_')}
                                onChange={this.props.agentRepriceDiscount.bind(this, product)}
                                onBlur={this.props.agentRepriceValidate.bind(this,product)}
                                value={product.discount}
                            />
                        :
                            <p className="row-val percent">{product.discount ?? 0}</p>
                        }
                    </div>
                    <div className="price-cont-sub-right-box  col-lg-4">
                        <p className="row-title highlight-p-cls">{"סה״כ"}</p>
                        {isAgent && user &&  selectedMode ? 
                            <input id={"inputDiscount_"+product.sku}
                                className=''
                                type="number"
                                onClick={()=> this.selectInput(product.sku, '#inputDiscount_')}
                                onChange={this.props.agentReprice.bind(this, product)}
                                onBlur={this.props.agentRepriceValidate.bind(this,product)}
                                value={parseFloat(parseFloat(product.Price).toFixed(1))}
                            />
                        :
                            <p className="row-val price highlight-p-cls">{parseFloat(parseFloat(product.finalPrice).toFixed(1))}</p>
                        }
                    </div>
                </div>
                <div className="price-cont-sub col-lg-12 flex-container">
                    <div className="price-cont-sub-left-box col-lg-6">
                        <p className="row-title highlight-p-cls">{"יח' להזמנה"}</p>
                        <p className="row-val no-bg highlight-p-cls">{inCart?.sku ? (parseFloat(inCart.quantity) * parseInt(product.packQuantity)).toFixed(1) : '0'}</p>
                    </div>
                    <div className="price-cont-sub-right-box  col-lg-6">
                        <p className="row-title">{'סה״כ להזמנה'}</p>
                        <p className="row-val no-bg price">{calculateProductByQuantityAndPackage(inCart)}</p>
                    </div>
                </div>
            </div>
        : null}

        {(user && selectedMode) && product.finalPrice && product.finalPrice != 0 && !product.IsParent && parseInt(product.stock) != 0 ?
            <div className={inCart.length ? "add-to-cart in-cart catalog after-add" : "add-to-cart not-in-cart catalog before-add"}>
                <AddToCartCatalog item={product}/>
            </div>
        : null}
    </div>
    );
};

export default PriceBlock;