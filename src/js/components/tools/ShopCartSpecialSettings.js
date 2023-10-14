import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import SearchHook from "./SearchHook";

export default class ShopCartSpecialSettings extends Component {
	constructor(props){
		super(props);
		this.state = {
      preload: false,
      object:[],
      searchProds:[],
      alertInputs:false

		}
	

	}
	componentDidMount(){
    let object =  {};
    if(localStorage.orderSpecialSetting){
       
      object =  JSON.parse(localStorage.orderSpecialSetting);
      !object.CustName ? object.CustName = '' : null;
      !object.CustAddress ? object.CustAddress = '' : null;
      !object.CustCity ? object.CustCity = '' : null;
      !object.CustMobile ? object.CustMobile = '' : null;
      !object.CustPurchaseOrder ? object.CustPurchaseOrder = '' : null;

      
    }else{
      object =  {
        CustName: '',
        CustAddress: '',
        CustCity: '',
        CustMobile: '',
        CustPurchaseOrder: '',
        TeumaSpaka: false,
        TeudatMishloah: false,
        Govayna: false,
        IsufAtzmi: false,
        B2c: false
      };
    }
    
    this.setState({object})
	}
	
	getProduct = async(id)=>{
	}

  setPreload=()=>{
    this.setState({preload: true});
  }
  
  unsetPreload=()=>{
    this.setState({preload: false});
  }

  changeState = (param, val) => {
    let object = this.state.object;

    let deny = false;
    if(param == 'IsufAtzmi' && val && object.B2c){
      deny = true;
    }
    if(param == 'B2c' && val && object.IsufAtzmi){
      deny = true;
    }
    if(!deny){
      object[param] = val;
      this.setState({object,searchProds:[]})
    }
   
  }

  searchPhpFunc = async (value, mode) => {

    this.setState({searchString: value})
    if (value && value != "") {

      this.setState({preload: true, showNotFound: false})

      let val = {
        'action': 'getCities',
        'searchParam': value
      }

      const valAjax = {
        funcName: '',
        point: 'products_per_category_view',
        val: val
      };
      try {
        const data = await this.props.props.ajax(valAjax);
        let encodeData = JSON.parse(data);
        this.setState({preload: false})

        this.setState({searchProds: encodeData.items, showNotFound: true});
      } catch (err) {
        console.log('connection error docs');
        this.setState({preload: false});
      }

    } else {
      this.setState({searchProds: []});
      this.setState({preload: false, showNotFound: false})

    }
  }

