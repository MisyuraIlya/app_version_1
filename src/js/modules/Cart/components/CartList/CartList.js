import React from 'react';
import useCart from '../../store/CartStore';
import ProductAddToCart from '../../../../components/routs/productPage/ProductAddToCart';
import FreeList from '../FreeList/FreeList';
import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';
import AddToCart from '../AddToCart/AddToCart';
import { getPriceByOriginalPrice, getDiscountPrecent, calculatePrice } from '../../helpers/calculations';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';
import { useAuth } from '../../../Auth/providers/AuthProvider';
const CartList = () => {
    const {cart, selectedMode, CartTitle, Maam} = useCart()
    const {selectProduct} = useNotificationModal()
    const {isAgent} = useAuth()
    return (
        <div>
            <div className="h1-cont">
                <h1 className="title">{CartTitle()}</h1>
            </div>
            <div className="products doc-container">
                <div id='lines-main-cont' className="lines-main-cont shop-cart-table">
                    <table className="lines-sub-cont">
                        <tbody>
                            <tr className="heading">
                                <th className="col-cont  sticky-col">
                                    <p></p>
                                </th>
                                <th className="col-cont">
                                    <p></p>
                                </th>
                                <th className="col-cont">
                                    <p>פריט</p>
                                </th>
                                <th className="col-cont">
                                    <p>מחיר יח'</p>
                                </th>
                                <th className="col-cont">
                                    <p>הנחה</p>
                                </th>
                                <th className="col-cont">
                                    <p>סה״כ יחידה</p>
                                </th>
                                <th className="col-cont">
                                    <p>יח' במארז</p>
                                </th>
                                <th className="col-cont">
                                    <p>יח' להזמנה</p>
                                </th>
                                <th className="col-cont">
                                    <p>סה״כ להזמנה</p>
                                </th>
                                <th className="col-cont">
                                    <p></p>
                                </th>
                                
                            </tr>
                            {cart.length > 0 ? cart?.map((element, index) => {
                                let price = calculatePrice(element.product, element.quantity, element.UnitChosen); // 37 * 15.5 = 5812.5
                                let discount = getDiscountPrecent(element);
                                let priceByOriginal = getPriceByOriginalPrice(element);
                                return (
                                    <tr key={index} className={"item"} id={'docRow_' + element.Id} >

                                        <th className="col-cont add-to-cart sticky-col">
                                            <AddToCart item={element.product}/>
                                        </th>

                                        <th className="col-cont">
                                            <img className="img"
                                                src={element.product?.ImgPath ? element.product?.ImgPath : globalFileServer + 'products/' + element?.product?.Img }
                                                onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}
                                                onClick={() => selectProduct(element.SelectedProduct)} 
                                            />
                                        </th>

                                        <th className="col-cont" onClick={() => selectProduct(element.SelectedProduct)}>
                                            <p className="catalog">{'#' + element.product.sku}</p>
                                            <p>{element.product.title}</p>
                                        </th>

                                        <th className="col-cont">
                                            <p>{parseFloat(element.product.basePrice)}</p>
                                        </th>

                                        <th className="col-cont">
                                            {isAgent && selectedMode ? 
                                                <input id={"inputPrice_"+element.product.sku}
                                                type="number"
                                                onClick={()=> this.selectInput(element.product.sku, '#inputPrice_')}
                                                // onChange={this.props.agentRepriceDiscount.bind(this, element.Products)}
                                                // onBlur={this.props.agentRepriceValidate.bind(this,element.Products)}
                                                value={discount}
                                            />
                                            :
                                                <p className="row-val percent">{discount}</p>
                                            }
                                        </th>

                                        <th className="col-cont">
                                            {isAgent && selectedMode ? 
                                                <input id={"inputDiscount_"+element.product.sku}
                                                    type="number"
                                                    // onClick={()=> this.selectInput(element.Products.CatalogNumber, '#inputDiscount_')}
                                                    // onChange={this.props.agentReprice.bind(this, element.Products)}
                                                    // onBlur={this.props.agentRepriceValidate.bind(this,element.Products)}
                                                    value={parseFloat(parseFloat(element.product.finalPrice).toFixed(1))}
                                                />
                                            :
                                                <p className="row-val price">{parseFloat(parseFloat(element.product.finalPrice).toFixed(1))}</p>
                                            }
                                        </th>

                                        <th className="col-cont">
                                            <p>{element.product.packQuantity}</p>
                                        </th>

                                        <th className="col-cont">
                                            <p>{parseInt(element.product.packQuantity) * parseInt(element.quantity)}</p>
                                        </th>
                                        
                                        <th className="col-cont">
                                            {parseFloat(priceByOriginal) != parseFloat(price.toFixed(1)) ?
                                                <>
                                                    <p className="price price-p-cls orgCls greyCls">{priceByOriginal}</p>
                                                    <p className="disCls price-p-cls greyCls">{'% ' + discount}</p>
                                                    <p className="price price-p-cls">{price.toFixed(1)}</p>
                                                </>
                                                :
                                                <p className="price price-p-cls">{price.toFixed(1)}</p>
                                            }

                                        </th>

                                        <th className="col-cont">
                                            {discount?
                                                <p className="c1">{'מבצע'}</p>
                                            : null}
                                            {element?.product?.RePrice ?
                                                <div className={"favorite-cont change_price_cont"}>
                                                    <span className="material-symbols-outlined">price_change</span>
                                                </div>
                                        : null}
                                        </th>

                                    </tr>
                                );
                            }) :
                                <h1 className="empty">{'עגלת הקניות שלך ריקה'} </h1>
                            }
                            
                            {/* <FreeList/> */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CartList;