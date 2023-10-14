import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import Calendar from 'react-calendar';
import SweetAlert from 'sweetalert2';

let appState;

export default class AgentPricing extends Component {
	constructor(props){
		super(props);
		this.state = {
      changePriceObj:[],
      date: new Date(),
      prevDate: "",
      agentPrice:""

    }
    this.saveAgentPrice = this.saveAgentPrice.bind(this);


	}
	componentDidMount(){
    if(this.props.state.changePriceObj){
      let changePriceObj = this.props.state.changePriceObj;
      this.setState({changePriceObj})
    }

	}
  changeValue(e){

    this.setState({agentPrice: e.target.value});

  }



  saveAgentPrice(){

    let agentPrice = this.state.agentPrice;
    if(agentPrice != ""){
      if( parseFloat(agentPrice) >= parseFloat(this.state.changePriceObj.MinPrice) && parseFloat(agentPrice) <= parseFloat(this.state.changePriceObj.MaxPrice) ){
        this.props.saveAgentPrice(agentPrice);

      }else{
        SweetAlert({
          title: 'אינך עומד בטווח המחירים המוגדר',
          type: 'info',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);
      }
    }else{
      SweetAlert({
        title: 'הזמן מחיר ללקוח',
        type: 'info',
        showConfirmButton: false,
        timer: 4000
      }).catch(SweetAlert.noop);
    }



  }

  togglePerm(val){
    let selectedAgent = this.state.selectedAgent;
    selectedAgent.Super = val;
    this.setState({selectedAgent});

  }
	render(){
		return(
			<div className="wrapper admin-agent-pop AgentPricing">
        <div className="agent-main-cont">
          <div className="all-row-cont">
            {Object.keys(this.state.changePriceObj).length ?
              <div>
                <div className="flex-container row-cont">
                  <div className="col-lg-4">
                    <p>שם</p>
                  </div>
                  <div className="col-lg-8">
                    <p>{this.state.changePriceObj.Title}</p>
                  </div>
                </div>
                <div className="flex-container row-cont">
                  <div className="col-lg-4">
                    <p>מק״ט</p>
                  </div>
                  <div className="col-lg-8">
                    <p>{this.state.changePriceObj.CatalogNumber}</p>
                  </div>
                </div>
                <div className="flex-container row-cont">
                  <div className="col-lg-4">
                    <p>מינימום</p>
                  </div>
                  <div className="col-lg-8">
                    <p>{this.state.changePriceObj.MinPrice}</p>
                  </div>

                </div>

                <div className="flex-container row-cont">
                  <div className="col-lg-4">
                    <p>מקסימום</p>
                  </div>
                  <div className="col-lg-8">
                    <p>{this.state.changePriceObj.MaxPrice}</p>
                  </div>
                </div>
                <div className="flex-container row-cont">
                  <div className="col-lg-4">
                    <p>מומלץ</p>
                  </div>
                  <div className="col-lg-8">
                    <p>{this.state.changePriceObj.RecomendedPrice ? this.state.changePriceObj.RecomendedPrice : this.state.changePriceObj.Price}</p>
                  </div>
                </div>

                <div className="flex-container row-cont">
                  <div className="col-lg-4">
                    <p>מחיר ללקוח</p>
                  </div>
                  <div className="col-lg-2">
                    <input
                      type="number"
                      value={this.state.agentPrice}
                      onChange={this.changeValue.bind(this)}
                    />
                  </div>
                </div>

                <div className="btn-container">
                  <div className="add-sale-btn">
                    <p onClick = {this.saveAgentPrice.bind(this)}>שמור</p>
                  </div>
                </div>
              </div>
            :null}
          </div>

        </div>

			</div>
		);
	}
}
