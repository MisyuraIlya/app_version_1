import React, { Component, Fragment, useState, useEffect, useContext } from "react";
import SweetAlert from "sweetalert2";
import Modal from "../../tools/Modal";
import Preload from "../../tools/Preload";
import AgentActions from "../../tools/AgentActions";

export default class AgentActionsPop extends Component {
  state = {
    popup: false
  };
  componentDidMount = () => {
    $("body").addClass("fix");
    $("#root").addClass("blur");
  };
  componentWillUnmount = () => {
    $("body").removeClass("fix");
    $("#root").removeClass("blur");
  };
  reloadFunc=()=>{
    location.reload();
  }
  render() {
		return (
      <Fragment>
        {!this.state.popup ?
          <div className="check-address-main construction-pop agent-actions-pop">
    		    <div className="popup-terminal" id="payPopup">
    		      <div className="popup-wrapper animated zoomIn">
                <div onClick={this.props.closeAgentActionsPop} className="close">
                  <img src={globalFileServer + "icons/close-dark.svg"} />
                  
                </div>
                <AgentActions props={this.props} lang={this.props.lang}/>
    		      </div>
    		    </div>
    		  </div>
        :<Fragment>
          {this.state.popup === 1 ? <SuccessDelivery /> : <ErrorDelivery />}
        </Fragment>}
      </Fragment>
		);
  }
}
