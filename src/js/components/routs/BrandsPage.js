import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import Parallax from './Parallax';
import UserContext from '../../UserContext';

import AZBrands from "../tools/AZBrands";
import BreadCrumbs from "../tools/BreadCrumbs";





let arrayGLB = [];
let glbCatObj = {
  'Id': -1
};


export default class BrandsPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			products: [],
      tmpProducts:[],
			toShow: 50,
      preload: false,
		}
		this.handleScroll = this.handleScroll.bind(this);



	}

	componentDidMount(){

    if(localStorage.ProdsPerPage){
      this.setState({prodsPerPage: localStorage.ProdsPerPage})
    }

    let products = localStorage.categoryProducts ? JSON.parse(localStorage.categoryProducts) : [];
    if (localStorage.categoryId == this.props.match.params.lvl1 + "/" + this.props.match.params.lvl2 + "/" + this.props.match.params.lvl2 && products.length) {
			this.setState({
				products: products,
        tmpProducts: products,
				toShow: localStorage.toShow
			});
      let scrollVal = localStorage.scrollVal;
      setTimeout(() => {
        window.scrollTo(0, scrollVal);
      }, 50);
      localStorage.removeItem('categoryProducts');
      localStorage.removeItem('categoryId');
      localStorage.removeItem('toShow');
      localStorage.removeItem('scrollVal');
      window.addEventListener('scroll', this.handleScroll, true);
		}
		else {


  		this.getProducts(this.props.match.params);
  		setTimeout(() => {
  			window.scrollTo(0, 0);
  			window.addEventListener('scroll', this.handleScroll, true);
  		}, 100);
		}
  }
  componentWillReceiveProps(nextProps){

    if (this.props.match.params.rule != nextProps.match.params.rule) {
			window.scrollTo(0, 0);
      this.getProducts(nextProps.match.params);
		}
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll, true);
		let tmpParams = {
			Id: false,
			SubId: false
		};
		this.props.setMatch(tmpParams);
    if (location.hash.includes('/cart') || location.hash.includes('/productParent')) {
			localStorage.setItem('categoryProducts', JSON.stringify(this.state.products));
      localStorage.setItem('categoryId', this.props.match.params.lvl1 + "/" + this.props.match.params.lvl2 + "/" + this.props.match.params.lvl2);
			localStorage.setItem('toShow', this.state.toShow);
		}
	}



	handleScroll(e) {
		var parallax = document.getElementsByClassName("parallax");
		let wh = window.innerHeight
		if (e.currentTarget.pageYOffset + wh > parallax[0].offsetTop) {
			if (this.state.toShow <= this.state.products.length) {
				this.setState({toShow: this.state.toShow + 24});
			}
		}
    localStorage.setItem('scrollVal', e.currentTarget.pageYOffset);
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.match.params.id !== this.props.match.params.id || nextProps.match.params.type !== this.props.match.params.type  || nextProps.match.params.subId !== this.props.match.params.subId ) {
			this.setState({toShow: 24});
      let tmpParams = {
				Id: nextProps.match.params.id,
				SubId: nextProps.match.params.subId
			};
			this.props.setMatch(tmpParams);
      setTimeout(() => {
				window.scrollTo(0, 0);
			}, 100);
			this.getProducts(nextProps.match.params);
		}
	}

	getProducts = async (param) => {
    this.setState({preload:true});

		let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		let val = {
      'rule': param.rule,
    };
    let funcName = '';
    param.type == 'collection' ? funcName = 'GetAllCollectionsUser' : funcName = 'GetAllBrandsUser';
    const valAjax = {
      funcName: funcName,
      point: 'categories',
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      let encodeData = JSON.parse(data);

      let products = encodeData.brands;
			this.setState({ products, tmpProducts: products});
      this.setState({preload:false});
    } catch(err) {
      console.log('connection error GetSales');
      this.setState({preload:false});
    }

	}


	render(){

    let props = Object.assign({}, this.props);
    let lang = this.props.state.lang;

    let breadCrumbsNav=[];
    let breadObject ={};
    let PageTitle = '';
    let urlType = '';
    if(this.props.match.params.type == 'collection'){
      breadObject ={Title: 'סדרות ', Link:""};
      PageTitle = 'סדרות';
      urlType = 'collection=';
    }else{
      breadObject ={Title: 'מותגים ', Link:""};
      PageTitle = 'מותגים';
      urlType = 'brand=';

    }
    
    breadCrumbsNav.push(breadObject);

		return (

			<div className="page-container brands-page">
        <div className="brands-page-subcont">
          <div className="brands-page-subcont2 flex-container">
            <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''}/>
            <div className={"brands-page-sub col-lg-12"}>
              <div className={"brands-page-sub2"}>
                {this.state.preload ?
                  <div className="spinner-wrapper">
                    <div className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                  </div>
                : null}
                {this.props ?
                  <AZBrands
                  />
                :null}
                <div className="brands-page-cont">
                  <div className="row-cont flex-container">
                      <div className="h1-cont col-lg-8">
                        <h1>{lang=='he' ? PageTitle : 'Brands'}</h1>
                      </div>
                  </div>
                </div>
                  <div className="brands-wrapper">
          					<div id="navFix" className={"flex-container brands-page-view"}>
          						{this.state.tmpProducts && !this.state.tmpProducts.length ? <h1 className="hide-on-desctop no-product">לא קיימים מותגים</h1> : null}
          						{this.state.tmpProducts && this.state.tmpProducts.length ? this.state.tmpProducts.map((element, index) => {
                        if(index <= this.state.toShow){
                          return(
                            <div key={index} className="brand-main-cont col-lg-2">
                              <NavLink to={'/category/' + urlType + element.Val + '/0/0/0/1/0/' + lang}>
                                <div className="brand-sub-cont">
                                  {element.Extra1 ?
                                    <img
                                      className="main-img"
                                      src={globalFileServer + 'brands/' + element.Extra1}
                                    />
                                  :
                                    <h2>{element.Val}</h2>
                                  }
                                </div>
                              </NavLink>
          									</div>
          								);
                        }
          						}):null}
          					</div>
          				</div>
                <Parallax img="parrallax_5.jpg" />
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
}
