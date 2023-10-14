import ReactDOM from "react-dom";
import React, { Component, Fragment } from 'react';
import SweetAlert from 'sweetalert2';
import Calendar from 'react-calendar';
import { NavLink } from "react-router-dom";
import BreadCrumbs from "../tools/BreadCrumbs";

import ProductAddToCartStandAlone from "./productPage/ProductAddToCartStandAlone";


export default class ShoppinglistItems extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: [],
			tempItems: [],
			preload: false,
			search: false,
      listObj:[],
      allSelected:true
		}

	}
	componentDidMount(){
		this.getItems();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
	}



	getItems = async (date,toDate,orderState) => {

    this.setState({preload:true});
    let user = JSON.parse(localStorage.getItem('user'));

    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      userId: user.Id,
      ext_id: user.ExId,
      listId: this.props.match.params.id
    };


    const valAjax = {
      funcName: 'GetUserShoppingListItems',
      point: 'products',
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);

      if(items.result == "success"){
        let docItems = items.items;
        let listObj = items.list;
        this.setState({items:docItems, tempItems: docItems, listObj, preload: false});
      }
      this.setState({preload:false});

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
	}

  saveListFunc = async() => {
    let user = JSON.parse(localStorage.getItem('user'));

    let isAllDiselected = true;
    this.state.tempItems.map((item) => {
      if(item.Selected == true){
        isAllDiselected = false;
      }
    })
    if(!isAllDiselected){
      this.setState({preload:true});

      let val = {
        userId: user.Id,
        ext_id: user.ExId,
        listObj: this.state.listObj,
        listItems: this.state.tempItems
      };

      const valAjax = {
        funcName: 'UpdateList',
        point: 'products',
        val: val
      };

      try {
        const data = await this.props.ajax(valAjax);
        let items = JSON.parse(data);
        if(items.result == "success"){
          this.props.history.push('/shoppinglist/' + this.props.match.params.lang);

        }
        this.setState({preload:false});

      } catch(err) {
        console.log('connection error docs');
        this.setState({preload:false});
      }
    }else{
      SweetAlert({
				title: 'אופס',
				text: 'לא נבחרו מוצרים לרשימה',
				type: 'error',
				showConfirmButton: false,
				timer: 4000
			}).catch(SweetAlert.noop);
    }

  }


  setAllSelected = (val) =>{

    let tempItems = this.state.tempItems;
    tempItems.map((item) => {
      item.Selected = val;
    })
    this.setState({allSelected: val, tempItems});

  }

  setSelectedItem = (sku, val) => {
    let tempItems = this.state.tempItems;
    tempItems.find(item => item.CatalogNumber == sku).Selected = val;
    this.setState({ tempItems});
  }

  setListItemQuantity = (product, val) => {
    let tempItems = this.state.tempItems;
    tempItems.find(item => item.CatalogNumber == product.CatalogNumber).Quantity = Math.round(val);
    this.setState({ tempItems});
  }


  avoidNullInCart = (product) => {
    let tempItems = this.state.tempItems;
    let checkQuan = tempItems.find(item => item.CatalogNumber == product.CatalogNumber).Quantity;
    if(checkQuan<1){
      tempItems.find(item => item.CatalogNumber == product.CatalogNumber).Quantity = 1;
    }
    this.setState({ tempItems});
  }

  setListTitle = (val) =>{
    let listObj = this.state.listObj;
    this.state.listObj.Title = val;
    this.setState({ listObj});

  }

  removeFromList = (item) =>{
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
      this.removeFromListFunc(item);
    }.bind(this)).catch(SweetAlert.noop);

  }
  removeFromListFunc = async(itemToDel)=> {
    let user = JSON.parse(localStorage.getItem('user'));

    this.setState({preload:true});
    let val = {
      userId: user.Id,
      ext_id: user.ExId,
      itemId: itemToDel.Id
    };
    const valAjax = {
      funcName: 'RemoveItemFromList',
      point: 'products',
      val: val
    };
    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);

      if(items.result == "success"){
        let tempItems = this.state.tempItems;
        tempItems = tempItems.filter(item => item.Id != itemToDel.Id);
        this.setState({tempItems});
      }
      this.setState({preload:false});
    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
  }

	render(){
    let lang = this.props.state.lang;
    let breadCrumbsNav=[];
    let breadObject ={Title: 'אזור אישי',TitleEng: 'My Profile', Link:"/profile/" + lang};
    breadCrumbsNav.push(breadObject);
    breadObject ={Title: 'רשימות קניות',TitleEng: 'Shopping Lists', Link:"/shoppinglist/" + lang};
    breadCrumbsNav.push(breadObject);
    breadObject ={Title: 'מוצרים',TitleEng: 'Items', Link:"" + lang};
    breadCrumbsNav.push(breadObject);

		return (
			<div className="page-container history admin-history docs shoppinglist-items">

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
          {Object.keys(this.state.listObj).length && this.state.listObj.Extra2 ?
            <h1 className="title">{lang == 'he' ? 'המועדפים שלי' : 'My Favourites'}</h1>
          :
          <h1 className="title">{lang == 'he' ? 'מוצרי רשימת קניות' : 'Shopping List Items'}</h1>

          }
          {Object.keys(this.state.listObj).length ?
            <div className="page-header-cont">
              <div className="page-header-sub">
                <div className="title-cont">
                  <input
                    type="text"
                    value={this.state.listObj.Title}
                    placeholder="שם הרשימה"
                    onChange={(e)=> this.setListTitle(e.target.value)}
                  />
                </div>
                <div className="save-btn">
                  <p onClick={()=> this.saveListFunc()}>{lang == 'he' ? 'שמור רשימה' : 'Save List'}</p>
                </div>
              </div>
            </div>
            :null}
  				<div className={'doc-container'}>
            <div className="items">
              {this.state.tempItems.length  ?
                <div className="heading">
                  <div className="flex-container heading-cont">

                    <div className="col-lg-1">
                        {Object.keys(this.state.listObj).length && this.state.listObj.Status == 'Draft'?
                          <div className={this.state.allSelected ? "checkBox active" : "checkBox"}
                          onClick={()=>this.setAllSelected(!this.state.allSelected)}></div>
                        :null}
                    </div>
                    <div className="col-lg-3">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'מוצר' : 'Title'}</p>
                      </div>
                    </div>

                    <div className="col-lg-2 custom-col-lg-2">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'מק״ט' : 'SKU'}</p>
                      </div>
                    </div>
                    <div className="col-lg-2  custom-col-lg-2">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'מותג' : 'Brand'}</p>
                      </div>
                    </div>
                    <div className="col-lg-2  custom-col-lg-2 center">
                      <div className="wrapp">
                        <p>{lang == 'he' ? 'כמות' : 'Quantity'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :null}
              <div className="body">
                {!this.state.tempItems.length ?
                  <div className="no-products-cont">
                    <h1 className="no-products1">לא נמצאו מוצרים ברשימה</h1>
                  </div>
                : null}
                {this.state.tempItems.map((element, index) => {
                  return(
                      <div key={index} className={this.state.activeOrder == element.invoiceId ? "item active" : "item"}>
                        <div className="flex-container body-main-cls">

                          <div className="col-lg-1 col-drop">
                            {Object.keys(this.state.listObj).length && this.state.listObj.Status == 'Draft'?
                              <div onClick={()=>this.setSelectedItem(element.CatalogNumber, !element.Selected)} className={element.Selected ? "checkBox active" : "checkBox"}></div>
                            :null}
                          </div>

                          <div className="col-lg-3 col-title">
                            <div className="wrapp">
                              <p>{element.Title}</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-id" >
                            <div className="wrapp">
                              <p>{element.CatalogNumber}</p>
                            </div>
                          </div>

                          <div className="col-lg-2 col-brand">
                            <div className="wrapp">
                              <p>{element.Brand}</p>
                            </div>
                          </div>
                          <div className="col-lg-2 col-add-to-cart">
                            <div className="wrapp">
                              <ProductAddToCartStandAlone
                                listItem={element}
                                setListItemQuantity={this.setListItemQuantity}
                                avoidNullInCart={this.avoidNullInCart}
                              />
                            </div>
                          </div>
                          <div className="col-lg-1 new-cart">
                            <button className="shoppinglistItemsBtn" onClick={()=> this.removeFromList(element)}>
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
