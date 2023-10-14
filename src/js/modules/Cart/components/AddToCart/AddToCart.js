import React, {Fragment} from 'react';
import useCart from '../../store/CartStore';
import useModal from '../../../Modals/store/SelectedProductStore';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';
import useSelectedProduct from '../../../Modals/store/SelectedProductStore';

const AddToCart = ({item}) => {
    const {cart,addToCart,increaseCart,decreaseCart, deleteFromCart, changeQuantity, avoidNullInCart} = useCart()
    const {selectedProd} = useSelectedProduct()
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
            console.log('here')
            addToCart(item, selectedProd)
            openAddToCartTotify()
        } else {
            console.log('here2')
            openStockNotify()
        }
    }

    const increaseCartFunc = () => {
        console.log('item.OnHand',item)
        if(parseFloat(item.OnHand) > parseFloat(Quantity)) {
            increaseCart(item.CatalogNumber)
        } else {
            // openStockNotify()
        }
    }

    const onChangeQuantityFunc = (value) => {
        if(parseFloat(item.OnHand) >= (value * parseFloat(item.PackQuan))) {
            changeQuantity(item.CatalogNumber, value)
        } else {
            openStockNotify()
        }
    }
    console.log('selectedProd',selectedProd)
    return (
        <>
        
        {parseInt(item.OnHand) !== 0 ?
        <div className="product-page barcode-pop">
            <div className="wrapp flex-container" onClick={!isInCart ? () =>  addToCartFunc() : null}>
                <div className="col-lg-4 fx-btn" onClick={() => increaseCartFunc()}>
                    <img src={globalFileServer + 'icons/plus-clean.svg'}/>
                </div>
                {isInCart ?
                    <Fragment>
                    <div className="col-lg-4">
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
                    </Fragment>
                :
                <>
                    {parseInt(item.OnHand) !== 0 ?
                        <div className="col-lg-8">
                            <p>{'הוספה לסל'}</p>
                        </div>
                        :
                        <div className="">
                            <span className="material-symbols-outlined">info</span>
                            <p className="red">{'אזל המלאי'}</p>
                        </div>
                    }
                </>

                }
            </div>
        </div>
        :
        <div className="" style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <span className="material-symbols-outlined">info</span>
            <p className="red" style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>{'אזל המלאי'}</p>
        </div>

        }
        </>

    );
};

export default AddToCart;