import ReactDOM from "react-dom";
import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SweetAlert from 'sweetalert2';
import Calendar from 'react-calendar';
import PayPopup from '././shopCart/PayPopup';
import ChecksPopUP from "./productPage/ChecksPopUP";
import ReturnsPop from "./productPage/ReturnsPop";
import { NavLink } from "react-router-dom";

import BreadCrumbs from "../tools/BreadCrumbs";



export default class Shoppinglist extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: [],
			tempItems: [],
		}

	}
	componentDidMount(){

		this.getItems();
		setTimeout(() => window.scrollTo(0, 0), 200);
	}

	getItems = async () => {

    this.setState({preload:true});
    let user = JSON.parse(localStorage.getItem('user'));

    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      userId: user.Id,
      ext_id: user.ExId
    };

    const valAjax = {
      funcName: 'GetUserShoppingList',
      point: 'products',
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);

      if(items.result == "success"){
        let docItems = items.items;
        this.setState({items:docItems, tempItems: docItems, preload: false});
      }
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
	}

  removeList = (list) =>{
    SweetAlert({
      title: 'האם אתה בטוח?',
      text: 'רשימת הקניות תמחק',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22b09a',
      cancelButtonColor: '#d80028',
      confirmButtonText: 'אשר',
      cancelButtonText: 'בטל'
    }).then(function(res) {
      this.removeListFunc(list);
    }.bind(this)).catch(SweetAlert.noop);

  }
  removeListFunc = async(list)=> {
    let user = JSON.parse(localStorage.getItem('user'));

    this.setState({preload:true});
    let val = {
      userId: user.Id,
      ext_id: user.ExId,
      listId: list.Id
    };
    const valAjax = {
      funcName: 'RemoveList',
      point: 'products',
      val: val
    };
    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);

      if(items.result == "success"){
        let tempItems = this.state.tempItems;
        tempItems = tempItems.filter(item => item.Id != list.Id);
        this.setState({tempItems});
      }
      this.setState({preload:false});
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
  }


  createNewCartHistory = async(listId) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let ordProducts = [];
    let obj;



    let val = {
     userId: user.Id,
     userExtId: user.ExId,
     listId: listId
    };
    const valAjax = {
     funcName: 'RestoreShoppingList',
     point: 'new-api/products_edit',
     val: val
    };

    this.setState({preload:true});
    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);
      this.props.simpleClearCart();

      this.setState({preload:false});

      if(items.result=="success"){
        debugger;
       this.props.restoreCart(items.items);
       this.props.history.push("/cart/" + this.props.state.lang);
      }

    } catch(err) {
      console.log('connection error return_prices_for_products');
      this.setState({preload:false});
    }

  }



	render(){
    let lang = this.props.state.lang;
    let breadCrumbsNav=[];
    let breadObject ={Title: 'אזור אישי',TitleEng: 'Profile', Link:"profile" + lang};
    breadCrumbsNav.push(breadObject);
    breadObject ={Title: 'רשימות קניות',TitleEng: 'Shopping Lists', Link:"" + lang};
    breadCrumbsNav.push(breadObject);

		return (
			<div className="page-container history admin-history docs shopping_lists">
        <div className="docs-sub-cont">
          <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''} lang={lang}/>
  				{this.state.preload ?
  					<div className="spinner-wrapper">
  						<div className="spinner">
  							<div className="bounce1"></div>
  							<div className="bounce2"></div>
  							<div className="bounce3"></div>
  						</div>
  					</div>
  				: null}
  				<h1 className="title">{lang == 'he' ? breadObject.Title : breadObject.TitleEng}</h1>
  				<div className={this.state.showCalendar ? 'doc-container active' : 'doc-container'}>
            <div className="items">
              {this.state.tempItems.length ?
                <div className="heading">
                  <div className="flex-container heading-cont">
                    <div className="col-lg-1">
                      <div className="wrapp">
                        <p></p>
                      </div>
                    </div>
                    <div className="col-lg-1">
                      <div className="wrapp">
                        <p>#</p>
                      </div>
                    </div>

                    <div className="col-lg-2 custom-col-lg-2">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'רשימה' : 'List'}</p>
                      </div>
                    </div>
                    <div className="col-lg-2  custom-col-lg-2">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'עודכן' : 'Date'}</p>
                      </div>
                    </div>

                    <div className="col-lg-1">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'מוצרים' : 'Products'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :null}
              <div className="body">
                {!this.state.tempItems.length ?
                  <div className="no-products-cont">
                    <h1 className="no-products1">{lang == 'he' ? 'לא נמצאו רשימות' : 'No Shopping Lists Found'} </h1>
                    <h2 className="no-products2">{lang == 'he' ? 'עבור ל״הזמנות שלי״ והוסף הזמנה לרשימה' : 'Go to "My Order" and add to A Shopping List'} </h2>
                    <div className="goToHistory">
                      <NavLink to={"/docs/" + lang}>
                        <p>{lang == 'he' ? 'ההזמנות שלי' : 'My Orders'}</p>
                      </NavLink>
                    </div>
                  </div>
                : null}
                {this.state.tempItems.map((element, index) => {
                  let tmpDate="";
                  if(element.Date){
                    tmpDate = element.Date.split('-');
                    tmpDate =  tmpDate[2] + "/" + tmpDate[1] + "/" +tmpDate[2];
                  }
                  return(
                    <div key={index} className={this.state.activeOrder == element.invoiceId ? "item active" : "item"}>
                      <div className="flex-container body-main-cls">
                        <div className="col-lg-1 col-drop Shoppinglist" >
                          <div className="wrapp">
                            <NavLink to={"/shoppinglistItems/" + element.Id + '/' + lang}>
                              <div className="img" >
                                <img src={globalFileServer + 'icons/down-purple.svg'} alt=""/>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                        <div className="col-lg-1 col-id" >
                          <div className="wrapp">
                            <p>{element.Id}</p>
                          </div>
                        </div>
                        <div className="col-lg-2 col-name" >
                          <div className="wrapp">
                            <p>{element.Title ? element.Title : "טיוטה"}</p>
                            {element.Extra2 ?
                              <div className={"favorite-cont activeIcon"}>
                                <span className="material-symbols-outlined">favorite</span>
                              </div>
                            :null}
                          </div>
                        </div>

                        <div className="col-lg-2 col-valDate">
                          <div className="wrapp">
                            <p>{tmpDate}</p>
                          </div>
                        </div>
                        <div className="col-lg-1 col-quan">
                          <div className="wrapp">
                            <p>{element.Count}</p>
                          </div>
                        </div>
                        <div className="col-lg-1 new-cart">
                          {element.Status != 'Draft' ?
                            <button onClick={()=> this.createNewCartHistory(element.Id)}>
                              <span>{lang == 'he' ? 'הוסף לסל' : 'Add To Cart'}</span>
                            </button>
                          :null}
                        </div>
                        <div className="col-lg-2 new-cart">
                          <button onClick={()=> this.removeList(element)}>
                            <span>{lang == 'he' ? 'מחק' : 'Delete'}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

  				</div>
        </div>
			</div>
		)
	}
}
