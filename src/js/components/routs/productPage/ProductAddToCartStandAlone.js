import ReactDOM from "react-dom";
import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import Quagga from 'quagga';




export default class ProductAddToCartStandAlone extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
  selectInput = (id) => {
    //$("#input_"+id).focus();
    setTimeout(() => {
      $("#input_"+id).select();
    }, 300);
    //debugger;
  }



	render(){

    let path;
    let saleProdObj = false;

    return(

			<div className="productAddToCartStandAlone">
        <div className="wrapp flex-container">
            <Fragment>
              <div className="col-lg-12 flex-container add-to-cont-after">
                <div className="col-lg-4 fx-btn" onClick={()=> this.props.setListItemQuantity(this.props.listItem, (parseInt(this.props.listItem.Quantity)+1))}>
                  <img src={globalFileServer + 'icons/plus-clean.svg'}/>
                </div>
                <div className="col-lg-4 input-cont">
                  <input id={"input_"+this.props.listItem.CatalogNumber}
                    type="number"
                    value={this.props.listItem.Quantity}
                    onChange={(e)=> this.props.setListItemQuantity(this.props.listItem, e.target.value)}
                    onClick={()=> this.selectInput(this.props.listItem.CatalogNumber)}
                    onBlur={()=> this.props.avoidNullInCart(this.props.listItem)}

                  />
                </div>
                <div className="col-lg-4 fx-btn ri" onClick={()=> parseInt(this.props.listItem.Quantity) > 1 ? this.props.setListItemQuantity(this.props.listItem, (parseInt(this.props.listItem.Quantity)-1)) : null}>
                  <img src={globalFileServer + 'icons/cart_minus.svg'}/>
                </div>
              </div>
            </Fragment>
        </div>
			</div>
		)
	}
}
