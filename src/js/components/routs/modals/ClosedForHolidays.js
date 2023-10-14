import React, { Component, Fragment, useState, useEffect, useContext } from "react";
import SweetAlert from "sweetalert2";
import Modal from "../../tools/Modal";
import Preload from "../../tools/Preload";

export default class ClosedForHolidays extends Component {
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
          <div className="check-address-main construction-pop shabat-page">
    		    <div className="popup-terminal" id="payPopup">
    		      <div className="popup-wrapper animated zoomIn">
                <div className="absolute-img">
                  <img src={globalFileServer + 'shabat/chala.png'} alt=""/>
                </div>
                <div className="popup-wrapper-main-cont flex-container">
                  <div className="rightside-main-cont col-lg-4">
                    <div className="img">
                      <img src={globalFileServer + 'shabat/candles.png'} alt=""/>
                    </div>
                  </div>
                  <div className="leftside-main-cont col-lg-8">
                    <div className="wrapp">
                      {/*
                      <div className="img">
                        <img src={globalFileServer + 'logo.png'} alt=""/>
                      </div>
                      */}
                      <div className="text-cont">

                        <h2>לקוח יקר,</h2>
                        <h4>האתר בו הנך מבקר שומר שבת וחג, ולכן הגלישה בו אינה מתאפשרת בזמן זה.</h4>
                        <p>האתר ישוב לפעילות רגילה בצאת השבת או החג. באפשרותך להשאיר דף זה פתוח, ובצאת השבת או החג לחץ על ״רענן״.</p>
                        <p></p>

                      </div>
                      <div className="button allow">
                        <p onClick={()=>this.reloadFunc()}>רענן</p>
                      </div>
                    </div>
                  </div>

                </div>
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
