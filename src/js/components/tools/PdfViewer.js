import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import { PDFObject } from 'react-pdfobject'


export default class PdfViewer extends Component {
	constructor(props){
		super(props);
		this.state = {
      preload: false
		}
	

	}
	componentDidMount(){
     
	}
	

  setPreload=()=>{
    this.setState({preload: true});
  }
  unsetPreload=()=>{
    this.setState({preload: false});
  }

  clickOnCol=(index,element,ind)=>{
    if(this.props.state.openDept){
      //this.props.state.tablePopUp.BodyArr
      //
      let linesSelectedSumObj = this.state.linesSelectedSumObj
      let findObjInArr = linesSelectedSumObj.filter(item => item.Row == index);

      
      if(findObjInArr && findObjInArr.length > 0){
        linesSelectedSumObj = linesSelectedSumObj.filter(item => item.Row != index);
      }else{
        let object ={Row: index, Ttl: element[2]};
        linesSelectedSumObj.push(object);
      }

      this.setState({linesSelectedSumObj})
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
        <div  className={"pdf-container"}>
          {/*
          <object data={this.props.state.pdfViewer} type="application/pdf" width="100%" height="95%">
            <p>Unable to display PDF file. <a href="https://foodappeal-b2b.com/output/2023-07-31_16:55:02_order_1014585.pdf">Download</a> instead.</p>
          </object>
       
        <PDFObject url={this.props.state.pdfViewer} />
         */}
        <iframe className='pdf-ele' src={this.props.state.pdfViewer} title="W3Schools Free Online Web Tutorials"></iframe>

        </div>
			</div>
		)
	}
}
