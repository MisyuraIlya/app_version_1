import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SweetAlert from 'sweetalert2';
import Calendar from 'react-calendar';
import PayPopup from '././shopCart/PayPopup';
import ChecksPopUP from "./productPage/ChecksPopUP";
import ReturnsPop from "./productPage/ReturnsPop";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from '../../UserContext';
import BreadCrumbs from "../tools/BreadCrumbs";
import CartTotalsInnerDoc from './shopCart/CartTotalsInnerDoc';
import FindUserPop from "../tools/FindUserPop";



let timeoutId;


export default class DocsHistoryItems extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: [],
			tempItems: [],
			searchProds: [],
      showNotFound: false,
      showSearchMob: false,
      orderObject:[],
      searchVal:"",
      findUserPop:false
		}
	

	}
	componentDidMount(){

    this.getItems();
    setTimeout(() => {
			window.scrollTo(0, 0);
		}, 300);
	}


	getItems = async () => {
    this.setState({preload:true});
    let ordId = this.props.match.params.id;
   
    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      agentExtId: localStorage.agentExId,
      action: "historyItems",
      ordId: ordId
    };

      
    const valAjax = {
      funcName: '',
      point: 'new-api/docs',
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);

      if(items.result == "success"){
        this.setState({items:items.docItems,
           tempItems: items.docItems,
           orderObject: items.orderObject,
           search: false,
           preload: false,
         });
      }
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
	}

  numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  search = (e) =>{

		let value = e.target.value;
   
		clearTimeout(timeoutId);
		this.setState({searchVal: value})
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		if(value==""){
			this.clearSearch();
		}
		if(inputLength === 0){
			this.clearSearch();
		}else{
      let tempItems = this.state.tempItems;
      timeoutId = setTimeout(() => this.searchItemsFunc(inputValue), 500);
		}
	 }
   searchItemsFunc = (inputValue) =>{

    let tempItems = this.state.items.filter(element => {
      return element.CatalogNum.includes(inputValue) || element.ProdName.includes(inputValue)
    })
    this.setState({tempItems})
   }
   clearSearch = () =>{
    let items = this.state.items;
		this.setState({searchVal:'',tempItems: items})
	 }
   downloadFile = async(element, fileType) => {

    this.setState({preload:true, morePop: false});


    let val = {
      ext_id: element.Id,
      fileType: fileType,
      mode: 'innerDoc'
    };

    const valAjax = {
      funcName: 'GetProducts',
      point: 'download_xls',
      val:val
    };

    try {
      const data = await this.props.ajax(valAjax);
      if (data.result == "success") {

        let tmpUrl = entry + '/output/' + data.link;
        if(this.props.state.appId==""){
          var win = window.open(tmpUrl, '_blank');
        }else{
          var ref = cordova.InAppBrowser.open(tmpUrl, '_system', 'location=yes');
        }

        if(this.props.state.appId==""){
          SweetAlert({
            title: 'מסמך הופק בהצלחה',
            type: 'success',
            timer: 3000,
            showConfirmButton: false,
          }).then(function () {
            //location.reload();
          }.bind(this)).catch(SweetAlert.noop);
        }
      }

      this.setState({preload:false});

    } catch(err) {
      //this.props.connectionError('connection error GetSales');
      console.log('connection error GetSales');
      this.setState({preload:false});
    }

  }
  createNewCart = (order) => {
    if(localStorage.agent){
      this.setState({findUserPop: this.state.orderObject})
    }else{
      this.createNewCartUser(order);
    }
  }

  closeSpecialSettingsPop = (chosenItem) => {
    this.setState({findUserPop:false});
    this.createNewCartUser(this.state.orderObject, chosenItem);
  }

  createNewCartUser= async(order, userObj) => {
    this.setState({preload:true});

    this.props.simpleClearCart();
    let user = JSON.parse(localStorage.getItem('user'));
    let ordProducts = [];
    let obj;

    let val = {
      'b2cPriceCode': this.props.state.b2cPriceCode,
      'priceNoLogin': this.props.state.priceNoLogin,
      'docId': order.Id,
      'action': "innerDocItemsRestore",
      'userObj': userObj ? userObj : false
    };

    localStorage.role ? val.admin = true : null;
    localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;

    const valAjax = {
      funcName: '',
      point: 'new-api/docs',
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);
      this.setState({preload:false});
      
      if(items.result=="success"){
        if(localStorage.agent){
          localStorage.setItem('user', JSON.stringify(items.user));
          localStorage.setItem('type', items.user.Type);
          localStorage.setItem('name', items.user.UserName);
          localStorage.setItem('id', items.user.UserId);
          localStorage.setItem('exId', items.user.ExId);
        }
        this.props.restoreCart(items.hisDet);
        if(localStorage.agent){
          this.props.getProducts();
          this.props.AgentLog("in");
        }
        localStorage.setItem('selectedMode', 1);
        this.props.setSelectedMode();
        this.props.history.push("/cart/" + this.props.state.lang);

      }

    } catch(err) {
      console.log('connection error return_prices_for_products');
      this.setState({preload:false});
    }
  }
  saveAndSend = (param) =>{
    let tempItems = [];
    tempItems = this.state.tempItems;
    let text = '';
    if(param == 'approve'){
      text = 'שינויים יישמרו והזמנה תשודר ל-ERP';
    }else if(param == 'deny'){
      text = 'הזמנה תדחה ולא תשלח ל-ERP';
    }
    SweetAlert({
      title: 'האם אתה בטוח?',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22b09a',
      cancelButtonColor: '#d80028',
      confirmButtonText: 'אשר',
      cancelButtonText: 'בטל'
    }).then(function (res) {
      if (res.value) {
        if(param == 'approve'){
        }else if(param == 'deny'){
          this.denyOrder();
        }
      }
    }.bind(this)).catch(SweetAlert.noop);
  }

  denyOrder = async () => {
  
    this.setState({preload:true});
    let orderObject = JSON.stringify(this.state.orderObject);

    let ordId = this.props.match.params.id;
   
    let val = {
      agent: localStorage.agent,
      action: "DenyDocAgentApproval",
      ordId: ordId,
      orderObject: orderObject
    };

    const valAjax = {
      funcName: '',
      point: 'new-api/docs',
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);
      
      this.setState({preload:false});

      if(items.result == "success"){
        SweetAlert({
          title: 'הזמנה נדחתה בהצלחה',
          text: '',
          type: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(function () {
          let urlSearchParms = '';
          if(localStorage.lastApprovePageParams){
            urlSearchParms = localStorage.lastApprovePageParams;
          }
          this.props.history.push('/DocsHistoryAgent/1/' + this.props.state.lang + urlSearchParms);
        }.bind(this)).catch(SweetAlert.noop);
      }
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }

  }


  deleteOrder(element){
    SweetAlert({
				title: 'מחק טיוטה?',
				type: 'success',
				showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'אשר',
        cancelButtonText: 'בטל'
			}).then(function (element,res) {
        if (res.value) {
          this.setState({preload: true});

          let val = {
            agent: localStorage.agent,
            action: "RemoveDraft",
            ordId: element.Id
          };

          const valAjax = {
            funcName: '',
            point: 'new-api/docs',
            val: val

          };

          this.deleteOrderFunc(valAjax, element);

        }
      }.bind(this,element)).catch(SweetAlert.noop);

	}
  deleteOrderFunc = async(valAjax, element) =>{
    try {
      const data = await this.props.ajax(valAjax);

      SweetAlert({
        title: 'טיוטה נמחקה בהצלחה',
        type: 'success',
        showConfirmButton: false,
        timer: '4000'
      }).catch(SweetAlert.noop);

      this.setState({ preload: false});
      let urlSearchParms = '';
      if(localStorage.lastApprovePageParams){
        urlSearchParms = localStorage.lastApprovePageParams;
      }
      this.props.history.push('/DocsHistoryAgent/1/' + this.props.state.lang + urlSearchParms);

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
  }

	render(){
    let breadCrumbsNav=[];
    if(Object.keys(this.state.orderObject).length ){
      let breadObject ={Title: 'מסמכים',TitleEng: 'Profile', Link:"" + this.props.state.lang};
      breadCrumbsNav.push(breadObject);
  
      breadObject ={Title: this.state.orderObject.ClientName + '(#' + this.state.orderObject.Id + ')',TitleEng: 'Profile', Link:""};
      breadCrumbsNav.push(breadObject);
    }
    

   
		return (
			<div className="page-container history admin-history docs">
        {this.state.findUserPop ? ReactDOM.createPortal(
					<div className="my-modal prod-info">
						<div className="modal-wrapper animated shopCartSpecialSet">
							<div className="close-cont">
								<div onClick={() => this.setState({ findUserPop: !this.state.findUserPop })}
									className="close">
									<img src={globalFileServer + 'icons/close.svg'} />
								</div>
							</div>
							<FindUserPop {...this} />
						</div>
						<div onClick={this.close} className="overflow"></div>
					</div>,
					document.getElementById('modal-root')
				) : null}
        <div className="docs-sub-cont">

  				{this.state.preload ?
  					<div className="spinner-wrapper">
  						<div className="spinner">
  							<div className="bounce1"></div>
  							<div className="bounce2"></div>
  							<div className="bounce3"></div>
  						</div>
  					</div>
  				: null}
          <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''} lang={this.props.state.lang}/>
          {this.state.orderObject && Object.keys(this.state.orderObject).length ? 
            <div className="for-calendar flex-container card">
              <div className="flex-container right-side-header col-lg-5">
               
              </div>
              <div className="flex-container left-side-header col-lg-7">
                <div className="userInfo-cls flex-container">
                  <div className="left-side-comp header-btn-cont col-pay">
                    
                      
                    <div className="clientsAgentSearchWrapper">
                      <div className="search-cont">
                        <input
                          onChange={this.search}
                          value={this.state.searchVal}
                          type="text"
                          placeholder="חיפוש..."
                        />
                        {this.state.searchVal ?
                          <span className="material-symbols-outlined search-img"
                            onClick={() => this.clearSearch()}>close</span>
                          :
                          <span className="material-symbols-outlined search-img">search</span>
                        }
                      </div>
                    </div>
                    <div className="select-cont first">
                      <div className="file-cont" onClick={()=>this.downloadFile(this.state.orderObject, 'pdf')}>
                        <span className="material-symbols-outlined">picture_as_pdf</span>
                      </div>
                    </div>
                    <div className="select-cont second">
                      <div className="file-cont" onClick={()=> this.downloadFile(this.state.orderObject, 'xls')}>
                        <img src={globalFileServer + 'icons/excel.svg'} />
                      </div>
                    </div>
                      
                    <div className="select-cont">
                      <div className="file-cont" onClick={()=>this.createNewCart(this.state.orderObject)}>
                        <span className="material-symbols-outlined">cloud_sync</span>
                      </div>
                    </div>
                    {localStorage.agent && this.state.orderObject.OrdStatus == 'Draft' ? 
                      <div className="select-cont">
                        <div className="file-cont" onClick={()=>this.deleteOrder(this.state.orderObject)}>
                          <span className="material-symbols-outlined">delete</span>
                        </div>
                      </div>
                    :null}
                    {localStorage.agent && this.state.orderObject.OrdStatus == 'WaitingToBeSent' ? 
                      <div className="logOutCont no-fill" onClick={()=> this.saveAndSend('deny')}>
                          <p>{this.props.state.lang =='he' ? 'דחה מסמך' : 'Log Out'}</p>
                      </div>
                    :null}
                    
                  </div>
                  
                </div>
               
              </div>
            </div>
          :null}
  				<div className={this.state.showCalendar ? 'doc-container active card' : 'doc-container card'}>
            <div id='lines-main-cont' className="lines-main-cont">
                <table className="lines-sub-cont">
                  <tbody>
                    <tr className="heading">
                       
                        <th className="col-cont sticky-col">
                          <p>מוצר</p>
                        </th>
                        <th className="col-cont">
                        <p>כמות</p>
                        </th>
                        <th className="col-cont">
                          <p>מחיר יח'</p>
                        </th>
                        <th className="col-cont">
                        <p>הנחה</p>
                        </th>
                        
                        <th className="col-cont">
                        <p>סה״כ</p>
                        </th>
                      
                    </tr>
                    {this.state.tempItems && this.state.tempItems.length ? this.state.tempItems.map((element, index) => {
                      let docType = '';
                      let docAllowed = true;
                      if( ( docAllowed == true) ){
                       
                        let quantity = element.Quantity * parseInt(element.PackQuan);
                        return(
                          
                            <tr key={index} className={"item"} id={'docRow_' + element.ID}>
                                <th className="col-cont sticky-col">
                                  <p className='AccountKey  no-margin'>{'#' + element.CatalogNum}</p>
                                  <p className='AccountName  no-margin'>{element.ProdName}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{quantity}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{this.numberWithCommas(parseFloat(element.SinglePrice).toFixed(2))}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{parseFloat(element.Discount).toFixed(2)  + '%'}</p>
                                </th>
                                
                                <th className="col-cont">
                                  <p>{this.numberWithCommas(parseFloat(element.Total).toFixed(2)) }</p>
                                </th>
                  
                            </tr>
                        );
                      }
                    }):null}
                  </tbody>
                </table>
              </div>
             
    			</div>
          
          {this.state.tempItems && this.state.tempItems.length && Object.keys(this.state.orderObject).length ?
            <CartTotalsInnerDoc items={this.state.tempItems} orderObject={this.state.orderObject} props={this.props}/>
          :null}
            { Object.keys(this.state.orderObject).length ?
            <div className="comments-main-cont">
              <div className="comments-sub-cont">
                <div className="comments-container">
                  <h1>הערות סוכן / לקוח</h1>
                    <textarea
                    placeholder={this.props.state.lang == 'he' ? 'הערות סוכן לקוח' : 'Comment'}
                    value={this.state.orderObject.OrdComment ? this.state.orderObject.OrdComment : ""} />

                </div>
               
              </div>
            </div>
          :null}
          
          
        </div>
			</div>
		)
	}
}
