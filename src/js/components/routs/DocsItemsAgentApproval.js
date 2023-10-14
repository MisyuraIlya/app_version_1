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
import CartTotalsSuperAgent from './shopCart/CartTotalsSuperAgent';
import Profile from "./Profile";
import ProductPopUp from "./productPage/ProductPopUp";



let timeoutId;

const SearchHook= params =>
	{
		const [search, setSearch] = useState('');
		const [searchMode, setSearchMode] = useState(0);
		const [preload, setPreload] = useState('');


		const app = useContext(UserContext);


		useEffect(() => {
			return () => {
				clearTimeout(timeoutId);
			}
		}, []);

		const goInactive = word => {
			params.searchPhpFunc(word, searchMode);
		}

		const setWord = word => {
			clearTimeout(timeoutId);
			setSearch(word);
			timeoutId = setTimeout(() => goInactive(word), 500);
			if (word == "") {
				goInactive(word);
			}
		}

		const setMode = mode => {
			setSearchMode(mode);
			setSearch("");
		}

		

		const prodClickFunc = (item) => {
			params.addExtraRow(item);
      emptySearch();
		}

		const emptySearch = (item) => {
			setWord('');
			params.closeSearchMob();
		}

		return (
			<div className="search-cont-main">
         {localStorage.user || localStorage.agent || localStorage.role ? 
            <div className="search-cont">
              <div className="input">
                <input
                  onChange={e => setWord(e.target.value)}
                  value={search}
                  type="text"
                  placeholder={app.state.lang == 'he' ? "הוסף מוצר" : "Search"}

                />
                {search == "" ?
                  <span className="material-symbols-outlined search-img">search</span>
                  :
                  <span className="material-symbols-outlined search-img"
                    onClick={() => emptySearch()}>close</span>
                }

              </div>
              {search ?
                <div className="searchRes-cont">
                  
                  {params.searchProds && params.searchProds.length ? params.searchProds.map((item, key) => {
                      return (
                        <div key={key} className="searchRes-row flex-container"
                          onClick={() => prodClickFunc(item)}>
                          <div className="img-cont col-lg-3">
                            <img className="img"
                              src={item.Img ? globalFileServer + 'products/' + item.Img : null}
                              onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}/>
                          </div>
                          <div className="content col-lg-9">
                            <p className="title">{app.state.lang == 'he' ? item.Title : item.Description}</p>
                            <p className="catalog">{"#" + item.CatalogNumber}</p>
                            {localStorage.user ?
                              <p className="price">{item.Price ? "₪ " + parseFloat(item.Price).toFixed(1) : ''}</p>
                              : null}
                          </div>
                        </div>
                      )
                  }) : null}

                
                  {!params.searchProds | !params.searchProds.length && (params.showNotFound || params.preload) ?
                    <div className="all-res-cont not-found">
                      <p>{app.state.lang == 'he' ? "לא נמצאו תוצאות" : 'No Results Found'}</p>
                    </div>
                    : null}
                </div>
                : null}
            </div>
          :null}
				
			</div>
		);
	}


