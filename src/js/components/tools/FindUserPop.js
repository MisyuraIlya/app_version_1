import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import SearchHookFindUser from "./SearchHookFindUser";

export default class FindUserPop extends Component {
	constructor(props){
		super(props);
		this.state = {
      preload: false,
      object:[],
      searchProds:[],
      selectedUser:[]

		}
	

	}
	componentDidMount(){
    let selectedUser = {
      'ExId': this.props.state.findUserPop.ExId
    }
    this.setState({object: this.props.state.findUserPop, selectedUser})
	}
	
	getProduct = async(id)=>{
     
	}
  setPreload=()=>{
    this.setState({preload: true});
  }
  unsetPreload=()=>{
    this.setState({preload: false});
  }

  changeState = (val) => {
    this.setState({selectedUser:val,searchProds:[]})
  }

  searchPhpFunc = async (value, mode) => {

    this.setState({searchString: value})
    if (value && value != "") {

      this.setState({preload: true, showNotFound: false})

      let val = {
        'searchParam': value,
        'agentExId': localStorage.agentExId,
        'page': 1

      }

      const valAjax = {
        funcName: 'SearchUsersAgent',
        point: 'users',
        val: val
      };
      try {
        const data = await this.props.props.ajax(valAjax);
        let encodeData = JSON.parse(data);

        this.setState({preload: false})

        this.setState({searchProds: encodeData.users, showNotFound: true});
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
    
    this.props.closeSpecialSettingsPop(this.state.selectedUser);
  }
	render(){
     //debugger;
     //let prop = this.props.state.tablePopUp.HeaderObj;
      return(
        <div className="tablePopUp docs findUser">
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
                <h3 className="mainTitle">{'הזרם הזמנה לסל קניות'}</h3>
              </div>
            </div>
            <div className="prod-info-cont flex-container">
                  <div className="col-lg-3">
                    <p className="c-title">{'לקוח'}</p>
                  </div>
                  <div className="col-lg-9">
                    {Object.keys(this.state.object).length ? 
                      <SearchHookFindUser searchPhpFunc={this.searchPhpFunc}
                            changeState={this.changeState}
								            searchProds={this.state.searchProds} preload={this.state.preload}
								            showNotFound={this.state.showNotFound} props={this.props}
								            closeSearchMob={this.closeSearchMob} popObject={this.state.object}
                            initSearchVal={this.state.object}/>
                        :null}
                  </div>
              </div >
          </div>
        
          <div className="MyButton">
            <button onClick={()=>this.saveSpecialSettingsLocal()}>אישור</button>
          </div>
        </div>
      )
  }
}
