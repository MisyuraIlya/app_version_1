import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink } from "react-router-dom";

import UserContext from '../../UserContext';
import BreadCrumbs from "../tools/BreadCrumbs";





export default class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
      userInfo:[]
		}
	}

	componentDidMount(){
    this.getProducts(this.props.match.params);
  }

	getProducts = async (param) => {
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
    }else if(localStorage.agent && !localStorage.user){

      let userInfo = {'Name':localStorage.agentName,
                      'ContactName':'סוכן',
                      'Mail':'',
                      'Tel':'',
                      'Town':'',
                      'Balance':'',
                      'MaxObligo':''
                     };
      this.setState({preload:false, userInfo});

    }else{
      let valAjax = {
  			funcName: '',
  	    point: 'get_user_info',
        val: val
  		};
  		try {
  	    const data = await this.props.ajax(valAjax);
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
      this.getProducts(this.props.match.params);
    }else{
			this.props.signOut('user');
		}
	}

  numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

	render(){
    let lang = this.props.state.lang;
    let breadCrumbsNav=[];
    let breadObject ={Title: 'אזור אישי',TitleEng: 'Profile', Link:"" + lang};
    breadCrumbsNav.push(breadObject);

		return (

			<div className="page-container Profile-page">
        <div className="Profile-page-subcont">
        {/*
          <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''}/>
          */}
          {Object.keys(this.state.userInfo).length ?
            <div className="Profilepage-subcont2 flex-container">
              <div className={"Profile-page-sub col-lg-12"}>
                <h1>{lang=='he' ? breadObject.Title : breadObject.TitleEng}</h1>
                <div className={"Profile-page-sub2 flex-container"}>

                  <div className="col-lg-12 flex-container box-cont">
                    <div className="col-lg-2 col">
                      <p className="title">{lang=='he' ? 'שם': 'Name'}</p>
                      <p className="value">{this.state.userInfo.Name}</p>
                    </div>
                    <div className="col-lg-1 col">
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
                    <div className="col-lg-1 col">
                      <p className="title">{lang=='he' ? 'יתרת חוב': 'Balance'}</p>
                      <p className={parseInt(this.state.userInfo.Balance) < parseInt(this.state.userInfo.MaxObligo) ? 'value' : 'value red'}>{this.numberWithCommas(parseInt(this.state.userInfo.Balance))}</p>
                    </div>
                    <div className="col-lg-1 col">
                      <p className="title">{lang=='he' ? 'אובליגו': 'Obligo'}</p>
                      <p className="value">{this.numberWithCommas(parseInt(this.state.userInfo.MaxObligo))}</p>
                    </div>
                    <div className="col-lg-2 col">
                      <div className="logOutCont" onClick={()=> this.beforeLogOut()}>
                        <p>{lang=='he' ? 'התנתק' : 'Log Out'}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="Profile-slide-menu-cont col-lg-12 flex-container">
                {localStorage.user && this.props.state.profileObj && this.props.state.profileObj.length ? this.props.state.profileObj.map((item, ind) => {
                  if(item.OnlyAgent && !item.OnlyDesktop){
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
        </div>
			</div>
		)
	}
}
