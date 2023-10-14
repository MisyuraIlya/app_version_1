import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import DatePicker from 'react-datepicker';
import SweetAlert from 'sweetalert2';
import Adress from './shopCart/Adress';
import PayPopup from './shopCart/PayPopup';
import ProductAddToCart from "./productPage/ProductAddToCart";
import ProductPopUp from "./productPage/ProductPopUp";
import ShopCartSpecialSettings from "../tools/ShopCartSpecialSettings";
import { CartServices } from "../../modules/Cart/services/cart.services";
import { getCurrentUserId } from "../../modules/Auth/helpers/getCurrentUserId";




let user;
localStorage.user ? user = JSON.parse(localStorage.user) : null;

export default class ShopCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			polygons: [],
			price: 0,
			deliveryOption: false,
			neib: false,
			deliveryPrice: 0,
			address: [],
			tempAddress: [],
			adressPopup: false,
			paymentMethod: 'card',
			termsAndConditions: true,
			pickupSelected: false,
			pickupDiscount: 0,

			order: [],
			toPayPopup: false,
			payAgentPopup: false,
			payed: 0,
			date: '',
			preload: false,
			discount: 0,
			shippingMethod: 1,
			requestedDate: false,
			comment: "",
			glbVatActive: 0,
			priceBefore: 0,
			askForCreditPayment: false,
			askForSales: false,
			writeOrderMode: "0",
			orderVal: [],
			obligoCheck: false,
			ProductPopUp: false,
			selectedProd: [],
			specialSettingsPop: false,
			sendNoApproval: false

		}

	}

	componentDidMount() {


		user ? this.getUserUpdatedDet() : null;

		if (typeof google == 'undefined') {
			const script = document.createElement("script");
			script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAmSz5YciOiq-rPQ9Pjy3ntdfB60Swex_s&libraries=places,geometry&language=he-IL";
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		}
		//this.getPolygons();
		//reSign

		// if (localStorage.id && localStorage.exId && localStorage.user) {
		// 	this.reSign();
		// 	this.setState({preload: true});
		// 	setTimeout(() => this.setState({preload: false}), 2500);
		// }

		if (this.props.state.productsInCart.length && this.props.state.productSales.length) {
			this.reducePrice();
		}

		localStorage.agent ? this.setState({ termsAndConditions: true }) : null;


		// if(localStorage.user){
		//   let addressJson = JSON.parse(localStorage.user).AddressJson;
		//   if(addressJson){
		//     let address = JSON.parse(addressJson);
		//     if(address){
		//       this.setState({address});
		//       this.selectShipping(2,0);
		//
		//     }
		//   }
		// }

		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 100);
		// if (localStorage.agent && !localStorage.id) {
		// 	$(".summary").hide();
		// }
		/*
		if((!localStorage.role && !localStorage.agent) && (!localStorage.askForSale) && (this.props.state.productSales && this.props.state.productSales.length > 1)){
		  this.setState({askForSales: true});
		  localStorage.setItem('askForSale', false);
		}
		*/
		this.props.validateAgentReprice();

	}


	componentDidUpdate(prevProps, prevState) {



		if (JSON.stringify(prevProps.state.productsInCart) != JSON.stringify(this.props.state.productsInCart)) {
			this.reducePrice();
		}
		if (JSON.stringify(prevProps.state.productSales) != JSON.stringify(this.props.state.productSales)) {
			this.reducePrice();
		}
		if (JSON.stringify(prevProps.state.agentPriceOverwriteArr) != JSON.stringify(this.props.state.agentPriceOverwriteArr) && this.props.state.productsInCart && this.props.state.productsInCart.length) {
			this.props.validateAgentReprice();
			this.reducePrice();
		}

	}

	selectShipping = (id, price) => {

		if (id == 1) {
			this.setState({ deliveryOption: false, shippingMethod: id, deliveryPrice: price });
		} else {
			let val = {
				polygonId: JSON.parse(user.AddressJson)[0].polygonId
			};

			$.ajax({
				url: globalServer + 'new-api/getPoligonData.php',
				type: 'POST',
				data: val,
			}).done(function (data) {
				if (data.result == "success") {
					this.setState({ deliveryPrice: parseInt(JSON.parse(data.user).Price) });
					this.setState({
						shippingMethod: id,
						deliveryOption: true
					});
					if (id != 1) {
						let address = JSON.parse(localStorage.user).AddressJson ? JSON.parse(JSON.parse(localStorage.user).AddressJson) : null;
						if (address && address.length) {
							address[0].active = true;
							this.setState({ address });
						}
					}
				}
			}.bind(this)).fail(function () {
				console.log('error');
			});
		}

	}
	backToShipping = () => {
		this.setState({ preload: true, deliveryOption: true });
		this.reSign(true);
		setTimeout(() => this.setState({ preload: false }), 2500);
	}
	reSign = async (getActiveAddress) => {

		const valAjax = {
			funcName: '',
			point: 'sign_in',
			userName: user.Mail,
			password: user.Password
		};

		try {
			const data = await this.props.ajax(valAjax);
			if (data.result == "success") {
				let user = JSON.parse(data.user);
				localStorage.setItem('user', data.user);
				user.Type ? localStorage.setItem('type', user.Type) : null;
				localStorage.setItem('name', user.Name);
				localStorage.setItem('id', user.Id);
				localStorage.setItem('exId', user.ExId);
				localStorage.setItem('sessionId', data.sessionId);
				localStorage.setItem('token', data.token);

				let address = user.AddressJson;
				if (address) {
					let nAddress = JSON.parse(address);
					this.setState({ address: nAddress });
					let tmpAddress = nAddress[nAddress.length - 1];
					getActiveAddress ? this.setActiveAddress(tmpAddress) : null;
				}
			}
			if (data.result == "not-found") {
				let products = localStorage.products;
				localStorage.clear();
				localStorage.setItem('products', products);
				location.reload();
			}
		} catch (err) {
			//this.props.connectionError('connection error GetSales');
			console.log('connection error getUserUpdatedDet');
		}


	}
	updateUserInfo = async (itemId, text, paramName) => {
		let val = {
			id: itemId,
			val: text,
			paramName: paramName,
			userId: localStorage.id,
			token: localStorage.token,
			sess_id: localStorage.sessionId
		};
		const valAjax = {
			funcName: '',
			point: 'new-update_user_info',
			val: val
		};

		try {
			const data = await this.props.ajax(valAjax);
			this.reSign();
		} catch (err) {
			//this.props.connectionError('connection error GetSales');
			console.log('connection error updateUserInfo');
		}

	}
	roundTo = () => {
		let toPay = (this.state.price + this.state.deliveryPrice + ((this.state.price * parseFloat(this.props.state.defaults.Maam)) / 100)) - this.state.payed;
		let temp = {
			Price: toPay.toFixed(1),
			Check: false
		}
		if (parseFloat(toPay.toFixed(1)) <= 0.04 && parseFloat(toPay.toFixed(1)) > -0.1) {
			temp.Check = true;
		}
		return temp;
	}
	writeOrder = async (userDetails, order, cardPayment, writeOrderMode, draftStatus) => {

		this.setState({ preload: true });


		let user;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		order = JSON.stringify(order);

		let params = { userDetails, order, cardPayment };

		params.DeliveryPrice = this.state.deliveryPrice;
		params.PriceNoVat = ((this.state.priceBefore - (this.state.priceBefore * this.state.discount / 100)) + this.state.deliveryPrice).toFixed(2);
		params.TotalPrice = ((this.state.priceBefore - (this.state.priceBefore * this.state.discount / 100)) + this.state.deliveryPrice + ((this.state.glbVatActive - (this.state.glbVatActive * this.state.discount / 100)) * parseFloat(this.props.state.defaults.Maam) / 100)).toFixed(2);
		this.state.discount ? params.Discount = this.state.discount : null;
		user ? params.ClientName = user.Name : null;
		localStorage.agent ? params.Agent = localStorage.agent : null;
		params.Merakez = user.Merakez;

		this.state.requestedDate ? params.RequestedDate = this.state.requestedDate : null;
		this.state.comment ? params.OrdComment = this.state.comment.substring(0, 250) : null;


		if (user) {
			params.allUser = JSON.parse(localStorage.user);
		}
		params.orderType = writeOrderMode;
		params.pickupSelected = this.state.pickupSelected;
		params.b2bPickupDiscount = this.props.state.defaults.b2bPickupDiscount;
		params.selectedMode = this.props.state.selectedMode;
		params.agentPriceOverwriteArr = this.props.state.agentPriceOverwriteArr;
		params.draftStatus = draftStatus;
		localStorage.orderSpecialSetting ? params.orderSpecialSetting = localStorage.orderSpecialSetting : params.orderSpecialSetting = false;

		let totalSum = params.TotalPrice;
		params.sendNoApproval = this.state.sendNoApproval;

		// params = JSON.stringify(params);

		const valAjax = {
			funcName: '',
			point: 'new-api/write_order',
			params: params
		};
		console.log('params',params, JSON.parse(params.order))

		try {
			const data = await CartServices.CreateOrder(
				getCurrentUserId(),
				JSON.parse(params.order),
				params.TotalPrice,
				params.PriceNoVat,
				params.DeliveryPrice,
				params.OrdComment,
				params.Discount,
				params.sendNoApproval,
				params.orderSpecialSetting,
				params.draftStatus,
				params.agentPriceOverwriteArr,
				params.selectedMode,
				params.b2bPickupDiscount,
				params.pickupSelected,
				params.orderType,
				params.RequestedDate,
				params.Agent,
			)
			let jsonData = JSON.parse(data);

			let ordId = jsonData.ordId;
			if (jsonData.result == "success") {
				if (writeOrderMode == '0') {
					let orderVal = {
						finalTotal: totalSum,
						ordId: ordId,
						userName: user.Name
					};

					this.setState({ toPayPopup: true, orderVal });
				} else {
					this.OrderSuccess(jsonData, draftStatus);
				}

				this.setState({ preload: false });
			} else {
				this.orderError();
			}

		} catch (err) {
			console.log('connection error order');
		}

	}

	OrderSuccess = (jsonData, draftStatus) => {

		this.setState({ toPayPopup: false, preload: false });
		if(draftStatus != 'Draft'){
			SweetAlert({
				title: jsonData.Comment,
				type: "success",
				showConfirmButton: false,
				timer: 4000,
			})
				.then(
					function () {
	
						this.props.simpleClearCart();
						this.props.history.push('/docsHistory/1/' + this.props.state.lang);
	
						let val = {
							'appIds': data.appIds,
							'Message': "התקבלה הזמנה חדשה מ" + this.props.state.user.Name
						};
	
						$.ajax({
							url: globalServer + 'new-api/send_not.php',
							type: 'POST',
							data: val
						}).done(function (data) {
						}.bind(this)).fail(function () {
							console.log('error');
						});
					}.bind(this)
				)
			.catch(SweetAlert.noop);
		}else{
			SweetAlert({
				title: 'טיוטה נשמרה בהצלחה',
				type: "success",
				showConfirmButton: false,
				timer: 4000,
			})
				.then(
					function () {
	
						this.props.simpleClearCart();
						this.props.history.push('/docsHistory/1/' + this.props.state.lang);
					}.bind(this)
				)
			.catch(SweetAlert.noop);
		}
		
	};

	orderError = () => {

		this.setState({ preload: false });
		SweetAlert({
			title: 'העסקה נכשלה',
			text: 'אנו צרו קשר עם מוקד התמיכה',
			type: 'error',
			showConfirmButton: true
		}).then(function (res) {
			if (res.value) {
				//localStorage.clear();
				location.reload();
			}
		}.bind(this)).catch(SweetAlert.noop);
	}
	splitPaymentsPay = (data, isB2b, writeOrderMode, draftStatus) => {


		let user = JSON.parse(localStorage.user);
		let addressJson = this.state.address.length ? this.state.address : null;
		let cardPayment = "";
		let order = [];
		let shippingHandle = this.props.state.defaults.Delivery.filter(item => item.Id == this.state.shippingMethod)[0];

		let userDetails = {
			UserId: user.Id,
			UserExId: user.ExId,
			UserName: user.Name,
			Passport: user.Passport,
			Address: addressJson ? addressJson[0].address : '',
			Town: addressJson ? addressJson[0].town : '',
			Zip: addressJson ? addressJson[0].zip : '',
			Tel: addressJson ? addressJson[0].tel : '',
			Mail: user.Mail,
			Agent: user.AgentId,
			Delivery: !isB2b ? shippingHandle.Code : null
		};


		let price = 0;
		let product;
		let tempSingle;
		let singlePriceNoDiscount = 0;
		let singlePrice = 0;
		let linePrice = 0;
		this.props.state.productsInCart.map((element) => {
			price = this.props.globalPriceCalc(element.Products, element.Quantity, element.UnitChosen)[0];
			product = element.Products;

			if (this.props.state.user.Type == 1) {
				if (element.UnitChosen == 1) {
					singlePriceNoDiscount = (parseFloat(element.Products.Price) * parseInt(element.Products.PackQuan)).toFixed(2)
				} else {
					singlePriceNoDiscount = parseFloat(product.Price).toFixed(2);
				}
				singlePrice = (price.toFixed(2) / parseFloat(element.Quantity)).toFixed(2);
				linePrice = (price).toFixed(2);
			} else {

				if (element.UnitChosen == 1) {
					if (!product.Vat) {
						singlePriceNoDiscount = (parseFloat(element.Products.Price / this.props.state.defaults.MaamDecimal) * parseInt(element.Products.PackQuan)).toFixed(2)
					} else {
						singlePriceNoDiscount = (parseFloat(element.Products.Price) * parseInt(element.Products.PackQuan)).toFixed(2)
					}
				} else {
					if (!product.Vat) {
						singlePriceNoDiscount = (parseFloat(product.Price) / this.props.state.defaults.MaamDecimal).toFixed(2);
					} else {
						singlePriceNoDiscount = parseFloat(product.Price).toFixed(2);
					}
				}
				if (!product.Vat) {
					singlePrice = (price.toFixed(2) / this.props.state.defaults.MaamDecimal / parseFloat(element.Quantity)).toFixed(2);
				} else {
					singlePrice = (price.toFixed(2) / parseFloat(element.Quantity)).toFixed(2);
				}
				if (!product.Vat) {
					linePrice = (price / this.props.state.defaults.MaamDecimal).toFixed(2);
				} else {
					linePrice = (price).toFixed(2);
				}
			}

			tempSingle = {
				Id: product.Id,
				ExtId: product.ExtId,
				CatalogNumber: product.CatalogNumber,
				Title: product.Title,
				Quantity: element.Quantity,
				SinglePrice: singlePrice,
				Price: linePrice,
				UnitChosen: element.UnitChosen,
				BaseUnit: product.Unit,

				PackQuan: element.Products.PackQuan,
				SinglePriceNoDiscount: singlePriceNoDiscount,
				NoVat: product.Vat,
				ItemObj: product
			}
			order.push(tempSingle);

		});

		if (this.props.state.user.Type == 2) {

			let delPrice = parseFloat(parseFloat(this.state.deliveryPrice) / this.props.state.defaults.MaamDecimal).toFixed(2);

			tempSingle = {
				Id: 999125,
				ExtId: null,
				CatalogNumber: '125',
				Title: 'משלוח',
				Quantity: 1,
				SinglePrice: delPrice,
				Price: delPrice,
				UnitChosen: 0,
				BaseUnit: '0',
				PackQuan: '1',
				SinglePriceNoDiscount: delPrice,
				NoVat: null
			}
			order.push(tempSingle);
		}


		let freeProdsInCart = [];
		localStorage.freeProdsInCart ? freeProdsInCart = JSON.parse(localStorage.getItem('freeProdsInCart')) : null;

		singlePriceNoDiscount = 0;
		freeProdsInCart.map((item) => {
			product = item.Products;
			if (!item.Products.Vat) {
				singlePriceNoDiscount = parseFloat(item.Products.Price);
			} else {
				singlePriceNoDiscount = parseFloat(item.Products.Price) / this.props.state.defaults.MaamDecimal;
			}
			tempSingle = {

				Id: item.Id,
				ExtId: item.Products.ExtId,
				CatalogNumber: item.Products.CatalogNumber,
				Title: item.Products.Title,
				Quantity: item.Quantity,
				SinglePrice: 0,
				Price: 0,
				UnitChosen: item.unitChosen,
				BaseUnit: product.Unit,

				PackQuan: item.Products.PackQuan,
				SinglePriceNoDiscount: singlePriceNoDiscount,
				NoVat: item.Products.Vat,
				ItemObj: item.Products
			}
			order.push(tempSingle);
		})

		data ? cardPayment = data : null;
		this.writeOrder(userDetails, order, cardPayment, writeOrderMode, draftStatus);
	}
	toPay = (action) => {
		let user = localStorage.user ? JSON.parse(localStorage.user) : null;
		if (!user || !this.state.termsAndConditions) {
			if (!this.state.termsAndConditions && user) {
				this.error('אנא קרא והסכם לתנאי השימוש', 'error');
			}
			if (!user) {
				$('#signIn').click();
			}
			if (user) {
				if (!user.Id) {
					localStorage.clear();
					location.reload();
				}
			}
		}
		if (user && this.state.termsAndConditions) {
			if (!this.props.state.productsInCart.length) {
				this.props.history.push('/');
			}
			if (this.props.state.productsInCart.length) {
				let totall = ((this.state.priceBefore - (this.state.priceBefore * this.state.discount / 100)) + this.state.deliveryPrice + ((this.state.glbVatActive - (this.state.glbVatActive * this.state.discount / 100)) * parseFloat(this.props.state.defaults.Maam) / 100)).toFixed(2);
					console.log('this.props.state.user.Type',this.props.state.user.Type)
				if (this.props.state.user.Type) {
					let minPrice;
					user.MinPrice ? minPrice = parseFloat(user.MinPrice) : minPrice = this.props.state.defaults.minPriceB2b;
					//if (totall >= minPrice) {
						let writeOrderMode;
						if (action == "pay") {
							this.setState({ writeOrderMode: "0" });
							writeOrderMode = '0';
						} else {
							this.setState({ writeOrderMode: "1" });
							writeOrderMode = '1';
						}
						this.splitPaymentsPay(false, true, writeOrderMode, 'NoDraft');
					/*
					} else {
						this.error('מינימום הזמנה: ' + minPrice + ' ש״ח', 'error');
					}
					*/
				} else {
					if (!this.state.deliveryOption || (this.state.deliveryOption && this.state.address.length)) {
						if (totall >= this.props.state.defaults.minPriceB2c) {
							this.payPopup();
						} else {
							this.error('מינימום הזמנה: ' + this.props.state.defaults.minPriceB2c + ' ש״ח', 'error');
						}
					}
					if (this.state.deliveryOption && !this.state.address.length) {
						this.error('אנא בחר כתובת', 'error');
					}
				}
			}
		}
	}
	payPopup = () => {
		this.setState({ toPayPopup: true });
	}
	closePayPopup = () => {
		this.setState({ toPayPopup: false, payAgentPopup: false });
	}
	pickupSelectedFunc = (val) => {

		let pickUpDiscount = this.props.state.defaults.b2bPickupDiscount;
		let discount = this.state.discount;
		if (val) {
			discount = parseFloat(discount) + pickUpDiscount;
		} else {
			discount = parseFloat(discount) - pickUpDiscount;
		}
		this.setState({ pickupSelected: val, discount });

	}

	reducePrice = () => {

		let priceArray = [];
		let vatArray = [];
		let noVatArray = [];
		let isVat = false;

		this.props.state.productsInCart.map((element, index) => {
			priceArray.push((this.props.globalPriceCalc(element.Products, element.Quantity, element.UnitChosen))[0]);

			isVat = this.props.glbVatCalc(element.Products);
			if (!isVat) {
				vatArray.push(priceArray[priceArray.length - 1]);
			}
		});
		//debugger;
		const reducer = (accumulator, currentValue) => accumulator + currentValue;

		let price = 0;
		let priceBefore = 0;

		if (priceArray.length) {
			priceBefore = price = priceArray.reduce(reducer);
			if (localStorage.user) {
				let user = JSON.parse(localStorage.user);
				price = priceArray.reduce(reducer);
				if (this.state.discount) {
					let percent = parseFloat(this.state.discount);
					let p = parseFloat(price);
					let prePrice = (p - ((p * percent) / 100));
					price = prePrice;
					this.setState({ discount: this.state.discount });
				}
			}
		}
		let glbVatActive = 0;
		vatArray.length ? glbVatActive = (vatArray.reduce(reducer)).toFixed(1) : null;

		this.setState({ price: price, glbVatActive, priceBefore });
		//  this.props.writeGlbTotal(priceBefore, this.state.discount, this.state.deliveryPrice, this.state.glbVatActive);


	}
	close = () => {
		this.setState({ adressPopup: false });
		if (this.state.address.length) {
			let tmpAddress = this.state.address[this.state.address.length - 1];
			this.setActiveAddress(tmpAddress);
		}
	}
	pushAddress = (address) => {
		address[0].active = true;
		this.setState({ address, adressPopup: false });
		//let tmpAddress = address[address.length - 1];
		//this.setActiveAddress(tmpAddress);
		let text = JSON.stringify(address);
		this.updateUserInfo(this.props.state.user.Id, text, 'AddressJson');
		this.checkDelivery(address[0]);

		//this.state.shippingMethod == 4 ? this.checkDelivery(address[0]) : null;


	}
	getPolygons = async () => {
		const valAjax = {
			funcName: '',
			point: 'new-api/polygon_view'
		};

		try {
			const data = await this.props.ajax(valAjax);
			let polygons = data.Polygons;
			polygons.map((item) => {
				item.Coord = JSON.parse(item.Coord)
			});
			this.setState({ polygons });
		} catch (err) {
			//this.props.connectionError('connection error GetSales');
			console.log('connection error polygon_view');
		}


	}
	setActiveAddress = (element) => {
		let address = this.state.address;
		address.map(item => item.active = false);
		address.find(x => x.id == element.id).active = true;
		this.setState({ address });
		setTimeout(() => {
			this.checkDelivery(element)
		}, 2000);
	}
	removeAddress = (element) => {
		// debugger;
		// let address = this.state.address.filter(item => item.id != element.id);
		// address.map(item => item.active = false);
		this.setState({
			address: [],
			deliveryPrice: 0
		});
		//this.updateUserInfo(localStorage.id, address.length ? JSON.stringify(address) : null, 'AddressJson');
		this.updateUserInfo(this.props.state.user.Id, null, 'AddressJson');
	}
	checkDelivery = (element) => {
		let neib = [];
		let exist = false;
		let coord = new google.maps.LatLng(element.lat, element.lng);
		this.state.polygons.map((item) => {
			let opts = {
				paths: item.Coord,
				strokeColor: '#ff0000',
				strokeOpacity: 0.8,
				strokeWeight: 3,
				fillColor: '#ff0000',
				fillOpacity: 0.2
			}
			let newPolygon = new google.maps.Polygon(opts);
			exist = google.maps.geometry.poly.containsLocation(coord, newPolygon);
			exist ? neib.push(item) : null;
		});
		if (neib.length) {
			this.setState({
				neib,
				deliveryPrice: parseFloat(neib[0].Price)
			});
		} else {
			SweetAlert({
				title: 'אופס',
				text: 'איננו מבצעים משלוחים לאיזור זה. עמכם הסליחה.',
				type: 'error',
				showConfirmButton: false,
				timer: 4000
			}).catch(SweetAlert.noop);
		}
	}
	error = (textError, type) => {
		SweetAlert({
			title: textError,
			type: type,
			timer: 3000,
			showConfirmButton: false
		}).catch(SweetAlert.noop);
	}
	getUserUpdatedDet = async () => {

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

		const valAjax = {
			funcName: '',
			point: 'new-api/getUserUpdatedDet',
			val: val
		};

		try {
			const data = await this.props.ajax(valAjax);
			if (data.result == "success") {
				localStorage.setItem('user', data.user);
				let userData = JSON.parse(data.user);

				let discount = userData.Discount;
				if (discount) {
					this.setState({ discount: discount });
				} else {
					this.setState({ discount: 0 });
				}
				
				if (data.clientProfileObj) {
					let itratObligo = parseInt(data.clientProfileObj.Users[0].MaxObligo) - parseInt(data.clientProfileObj.Users[0].Balance)
					this.setState({ obligoCheck: parseFloat(itratObligo) });
				}
			}
		} catch (err) {
			//this.props.connectionError('connection error GetSales');
			console.log('connection error getUserUpdatedDet');
		}

	}
	payPopBtnFunc = (action) => {
		this.setState({ askForCreditPayment: false });

		this.splitPaymentsPay(false, true, '0', 'NoDraft')

	}
	goToSales = () => {
		this.props.history.push('/sales');
	}
	cancelSales = () => {
		this.setState({ askForSales: false })
	}

	saveAsDraft = () => {
		SweetAlert({
			title: 'שמור הזמנה כטיוטה?',
			text: 'טיוטה תשמר וסל הקניות הנוכחי יתרוקן',
			type: 'info',
			showCancelButton: true,
			confirmButtonColor: '#22b09a',
			cancelButtonColor: '#d80028',
			confirmButtonText: 'אשר',
			cancelButtonText: 'בטל'
		}).then(function (res) {
			if (res.value) {
				this.splitPaymentsPay(false, true, '1', 'Draft');

			}
		}.bind(this)).catch(SweetAlert.noop);
	}
	

	goToDrafts = () => {
		this.props.history.push('/docsDrafts');
	}

	saveComments = (val) => {
		this.setState({ comment: val });
		localStorage.OrdComment = val;
	}

	closePropdPop = () => {
		this.setState({ ProductPopUp: false });
	}
	setSelectedProd = (element) => {
		this.setState({ selectedProd: element, ProductPopUp: true })
	}

	resetCart = () => {

		SweetAlert({
			title: 'האם אתה בטוח?',
			text: 'כל המוצרים בעגלה יימחקו',
			type: 'info',
			showCancelButton: true,
			confirmButtonColor: '#22b09a',
			cancelButtonColor: '#d80028',
			confirmButtonText: 'אשר',
			cancelButtonText: 'בטל'
		}).then(function (res) {
			if (res.value) {
				this.props.simpleClearCart();
			}
		}.bind(this)).catch(SweetAlert.noop);
	}
	closeSpecialSettingsPop = () =>{
		this.setState({specialSettingsPop:false})
	}

	selectInput(id, param){
		
		setTimeout(() => {
			$(param+id).select();
		}, 300);
	}

	render() {
		let props = Object.assign({}, this.props);

		let totalBasket = 0;
		if (user && user.Type == 1) {
			totalBasket = ((this.state.priceBefore - (this.state.priceBefore * this.state.discount / 100)) + this.state.deliveryPrice + ((this.state.glbVatActive - (this.state.glbVatActive * this.state.discount / 100)) * parseFloat(this.props.state.defaults.Maam) / 100)).toFixed(1)
		} else {
			totalBasket = ((this.state.priceBefore - (this.state.priceBefore * this.state.discount / 100)) + this.state.deliveryPrice).toFixed(1)
		}
		let minPrice = 0;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;

		user.MinPrice ? minPrice = parseFloat(user.MinPrice) : minPrice = this.props.state.defaults.minPriceB2b;
		let lang = this.props.state.lang;

		let totalTitle = 'סיכום';
		if(this.props.state.selectedMode == '1'){
			totalTitle += ' ' + 'הזמנה';
		}else if(this.props.state.selectedMode == '2'){
			totalTitle += ' ' + 'ה.מחיר';
		}else if(this.props.state.selectedMode == '3'){
			totalTitle += ' ' + 'החזרה';
		}
		totalTitle += ' | ' + user.Name;

		return (
			<div className="page-container shop-cart docs">
				{this.state.askForCreditPayment ?
					<div className="pay-question-wrapp">
						<div className="popup-contant">
							<div className="close-popup" onClick={() => this.setState({ askForCreditPayment: false })}>
								<img src={globalFileServer + 'icons/close.svg'} />
							</div>
							<h3>האם תרצה לשלם עבור הזמנה זו באשראי</h3>
							<div className="flex-container pay-btns-cont">
								<div className="col-lg-6 btn-pay">
									<p onClick={this.payPopBtnFunc.bind(this, "pay")}>שלם באשראי</p>
								</div>
								<div className="col-lg-6 btn-send">
									<p onClick={this.payPopBtnFunc.bind(this, "send")}>לא, שלח הזמנה</p>
								</div>
							</div>

						</div>
					</div>
					: null}
				{this.state.askForSales ?
					<div className="pay-question-wrapp">
						<div className="popup-contant">
							<div className="close-popup" onClick={() => this.setState({ askForSales: false })}>
								<img src={globalFileServer + 'icons/close.svg'} />
							</div>
							<h3>יש לנו מבצעים ממש שווים!!</h3>
							<p>רוצה לראות?</p>
							<div className="flex-container pay-btns-cont">
								<div className="col-lg-6 btn-pay">
									<p onClick={this.goToSales.bind(this)}>עבור למבצעים</p>
								</div>
								<div className="col-lg-6 btn-send">
									<p onClick={this.cancelSales.bind(this)}>לא, תודה</p>
								</div>
							</div>

						</div>
					</div>
					: null}
				{this.state.adressPopup ? ReactDOM.createPortal(
					<Adress {...this} />,
					document.getElementById('modal-root')
				) : null}
				{this.state.toPayPopup ? ReactDOM.createPortal(
					<PayPopup {...this} />,
					document.getElementById('modal-root')
				) : null}
				{this.state.ProductPopUp ? ReactDOM.createPortal(
					<div className="my-modal prod-info">
						<div className="modal-wrapper animated">
							<div className="close-cont">
								<div onClick={() => this.setState({ ProductPopUp: !this.state.ProductPopUp })}
									className="close">
									<img src={globalFileServer + 'icons/close.svg'} />
								</div>
							</div>
							<ProductPopUp {...this} />
						</div>
						<div onClick={this.close} className="overflow"></div>
					</div>,
					document.getElementById('modal-root')
				) : null}
				{this.state.specialSettingsPop ? ReactDOM.createPortal(
					<div className="my-modal prod-info">
						<div className="modal-wrapper animated shopCartSpecialSet">
							<div className="close-cont">
								<div onClick={() => this.setState({ specialSettingsPop: !this.state.specialSettingsPop })}
									className="close">
									<img src={globalFileServer + 'icons/close.svg'} />
								</div>
							</div>
							<ShopCartSpecialSettings {...this} />
						</div>
						<div onClick={this.close} className="overflow"></div>
					</div>,
					document.getElementById('modal-root')
				) : null}
				<div className="container flex-container prods-main-cont">
					<div className="col-lg-9 right-cont">
						<div className="right-cont-subcont">
							<div className="first-line-cont">


								{this.props.state.productsInCart && this.props.state.productsInCart.length ?
									<div className="draft-btn-cont reset">
										<p onClick={() => this.resetCart()}>מחק סל</p>
									</div>
									: null}
								{this.props.state.productsInCart && this.props.state.productsInCart.length && this.props.state.selectedMode == 1 ?
									<div className="draft-btn-cont">
										<p onClick={() => this.saveAsDraft()}>שמור טיוטה</p>
									</div>
									: null}
								{this.props.state.selectedMode == 1 ?
									<div className="draft-btn-cont">
										<p onClick={() => this.goToDrafts()}>טען טיוטה</p>
									</div>
									: null}
							</div>
							<div>
								<div className="h1-cont">
									<h1 className="title">{lang == 'he' ? totalTitle : 'Summary'}</h1>
								</div>
								<div className="products doc-container">
									<div id='lines-main-cont' className="lines-main-cont shop-cart-table">
										<table className="lines-sub-cont">
											<tbody>
												<tr className="heading">
													<th className="col-cont  sticky-col">
														<p></p>
													</th>
													<th className="col-cont">
														<p></p>
													</th>
													<th className="col-cont">
														<p>פריט</p>
													</th>
													<th className="col-cont">
														<p>מחיר יח'</p>
													</th>
													<th className="col-cont">
														<p>הנחה</p>
													</th>
													<th className="col-cont">
														<p>סה״כ יחידה</p>
													</th>
													<th className="col-cont">
														<p>יח' במארז</p>
													</th>
													<th className="col-cont">
														<p>יח' להזמנה</p>
													</th>
													<th className="col-cont">
														<p>סה״כ להזמנה</p>
													</th>
													<th className="col-cont">
														<p></p>
													</th>
													
												</tr>
												{this.props.state.productSales.length && this.props.state.productsInCart.length ? this.props.state.productsInCart.map((element, index) => {
													//let image = this.props.state.images.length ? this.props.state.images.filter(item => item == element.Products.CatalogNumber) : [];
													let maam = !this.props.state.user.Type ? 1 : 1;
													//let type = element.Products.Unit == "1" ? 'ק״ג' : 'יחידה';
													let priceCalcFunc = this.props.globalPriceCalc(element.Products, element.Quantity, element.UnitChosen);
													let inCart = [];
													inCart.push(element);
													let singleQuantTtl = element.Quantity;
													if (element.UnitChosen == 1) {
														singleQuantTtl = element.Quantity * parseInt(element.Products.PackQuan);
													}

													let discountCalc = parseFloat((100-(parseFloat(element.Products.Price) * 100 /parseFloat(element.Products.OrgPrice))).toFixed(1));

													let lineTtlOrgPrice = (parseFloat(element.Products.OrgPrice) * parseInt(element.Products.PackQuan) * element.Quantity * maam).toFixed(1);
													let lineTtlFinalPrice = priceCalcFunc[0].toFixed(1);
													let lineDiscount = (100 - (lineTtlFinalPrice * 100 / lineTtlOrgPrice)).toFixed(1);


													return (
														<tr key={index} className={"item"} id={'docRow_' + element.Id} onClick={()=> this.goToItemFunc(element)}>
														{/*
															<th className="col-cont sticky-col">
																<img
																	onClick={this.props.deleteProduct.bind(this, element.Id, "cart")}
																	src={globalFileServer + 'icons/delete.svg'}
																/>
															</th>
														*/}	
															<th className="col-cont add-to-cart sticky-col">
																<ProductAddToCart
																	inCart={inCart}
																	element={element.Products}
																	{...props}
																/>
															</th>
															<th className="col-cont">
																<img className="img"
																	src={element.Products.Img ? globalFileServer + 'products/' + element.Products.Img : globalFileServer + 'logo.png'}
																	onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}
																	onClick={() => this.setState({
																		selectedProd: element.Products,
																		ProductPopUp: true
																	})} />
															</th>
															<th className="col-cont" onClick={() => this.setState({
																		selectedProd: element.Products,
																		ProductPopUp: true
																	})}>
																<p className="catalog">{'#' + element.Products.CatalogNumber}</p>
																<p>{lang == 'he' ? element.Products.Title : element.Products.Description}</p>
															</th>
															<th className="col-cont">
																<p>{parseFloat(element.Products.OrgPrice)}</p>
															</th>
															<th className="col-cont">
																{localStorage.agent && localStorage.user && this.props.state.selectedMode ? 
																	<input id={"inputPrice_"+element.Products.CatalogNumber}
																	type="number"
																	onClick={()=> this.selectInput(element.Products.CatalogNumber, '#inputPrice_')}
																	onChange={this.props.agentRepriceDiscount.bind(this, element.Products)}
																	onBlur={this.props.agentRepriceValidate.bind(this,element.Products)}
																	value={discountCalc}
																/>
																:
																	<p className="row-val percent">{discountCalc}</p>
																}
															</th>
															<th className="col-cont">
																{localStorage.agent && localStorage.user && this.props.state.selectedMode ? 
																	<input id={"inputDiscount_"+element.Products.CatalogNumber}
																		type="number"
																		onClick={()=> this.selectInput(element.Products.CatalogNumber, '#inputDiscount_')}
																		onChange={this.props.agentReprice.bind(this, element.Products)}
																		onBlur={this.props.agentRepriceValidate.bind(this,element.Products)}
																		value={parseFloat(parseFloat(element.Products.Price).toFixed(1))}
																	/>
																:
																	<p className="row-val price">{parseFloat(parseFloat(element.Products.Price).toFixed(1))}</p>
																}
															</th>
															<th className="col-cont">
																<p>{element.Products.PackQuan}</p>
															</th>
															<th className="col-cont">
																<p>{parseInt(element.Products.PackQuan) * parseInt(element.Quantity)}</p>
															</th>
															
															<th className="col-cont">
																{parseFloat(lineTtlOrgPrice) != parseFloat(lineTtlFinalPrice) ?
																	<>
																		<p className="price price-p-cls orgCls greyCls">{lineTtlOrgPrice}</p>
																		<p className="disCls price-p-cls greyCls">{'% ' + lineDiscount}</p>
																		<p className="price price-p-cls">{lineTtlFinalPrice}</p>
																	</>
																	:
																	<p className="price price-p-cls">{lineTtlFinalPrice}</p>
																}

															</th>
															<th className="col-cont">
																{priceCalcFunc[1] == 1 ?
																	<p className="c1">{'מבצע'}</p>
																: null}
																{element.Products.RePrice ?
																	<div className={"favorite-cont change_price_cont"}>
																		<span className="material-symbols-outlined">price_change</span>
																	</div>
															: null}
															</th>
															{/*
															<th className="col-cont sticky-col">
																<img
																	onClick={this.props.deleteProduct.bind(this, element.Id, "cart")}
																	src={globalFileServer + 'icons/delete.svg'}
																/>
															</th>
																*/}
														</tr>
													);
												}) :
													<h1 className="empty">{lang == 'he' ? 'עגלת הקניות שלך ריקה' : 'Cart is Empty'} </h1>
												}
												{localStorage.freeProdsInCart ? JSON.parse(localStorage.freeProdsInCart).map((element, index) => {
													//let image = this.props.state.images.length ? this.props.state.images.filter(item => item == element.Products.CatalogNumber) : [];
													let unit = "יחידות";
													if (element.unitChosen == "1") {
														unit = "חבילות";
													} else if (element.unitChosen == "2") {
														unit = 'קילו';
													}
													return (
														<tr key={index} className={"item"} id={'docRow_' + element.Id} onClick={()=> this.goToItemFunc(element)}>
															
															<th className="add-to-cart col-cont sticky-col">
																<p className="freeProds">{element.Quantity + " " + unit}</p>
															</th>
															<th className="col-cont">
																
															</th>
															<th className="col-cont">
																<p>{element.Products.Title}</p>
															</th>
															<th className="col-cont">
																{element.Products.Unit != "2" ?
																	<p>{element.Products.PackQuan}</p>
																	:
																	<p>ק״ג</p>
																}
															</th>
															<th className="col-cont">
																<p>{0}</p>
															</th>
															<th className="col-cont">
																<p className="price">0</p>
															</th>
															<th className="col-cont"></th>
															<th className="col-cont"></th>

															<th className="col-cont">
																<div className={"Discout-cont"}>
																	<p className="c1">{'מבצע'}</p>
																</div>
															</th>
														</tr>
													);
												}) : null}

											</tbody>
										</table>
									</div>


									{/*
									<div className="heading">
										<div className="flex-container heading-subcont">
											<div className="col-lg-1">
												<p></p>
											</div>
											<div className="col-lg-2 center">
												<p>{lang == 'he' ? 'כמות' : 'Quantity'}</p>
											</div>
											<div className="col-lg-1">
												<p></p>
											</div>
											<section className="col-lg-6 flex-container section-cls">
												<div className="col-lg-4">
													<p>{lang == 'he' ? 'שם פריט' : 'Title'}</p>
												</div>
												<div className="col-lg-2 center">
													<p>{lang == 'he' ? "מחיר יח'" : 'Units'}</p>
												</div>
												<div className="col-lg-2 center">
													<p>{lang == 'he' ? "יח' במארז" : 'Units'}</p>
												</div>
												<div className="col-lg-2 center">
													<p>{lang == 'he' ? "כמות יח'" : 'Units'}</p>
												</div>
												<div className="col-lg-2 one center">
													<p>{lang == 'he' ? 'מחיר' : 'Price'}</p>
												</div>
											</section>
											<div className="col-lg-2 one center">
												<p>{lang == 'he' ? 'סה״כ' : 'Total'}</p>
											</div>
										</div>
									</div>

									{this.props.state.productSales.length && this.props.state.productsInCart.length ? this.props.state.productsInCart.map((element, index) => {
										//let image = this.props.state.images.length ? this.props.state.images.filter(item => item == element.Products.CatalogNumber) : [];
										let maam = !this.props.state.user.Type ? 1 : 1;
										//let type = element.Products.Unit == "1" ? 'ק״ג' : 'יחידה';
										let priceCalcFunc = this.props.globalPriceCalc(element.Products, element.Quantity, element.UnitChosen);
										let inCart = [];
										inCart.push(element);
										let singleQuantTtl = element.Quantity;
										if (element.UnitChosen == 1) {
											singleQuantTtl = element.Quantity * parseInt(element.Products.PackQuan);
										}
										let lineTtlOrgPrice = (parseFloat(element.Products.OrgPrice) * parseInt(element.Products.PackQuan) * element.Quantity * maam).toFixed(1);
										let lineTtlFinalPrice = priceCalcFunc[0].toFixed(1);
										let lineDiscount = (100 - (lineTtlFinalPrice * 100 / lineTtlOrgPrice)).toFixed(1);

										return (
											<div className="item" key={index}>
												<div className="flex-container item-flex">
													<div className="col-lg-1 delProd-col">
														<div className="wrapper delete">
															<img
																onClick={this.props.deleteProduct.bind(this, element.Id, "cart")}
																src={globalFileServer + 'icons/delete.svg'}
															/>
														</div>
													</div>
													<div className="add-to-cart col-lg-2">
														<ProductAddToCart
															inCart={inCart}
															element={element.Products}
															{...props}
														/>
													</div>
													<div className="col-lg-1 img-col">
														<img className="img"
															src={element.Products.Img ? globalFileServer + 'products/' + element.Products.Img : globalFileServer + 'logo.png'}
															onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}
															onClick={() => this.setState({
																selectedProd: element.Products,
																ProductPopUp: true
															})} />
													</div>
													<section className="col-lg-6 flex-container section-cls">
														<div className="col-lg-4 title-col">
															<div className="wrapper title">
																<p className="catalog">{'#' + element.Products.CatalogNumber}</p>
																<p>{lang == 'he' ? element.Products.Title : element.Products.Description}</p>
															</div>
														</div>
														<div className="col-lg-2 singlePrice-col">
															<div className="wrapper title center">
																<p>{parseFloat(element.Products.Price).toFixed(1)}</p>
															</div>
														</div>
														<div className="col-lg-2 packQuan-col">
															<div className="wrapper title center">
																<p>{element.Products.PackQuan}</p>
															</div>
														</div>
														<div className="col-lg-2 sungleQuan-col">
															<div className="wrapper title center">
																<p>{parseInt(element.Products.PackQuan) * parseInt(element.Quantity)}</p>
															</div>
														</div>
														<div className="col-lg-2 price-col">
															<div className="wrapper old-price">
																{("UnitChosen" in element && (element.UnitChosen == 0 || element.UnitChosen == 2)) || (!("UnitChosen" in element)) ?
																	<p>{(parseFloat(element.Products.Price) * maam).toFixed(1)}</p>
																	:
																	<p>{((parseFloat(element.Products.Price) * maam) * element.Products.PackQuan).toFixed(1)}</p>
																}
															</div>
														</div>
													</section>
													<div className="col-lg-2 ttlPrice-col">
														<div className="wrapper details center">
															{parseFloat(lineTtlOrgPrice) != parseFloat(lineTtlFinalPrice) ?
																<>
																	<p className="price orgCls greyCls">{lineTtlOrgPrice}</p>
																	<p className="disCls greyCls">{lineDiscount + ' %'}</p>
																	<p className="price">{lineTtlFinalPrice}</p>
																</>
																:
																<p className="price">{lineTtlFinalPrice}</p>
															}

														</div>
													</div>
													{priceCalcFunc[1] == 1 ?
														<div className="Discout-cont">
															<p className="c1">{'מבצע'}</p>
														</div>
														: null}
													{element.Products.RePrice ?
														<div
															className={"favorite-cont change_price_cont"}>
															<span className="material-symbols-outlined">price_change</span>
														</div>
														: null}
								
												</div>
											</div>
										);
									}) :
										<h1 className="empty">{lang == 'he' ? 'עגלת הקניות שלך ריקה' : 'Cart is Empty'} </h1>
									}
									{localStorage.freeProdsInCart ? JSON.parse(localStorage.freeProdsInCart).map((element, index) => {
										//let image = this.props.state.images.length ? this.props.state.images.filter(item => item == element.Products.CatalogNumber) : [];
										let unit = "יחידות";
										if (element.unitChosen == "1") {
											unit = "חבילות";
										} else if (element.unitChosen == "2") {
											unit = 'קילו';
										}
										return (
											<div className="item" key={index}>
												<div className="flex-container item-flex">
													<div className="col-lg-1 delProd-col">
														<div className="wrapper delete">
														</div>
													</div>
													<div className="add-to-cart col-lg-2">
														<p className="freeProds">{element.Quantity + " " + unit}</p>
													</div>
													<div className="col-lg-2 img-col">
														<div
															className="img"
															style={element.Products.Extra1 ? { backgroundImage: 'url(' + element.Products.Extra1 + ')' } : null}
														/>
													</div>
													<section className="col-lg-5 flex-container section-cls">
														<div className="col-lg-6 title-col">
															<div className="wrapper title">
																<p>{element.Products.Title}</p>
															</div>
														</div>
														<div className="col-lg-2 packQuan-col">
															<div className="wrapper title center">
																<div className="wrapper title center">
																	{element.Products.Unit != "2" ?
																		<p>{element.Products.PackQuan}</p>
																		:
																		<p>ק״ג</p>
																	}
																</div>
															</div>
														</div>
														<div className="col-lg-4 price-col">
															<div className="wrapper old-price">
																<p>{0}</p>
															</div>
														</div>
													</section>
													<div className="col-lg-2 ttlPrice-col">
														<div className="wrapper details center">
															<p className="price">0</p>
														</div>
													</div>
													<div className="Discout-cont">
														<p className="c1">{'מבצע'}</p>
													</div>
												</div>
											</div>
										);
									}) : null}
									*/}
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3 summary">
						<div className="wrapper">
							{this.state.preload ?
								<div className="spinner-wrapper">
									<div className="spinner">
										<div className="bounce1"></div>
										<div className="bounce2"></div>
										<div className="bounce3"></div>
									</div>
								</div>
								: null}
							<div className="h1-cont">
								<h1 className="title">{lang == 'he' ? 'פרטי מסמך' : 'Order Details'}</h1>
							</div>
							{!user || user.Type == 2 ?
								<div className="toggle-payment">
									{this.state.deliveryOption ?
										<h2 className="cart-title">בחירת משלוח</h2>
										: null}
									{this.state.deliveryOption ?
										<div>
											{this.state.address.length ?
												<ul className="shipping">
													{this.state.address.map((item, index) => {
														return (
															<li key={index}>
																<span onClick={this.setActiveAddress.bind(this, item)}
																	className={item.active ? 'title active' : 'title'}>
																	{item.streetName + ' ' + item.streetNumber + ', ' + item.town}
																</span>
																<span className="delete"
																	onClick={this.removeAddress.bind(this, item)}>
																	<img src={globalFileServer + 'icons/delete.svg'} />
																</span>
															</li>
														)
													})}
												</ul>
												: null}
											{!this.state.address.length ?
												<div>
													{this.props.state.user ?
														<p onClick={(e) => this.setState({ adressPopup: true })}
															className="select-shipping">בחר כתובת</p>
														:
														<p onClick={(e) => $('#signIn').click()}
															className="select-shipping">בחר כתובת</p>
													}
												</div>
												: null}
										</div>
										: null}
								</div>
								: null}
							{this.props.state.defaults && this.props.state.defaults.userArea ?
								<div className="order-info">
									<div className="prod-info-cont flex-container">
										<div className="col-lg-4">
											<p className="c-title">אספקה:</p>
										</div>
										<div className="col-lg-8 pack_quan">
											<p className="c-nomber">{this.props.state.defaults.userArea}</p>
										</div>
									</div>
								</div>
								: null}
							{/*
              <h2 className="comments-title">הערות להזמנה</h2>
              */}

							{/*
              <div className="pickup-cont">
                <div className="checkboxes-and-radios">
                  <input type="checkbox"
                    onChange={(e)=> this.pickupSelectedFunc(e.target.checked)}
                    name="checkbox-cats" checked={this.state.pickupSelected}
                  id="checkbox-3" value="3" />
                  <label htmlFor="checkbox-3"></label>
                </div>
                <span>הנחת איסוף עצמי</span>
              </div>
*/}

							<div className="total">
								{/*
								<h2 className="cart-title">סיכום</h2>
              */}
								<ul className="first-price">
									<li className="li-border">
										<span className="title">{lang == 'he' ? 'כמות שורות' : 'Disclude Vat'}</span>
										<span className="price hidePrice">{this.props.state.productsInCart.length}</span>
									</li>
									{/*
									{user && user.Type == 1 ?
										<li>
											<span className="title">{lang == 'he' ? 'חייב במע״מ' : 'Include Vat'}</span>
											<span className="price">{this.state.glbVatActive}</span>
										</li>
									: null}
									{user && user.Type == 1 ?
										<li className="li-border">
											<span
												className="title">{lang == 'he' ? 'פטור ממע״מ' : 'Disclude Vat'}</span>
											<span
												className="price">{Math.abs(this.state.priceBefore - this.state.glbVatActive).toFixed(1)}</span>
										</li>
										: null}*/}
									{user && user.Type == 1 ?
										<li>
											<span
												className="title">{lang == 'he' ? 'סה״כ לפני מע״מ' : 'Total No Vat'}</span>
											<span className="price">{(this.state.priceBefore).toFixed(1)}</span>
										</li>
										: null}
									{!user || user.Type == 2 ?
										<li>
											<span className="title">{lang == 'he' ? 'סה״כ' : 'Total'}</span>
											<span className="price">{(this.state.priceBefore).toFixed(1)}</span>
										</li>
										: null}
									{this.state.pickupSelected ?
										<div>
											{user && user.Type == 1 ?
												<li className="">
													<span
														className="title">{"הנחה כללית: " + parseFloat(this.state.discount - this.props.state.defaults.b2bPickupDiscount).toFixed(1) + "%"}</span>
													<span
														className="price">{(this.state.priceBefore * (this.state.discount - this.props.state.defaults.b2bPickupDiscount) / 100).toFixed(1)}</span>
												</li>
												: null}
											{user && user.Type == 1 ?
												<li className="li-border">
													<span
														className="title">{"הנחת איסוף: " + parseFloat(this.props.state.defaults.b2bPickupDiscount).toFixed(1) + "%"}</span>
													<span
														className="price">{(this.state.priceBefore * (this.props.state.defaults.b2bPickupDiscount / 100)).toFixed(1)}</span>
												</li>
												: null}
										</div>
										:
										<div>
											{user && user.Type == 1 ?
												<li className="li-border">
													<span
														className="title">{"הנחה כללית: " + parseFloat(this.state.discount).toFixed(1) + "%"}</span>
													<span
														className="price">{(this.state.priceBefore * this.state.discount / 100).toFixed(1)}</span>
												</li>
												: null}
										</div>
									}


									{user && user.Type == 1 ?
										<li>
											<span
												className="title">{lang == 'he' ? 'סה״כ אחרי הנחה' : 'Total Post Discount'}</span>
											<span
												className="price">{(this.state.priceBefore - (this.state.priceBefore * this.state.discount / 100)).toFixed(1)}</span>
										</li>
										: null}
									{/*
                  <li>
                    <span className="title">דמי משלוח</span>
                    <span className="price">{this.state.deliveryPrice}</span>
                  </li>
                */}
									{user && user.Type == 1 ?
										<li>
											<span className="title">{lang == 'he' ? 'מע״מ' : 'Vat'}</span>
											<span
												className="price">{((this.state.glbVatActive - (this.state.glbVatActive * this.state.discount / 100)) * parseFloat(this.props.state.defaults.Maam) / 100).toFixed(1)}</span>
										</li>
										: null}

								</ul>
								<h4>
									<span className="title">{lang == 'he' ? 'מחיר לתשלום' : 'Price To Pay'}</span>
									<span className="price">{totalBasket}</span>
								</h4>
								<ul className='first-price'>	
									<li>
										<span className="title black">{lang == 'he' ? 'הגדרות לאספקה' : 'Vat'}</span>
										<span onClick={()=>this.setState({specialSettingsPop:true})} className="icon material-symbols-outlined">settings</span>
									</li>
								</ul>

								{this.props.state.selectedMode =='2' &&
									<ul className='first-price'>	
										<li>
											<span className="title black">{lang == 'he' ? 'ללא אישור מנהל' : 'Vat'}</span>
											<div 
												className={this.state.sendNoApproval ? "checkBox active" : "checkBox"}
												onClick={()=>this.setState({sendNoApproval: !this.state.sendNoApproval})}
											></div>							
										</li>
									</ul>
								}
									{/* {totalBasket > this.state.obligoCheck ?
									<div className="obligo-alert-cont">
										{totalBasket > this.state.obligoCheck ?
											<p>{this.props.state.lang == 'he' ? 'חריגת אובליגו. צור קשר עם סוכן / משרד' : 'Obligo exception. Your order will be reviewed and approved by the office.'}</p>
											: null}
									</div>
									: null} */}
								<div>
								
									{minPrice > this.state.priceBefore && this.props.state.selectedMode == '1' ?
										<div className="minPrice-class">
											<p>{"עליך לצבור עוד " + Math.abs(this.state.priceBefore - minPrice).toFixed(1) + " ש״ח עד למינימום הזמנה"}</p>
										</div>
									: null}

									{!this.props.state.user.Blocked && ((this.props.state.productsInCart.length && minPrice <= this.state.priceBefore) || this.props.state.selectedMode != '1') ?
										<div className="pay-btn-cont">
											<div className={!this.state.comment ? 'comments empty' : 'comments'}>
												<textarea
													placeholder={lang == 'he' ? 'הערות למסמך' : 'Comment'}
													value={this.state.comment ? this.state.comment : ""}
													onChange={(e) => this.saveComments(e.target.value)} />
											</div>
											
											<div className="btn-container flex-container">
												<div className="btn-subcontainer col-lg-12">
													<button onClick={() => this.toPay("send")}className="to-pay">{lang == 'he' ? 'שלח' : 'Send Order'}</button>
												</div>
											</div>
											<div className="btn-container flex-container">
												<div className="btn-subcontainer col-lg-12">
													<button onClick={() => this.toPay("pay")}className="to-pay">{lang == 'he' ? 'שלם' : 'Send Order'}</button>
												</div>
											</div>
										</div>
									: null}
								</div>

								
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