  saveSpecialSettingsLocal = () => {
    let object = this.state.object;
    let isGo = true;
    if(object.CustAddress != '' || object.CustCity!=''){
      if(object.CustAddress!='' && object.CustCity!='' && object.CustMobile!=''){
        isGo = true;
      }else{
        isGo = false;
        this.setState({alertInputs : true})
      }
    }
    if(isGo){
      object.CustName == '' ? object.CustName = false : null;
      object.CustAddress == '' ? object.CustAddress = false : null;
      object.CustCity == '' ? object.CustCity = false : null;
      object.CustMobile == '' ? object.CustMobile = false : null;
      object.CustPurchaseOrder == '' ? object.CustPurchaseOrder = false : null;

      localStorage.orderSpecialSetting = JSON.stringify(object);
      this.props.closeSpecialSettingsPop();
    }
  }
	render(){
     //debugger;
     //let prop = this.props.state.tablePopUp.HeaderObj;
     return(
        <div className="tablePopUp docs">
          {this.state.preload ?
            <div className="spinner-wrapper">
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          : null}
        
          <div className="pop-details">
            <div className="for-calendar flex-container card">
              <div className="golbal-header">
                <h3 className="mainTitle">{'שם וכתובת מיוחדים לאספקה'}</h3>
              </div>
            </div>
              <div className="prod-info-cont flex-container">
                  <div className="col-lg-5">
                    <p className="c-title">{'שם לקוח לאספקה'}</p>
                  </div>
                  <div className="col-lg-6">
                  <input
                      type="text"
                      value={this.state.object.CustName}
                      onChange={(e)=>this.changeState('CustName', e.target.value)}
                  />

                  </div>
              </div >
              <div className="prod-info-cont flex-container">
                  <div className="col-lg-5">
                    <p className="c-title">{'כתובת אספקה'}</p>
                  </div>
                  <div className={!this.state.alertInputs ? "col-lg-6 input-cont" : "col-lg-6 input-cont alert"}>
                  <input
                      type="text"
                      value={this.state.object.CustAddress}
                      onChange={(e)=>this.changeState('CustAddress', e.target.value)}
                  />
                  </div>
              </div >
              <div className="prod-info-cont flex-container">
                  <div className="col-lg-5">
                    <p className="c-title">{'עיר'}</p>
                  </div>
                  <div className={!this.state.alertInputs ? "col-lg-6 input-cont" : "col-lg-6 input-cont alert"}>
                    {Object.keys(this.state.object).length ? 
                      <SearchHook searchPhpFunc={this.searchPhpFunc}
                              changeState={this.changeState}
								            searchProds={this.state.searchProds} preload={this.state.preload}
								            showNotFound={this.state.showNotFound} props={this.props}
								            closeSearchMob={this.closeSearchMob} popObject={this.state.object}/>
                    :null}
                  </div>
              </div >
              <div className="prod-info-cont flex-container">
                  <div className="col-lg-5">
                    <p className="c-title">{'נייד'}</p>
                  </div>
                  <div className={!this.state.alertInputs ? "col-lg-6 input-cont" : "col-lg-6 input-cont alert"}>
                    <input
                      type="text"
                      value={this.state.object.CustMobile}
                      onChange={(e)=>this.changeState('CustMobile', e.target.value)}
                  />
                  </div>
              </div >
              <div className="prod-info-cont flex-container">
                  <div className="col-lg-5">
                    <p className="c-title">{"מס' הזמנת רכש"}</p>
                  </div>
                  <div className="col-lg-6">
                  <input
                      type="text"
                      value={this.state.object.CustPurchaseOrder}
                      onChange={(e)=>this.changeState('CustPurchaseOrder', e.target.value)}
                  />
                  </div>
              </div >
          </div>
          <div className="pop-checkbox-cont">
            <div className="filter-row">
              <div 
                className={this.state.object.TeumaSpaka ? "checkBox active" : "checkBox"}
                onClick={()=>this.changeState('TeumaSpaka', !this.state.object.TeumaSpaka)}
              ></div>
              <p>{'תיאום אספקה'}</p>
            </div>
            <div className="filter-row">
              <div 
                className={this.state.object.TeudatMishloah ? "checkBox active" : "checkBox"}
                onClick={()=>this.changeState('TeudatMishloah', !this.state.object.TeudatMishloah)}
              ></div>
              <p>{'תעודת משלוח'}</p>
            </div>
            <div className="filter-row">
              <div 
                className={this.state.object.Govayna ? "checkBox active" : "checkBox"}
                onClick={()=>this.changeState('Govayna', !this.state.object.Govayna)}
              ></div>
              <p>{'גוביינא'}</p>
            </div>
            <div className="filter-row">
              <div 
                className={this.state.object.IsufAtzmi ? "checkBox active" : "checkBox"}
                onClick={()=>this.changeState('IsufAtzmi', !this.state.object.IsufAtzmi)}
              ></div>
              <p>{'איסוף עצמי'}</p>
            </div>
            <div className="filter-row">
              <div 
                className={this.state.object.B2c ? "checkBox active" : "checkBox"}
                onClick={()=>this.changeState('B2c', !this.state.object.B2c)}
              ></div>
              <p>{'משלוח B2C'}</p>
            </div>
          </div>
          <div className="MyButton">
            <button onClick={()=>this.saveSpecialSettingsLocal()}>שמור</button>
          </div>
        </div>
      )
  }
}
