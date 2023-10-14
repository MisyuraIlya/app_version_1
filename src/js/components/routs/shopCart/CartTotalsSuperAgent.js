import React, { useEffect, useState } from 'react';

const CartTotalsSuperAgent = ({items, orderObject, props, updateGlbItemsState, setFinalPriceNoVat}) => {


    let discount = orderObject.Discount;
    if(discount){
        discount = parseFloat(orderObject.Discount);
    }else{
        discount = 0;
    }
    let initSum = (parseFloat(orderObject.PriceNoVat) * 100 / (100-discount)).toFixed(1);
    let lineSum = 0;
    let costSum = 0;
    let singleVolume = 0;
    let lineVolume = 0;
    let volumeTotal = 0;
    let profitPercMin = props.state.defaults.profitPercMin;
    let boxesInpallete = props.state.defaults.boxesInPallete;
    let minPalletVal = props.state.defaults.minPalletVal;
    let masterCalc = 0;

    let boxQuant = 0;
    let boxVol = props.state.defaults.boxVol;

    let likutCounter = 0;
    items.map((element, index) => {
        lineSum += (parseFloat(element.SinglePrice) * parseFloat(element.PackQuan) * element.Quantity);
        costSum += (parseFloat(element.PriceCost) * parseFloat(element.PackQuan) * element.Quantity);

        masterCalc = (parseFloat(element.MasterL) * parseFloat(element.MasterW) * parseFloat(element.MasterH));
        if(masterCalc!=0){
            boxQuant += boxVol/masterCalc * element.Quantity;
        }

        parseInt(element.MasterCarton) == 0 ? element.MasterCarton = 1 : null;
        singleVolume = masterCalc / parseFloat(element.MasterCarton);
        lineVolume = parseFloat(element.PackQuan) * element.Quantity * singleVolume;
        volumeTotal += lineVolume;

        if(parseInt(element.Quantity)!=0){
            likutCounter++;
        }
    });
    //boxQuant = volumeTotal/boxVol;
    boxQuant = Math.ceil(boxQuant);
    let PalleteVol = props.state.defaults.PalleteVol;

    let palleteQuant = volumeTotal/PalleteVol;
    palleteQuant = Math.ceil(palleteQuant);
    let priceAfterDiscount = lineSum - (lineSum * discount) / 100;
    let vat = priceAfterDiscount * parseFloat(props.state.defaults.Maam) /100;
    let toPay = priceAfterDiscount + vat;

    let profitSum = (lineSum - costSum);
    let profitPerc = (1-(costSum/priceAfterDiscount))*100;

    let deliveryPrice = 0;
    if(palleteQuant>1){
        deliveryPrice = (props.state.defaults.PalletePrice * Math.ceil(palleteQuant));
    }else{
        deliveryPrice = (props.state.defaults.BoxPrice * Math.ceil(boxQuant));
    }

    
    let likutTtl = props.state.defaults.LikutPrice * likutCounter;

    let profitNeto = profitSum - deliveryPrice - likutTtl;
    let profitNetoPerc = (1-((costSum+deliveryPrice+likutTtl)/priceAfterDiscount))*100;


    const numberWithCommas = (x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const selectInput = (id) =>{
        setTimeout(() => {
            $(id).select();
        }, 300);
    }
    return (
        <div className='cartTotalSuperAgent-main-cls'>
            <div className='cartTotalSuperAgent-sub-cls'>
                <div className='cartTotalSuperAgent-subber-cls'>
                    <h1>סיכום</h1>
                    <ul>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>כמות שורות</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{items ? items.length : '0'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>סה״כ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(lineSum.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>הנחה כללית</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <div className="wrapp">
                                <input className='input-cls' id={"input_Discount"}
                                    onClick={()=> selectInput('#input_Discount')}
                                    onChange={(e)=> updateGlbItemsState('Discount',e)}
                                    type="number"
                                    value={discount}
                                />
                            </div>
                            </div>
                        </li>
                    
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>אחרי הנחה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(priceAfterDiscount.toFixed(1)) +  ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>מע״מ</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(vat.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>לתשלום</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(toPay.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>רווח</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(profitSum.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className={parseFloat(profitPerc) > profitPercMin ? 'row-cls flex-container' : 'row-cls flex-container alert'}>
                            <div className='title-cls col-lg-8'>
                                <p>אחוז רווח</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{profitPerc.toFixed(1) + '%'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container top-border'>
                            <div className='title-cls col-lg-8'>
                                <p>מס' ארגזים</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{boxQuant.toFixed(1)}</p>
                            </div>
                        </li>
                        <li className={parseFloat(palleteQuant) > minPalletVal ? 'row-cls flex-container' : 'row-cls flex-container alert'}>
                            <div className='title-cls col-lg-8'>
                                <p>מס' משטחים</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{palleteQuant.toFixed(1)}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>עלות הובלה</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{deliveryPrice.toFixed(1) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container bottom-border'>
                            <div className='title-cls col-lg-8'>
                                <p>עלות ליקוט</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{likutTtl.toFixed(1)  + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>רווח נטו</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(profitNeto.toFixed(1)) + ' ₪'}</p>
                            </div>
                        </li>
                        <li className='row-cls flex-container'>
                            <div className='title-cls col-lg-8'>
                                <p>אחוז רווח נטו</p>
                            </div>
                            <div className='value-cls col-lg-4'>
                            <p>{numberWithCommas(profitNetoPerc.toFixed(1)) + '%'}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartTotalsSuperAgent;