import React, {Fragment} from 'react';
import useCart from '../../store/CartStore';
import useModal from '../../../Modals/store/SelectedProductStore';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';

const AddToCartCatalog = ({item}) => {
    const {cart,addToCart,increaseCart,decreaseCart, deleteFromCart, changeQuantity, avoidNullInCart} = useCart()
    const {openStockNotify,openAddToCartTotify} = useNotificationModal()
    const find = cart?.filter((itemCart) => itemCart.sku === item.sku)
    const Quantity = find[0]?.quantity
    const isInCart = find[0]?.sku ? true : false
    const selectInput = (id) =>{
        setTimeout(() => {
            $("#input_"+id).select();
        }, 300);
    }

    const addToCartFunc = () => {
        console.log('item',item)
        if(parseFloat(item.stock) >= parseFloat(item.packQuantity)) {
            addToCart(item)
            openAddToCartTotify()
        } else {
            openStockNotify()
        }
    }

    const increaseCartFunc = () => {
        if(parseFloat(item.stock) > parseFloat(Quantity)) {
            increaseCart(item.sku)
        } else {
            openStockNotify()
        }
    }

    const onChangeQuantityFunc = (value) => {
        if(parseFloat(item.stock) >= (value * parseFloat(item.packQuantity))) {
            changeQuantity(item.sku, value)
        } else {
            openStockNotify()
        }
    }

    return (
        <div className="product-page barcode-pop">
            <div className="wrapp flex-container" >
                {isInCart ?
                    <Fragment>
                        <div className="col-lg-12 flex-container add-to-cont-after">
                            <div className="col-lg-4 fx-btn" onClick={() => increaseCartFunc()}>
                                <img src={globalFileServer + 'icons/plus-clean.svg'}/>
                            </div>
                            <div className="col-lg-4 input-cont">
                                <input id={"input_"+item.sku}
                                type="number"
                                value={Quantity}
                                onChange={(e) => onChangeQuantityFunc(e.target.value)}
                                onBlur={() => avoidNullInCart(item.sku)}
                                onClick={() => selectInput(find)}
                                />
                            </div>
                            <div className="col-lg-4 fx-btn" onClick={isInCart && Quantity> 1 ? () => decreaseCart(item.sku) : () => deleteFromCart(item.sku)}>
                                <img
                                src={globalFileServer + 'icons/cart_minus.svg'}
                                />
                            </div>
                        </div>
                    </Fragment>
                :
                <div className="col-lg-12 flex-container add-to-cont-before" onClick={!isInCart ? () =>  addToCartFunc() : null}>
                    <div className="col-lg-12">
                    <p>{'הוספה לסל'}</p>
                    </div>
                </div>
                }
            </div>
		</div>
    );
};

export default AddToCartCatalog;