export default class DocsItemsAgentApproval extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: [],
			tempItems: [],
			searchProds: [],
      showNotFound: false,
      showSearchMob: false,
      userObj:[],
      orderObject:[],
      openDeptAlert: false,
      openClientProfilePop: false,
      ProductPopUp: false
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
      action: "GetDocsItemsAgentApproval",
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
        let docItems = items.items;

        this.setState({items:docItems,
           tempItems: docItems,
           userObj: items.userObj,
           orderObject: items.orderObject,
           search: false,
           preload: false,
           openDeptAlert: items.openDeptAlert
         });
      }
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }


	}

  selectInput(id){
    setTimeout(() => {
      $(id).select();
    }, 300);
  }

  updateGlbItemsState = (param, e) => {

    if(e){
			let value = "";
			value = parseFloat(e.target.value);
      if(Number.isNaN(value)){
        value = 0;
      }
      let orderObject = this.state.orderObject;
      orderObject[param] = value;
			this.setState({orderObject});

    }
  }



  updateItemsState = (ele, param, e) => {
		
    if(e){
			let value = "";
			value = parseFloat(e.target.value);
	
			let tempItems = this.state.tempItems;
      if(param=='Quantity'){
        let findItem = tempItems.find(item => item.CatalogNum == ele.CatalogNum);
        if(findItem.QuantityInit){
          if(value <= findItem.QuantityInit){
            tempItems.find(item => item.CatalogNum == ele.CatalogNum)[param] = value;
          }
        }else{
          tempItems.find(item => item.CatalogNum == ele.CatalogNum)[param] = value;
        }
        
      }
      if(param=='SinglePrice'){
        tempItems.find(item => item.CatalogNum == ele.CatalogNum).IsChangedAgent = true;
        tempItems.find(item => item.CatalogNum == ele.CatalogNum)[param] = value;
      }

      if(param=='Discount'){
        tempItems.find(item => item.CatalogNum == ele.CatalogNum).IsChangedAgent = true;
        if(Number.isNaN(value)){
          value = 0;
        }
        let calcVal = parseFloat(ele.SinglePriceNoDiscount) - value*parseFloat(ele.SinglePriceNoDiscount)/100;
        tempItems.find(item => item.CatalogNum == ele.CatalogNum).SinglePrice = calcVal;
      }


      //lineDiscount = (100 - (parseFloat(element.SinglePrice) * 100 / parseFloat(element.SinglePriceNoDiscount))).toFixed(1);


			this.setState({tempItems});
		}
		
	}
  checkOnBlur = (ele, param, e) => {
    if(e){
      if(e.target.value==''){
        let tempItems = this.state.tempItems;
        if(param=='Quantity'){
          tempItems.find(item => item.CatalogNum == ele.CatalogNum)[param] = '1';
        }else if(param=='SinglePrice'){
          tempItems.find(item => item.CatalogNum == ele.CatalogNum)[param] = ele.SinglePriceNoDiscount
        }else if(param=='Discount'){
          tempItems.find(item => item.CatalogNum == ele.CatalogNum).SinglePrice = ele.SinglePriceNoDiscount
        }

        this.setState({tempItems});

      }
    }
  }

  updateOrdState = (param, e) => {
    if(e){
			let value = "";
			value = e.target.value;
	
			let orderObject = this.state.orderObject;
      orderObject[param] = value;
   
			this.setState({orderObject});
		}
		
	}

  searchPhpFunc = async (value, mode) => {

    this.setState({searchString: value})

    if (value && value != "") {

      this.setState({preload: true, showNotFound: false})

      let user = false;
       user = this.state.userObj;

      let wordArr = [];
      let split = value.split(" ");
      if (split.length && split[1] != "") {
        wordArr = split;
      } else {
        wordArr.push(value);
      }

      let val = {
        'wordArr': wordArr,
        'b2cPriceCode': this.props.state.b2cPriceCode,
        'priceNoLogin': this.props.state.priceNoLogin,
        'mode': mode,
        'lang': this.props.state.lang
      };
      user ? val.priceFor = user.Type : null;
      user ? val.priceCode = user.PriceList : null;
      user ? val.userId = user.Id : null;
      user ? val.userExtId = user.ExId : null;

      const valAjax = {
        funcName: '',
        point: 'product_search',
        val: val
      };

      try {
        const data = await this.props.ajax(valAjax);
        this.setState({preload: false})
        let products = data;

        this.setState({searchProds: products, showNotFound: true});
      } catch (err) {
        console.log('connection error docs');
        this.setState({preload: false});
      }

    } else {
      this.setState({searchProds: []});
      this.setState({preload: false, showNotFound: false})

    }
  }
  closeSearchMob = () => {
    this.setState({showSearchMob: false})
  }

  addExtraRow = (item) => {
    let tempItems = [];
    tempItems = this.state.tempItems;
    
    let findSku = tempItems.find(ele => ele.CatalogNum == item.CatalogNumber);
    if(!findSku){
      let rowObj = {
        AddedRow : true,
        IsChangedAgent: false,
        CatalogNum: item.CatalogNumber,
        ProdName: item.Title,
        PackQuan: item.PackQuan,
        Quantity: 1,
        SinglePrice: item.Price,
        SinglePriceNoDiscount: item.Price,
        PriceCost: item.PriceCost,
        MasterCarton: item.MasterCarton,
        InnerPack: item.InnerPack,
        MasterL: item.MasterL,
        MasterW: item.MasterW,
        MasterH: item.MasterH
      };
      tempItems.push(rowObj);
      this.setState({tempItems});
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
          this.saveAndSendPhp();
        }else if(param == 'deny'){
          this.denyOrder();
        }
      }
    }.bind(this)).catch(SweetAlert.noop);
  }

  saveAndSendPhp = async () => {

    this.setState({preload:true});

    let tempItems = JSON.stringify(this.state.tempItems);
    let orderObject = JSON.stringify(this.state.orderObject);
    let ordId = this.props.match.params.id;
   
    let val = {
      agent: localStorage.agent,
      action: "SaveDocsItemsAgentApproval",
      ordId: ordId,
      items: tempItems,
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
          title: 'מסמך אושר ונשלח בהצלחה',
          text: '',
          type: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(function () {
          let urlSearchParms = '';
          if(localStorage.lastApprovePageParams){
            urlSearchParms = localStorage.lastApprovePageParams;
          }
          this.props.history.push('/approveDoc/1/' + this.props.state.lang + urlSearchParms);
        }.bind(this)).catch(SweetAlert.noop);
      }
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }


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
          this.props.history.push('/approveDoc/1/' + this.props.state.lang + urlSearchParms);
        }.bind(this)).catch(SweetAlert.noop);
      }
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }

  }


  numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  setProdPopUp = (element) => {
    this.setState({selectedProd: element, ProductPopUp: true});
  }

	render(){
    let breadCrumbsNav=[];
    let breadObject ={Title: 'מסמכים לאישור',TitleEng: 'Profile', Link:"/approveDoc/" + this.props.state.lang};
    breadCrumbsNav.push(breadObject);

    if(this.state.userObj && Object.keys(this.state.userObj).length){
      breadObject ={Title: this.state.userObj.Name + '(#' + this.props.match.params.id + ')',TitleEng: 'Profile', Link:""};
      breadCrumbsNav.push(breadObject);
    }
    
		return (
			<div className="page-container history admin-history docs agent-docsItems-approvePage">
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
          {this.state.ProductPopUp ? ReactDOM.createPortal(
						<div className="my-modal prod-info">
							<div className="modal-wrapper animated">
								<div className="close-cont">
									<div onClick={() => this.setState({ProductPopUp: !this.state.ProductPopUp})}
									     className="close">
										<img src={globalFileServer + 'icons/close.svg'}/>
									</div>
								</div>
								<ProductPopUp {...this} overwriteExtId={this.state.orderObject.ExId} lang={this.props.state.lang}/>
							</div>
							<div onClick={this.close} className="overflow"></div>
						</div>,
						document.getElementById('modal-root')
					) : null}
          {this.state.openClientProfilePop ? ReactDOM.createPortal(
            <div className="my-modal">
              <div className="modal-wrapper animated profile-info">
                <div className="close-cont">
                  <div
                    onClick={() => this.setState({openClientProfilePop: !this.state.openClientProfilePop})}
                    className="close">
                    <span className="material-symbols-outlined">close</span>
                  </div>
                </div>
                <Profile {...this} lang={this.props.state.lang}/>
              </div>
              <div onClick={this.close} className="overflow"></div>
            </div>,
          document.getElementById('modal-root')
        ) : null}


          <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''} lang={this.props.state.lang}/>
          {this.state.orderObject && Object.keys(this.state.orderObject).length && this.state.orderObject.OrdStatus=='WaitingToBeSent' ? 
            <div className="for-calendar flex-container card">
              <div className="flex-container right-side-header col-lg-7">
                  <SearchHook searchPhpFunc={this.searchPhpFunc} addExtraRow={this.addExtraRow}
                                searchProds={this.state.searchProds} preload={this.state.preload}
                                showNotFound={this.state.showNotFound} props={this.props} lang={this.props.lang}
                                closeSearchMob={this.closeSearchMob}/>
              </div>
              <div className="flex-container left-side-header col-lg-5">
                  <div className="logOutCont" onClick={()=> this.saveAndSend('approve')}>
                    <p>{this.props.state.lang =='he' ? 'אשר ושלח' : 'Log Out'}</p>
                  </div>
                  <div className="logOutCont no-fill" onClick={()=> this.saveAndSend('deny')}>
                    <p>{this.props.state.lang =='he' ? 'דחה מסמך' : 'Log Out'}</p>
                  </div>
                  
                  <div className="logOutCont"  onClick={()=> this.setState({openClientProfilePop:true})}>
									  <span className="material-symbols-outlined search-img">{'StoreFront'}</span>
                  </div>
              </div>
              
            </div>
          :null}
          {this.state.openDeptAlert && this.state.orderObject.OrdStatus=='WaitingToBeSent' ? 
            <div className="alerts-cont">
              <p className="alert1">חוב פתוח מעל 3 חודשים</p>
            </div>
          :null}
           {this.state.orderObject.OrdStatus == 'Sent' ? 
            <div className="alerts-cont">
              <p className="alert2">מסמך אושר</p>
            </div>
          :null}
          {this.state.orderObject.OrdStatus=='Denied' ? 
            <div className="alerts-cont">
              <p className="alert1">מסמך נדחה</p>
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
                        <th className="col-cont sticky-col">
                        <p>יח' במארז</p>
                        </th>
                        <th className="col-cont">
                        <p>מחיר מומלץ</p>
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
                        <th className="col-cont">
                        <p>רווח</p>
                        </th>
                        <th className="col-cont">
                        <p>אחוז רווח</p>
                        </th>
                        <th className="col-cont">
                        <p>Mast/Inn</p>
                        </th>
                    </tr>
                    {this.state.tempItems && this.state.tempItems.length ? this.state.tempItems.map((element, index) => {
                      let docType = '';
                      let docAllowed = true;
                      if( ( docAllowed == true) ){
                        let firstProd = null;
                        let lineSum = (parseFloat(element.SinglePrice) * parseFloat(element.PackQuan) * element.Quantity).toFixed(1);
                        let costSum = (parseFloat(element.PriceCost) * parseFloat(element.PackQuan) * element.Quantity).toFixed(1)
                        
                        let profitSum = (lineSum - costSum).toFixed(1);
                        let profitPerc = 0;
                        if(lineSum!=0){
                          profitPerc = (1-(costSum/lineSum));
                          profitPerc = (profitPerc*100).toFixed(1);
                        }else{
                          profitPerc = 0;
                        }
                        let lineDiscount = 0;
                        if(parseFloat(element.SinglePriceNoDiscount)!=parseFloat(element.SinglePrice)){
                          lineDiscount = parseFloat((100 - (parseFloat(element.SinglePrice) * 100 / parseFloat(element.SinglePriceNoDiscount))).toFixed(1));
                        }
                        let masterInner = '';
                        if(element.MasterCarton){
                          masterInner = element.MasterCarton;
                        }
                        if(element.InnerPack){
                          masterInner =  masterInner + '/' + element.InnerPack;
                        }else{
                          masterInner =  masterInner + '/0';
                        }
                        return(
                          
                            <tr key={index} className={!element.IsChangedAgent ? "item" : 'item alert'} id={'docRow_' + element.Id}>
                               
                                <th className="col-cont sticky-col" onClick={()=>this.setProdPopUp(element)}>
                                  <p className='AccountKey  no-margin'>{'#' + element.CatalogNum}</p>
                                  <p className='AccountName  no-margin'>{element.ProdName}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.PackQuan}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{parseFloat(element.SinglePriceNoDiscount).toFixed(1)}</p>
                                </th>
                               
                                <th className="col-cont">
                                  <div className="wrapp">
                                      <input className='input-cls' id={"inputQuantity_"+element.CatalogNum}
                                        onClick={()=> this.selectInput('#inputQuantity_' + element.CatalogNum)}
                                        onChange={this.updateItemsState.bind(this, element, 'Quantity')}
                                        onBlur={this.checkOnBlur.bind(this, element, 'Quantity')}

                                        type="number"
                                        value={element.Quantity}
                                      />
                                    </div>
                                </th>
                                <th className="col-cont">
                                  <div className="wrapp">
                                    <input className='input-cls' id={"inputSinglePrice_"+element.CatalogNum}
                                      onClick={()=> this.selectInput('#inputSinglePrice_' + element.CatalogNum)}
                                      onChange={this.updateItemsState.bind(this, element, 'SinglePrice')}
                                      onBlur={this.checkOnBlur.bind(this, element, 'SinglePrice')}
                                      type="number"
                                      value={element.SinglePrice}
                                    />
                                  </div>
                                </th>
                                <th className="col-cont">
                                  <div className="wrapp">
                                    <input className='input-cls' id={"input_Discount_"+element.CatalogNum}
                                      onClick={()=> this.selectInput('#input_Discount_' + element.CatalogNum)}
                                      onChange={this.updateItemsState.bind(this, element, 'Discount')}
                                      onBlur={this.checkOnBlur.bind(this, element, 'Discount')}
                                      type="number"
                                      value={lineSum != 'NaN' ? lineDiscount : '0'}
                                    />
                                  </div>
                                </th>
                                <th className="col-cont">
                                  <p>{lineSum != 'NaN' ?  this.numberWithCommas(lineSum) : '0'}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{lineSum != 'NaN' ? this.numberWithCommas(profitSum) : '0'}</p>
                                </th>
                                <th className={profitPerc < 30 ? 'alert col-cont' : "col-cont"}>
                                  <p>{lineSum != 'NaN' ? profitPerc + '%' : '0%'}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{masterInner}</p>
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
            <CartTotalsSuperAgent updateGlbItemsState={this.updateGlbItemsState} items={this.state.tempItems} orderObject={this.state.orderObject} props={this.props}/>
          :null}
          { Object.keys(this.state.orderObject).length ?
            <div className="comments-main-cont">
              <div className="comments-sub-cont">
                <div className="comments-container">
                  <h1>הערות סוכן / לקוח</h1>
                    <textarea
                    placeholder={this.props.state.lang == 'he' ? 'הערות סוכן לקוח' : 'Comment'}
                    value={this.state.orderObject.OrdComment ? this.state.orderObject.OrdComment : ""}
                    onChange={this.updateOrdState.bind(this, 'OrdComment')} />

                </div>
                <div className="comments-container">
                  <h1>הערות מנהל</h1>
                    <textarea
                    placeholder={this.props.state.lang == 'he' ? 'הערות מנהל' : 'Comment'}
                    value={this.state.orderObject.SuperAgentComment ? this.state.orderObject.SuperAgentComment : ""}
                    onChange={this.updateOrdState.bind(this, 'SuperAgentComment')} />

                </div>
              </div>
            </div>
          :null}
          
        </div>
			</div>
		)
	}
}
