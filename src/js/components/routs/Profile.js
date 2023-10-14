import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink } from "react-router-dom";

import UserContext from '../../UserContext';
import BreadCrumbs from "../tools/BreadCrumbs";
import AgentActions from "../tools/AgentActions";
import TablePopUpDeptInvoices from "../tools/TablePopUpDeptInvoices";





export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
      userInfo:[],
      userInfoExtra:[],
      tablePopUp:false,
      preload: false,
      data:[],
      openDept:false
		}
	}

	componentDidMount(){
    
    this.getProducts();
  }

	getProducts = async () => {
    this.setState({preload:true});
    let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		let val = {
      'action': ''
    };
		user ? val.priceFor = user.Type : null;
    user ? val.priceCode = user.PriceList : null;
    user ? val.userId = user.Id : null;
    user ? val.userExtId = user.ExId : null;
    localStorage.role ? val.admin = true : null;
    if(this.props.state.orderObject){
      val.userExtId = this.props.state.orderObject.ExId;
      val.userId = this.props.state.orderObject.Id;
    }
    let data;
    if(localStorage.role){

      let userInfo = {'Name':'אדמיניסטרטור',
                      'ContactName':'מנהל',
                      'Mail':'',
                      'Tel':'',
                      'Town':'',
                      'Balance':'',
                      'MaxObligo':''
                     };
       this.setState({preload:false, userInfo});
    }/*else if(localStorage.agent && !localStorage.user){

      let userInfo = {'Name':localStorage.agentName,
                      'ContactName':'סוכן',
                      'Mail':'',
                      'Tel':'',
                      'Town':'',
                      'Balance':'',
                      'MaxObligo':''
                     };
      this.setState({preload:false, userInfo});
      debugger;

    }*/else if((localStorage.agent && localStorage.user) || (localStorage.agent && this.props.state.orderObject)){
      val.action = 'getClientInfoForAgent';

      let valAjax = {
        funcName: '',
        point: 'get_user_info',
        val: val
      };
      try {

        if(localStorage.agent && this.props.state.orderObject){
          data = await this.props.props.ajax(valAjax);
        }else{
          data = await this.props.ajax(valAjax);
        }
        
        this.setState({preload:false, data});
  
      } catch(err) {
        //this.props.connectionError('connection error GetSales');
        this.setState({preload:false});
  
        console.log('connection error GetSales');
      }
      
    }else{
      val.action = 'getClientInfoForClient';
      let valAjax = {
        funcName: '',
        point: 'get_user_info',
        val: val
      };
      try {
        data = await this.props.ajax(valAjax);
        let userInfo = data;
        this.setState({preload:false, userInfo});
  
      } catch(err) {
        //this.props.connectionError('connection error GetSales');
        this.setState({preload:false});
  
        console.log('connection error GetSales');
      }
    }
  }

  beforeLogOut = ()=> {

		if (localStorage.role == "admin") {
			this.props.localStorageClear();
		} else if (localStorage.agent && !localStorage.user) {
			this.props.signOut('agent');
    } else if (localStorage.agent && localStorage.user) {
      this.props.signOut("agentForUser");
      this.getProducts();
    }else{
			this.props.signOut('user');
		}
	}

  numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getOpenDeptInvoices = async() => {
    this.setState({preload:true});
    let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		let val = {
      'action': ''
    };
    user ? val.userId = user.Id : null;
    user ? val.userExtId = user.ExId : null;
    localStorage.role ? val.admin = true : null;
    val.action = 'getOpenDeptInvoices';

    if(this.props.state.orderObject){
      val.userExtId = this.props.state.orderObject.ExId;
      val.userId = this.props.state.orderObject.Id;
    }
    let data;

    let valAjax = {
      funcName: '',
      point: 'get_user_info',
      val: val
    };
    try {
      if(localStorage.agent && !this.props.state.orderObject){
        data = await this.props.ajax(valAjax);
      }else{
        data = await this.props.props.ajax(valAjax);
      }

      this.setState({preload:false, tablePopUp:data,openDept:true});

    } catch(err) {
      //this.props.connectionError('connection error GetSales');
      this.setState({preload:false});

      console.log('connection error GetSales');
    }
  }

  getFutureCheqs = async() => {
    this.setState({preload:true});
    let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		let val = {
      'action': ''
    };
    user ? val.userId = user.Id : null;
    user ? val.userExtId = user.ExId : null;
    localStorage.role ? val.admin = true : null;
    val.action = 'getFutureCheqs';
    if(this.props.state.orderObject){
      val.userExtId = this.props.state.orderObject.ExId;
      val.userId = this.props.state.orderObject.Id;
    }
    let data;

    let valAjax = {
      funcName: '',
      point: 'get_user_info',
      val: val
    };
    try {

      if(localStorage.agent && !this.props.state.orderObject){
        data = await this.props.ajax(valAjax);
      }else{
        data = await this.props.props.ajax(valAjax);
      }

      this.setState({preload:false, tablePopUp:data});

    } catch(err) {
      //this.props.connectionError('connection error GetSales');
      this.setState({preload:false});

      console.log('connection error GetSales');
    }
  }

	render(){
    let lang = this.props.state.lang;
    if(!lang){
      lang = 'he';
    }
    let breadCrumbsNav=[];
    let breadObject ={Title: 'אזור אישי',TitleEng: 'Profile', Link:"" + lang};
    breadCrumbsNav.push(breadObject);

		return (

			<div className="page-container Profile-page">
        <div className="Profile-page-subcont">
        {this.state.tablePopUp ? ReactDOM.createPortal(
          <div className="my-modal prod-info">
            <div className="modal-wrapper animated">
              <div className="close-cont">
                <div
                  onClick={() => this.setState({tablePopUp: !this.state.tablePopUp, openDept:false})}
                  className="close">
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
              <TablePopUpDeptInvoices {...this} lang={lang}/>
            </div>
            <div onClick={this.close} className="overflow"></div>
          </div>,
          document.getElementById('modal-root')
        ) : null}
        {this.state.preload ?
									<div className="spinner-wrapper">
										<div className="spinner">
											<div className="bounce1"></div>
											<div className="bounce2"></div>
											<div className="bounce3"></div>
										</div>
									</div>
									: null}
        {/*
          <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''}/>
          */}
          {!localStorage.agent && Object.keys(this.state.userInfo).length ?
            <div className="Profilepage-subcont2 flex-container">
              <div className={"Profile-page-sub col-lg-12"}>
                <h1>{lang=='he' ? breadObject.Title : breadObject.TitleEng}</h1>
                <div className={"Profile-page-sub2 flex-container"}>

                  <div className="col-lg-12 flex-container box-cont">
                    <div className="col-lg-2 col">
                      <p className="title">{lang=='he' ? 'שם': 'Name'}</p>
                      <p className="value">{this.state.userInfo.Name}</p>
                    </div>
                    <div className="col-lg-2 col">
                    <p className="title">{lang=='he' ? 'איש קשר': 'Contact'}</p>
                      <p className="value">{this.state.userInfo.ContactName}</p>

                    </div>
                    <div className="col-lg-2 col">
                    <p className="title">{lang=='he' ? 'מייל': 'Email'}</p>
                      <p className="value">{this.state.userInfo.Mail}</p>

                    </div>
                    <div className="col-lg-2 col">
                    <p className="title">{lang=='he' ? 'טלפון': 'Phone'}</p>
                      <p className="value">{this.state.userInfo.Tel}</p>

                    </div>
                    <div className="col-lg-1 col">
                    <p className="title">{lang=='he' ? 'עיר': 'City'}</p>
                      <p className="value">{this.state.userInfo.Town}</p>
                    </div>
                    {this.state.userInfo.Balance &&
                      <div className="col-lg-1 col">
                        <p className="title">{lang=='he' ? 'יתרת חוב': 'Balance'}</p>
                        <p className={parseInt(this.state.userInfo.Balance) < parseInt(this.state.userInfo.MaxObligo) ? 'value' : 'value red'}>{this.numberWithCommas(parseInt(this.state.userInfo.Balance))}</p>
                      </div>
                    }
                    {this.state.userInfo.MaxObligo &&
                      <div className="col-lg-1 col">
                        <p className="title">{lang=='he' ? 'אובליגו': 'Obligo'}</p>
                        <p className="value">{this.numberWithCommas(parseInt(this.state.userInfo.MaxObligo))}</p>
                      </div>
                    }
                    <div className="col-lg-1 col">
                      <div className="logOutCont" onClick={()=> this.beforeLogOut()}>
                        <p>{lang=='he' ? 'התנתק' : 'Log Out'}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="Profile-slide-menu-cont col-lg-12 flex-container">
                {localStorage.user && this.props.state.profileObj && this.props.state.profileObj.length ? this.props.state.profileObj.map((item, ind) => {
                  if(!item.OnlyAgent){
                    return(
                      <div key={ind} className="Profile-slide-sub col-lg-4">
                        <NavLink to={item.Link + lang}>
                          <div className="Profile-slide-box">
                            <span className="material-symbols-outlined search-img">{item.Img}</span>
                            <h2>{lang=='he' ? item.Title : item.TitleEng}</h2>
                          </div>
                        </NavLink>
                      </div>
                    )
                  }
                
                }):null}
              </div>
            </div>
          :null}
          {localStorage.agent && this.state.data.userFromDb && Object.keys(this.state.data.userFromDb).length ?
             <div className="Profilepage-subcont2 flex-container">
             <div className={"Profile-page-sub col-lg-12"}>
               <h1>{lang=='he' ? breadObject.Title : breadObject.TitleEng}</h1>
               <div className={"Profile-page-sub2"}>
                 <div className="col-lg-12 box-cont box-cont-agent-mode">
                   <div className="col">
                     <p className="title">{lang=='he' ? 'שם': 'Name'}</p>
                     <p className="value">{this.state.data.userFromDb.Name}</p>
                   </div>
                   <div className="col">
                   <p className="title">{lang=='he' ? 'איש קשר': 'Contact'}</p>
                     <p className="value">{this.state.data.userFromDb.ContactName}</p>
                   </div>
                   <div className="col">
                   <p className="title">{lang=='he' ? 'מייל': 'Email'}</p>
                     <p className="value">{this.state.data.userFromDb.Mail}</p>
                   </div>
                   <div className="col">
                   <p className="title">{lang=='he' ? 'ח.פ/ע.מ': 'Email'}</p>
                     <p className="value">{this.state.data.userFromDb.Hp}</p>
                   </div>
                   <div className="col">
                   <p className="title">{lang=='he' ? 'טלפון': 'Phone'}</p>
                     <p className="value">{this.state.data.userFromDb.Tel}</p>
                   </div>
                   <div className="col">
                      <p className="title">{lang=='he' ? 'עיר': 'City'}</p>
                      <p className="value">{this.state.data.userFromDb.Town}</p>
                    </div>
                    <div className="col col-longText">
                      <p className="title">{lang=='he' ? 'הערות': 'City'}</p>
                      <p className="value">{this.state.data.userFromDb.AddressJson}</p>
                   </div>
                 </div>
               </div>
             </div>
            
             <div className={"Profile-page-sub col-lg-12"}>
               <h1>{lang=='he' ? 'כספים' : breadObject.TitleEng}</h1>
               <div className={"Profile-page-sub2"}>
                 <div className="col-lg-12 box-cont box-cont-agent-mode">
                   
                   <div className="col">
                     <p className="title">{lang=='he' ? 'מחירון': 'City'}</p>
                     <p className="value">{this.state.data.userFromDb.PriceListBase}</p>
                   </div>
                   <div className="col">
                      <p className="title">{lang=='he' ? 'ת.תשלום': 'City'}</p>
                      <p className="value">{this.state.data.userFromDb.PaymentMethod}</p>
                   </div>
                   {this.state.data.clientProfileObj &&
                    <>
                      <div className="col">
                          <p className="title">{lang=='he' ? 'סך עסקאות': 'City'}</p>
                          <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.TotalOrderSum))}</p>
                      </div>
                      <div className="col">
                          <p className="title">{lang=='he' ? 'סל ממוצע': 'City'}</p>
                          <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.MonthlyAverage))}</p>
                      </div>
                      <div className="col">
                          <p className="title">{lang=='he' ? 'מכירות חודשי': 'City'}</p>
                          <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.TotalOrderSumCurrentMonth))}</p>
                      </div>
                      <div className="col">
                          <p className="title">{lang=='he' ? 'יעד חודשי': 'City'}</p>
                          <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Totals.MonthlyObjective))}</p>
                      </div>
                    </>
                  }
                   <div className="col">
                      <p className="title">{lang=='he' ? 'ערבות אישית':''}</p>
                      <p className="value">{this.state.data.userFromDb.Extra1 ? this.state.data.userFromDb.Extra1 : '-' }</p>
                   </div>
                   <div className="col">
                      <p className="title">{lang=='he' ? 'ביטוח אשראי':''}</p>
                      <p className="value">{this.state.data.userFromDb.Extra2 ? this.numberWithCommas(parseInt(this.state.data.userFromDb.Extra2)) : '-'}</p>
                   </div>
                  {this.state.data.clientProfileObj && this.state.data.clientProfileObj.Users ? 
                    <>
                      <div className="col">
                        <p className="title">{lang=='he' ? 'יתרת חוב': 'Balance'}</p>
                        <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Users[0].Balance))}</p>
                      </div>
                      <div className="col alert">
                        <p className="title">{lang=='he' ? 'חוב בסיכון': 'Balance'}</p>
                        <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Users[0].Balance) + parseInt(this.state.data.clientCheqs.Sum)) }</p>
                      </div>
                      <div className="col">
                        <p className="title">{lang=='he' ? 'אובליגו': 'Obligo'}</p>
                        <p className="value">{this.numberWithCommas(parseInt(this.state.data.clientProfileObj.Users[0].MaxObligo))}</p>
                      </div>
                      <div className="col">
                        <p className="title">{lang=='he' ? 'אובליגו לניצול': 'Obligo'}</p>
                        <p className="value">{this.numberWithCommas( parseInt(this.state.data.clientProfileObj.Users[0].MaxObligo) + parseInt(this.state.data.clientProfileObj.Users[0].Balance) )}</p>
                      </div>
                      <div className="col">
                        <p className="title">{lang=='he' ? 'חובות פתוחים': 'Obligo'}</p>
                        <span className="material-symbols-outlined"
                              onClick={()=>this.getOpenDeptInvoices()}>account_balance_wallet</span>
                      </div>
                      <div className="col">
                        <p className="title">{lang=='he' ? 'שיקים לפרעון': 'Obligo'}</p>
                        <span className="material-symbols-outlined"
                            onClick={()=>this.getFutureCheqs()}>payments</span>
                      </div>
                    </>
                   :null}
                   
                 
                 </div>

               </div>
             </div>
             {localStorage.agent && localStorage.user && !this.props.state.orderObject ? 
              <AgentActions props={this.props} lang={lang}/>
              :null}
            
           </div>
           
          :null}
        </div>
			</div>
		)
	}
}
