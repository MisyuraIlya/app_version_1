import React from 'react';

const OrderItemProd = ({element,index}) => {
    return (
        <tr key={index} className={!element.IsChangedAgent ? "item" : 'item alert'} id={'docRow_' + element.Id}>
            <th className="col-cont sticky-col" onClick={()=>this.setProdPopUp(element)}>
                <p className='AccountKey  no-margin'>{'#' + element?.product?.sku}</p>
                <p className='AccountName  no-margin'>{element?.product?.title}</p>
            </th>
            <th className="col-cont">
                <p>{element?.quantity}</p>
            </th>
            <th className="col-cont">
                <p>{element?.discount}</p>
            </th>
            
            <th className="col-cont">
                <div className="wrapp">
                    <input className='input-cls' id={"inputQuantity_"+ element?.product?.sku}
                    // onClick={()=> this.selectInput('#inputQuantity_' + element?.product?.sku)}
                    // onChange={this.updateItemsState.bind(this, element, 'Quantity')}
                    // onBlur={this.checkOnBlur.bind(this, element, 'Quantity')}

                    type="number"
                    value={element?.quantity}
                    />
                </div>
            </th>
            <th className="col-cont">
                <div className="wrapp">
                <input className='input-cls' id={"inputSinglePrice_"+element?.product?.sku}
                    // onClick={()=> this.selectInput('#inputSinglePrice_' + element?.product?.sku)}
                    // onChange={this.updateItemsState.bind(this, element, 'SinglePrice')}
                    // onBlur={this.checkOnBlur.bind(this, element, 'SinglePrice')}
                    type="number"
                    value={element?.singlePrice}
                />
                </div>
            </th>
            <th className="col-cont">
                <div className="wrapp">
                <input className='input-cls' id={"input_Discount_"+element?.product?.sku}
                    // onClick={()=> this.selectInput('#input_Discount_' + element?.product?.sku)}
                    // onChange={this.updateItemsState.bind(this, element, 'Discount')}
                    // onBlur={this.checkOnBlur.bind(this, element, 'Discount')}
                    type="number"
                    value={element?.discount}
                />
                </div>
            </th>
            <th className="col-cont">
                <div className="wrapp">
                <input className='input-cls' id={"input_Discount_"+element?.product?.sku}
                    // onClick={()=> this.selectInput('#input_Discount_' + element?.product?.sku)}
                    // onChange={this.updateItemsState.bind(this, element, 'Discount')}
                    // onBlur={this.checkOnBlur.bind(this, element, 'Discount')}
                    type="number"
                    value={element?.total}
                />
                </div>
            </th>
            

        </tr>
    );
};

export default OrderItemProd;