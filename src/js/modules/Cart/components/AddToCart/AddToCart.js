import React, {Fragment} from 'react';
import useCart from '../../store/CartStore';
import useModal from '../../../Modals/store/SelectedProductStore';
import { useModals } from '../../../Modals/provider/ModalsProvider';
import useSelectedProduct from '../../../Modals/store/SelectedProductStore';

const AddToCart = ({item}) => {
    const {cart,addToCart,increaseCart,decreaseCart, deleteFromCart, changeQuantity, avoidNullInCart} = useCart()
    const {selectedProd} = useSelectedProduct()
    const {openStockNotify,openAddToCartTotify} = useModals()
    const find = cart?.filter((itemCart) => itemCart.sku === item.sku)
    const Quantity = find[0]?.quantity
    const isInCart = find[0]?.sku ? true : false

    const selectInput = (id) =>{
        setTimeout(() => {
            $("#input_"+id).select();
        }, 300);
    }

    const addToCartFunc = () => {
        
        if(parseFloat(item.stock) >= parseFloat(item.packQuantity)) {
            addToCart(item, selectedProd)
            openAddToCartTotify()
        } else {
            openStockNotify()
        }
    }

    const increaseCartFunc = () => {
        if(parseFloat(item.stock) > parseFloat(Quantity)) {
            increaseCart(item.sku)
        } else {
            // openStockNotify()
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
        <>
        
        {parseInt(item.stock) !== 0 ?
        <div className="product-page barcode-pop">
            <div className="wrapp flex-container" onClick={!isInCart ? () =>  addToCartFunc() : null}>
                <div className="col-lg-4 fx-btn MyCenetred" onClick={() => increaseCartFunc()}>
                    <span className="material-symbols-outlined" style={{color:'white'}}>add</span>
                </div>
                {isInCart ?
                    <Fragment>
                    <div className="col-lg-4">
                        <input id={"input_"+item.sku}
                        type="number"
                        value={Quantity}
                        onChange={(e) => onChangeQuantityFunc(e.target.value)}
                        onBlur={() => avoidNullInCart(item.sku)}
                        onClick={() => selectInput(find)}
                        />
                    </div>
                    <div className="col-lg-4 fx-btn MyCenetred" onClick={isInCart && Quantity> 1 ? () => decreaseCart(item.sku) : () => deleteFromCart(item.sku)}>
                        <span className="material-symbols-outlined" style={{color:'white'}}>remove</span>
                    </div>
                    </Fragment>
                :
                <>
                    {parseInt(item.stock) !== 0 ?
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