import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import PdfViewer from "./PdfViewer";


export default class TablePopUp extends Component {
	constructor(props){
		super(props);
		this.state = {
      preload: false,
      ttlSum:0,
      linesSelectedSumObj:[],
      pdfViewer: false
		}
	

	}
	componentDidMount(){
      let ttlSum = 0;
      if(this.props.state.tablePopUp.BodyArr && this.props.state.tablePopUp.BodyArr.length){
        this.props.state.tablePopUp.BodyArr.map((element, index) => {
          ttlSum += parseFloat(element[3]);
        })
      }
      ttlSum = ttlSum.toFixed(2);

      this.setState({ttlSum})

	}
	
	getProduct = async(id)=>{
	}
  
  setPreload=()=>{
    this.setState({preload: true});
  }

  unsetPreload=()=>{
    this.setState({preload: false});
  }

  clickOnCol=(index,element,ind,el)=>{
    if(this.props.state.openDept && !el.includes('pdf')){
      //this.props.state.tablePopUp.BodyArr
      //
      let linesSelectedSumObj = this.state.linesSelectedSumObj
      let findObjInArr = linesSelectedSumObj.filter(item => item.Row == index);

      
      if(findObjInArr && findObjInArr.length > 0){
        linesSelectedSumObj = linesSelectedSumObj.filter(item => item.Row != index);
      }else{
        let object ={Row: index, Ttl: element[3]};
        linesSelectedSumObj.push(object);
      }

      this.setState({linesSelectedSumObj})
    }
  }

  downloadFile = async(element, fileType) => {

    this.setState({preload:true, morePop: false});

    let ordId = element.split('_')[1];
    let val = {
      ext_id: ordId,
      fileType: fileType
    };
    

    const valAjax = {
      funcName: 'GetProducts',
      point: 'download_xls',
      val:val
    };

    try {
      let data;
      if(localStorage.agent && !this.props.props.state.orderObject){
        data = await this.props.props.ajax(valAjax);
      }else{
        data = await this.props.props.props.ajax(valAjax);
      }


      if (data.result == "success") {
        let tmpUrl = entry + '/output/' + data.link;

        this.setState({pdfViewer: tmpUrl})
        /*
        if((!this.props.props.state.orderObject &&  this.props.props.state.appId=="") || (this.props.props.state.orderObject && this.props.props.props.state.appId == '')){
          var win = window.open(tmpUrl, '_blank');
        }else{
          var ref = cordova.InAppBrowser.open(tmpUrl, '_system', 'location=yes');
        }
        */
      }

      this.setState({preload:false});

    } catch(err) {
      //this.props.connectionError('connection error GetSales');
      console.log('connection error GetSales');
      this.setState({preload:false});
    }

  }

  directDownload = () => {
    let tmpUrl = this.state.pdfViewer;
    if((!this.props.props.state.orderObject &&  this.props.props.state.appId=="") || (this.props.props.state.orderObject && this.props.props.props.state.appId == '')){
      var win = window.open(tmpUrl, '_blank');
    }else{
      var ref = cordova.InAppBrowser.open(tmpUrl, '_system', 'location=yes');
    }
  }

	render(){
     //debugger;
     //let prop = this.props.state.tablePopUp.HeaderObj;
    let linesSelectedSumView = 0;
     if(this.state.linesSelectedSumObj){
      this.state.linesSelectedSumObj.map((element, index) => {
        linesSelectedSumView += parseFloat(element.Ttl)
      })
      linesSelectedSumView = linesSelectedSumView.toFixed(1);
     }
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
       
          {this.props.state.tablePopUp.PageTitleObj && Object.keys(this.props.state.tablePopUp.PageTitleObj).length  ? 
            <div className="for-calendar flex-container card">
              <div className="golbal-header">
                {this.props.state.tablePopUp.PageTitleObj.Title &&
                  <h3 className="mainTitle">{this.props.state.tablePopUp.PageTitleObj.Title}</h3>
                }
                {this.props.state.tablePopUp.PageTitleObj.CustTitle &&
                  <p className="subTitle">{this.props.state.tablePopUp.PageTitleObj.CustTitle}</p>
                }
                {this.props.state.tablePopUp.PageTitleObj.CustExId &&
                  <p className="subTitle">{"#" + this.props.state.tablePopUp.PageTitleObj.CustExId}</p>
                }
              </div>
            </div>
          :null}
          
          {this.state.pdfViewer ? ReactDOM.createPortal(
            <div className="my-modal pdf-viewer">
              <div className="modal-wrapper animated">
                <div className="close-cont">
                  <div
                    onClick={() => this.setState({pdfViewer: !this.state.pdfViewer})}
                    className="close">
                    <span className="material-symbols-outlined">close</span>
                  </div>
                  <div
                    onClick={() => this.directDownload()}
                    className="pdf">
                    <span className="material-symbols-outlined">download</span>
                  </div>
                </div>
                <PdfViewer {...this} />
              </div>
              <div onClick={this.close} className="overflow"></div>
            </div>,
            document.getElementById('modal-root')
          ) : null}

           <div id='lines-main-cont' className={this.props.state.openDept ? "lines-main-cont openDept" : "lines-main-cont"}>
               
              <table className="lines-sub-cont">
                <tbody>
                  <tr className="heading">
                    {this.props.state.tablePopUp.HeaderObj && this.props.state.tablePopUp.HeaderObj.length ? this.props.state.tablePopUp.HeaderObj.map((element, index) => {
                        return(
                          <th key={index} className="col-cont">
                              <p>{element}</p>
                          </th>
                        )
                      }):null}
                  </tr>
                  {this.props.state.tablePopUp.BodyArr && this.props.state.tablePopUp.BodyArr.length ? this.props.state.tablePopUp.BodyArr.map((element, index) => {
                    return(
                        <tr key={index} className={"item"}>
                            {element.map((el, ind) => {
                              let findObjInArr = this.state.linesSelectedSumObj.filter(item => item.Row == index);
                              return(
                                <th key={ind} className={findObjInArr && findObjInArr.length > 0 ? "col-cont color": "col-cont"} onClick={()=>this.clickOnCol(index,element,ind, el)}>
                                  {!String(el).includes('pdf') ? 
                                    <p>{el}</p>
                                  :
                                    <span onClick={()=>this.downloadFile(el, 'pdf')} className="material-symbols-outlined">picture_as_pdf</span>

                                  }
                                </th>
                              )
                            })}
                        </tr>
                    );
                  }):null}
                </tbody>
              </table>
            </div>
            {this.props.state.openDept ? 
                <div className="sum-cont">
                  <div className="sum-row-cont">
                    <p className="row-title">סה״כ שורות</p>
                    <p className="row-value">{this.state.ttlSum}</p>
                  </div>
                  <div className="sum-row-cont">
                    <p className="row-title">סה״כ שורות נבחרות</p>
                    <p className="row-value">{linesSelectedSumView}</p>
                  </div>
                </div>
            : null}
     
			</div>
		)
	}
}
