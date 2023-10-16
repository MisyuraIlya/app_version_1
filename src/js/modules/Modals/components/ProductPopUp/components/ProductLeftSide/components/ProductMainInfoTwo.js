import React, { useEffect } from 'react';
import useSelectedProduct from '../../../../../store/SelectedProductStore';
import { getUserFromStorage } from '../../../../../../Auth/helpers/auth.helper';
import useCart from '../../../../../../Cart/store/CartStore';
import {useAuth} from '../../../../../../Auth/providers/AuthProvider'
import {calPriceWithTax} from '../../../../../../Cart/helpers/calculations'
import { BallClipRotate } from 'react-pure-loaders';
import useSearchStore from '../../../../../../Catalog/store/SearchStore';
import { getDiscountPrecentProduct } from '../../../../../../Cart/helpers/calculations';
const ProductMainInfoTwo = () => {
    const {selectedProd, getItemData, isFetchOnline, loading} = useSelectedProduct()
    const {Maam, selectedMode} = useCart()
    const {isAgent} = useAuth()
    const {searchValue} = useSearchStore()

    useEffect(() => {
        if(searchValue) {
            getItemData()
        }
    },[])
    return (
        <>
        {(isFetchOnline || loading)  ?
            <>
            <div style={{display:'flex',justifyContent:'center'}}>
                <BallClipRotate
                    color={'#000000'}
                    loading={loading}
                />
            </div>
            </>
    
        :
            <>
        {getUserFromStorage() && (
            <>
                {selectedProd.basePrice ? (
                    <div className="prod-info-cont flex-container">
                        <div className="col-lg-3">
                            <p className="c-title">{"מחיר ליח' מקורי"}</p>
                        </div>
                        <div className="col-lg-9">
                            <p className="c-nomber rtl">
                                {selectedProd.basePrice
                                    ? (parseFloat(selectedProd.basePrice)).toFixed(1)
                                    : selectedProd.basePrice}
                            </p>
                        </div>
                    </div>
                ) : null}
                <div className="prod-info-cont input-cont flex-container">
                    <div className="col-lg-3">
                        <p className="c-title">{"הנחה"}</p>
                    </div>
                    <div className="col-lg-9">
                        {isAgent && selectedMode ? (
                            <input
                                id={"inputDiscount_" + selectedProd.Id}
                                type="number"
                                // onClick={() => this.selectInput(selectedProd.Id, "#inputDiscount_")}
                                // onChange={this.props.props.agentRepriceDiscount.bind(
                                //     this,
                                //     selectedProd
                                // )}
                                // onBlur={this.props.props.agentRepriceValidate.bind(
                                //     this,
                                //     selectedProd
                                // )}
                                value={getDiscountPrecentProduct(selectedProd)}
                            />
                        ) : (
                            <p className="c-nomber rtl">
                                {getDiscountPrecentProduct(selectedProd)}
                            </p>
                        )}
                    </div>
                </div>
                <div className="prod-info-cont input-cont flex-container">
                    <div className="col-lg-3">
                        <p className="c-title">{"מחיר ליח"}</p>
                    </div>
                    <div className="col-lg-9">
                        {isAgent && selectedMode ? (
                            <input
                                id={"inputPrice_" + selectedProd.Id}
                                type="number"
                                // onClick={() => this.selectInput(selectedProd.Id, "#inputPrice_")}
                                // onChange={this.props.props.agentReprice.bind(
                                //     this,
                                //     selectedProd
                                // )}
                                // onBlur={this.props.props.agentRepriceValidate.bind(
                                //     this,
                                //     selectedProd
                                // )}
                                value={parseFloat(parseFloat(selectedProd.finalPrice).toFixed(1))}
                            />
                        ) : (
                            <p className="c-nomber rtl">
                                {parseFloat(parseFloat(selectedProd.finalPrice).toFixed(1))}
                            </p>
                        )}
                    </div>
                </div>
                <div className="prod-info-cont input-cont flex-container">
                    <div className="col-lg-3">
                        <p className="c-title">{"כולל מע״מ"}</p>
                    </div>
                    <div className="col-lg-9">
                        {isAgent && selectedMode ? (
                            <input
                                id={"inputPriceVat_" + selectedProd.Id}
                                type="number"
                                // onClick={() => this.selectInput(selectedProd.Id, "#inputPriceVat_")}
                                // onChange={this.props.props.agentRepriceIncVat.bind(
                                //     this,
                                //     selectedProd
                                // )}
                                // onBlur={this.props.props.agentRepriceValidate.bind(
                                //     this,
                                //     selectedProd
                                // )}
                                value={calcVatPrice(selectedProd.finalPrice)}
                            />
                        ) : (
                            <p className="c-nomber rtl">{calPriceWithTax(selectedProd.finalPrice)}</p>
                        )}
                    </div>
                </div>
            </>
        ) }
        {getUserFromStorage() && (
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    {/* <p className="c-title">{"מחיר למארז"}</p> */}
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber rtl">
                        {/* {(parseFloat(selectedProd.Price) * parseInt(selectedProd.PackQuan) * Maam).toFixed(1)} */}
                    </p>
                </div>
            </div>
        )}
            </>
        }

        </>
    );
};

export default ProductMainInfoTwo;