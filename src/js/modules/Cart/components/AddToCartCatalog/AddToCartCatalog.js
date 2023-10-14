import React, {Fragment} from 'react';
import useCart from '../../store/CartStore';
import useModal from '../../../Modals/store/SelectedProductStore';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';

const AddToCartCatalog = ({item}) => {
    const {cart,addToCart,increaseCart,decreaseCart, deleteFromCart, changeQuantity, avoidNullInCart} = useCart()
    const {openStockNotify,openAddToCartTotify} = useNotificationModal()
    const find = cart?.filter((itemCart) => itemCart.Id === item.CatalogNumber)
    const Quantity = find[0]?.Quantity
    const isInCart = find[0]?.Id ? true : false
    const selectInput = (id) =>{
        setTimeout(() => {
            $("#input_"+id).select();
        }, 300);
    }

    const addToCartFunc = () => {
        if(parseFloat(item.OnHand) >= parseFloat(item.PackQuan)) {
            addToCart(item)
            openAddToCartTotify()
        } else {
            openStockNotify()
        }
    }

    const increaseCartFunc = () => {
        if(parseFloat(item.OnHand) > parseFloat(Quantity)) {
            increaseCart(item.CatalogNumber)
        } else {
            openStockNotify()
        }
    }

    const onChangeQuantityFunc = (value) => {
        if(parseFloat(item.OnHand) >= (value * parseFloat(item.PackQuan))) {
            changeQuantity(item.CatalogNumber, value)
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
                                <input id={"input_"+item.CatalogNumber}
                                type="number"
                                value={Quantity}
                                onChange={(e) => onChangeQuantityFunc(e.target.value)}
                                onBlur={() => avoidNullInCart(item.CatalogNumber)}
                                onClick={() => selectInput(find)}
                                />
                            </div>
                            <div className="col-lg-4 fx-btn" onClick={isInCart && Quantity> 1 ? () => decreaseCart(item.CatalogNumber) : () => deleteFromCart(item.CatalogNumber)}>
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