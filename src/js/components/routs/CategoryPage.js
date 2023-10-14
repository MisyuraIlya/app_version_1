import ReactDOM from "react-dom";
import React, {Component, Fragment, useState, useEffect, useContext} from 'react';
import {NavLink} from "react-router-dom";
import {Helmet} from "react-helmet";
import ProductInfo from "./productPage/ProductInfo";
import Parallax from './Parallax';
import ProductPopUp from "./productPage/ProductPopUp";
import ProductAddToCart from "./productPage/ProductAddToCart";
import ProductAddToCartCatalog from "./productPage/ProductAddToCartCatalog";
import ProductAddToCartCatalogList from "./productPage/ProductAddToCartCatalogList";
import AgentPricing from "./productPage/AgentPricing";

import UserContext from '../../UserContext';
import CategorySlideEcare from '../tools/CategorySlideEcare';

import BreadCrumbs from "../tools/BreadCrumbs";
import ListStyleComp from "../tools/ListStyleComp";
import Pagination from "../tools/Pagination";

let arrayGLB = [];
let glbCatObj = {
	'Id': -1
};


export default class CategoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			tmpProducts: [],
			toShow: 72,
			info: false,
			viewMode: window.innerWidth > 1000 ? false : true,
			catWidth: 180,
			ProductPopUp: false,
			selectedProd: [],
			dateNew: "",
			openFilter: false,
			filterChosen: false,
			distinctVol: [],
			preload: false,
			categorySlide: true,
			openFilter: false,
			backToInventory: false,
			newInStock: false,
			inAlon: false,
			searchString: "",
			brandsArr: [],
			filteredBrandsArr: [],
			chosenBrand: false,
			morePop: false,
			brandSearchString: "",
			prodsPerPage: '24',
			sortProdSetting: this.props.state.lang == 'he' ? 'מומלץ' : 'Title',
			searchProdVal: "",
			paginateObj: [],
			filterObj: [],
			categories: [],
			favoritesObj: [],
			changePriceObj:false
		}
		this.handleScroll = this.handleScroll.bind(this);
		this.close = this.close.bind(this);
		this.closePropdPop = this.closePropdPop.bind(this);

		this.sortProducts = this.sortProducts.bind(this);
		this.autoScroll = this.autoScroll.bind(this);
		this.goToProdBySale = this.goToProdBySale.bind(this);


	}

	goToProdBySale(element) {
		let selectedProdArr = this.props.state.products.filter((ele, itm) => {
			return ele.Id == element.Id
		});
		this.setState({info: false, ProductPopUp: true, selectedProd: selectedProdArr[0]});
	}

	componentDidMount() {
		if (localStorage.ProdsPerPage) {
			this.setState({prodsPerPage: localStorage.ProdsPerPage})
		}
		let products = localStorage.categoryProducts ? JSON.parse(localStorage.categoryProducts) : [];

		let tmpParams = {
			Id: this.props.match.params.id,
			SubId: this.props.match.params.subId
		};
		this.props.setMatch(tmpParams);
		this.getProducts(this.props.match.params);
		setTimeout(() => {
			window.scrollTo(0, 0);
			window.addEventListener('scroll', this.handleScroll, true);
		}, 300);
	}

	componentWillReceiveProps(nextProps) {

		
		if (this.props.match.params.type != nextProps.match.params.type || this.props.match.params.lvl1 != nextProps.match.params.lvl1 || this.props.match.params.lvl2 != nextProps.match.params.lvl2 || this.props.match.params.lvl3 != nextProps.match.params.lvl3 || this.props.match.params.page != nextProps.match.params.page || this.props.match.params.parent != nextProps.match.params.parent || decodeURI(this.props.history.location.search) != decodeURI(localStorage.LastSearch)) {
			
			window.scrollTo(0, 0);
			if (localStorage.ProdsPerPage) {
				this.setState({prodsPerPage: localStorage.ProdsPerPage})
			}
			if (this.props.match.params.type != nextProps.match.params.type || this.props.match.params.lvl1 != nextProps.match.params.lvl1 || this.props.match.params.lvl2 != nextProps.match.params.lvl2 || this.props.match.params.lvl3 != nextProps.match.params.lvl3 || this.props.match.params.parent != nextProps.match.params.parent || decodeURI(this.props.history.location.search) != decodeURI(localStorage.LastSearch)) {
				this.setState({searchProdVal: ""})
				this.getProducts(nextProps.match.params, "");
			} else {
				this.getProducts(nextProps.match.params);
			}
		}
		

		if (this.props.match.params.lang != nextProps.match.params.lang || this.props.state.lang != nextProps.state.lang) {
			if (nextProps.match.params.lang == 'he') {
				this.setState({sortProdSetting: 'מלאי'})
			} else {
				this.setState({sortProdSetting: 'Stock'})
			}
		}

		if (JSON.stringify(this.props.state.agentPriceOverwriteArr)  != JSON.stringify(nextProps.state.agentPriceOverwriteArr) && this.state.tmpProducts && this.state.tmpProducts.length){

			let products = this.reWriteProductsRecievePros(this.state.tmpProducts, nextProps.state.agentPriceOverwriteArr);
			this.setState({
				products, tmpProducts: products
			});
		}
		

		localStorage.LastSearch = this.props.history.location.search;
	}
	reWriteProductsRecievePros = (products, agentPriceOverwriteArr) => {

		products.map((prodItem,index1) => {
			agentPriceOverwriteArr.map((overWriteItem,index2) => {
				if(prodItem.CatalogNumber == overWriteItem.CatalogNumber){
					//prodItem.OrgPrice = prodItem.OrgPrice;
					prodItem.Price = overWriteItem.Price;
					prodItem.RePrice = true;
				}
			});
		});
		return products;
	}

	componentWillUnmount() {
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

	sortProducts() {
		let products = this.state.products;
		products.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
		this.setState({products, tmpProducts: products});
	}

	close() {
		this.setState({info: false});
	}

	closePropdPop() {
		this.setState({ProductPopUp: false});
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

	/*
	  componentWillUpdate(nextProps, nextState) {
		  if (nextProps.match.params.id !== this.props.match.params.id || nextProps.match.params.subId !== this.props.match.params.subId ) {
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
	*/

	getProducts = async (param, searchParam) => {
		this.setState({preload: true});

		let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;

		let searchParamCheck = '';
		if (searchParam == '') {
			searchParamCheck = searchParam;
		} else {
			searchParamCheck = this.state.searchProdVal;
		}

		let val = {
			'id': param.subId ? param.subId : param.id,
			'b2cPriceCode': this.props.state.b2cPriceCode,
			'priceNoLogin': this.props.state.priceNoLogin,
			'lvl1id': param.lvl1 ? param.lvl1 : null,
			'lvl2id': param.lvl2 ? param.lvl2 : null,
			'lvl3id': param.lvl3 ? param.lvl3 : null,
			'parent': param.parent,
			'page': param.page,
			'prodsPerPage': !localStorage.ProdsPerPage ? parseInt(this.state.prodsPerPage) : parseInt(localStorage.ProdsPerPage),
			'urlSearch': decodeURI(this.props.history.location.search),
			'action': param.type,
			'searchParam': searchParamCheck ? searchParamCheck : false,
			'selectedMode': localStorage.selectedMode

		};

		//'%26'
		user ? val.priceFor = user.Type : null;
		user ? val.priceCode = user.PriceList : null;
		user ? val.userId = user.Id : null;
		user ? val.userExtId = user.ExId : null;
		localStorage.role ? val.admin = true : null;
		localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;

		const valAjax = {
			funcName: '',
			point: 'products_per_category_view',
			val: val
		};

		try {
			const data = await this.props.ajax(valAjax);
			let encodeData = JSON.parse(data);
			//debugger
			let products = encodeData.products;

			products = this.reWriteProducts(products);

			let categories = encodeData.categories;
			let match;

			let brandsArr = [];
			let paginateObj = encodeData.paginateObj;
			let filterObj = encodeData.filterObj;

			this.setState({
				products, tmpProducts: products, filterObj,
				filteredBrandsArr: filterObj, paginateObj, categories
			});

			this.setState({preload: false});
		} catch (err) {
			console.log('connection error GetSales');
			this.setState({preload: false});
		}

		//this.GetUserFavoriteList();

	}

	reWriteProducts = (products) => {
		let agentPriceOverwriteArr = this.props.state.agentPriceOverwriteArr;
		products.map((prodItem,index1) => {
			agentPriceOverwriteArr.map((overWriteItem,index2) => {
				if(prodItem.CatalogNumber == overWriteItem.CatalogNumber){

					//prodItem.OrgPrice = prodItem.OrgPrice;
					prodItem.Price = overWriteItem.Price;
					prodItem.RePrice = true;
				}
			});
		});
		return products;
	}
	GetUserFavoriteList = async () => {
		let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		if (user) {
			let valFav = {
				userId: user.Id,
			};

			const valAjaxFav = {
				funcName: 'GetUserFavoriteList',
				point: 'products',
				val: valFav
			};
			try {
				const dataFav = await this.props.ajax(valAjaxFav);
				let encodeDataFav = JSON.parse(dataFav);

				let favoritesObj = encodeDataFav;
				this.setState({favoritesObj});

			} catch (err) {
				console.log('connection error GetSales');
			}
		}

	}

	autoScroll(ind) {
		// setTimeout(() => {


		let children = this.props.state.categories.filter(item => item.ParentId == this.props.match.params.id);

		let fix = ind + 1;
		let val = ((children.length - fix) * this.state.catWidth) + 70;
		// $('.cats-scroll')[0].scrollLeft = val;
//      debugger;
		$('#cats-scroll').animate({
			scrollLeft: val
		}, 0);


		// }, 100);
	}

	setUnpublish(id, unpublished) {
		let newVal;
		if (unpublished) {
			newVal = null;
		} else {
			newVal = "1";
		}


		let val = {
			'itemId': id,
			'value': newVal,
			'token': localStorage.token,
			'role': localStorage.role,
			'paramName': "Unpublished"
		};

		$.ajax({
			url: globalServer + 'new-api/items_edit.php',
			type: 'POST',
			data: val,
		}).done(function (data) {
			if (data.result == "success") {
				let products = this.state.products;
				products.find(item => item.Id == id).Unpublished = newVal;
				this.setState({products, tmpProducts: products});
			}
		}.bind(this)).fail(function () {
			console.log("error");
		});
	}

	sortProducts = (val) => {

		let tmpProducts = this.state.products;
		if (val != 'כל המוצרים') {
			tmpProducts = tmpProducts.filter((item) => {
				return item.Code ? item.Code.includes(val) : null
			})
		}
		this.setState({tmpProducts, filterChosen: val, openFilter: false});

	}

	goToProductParent = (catalgNumber) => {
		this.props.history.push("/category/" + this.props.match.params.type + '/' + this.props.match.params.lvl1 + "/" + this.props.match.params.lvl2 + "/" + this.props.match.params.lvl3 + "/1/" + catalgNumber + "/" + this.props.state.lang);
	}

	getSubProds = async (myElement) => {


		if (myElement.IsParent && !myElement.SubProducts || (myElement.SubProducts && myElement.SubProducts.length == 0)) {
			this.setState({preload: true});

			let user = false;
			localStorage.user ? user = JSON.parse(localStorage.user) : null;
			let val = {
				'b2cPriceCode': this.props.state.b2cPriceCode,
				'priceNoLogin': this.props.state.priceNoLogin,
				'id': myElement.CatalogNumber
			};

			user ? val.priceFor = user.Type : null;
			user ? val.priceCode = user.PriceList : null;
			user ? val.userId = user.Id : null;
			user ? val.userExtId = user.ExId : null;
			localStorage.role ? val.admin = true : null;
			localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;

			val.lvl1 = this.props.match.params.lvl1;

			const valAjax = {
				funcName: '',
				point: 'sub_products_per_category_view',
				val: val
			};

			try {
				const data = await this.props.ajax(valAjax);


				let products = data.products;
				let parentProd = data.parentProd;
				let tmpDistinctVol = [];
				let match;

				let productsSet = this.state.products;
				productsSet.find(item => item.Id == myElement.Id).SubProducts = products;

				let tmpProductsSet = this.state.tmpProducts;
				tmpProductsSet.find(item => item.Id == myElement.Id).SubProducts = products;

				this.setState({products: productsSet, tmpProducts: tmpProductsSet});

				this.setState({preload: false});

			} catch (err) {
				console.log('connection error GetSales');
				this.setState({preload: false});
			}

		} else {

			let productsSet = this.state.products;
			productsSet.find(item => item.Id == myElement.Id).SubProducts = [];

			let tmpProductsSet = this.state.tmpProducts;
			tmpProductsSet.find(item => item.Id == myElement.Id).SubProducts = [];

			this.setState({products: productsSet, tmpProducts: tmpProductsSet});

		}

	}
	searchProducts = (e) => {

		this.resetCheckBox('', '', 'search');
		this.resetBrand();

		let val = e.target.value;
		this.setState({searchString: e.target.value});

		let productsSet = this.state.products;

		if (val != "") {
			productsSet = productsSet.filter((item) => {
				return (item.Title && item.Title.toLowerCase().includes(val.toLowerCase())) || (item.Barcode && item.Barcode.includes(val)) || (item.Extra5 && item.Extra5.toLowerCase().includes(val.toLowerCase()))
			})
		}

		this.setState({tmpProducts: productsSet});
	}


	resetSearch = () => {
		let productsSet = this.state.products;
		this.setState({searchString: ""});
		this.setState({tmpProducts: productsSet});
	}

	searchBrand = (e) => {
		let val = e.target.value;
		this.setState({brandSearchString: e.target.value});

		let filteredBrandsArr = this.state.brandsArr;

		if (val != "") {
			filteredBrandsArr = filteredBrandsArr.filter((item) => {
				return item.toLowerCase().includes(val.toLowerCase())
			})
		}

		this.setState({filteredBrandsArr});

	}

	resetSearchBrand = () => {
		let filteredBrandsArr = this.state.brandsArr;
		this.setState({brandSearchString: ""});
		this.setState({filteredBrandsArr});
	}

	checkBoxSet = (param, value) => {

		this.resetSearch();
		this.resetBrand();
		this.resetCheckBox(param, value, 'checkbox');

		let productsSet = this.state.products;
		if (value) {
			if (param == "backToInventory") {
				if (this.state.newInStock) {
					productsSet = productsSet.filter((item) => {
						return item.IsBack || item.IsNew
					})
				} else {
					productsSet = productsSet.filter((item) => {
						return item.IsBack
					})
				}
				this.setState({backToInventory: true})
			} else if (param == "newInStock") {
				if (this.state.backToInventory) {
					productsSet = productsSet.filter((item) => {
						return item.IsNew || item.IsBack
					})

				} else {
					productsSet = productsSet.filter((item) => {
						return item.IsNew
					})

				}
				this.setState({newInStock: true})
			} else if (param == "inAlon") {
				productsSet = productsSet.filter((item) => {
					return item.IsAlon
				})
				this.setState({inAlon: true})
			}
		} else {
			if (param == "backToInventory" && this.state.newInStock) {
				productsSet = productsSet.filter((item) => {
					return item.IsNew
				})
			} else if (param == "newInStock" && this.state.backToInventory) {
				productsSet = productsSet.filter((item) => {
					return item.IsBack
				})
			}
		}

		this.setState({tmpProducts: productsSet});

	}

	resetCheckBox = (param, value, origin) => {
		if (origin == 'checkbox') {
			if (param == "inAlon" || this.state.inAlon) {
				let productsSet = this.state.products;
				this.setState({tmpProducts: productsSet, backToInventory: false, newInStock: false, inAlon: false})
			} else if (param == "backToInventory" && !value) {
				this.setState({backToInventory: false})
			} else if (param == "newInStock" && !value) {
				this.setState({newInStock: false})
			}
		} else {
			let productsSet = this.state.products;
			this.setState({tmpProducts: productsSet, backToInventory: false, newInStock: false, inAlon: false});
		}

	}

	selectBrand = (val) => {

		this.setState({openFilter: false});
		this.resetSearch();
		this.resetCheckBox('', '', 'brand');

		if (val != "כל המותגים") {
			let productsSet = this.state.products;
			productsSet = productsSet.filter((item) => {
				return item.Extra5 == val
			});

			this.setState({chosenBrand: val, tmpProducts: productsSet})
		} else {
			this.resetBrand();
		}

	}

	resetBrand = () => {

		let productsSet = this.state.products;
		this.setState({tmpProducts: productsSet, chosenBrand: false});

	}

	downloadExcelPdf = async (type, breadCrumbsNav) => {

		this.setState({preload: true, morePop: false});

		let param = this.props.match.params;
		let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;


		let val = {
			'id': param.subId ? param.subId : param.id,
			'b2cPriceCode': this.props.state.b2cPriceCode,
			'priceNoLogin': this.props.state.priceNoLogin,
			'lvl1id': param.lvl1 ? param.lvl1 : null,
			'lvl2id': param.lvl2 ? param.lvl2 : null,
			'lvl3id': param.lvl3 ? param.lvl3 : null,
			'parent': param.parent,
			'page': param.page,
			'prodsPerPage': !localStorage.ProdsPerPage ? parseInt(this.state.prodsPerPage) : parseInt(localStorage.ProdsPerPage),
			'urlSearch': decodeURI(this.props.history.location.search),
			'action': param.type,
			'docType': type,
			'lang': this.props.state.lang,
			'breadCrumbsNav': breadCrumbsNav

		};
		//'%26'
		user ? val.priceFor = user.Type : null;
		user ? val.priceCode = user.PriceList : null;
		user ? val.userId = user.Id : null;
		user ? val.userExtId = user.ExId : null;
		localStorage.role ? val.admin = true : null;
		localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;


		const valAjax = {
			funcName: '',
			point: 'products_per_category_view',
			val: val
		};

		try {
			const data = await this.props.ajax(valAjax);

			let tmpUrl = entry + '/output/' + data.link;
			if (this.props.state.appId == "") {
				var win = window.open(tmpUrl, '_blank');
			} else {
				var ref = cordova.InAppBrowser.open(tmpUrl, '_system', 'location=yes');
			}

			//var win = window.open(entry + '/output/' + data.link, '_blank');
			SweetAlert({
				title: 'המסמך הופק בהצלחה',
				type: 'success',
				timer: 3000,
				showConfirmButton: false,
			}).then(function () {
				//location.reload();
			}.bind(this)).catch(SweetAlert.noop);
			this.setState({preload: false});
		} catch (err) {
			console.log('connection error download');
			this.setState({preload: false});
		}
		/*


			let val = {
			  lvl1: this.props.match.params.lvl1,
			  lvl2: this.props.match.params.lvl2,
			  lvl3: this.props.match.params.lvl3,
			  funcString: funcString
			}

			const valAjax = {
			  funcName: 'GetProducts',
			  point: 'download_xls',
			  val: val
			};

			try {
			  const data = await this.props.ajax(valAjax);
			  if (data.result == "success") {

				var win = window.open(entry + '/output/' + data.link, '_blank');
				SweetAlert({
				  title: 'אקסל הופק בהצלחה',
				  type: 'success',
				  timer: 3000,
				  showConfirmButton: false,
				}).then(function () {
				  //location.reload();
				}.bind(this)).catch(SweetAlert.noop);
			  }

			  this.setState({preload:false});

			} catch(err) {
			  //this.props.connectionError('connection error GetSales');
			  console.log('connection error GetSales');
			  this.setState({preload:false});
			}
		*/
	}

	setProdsPerPage = (val) => {
		this.setState({prodsPerPage: val});
		let param = this.props.match.params;
		let nextUrl = '/category/' + param.type + '/' + param.lvl1 + '/' + param.lvl2 + '/' + param.lvl3 + '/' + '1' + '/' + param.parent + '/' + param.lang + this.props.location.search;
		if (this.props.history.location.pathname + this.props.location.search != nextUrl) {
			this.props.history.push(nextUrl);
		} else {
			this.getProducts(this.props.match.params);
		}
	}

	setSortPerPage = (val) => {
		this.setState({sortProdSetting: val});
	}

	searchPhpFunc = () => {
		this.getProducts(this.props.match.params, this.state.searchProdVal);

	}
	setSearchProdVal = (val) => {
		this.setState({searchProdVal: val})

	}

	setFilter = () => {
		window.scrollTo(0, 0);
	}

	setFavorites = async (sku) => {
		let user = JSON.parse(localStorage.getItem('user'));

		let findFav = false;
		if (this.state.favoritesObj && this.state.favoritesObj.items) {
			findFav = this.state.favoritesObj.items.filter(item => item.CatalogNumber == sku);
			if (findFav && findFav.length > 0) {
				this.props.history.push('/shoppinglistItems/' + this.state.favoritesObj.list.Id + '/' + this.props.state.lang);
			}
		}

		if (!findFav || (findFav && findFav.length == 0)) {
			let val = {
				userId: user.Id,
				sku: sku
			};

			const valAjax = {
				funcName: 'SetFavorites',
				point: 'products',
				val: val
			};

			try {
				const data = await this.props.ajax(valAjax);
				if (data.result == 'success') {
					this.GetUserFavoriteList();
				}
			} catch (err) {
				console.log('connection error docs');
				this.setState({preload: false});
			}
		}

	}

	selectInput(id, param){
		
		setTimeout(() => {
			$(param+id).select();
		}, 300);
	}

	render() {
		let parentCategory = this.props.state.categories.filter(item => item.Id == this.props.match.params.lvl1)[0];
		let childCategory = this.props.state.categories.filter(item => item.Id == this.props.match.params.lvl2)[0];
		let subChildCategory = this.props.state.categories.filter(item => item.Id == this.props.match.params.lvl3)[0];

		let props = Object.assign({}, this.props);
		let lang = this.props.state.lang;

		let breadCrumbsNav = [];
		let tmpParam = this.props.match.params.type;
		let pageTitle = '';
		let pageTitleEng = '';
		let mainAreaHeb = '';
		let mainAreaEng = '';
		let searchQuery = '';

		if (tmpParam == 'sales') {
			let breadObject = {
				Title: 'מבצעים ',
				TitleEng: 'Sales ',
				Link: "/category/" + tmpParam + "/0/0/0/1/0/" + lang
			};
			breadCrumbsNav.push(breadObject);
			pageTitle = 'כל המבצעים'
			mainAreaHeb = 'מבצעים';
			mainAreaEng = 'Sales';
		} else if (tmpParam == 'catalog') {
			pageTitle = 'כל המוצרים'
			mainAreaHeb = 'קטלוג';
			mainAreaEng = 'Catalog';

		} else if (tmpParam == 'search') {
			let breadObject = {
				Title: 'חיפוש ',
				TitleEng: 'Search ',
				Link: "/category/" + tmpParam + "/0/0/0/1/0/" + lang
			};
			breadCrumbsNav.push(breadObject);
			pageTitle = 'כל המוצרים'
			mainAreaHeb = 'חיפוש';
			mainAreaEng = 'Search';

			searchQuery = this.props.location.search;
		} else if (tmpParam.includes('brand')) {
			let breadObject = {Title: 'סדרות ', TitleEng: 'Brands ', Link: "/brands/collection/0/" + lang};
			breadCrumbsNav.push(breadObject);
			pageTitle = 'כל המוצרים'
			pageTitleEng = 'Catalog'
			mainAreaHeb = 'סדרות';
			mainAreaEng = 'Brands';

			searchQuery = this.props.location.search;
		} else if (tmpParam.includes('regular')) {
			let breadObject = {Title: 'סל קבוע ', TitleEng: 'My Products ', Link: ""};
			breadCrumbsNav.push(breadObject);
			pageTitle = 'סל קבוע';
			pageTitleEng = 'My Products'

			mainAreaHeb = 'סל קבוע';
			mainAreaEng = 'My Products';
		}else if (tmpParam.includes('recommended')) {
			let breadObject = {Title: 'מומלצים עבורך ', TitleEng: 'Recommended Products ', Link: ""};
			breadCrumbsNav.push(breadObject);
			pageTitle = 'מומלצים עבורך';
			pageTitleEng = 'Recommended Products'

			mainAreaHeb = 'סל קבוע';
			mainAreaEng = 'My Products';
		} else if (tmpParam.includes('new')) {
			let breadObject = {Title: 'חדש! ', TitleEng: 'New In! ', Link: ""};
			breadCrumbsNav.push(breadObject);
			pageTitle = 'חדש!';
			pageTitleEng = 'New In!'

			mainAreaHeb = 'חדש!';
			mainAreaEng = 'New In!';
		}

		if (parentCategory) {
			let breadObject = {
				Title: parentCategory.Title,
				TitleEng: parentCategory.Decription,
				Link: "/category/" + tmpParam + '/' + parentCategory.Id + "/0/0/1/0/" + lang
			};
			breadCrumbsNav.push(breadObject);
			pageTitle = mainAreaHeb + ' / ' + parentCategory.Title;
			pageTitleEng = mainAreaEng + ' / ' + parentCategory.Decription;

		}
		if (childCategory) {
			let breadObject = {
				Title: childCategory.Title,
				TitleEng: childCategory.Decription,
				Link: '/category/' + tmpParam + '/' + parentCategory.Id + "/" + childCategory.Id + "/0/1/0/" + lang
			};
			breadCrumbsNav.push(breadObject);
			pageTitle = mainAreaHeb + ' / ' + childCategory.Title;
			pageTitleEng = mainAreaEng + ' / ' + childCategory.Decription;

		}
		if (subChildCategory) {
			let breadObject = {Title: subChildCategory.Title, TitleEng: subChildCategory.Decription, Link: false};
			breadCrumbsNav.push(breadObject);
			pageTitle = mainAreaHeb + ' / ' + subChildCategory.Title;
			pageTitleEng = mainAreaEng + ' / ' + subChildCategory.Decription;

		}
		let makatTitle = ' מק״ט: ';
		let barcodeTitle = 'ברקוד: ';
		let stockTitle = 'מלאי: ';
		let newTitle = 'חדש';
		let saleTitle = 'מבצע';
		let packTitle = 'מארז';

		let singleQuantTitle = "מארז: ";
		let singlePriceTitle = "יח': ";

		if (lang != 'he') {
			makatTitle = 'Sku: ';
			barcodeTitle = 'Barcode: ';
			stockTitle = 'In Stock: ';
			newTitle = 'New';
			saleTitle = 'Sale';
			packTitle = 'Package';
			singleQuantTitle = 'Units: ';
			singlePriceTitle = 'Unit Price: ';

		}
		return (

			<div className="page-container category-page">
				<div className="category-page-subcont">
					<div className="category-page-subcont2 flex-container">


						<BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={searchQuery} lang={lang}/>
						<div className="slide-menu-cont col-lg-3">
							{this.state.categories && this.state.categories.length ?
								<CategorySlideEcare
									filterObj={this.state.filterObj}
									props={this.props}
									setFilter={this.setFilter}
									categories={this.state.categories}
								/>
								: null}
						</div>
						<div className={"category-page-sub col-lg-9"}>
							<div className={"category-page-sub2"}>
								{this.state.preload ?
									<div className="spinner-wrapper">
										<div className="spinner">
											<div className="bounce1"></div>
											<div className="bounce2"></div>
											<div className="bounce3"></div>
											{this.props.match.params.type == 'lastOnHand' ? <p className="long-wait">זמן טעינה ארוך מהרגיל</p> : null}
										</div>
									</div>
									: null}
								{parentCategory ?
									<Helmet>
										<title>{parentCategory.Title}</title>
										<meta name="keywords" content={parentCategory.Title}/>
										<link rel="canonical"
										      href={entry + '/category/' + parentCategory.ParentId + '/' + parentCategory.Id}/>
										<link rel="alternate"
										      href={entry + '/category/' + parentCategory.ParentId + '/' + parentCategory.Id}
										      hreflang="he-il"/>
									</Helmet>
									: null}
								{this.state.info ? ReactDOM.createPortal(
									<div className="my-modal prod-info">
										<div className="modal-wrapper animated">
											<div className="close-cont">
												<div onClick={this.close} className="close">
													<span className="material-symbols-outlined">close</span>
												</div>
											</div>
											<ProductInfo {...this}/>
										</div>
										<div onClick={this.close} className="overflow"></div>
									</div>,
									document.getElementById('modal-root')
								) : null}
								{this.state.ProductPopUp ? ReactDOM.createPortal(
									<div className="my-modal prod-info">
										<div className="modal-wrapper animated">
											<div className="close-cont">
												<div
													onClick={() => this.setState({ProductPopUp: !this.state.ProductPopUp})}
													className="close">
													<span className="material-symbols-outlined">close</span>
												</div>
											</div>
											<ProductPopUp {...this} lang={lang}/>
										</div>
										<div onClick={this.close} className="overflow"></div>
									</div>,
									document.getElementById('modal-root')
								) : null}
								 {this.state.changePriceObj ? ReactDOM.createPortal(
									<div className="my-modal prod-info admin-agent">
										<div className="modal-wrapper animated">
										<div className="popup-contant-header flex-container">
											<div className="col-lg-10" >
											<p>תמחור מוצר</p>
											</div>
											<div className="close-popup col-lg-2">
											<div className="close-popup-cont" onClick={()=> this.setState({changePriceObj: false})}>
												<img src={globalFileServer + 'icons/close_purple.svg'} />
												</div>
											</div>
										</div>
										<AgentPricing {...this}/>
										</div>
										<div onClick={this.closeAdminPop} className="overflow"></div>
									</div>,
									document.getElementById('modal-root')
								) : null}
								{this.props && this.state.paginateObj && Object.keys(this.state.paginateObj).length ?
									<ListStyleComp
										props={this.props}
										prodQuant={Object.keys(this.state.paginateObj).length ? this.state.paginateObj.ProdTtlCount : '0'}
										prodsPerPage={this.state.prodsPerPage}
										setProdsPerPage={this.setProdsPerPage}
										setSortPerPage={this.setSortPerPage}
										searchPhpFunc={this.searchPhpFunc}
										setSearchProdVal={this.setSearchProdVal}
										downloadExcelPdf={this.downloadExcelPdf}
										sortProdSetting={this.state.sortProdSetting}
										searchProdVal={this.state.searchProdVal}
										lang={lang}
										breadCrumbsNav={breadCrumbsNav}
									/>
									: null}


								<div className="category-header-cont">
									<div className="row-cont flex-container">
										<div className="h1-cont col-lg-8">
											<h1>{lang == 'he' ? pageTitle : pageTitleEng}</h1>
										</div>
									</div>
								</div>
								<div className={this.props.state.listView != 'true' ? "category-wrapper" : "category-wrapper category-wrapper-list"}>
									<div id="navFix" className={"flex-container products-view"}>
										{this.state.tmpProducts && !this.state.tmpProducts.length ?
											<h1 className="hide-on-desctop no-product">לא קיימים מוצרים</h1>
											: null}
										{this.state.tmpProducts && this.state.tmpProducts.length ? this.state.tmpProducts.map((element, index) => {
											let inCart = this.props.state.productsInCart.filter(item => item.Products.CatalogNumber == element.CatalogNumber);
											let productSales = this.props.state.productSales.length ? this.props.state.productSales.filter(item => item.ForCatalogNum == element.CatalogNumber) : [];
											let diffQuantity = this.props.state.productSalesDiffQuan.filter(item => item.ProdId == element.Id && item.Quantity != null);
											let maam = this.props.state.user.Type == 2 ? 1 : 1;
											let image = this.props.state.images.length ? this.props.state.images.filter(item => item == element.CatalogNumber) : [];
											let type;
											let isFav = false;
											if (this.state.favoritesObj && this.state.favoritesObj.items) {
												let findFav = this.state.favoritesObj.items.filter(item => item.CatalogNumber == element.CatalogNumber);
												if (findFav && findFav.length > 0) {
													isFav = true;
												}
											}

											if ((inCart.length && !("UnitChosen" in inCart[0])) || (inCart.length == 0)) {
												element.Unit == 2 ? type = "/יח" : type = "/יח'";
											} else if ((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 0)))) {
												type = "/יח'";
											} else if ((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 1)))) {
												type = "/מארז";
											} else if ((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 2)))) {
												type = "/יח";
											}
											if (lang != 'he') {
												type = "";
											}
											type = "";

											let discountCalc = parseFloat((100-(parseFloat(element.Price) * 100 /parseFloat(element.OrgPrice))).toFixed(1));

											if (index <= this.state.toShow) {
												return (
													<div key={index}
															className={element.Unpublished ? "col-lg-3 wrapper-cont unpublished main-product-wrapper-cont" : "wrapper-cont main-product-wrapper-cont col-lg-3"}>
														<div
															className={!element.ActualQuan ? "wrapper main-product-wrapper" : "wrapper main-product-wrapper disable"}>
															<div className="flip-card">
																<div className="flip-card-inner">
																	{productSales && productSales.length ?
																		<p className="c-sale">{'מבצע'}</p>
																		: null}
																	{element.Tags && element.Tags.length > 0 ? element.Tags.map((tagEle, tagInd) => {
																		return (
																			<p key={tagInd}
																				className={tagEle.ColorCls}>{tagEle.WebTitle}</p>
																		)
																	}) : null}

																	{element.LastOnHand ?
																		<p className="c4">{'אחרונים במלאי'}</p>
																	: null}
																</div>
															</div>

															{element.RePrice? 
																<div
																	className={"favorite-cont change_price_cont"}> 
																	<span className="material-symbols-outlined">price_change</span>
																</div>
															:null}
												
															<div className = {'img-text-container'}
																onClick={!element.IsParent ? () => this.setState({
																selectedProd: element,
																ProductPopUp: true
															}) : () => this.goToProductParent(element.CatalogNumber)}>
																<div className="img-cont">
																	<img className="img"
																			src={element.Img ? globalFileServer + 'products/' + element.Img : globalFileServer + 'placeholder.jpg'}
																			onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}/>
																</div>
																<div
																	className={this.props.state.user ? "prod-data-cont user" : "prod-data-cont"}>
																	<h3 className="p-title">{lang == "he" ? element.Title && element.Title.length > 60 ? (element.Title.substr(0, 60) + '...') : element.Title : element.Description}</h3>
																	<div className="barcode-cont">
																		<div>
																			<p className="row-title">{makatTitle}</p>
																			<p className="Mask-long">{element.CatalogNumber}</p>
																		</div>
																		{element.Barcode ?
																			<div>
																				<p className="row-title">{barcodeTitle}</p>
																				<p className="Mask">{element.Barcode}</p>
																			</div>
																		: null}
																		<div>
																			<p className="row-title">{singleQuantTitle}</p>
																			<p className="Mask-long">{element.PackQuan + " יח'"}</p>
																		</div>
																		{element.OnHand && (localStorage.agent) ?
																			<div className="">
																				<p className="row-title highlight-p-cls">{stockTitle}</p>
																				<p className="Mask ltr highlight-p-cls">{element.OnHandPreview}</p>
																				<p className="highlight-p-cls">{" יח'"}</p>

																			</div>
																		: null}
																	</div>
																	{/*
																	{this.props.match.params.type=='regular' ? 
																		<div className="last-price-cont">
																			<div className="last-price-row">
																				<p className="row-title">{'נרכש לאחרונה:'}</p>
																				<p className="Mask">{element.LastPriceDate ? element.LastPriceDate : ''}</p>
																			</div>
																			<div className="last-price-row">
																				<p className="row-title">{'מחיר אחרון:'}</p>
																				<p className="Mask">{element.LastPriceVal ? element.LastPriceVal : ''}</p>
																			</div>
																		</div>
																	:null}
																	*/}
																</div>
																
															</div>
														
															
															<div className="price-and-addtocart-cont">
															
																{(this.props.state.user && this.props.state.selectedMode) && element.Price && element.Price != 0 && !element.IsParent && parseInt(element.OnHand) != 0 ?
																	<div className="price-cont flex-container">
																		<div className="price-cont-sub top col-lg-12 flex-container">
																			<div className="price-cont-sub-right-box col-lg-4">
																				<p className="row-title">{"מחיר יח'"}</p>
																				<p className="row-val price">{parseFloat(element.OrgPrice).toFixed(1)}</p>
																			</div>
																			<div className="price-cont-sub-right-box  col-lg-4">
																				<p className="row-title">{'הנחה'}</p>
																				{localStorage.agent && localStorage.user && this.props.state.selectedMode ? 
																					<input id={"inputPrice_"+element.CatalogNumber}
																					type="number"
																					onClick={()=> this.selectInput(element.CatalogNumber, '#inputPrice_')}
																					onChange={this.props.agentRepriceDiscount.bind(this, element)}
																					onBlur={this.props.agentRepriceValidate.bind(this,element)}
																					value={discountCalc}
																				/>
																				:
																					<p className="row-val percent">{discountCalc}</p>
																				}
																			</div>
																			<div className="price-cont-sub-right-box  col-lg-4">
																				<p className="row-title highlight-p-cls">{"סה״כ"}</p>
																				{localStorage.agent && localStorage.user && this.props.state.selectedMode ? 
																						<input id={"inputDiscount_"+element.CatalogNumber}
																						className=''
																						type="number"
																						onClick={()=> this.selectInput(element.CatalogNumber, '#inputDiscount_')}
																						onChange={this.props.agentReprice.bind(this, element)}
																						onBlur={this.props.agentRepriceValidate.bind(this,element)}
																						value={parseFloat(parseFloat(element.Price).toFixed(1))}
																					/>
																				:
																					<p className="row-val price highlight-p-cls">{parseFloat(parseFloat(element.Price).toFixed(1))}</p>
																				}
																			</div>
																			
																		</div>
																		<div className="price-cont-sub col-lg-12 flex-container">
																			<div className="price-cont-sub-left-box col-lg-6">
																				<p className="row-title highlight-p-cls">{"יח' להזמנה"}</p>
																				<p className="row-val no-bg highlight-p-cls">{inCart.length ? (parseFloat(inCart[0].Quantity) * parseInt(element.PackQuan)).toFixed(1) : '0'}</p>
																			</div>
																			<div className="price-cont-sub-right-box  col-lg-6">
																				<p className="row-title">{'סה״כ להזמנה'}</p>
																				<p className="row-val no-bg price">{inCart.length ? (parseFloat(element.Price) * inCart[0].Quantity * parseInt(element.PackQuan)).toFixed(1) : '0'}</p>
																			</div>
																		</div>
																	
																	</div>
																: null}

																{(this.props.state.user && this.props.state.selectedMode) && element.Price && element.Price != 0 && !element.IsParent && parseInt(element.OnHand) != 0 ?
																	<div
																		className={inCart.length ? "add-to-cart in-cart catalog after-add" : "add-to-cart not-in-cart catalog before-add"}>
																		<ProductAddToCartCatalog
																			inCart={inCart}
																			element={element}
																			price={(parseFloat(element.Price) * maam)}
																			{...props}
																		/>
																	</div>
																: null}
															</div>
															{this.props.state.user && element.IsParent ?
																<NavLink className={"meaged-nav"}
																			to={"/category/" + this.props.match.params.type + '/' + this.props.match.params.lvl1 + "/" + this.props.match.params.lvl2 + "/" + this.props.match.params.lvl3 + "/1/" + element.CatalogNumber + "/" + lang}>
																	<div className={"meaged-main"}>
																		<p>{lang == "he" ? "צפה במוצרים" : "View Products"}</p>
																	</div>
																</NavLink>
																: null}
														</div>
													</div>
												);
											}
										}) : null}
									</div>
								</div>
									
									
								<Parallax img="parrallax_5.jpg"/>
								{this.props && this.state.paginateObj && Object.keys(this.state.paginateObj).length ?
									<Pagination paginateObj={this.state.paginateObj} headProps={this.props.match.params}
									            headLocation={this.props.location.search} lang={lang}/>
									: null}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
