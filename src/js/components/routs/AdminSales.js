import ReactDOM from "react-dom";

import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Calendar from 'react-calendar';
import SearchProd from '../tools/SearchProd';
import AdminSalesPop from "./productPage/AdminSalesPop";
import SweetAlert from 'sweetalert2';
import BreadCrumbs from "../tools/BreadCrumbs";




export default class AdminSales extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      tempItems: [],
      preload: false,
      search: false,
      saleType:1,
      salesPop: false
    }
    this.getItems = this.getItems.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.closeSalePop = this.closeSalePop.bind(this);
    this.saveSale = this.saveSale.bind(this);

  }
  componentDidMount(){
    this.getItems(this.state.saleType);
  }

  getItems = async(saleType) =>{
    let action;
    saleType == 1 ? action = "view_saleType1" : action = "view_saleType2";

    let valAjax = {
      funcName: action,
      point: 'new-api/admin-sales',
      token: localStorage.token,
      role: localStorage.role
    };


    try {
      const data = await this.props.ajax(valAjax);

      if(this.state.saleType == 1){
        let items = JSON.parse(data).ProductSaless;
        this.setState({items});
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }


  }

  tabClickFunc(tabIndex){
    this.setState({saleType:tabIndex});
  }


  saveSale = async(selectedSale)=>{
    let action;
    if(selectedSale.Id){
      action = "update_saleType1";
    }else{
      action = "insert_saleType1";
    }

    let val = {
      selectedSale: JSON.stringify(selectedSale)
    };

    let valAjax = {
      funcName: action,
      point: 'new-api/admin-sales',
      token: localStorage.token,
      role: localStorage.role,
      val: val

    };



    try {
      const data = await this.props.ajax(valAjax);

      if(JSON.parse(data).result == "success"){
        let items = this.state.items;
        if(selectedSale.Id){
          items.map((ele,ind) => {
            if(ele.Id == selectedSale.Id){
              items[ind] = selectedSale;
            }
          })
        }else{
          selectedSale.Id = JSON.parse(data).id;
          items.unshift(selectedSale);
        }
        this.setState({items , salesPop: false, selectedSale:false});
      }else{
        this.setState({salesPop: false, selectedSale:false});
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }





  }
  updateInput = async(value, id, paramName, title ) => {

    let action;
    this.state.saleType == 1 ? action = "edit_saleType1" : action = "edit_saleType2";



    let valAjax = {
      funcName: action,
      point: 'new-api/admin-sales',
      token: localStorage.token,
      role: localStorage.role,
      id: id,
      paramName: paramName,
      value: value

    };


    try {
      const data = await this.props.ajax(valAjax);

      let items = this.state.items;
      items.find(x => x.Id == id)[paramName] = value;
      if(title){
        items.find(x => x.Id == id)['ForTitle'] = title
      }
      this.setState({items});


    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }




  }

  closeSalePop(){
    this.setState({salesPop:false, selectedSale:false});
  }
  openSalePop(element){
    let items = this.state.items;
    items.find(item => item.Id == element.Id).More = false;


    this.setState({selectedSale: element, salesPop:true, items});
  }

  deleteItem(element){
    let items = this.state.items;
    items.find(item => item.Id == element.Id).More = false;
    this.setState({ items});

    SweetAlert({
      title: 'האם אתה בטוח?',
      text: 'האם ברצונך למחוק פריט זה? לא תוכל לשחזר זאת!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22b09a',
      cancelButtonColor: '#d80028',
      confirmButtonText: 'מחק',
      cancelButtonText: 'בטל'
    }).then(function(id, res) {
      if (res.value) {
        let action = 'deleteSale';

        let valAjax = {
          funcName: action,
          point: 'new-api/admin-sales',
          token: localStorage.token,
          role: localStorage.role,
          itemId: id,

        };
        this.delSaleFunc(valAjax, id);

      } else {
        //this.unsetPreload();
      }
    }.bind(this, element.Id)).catch(SweetAlert.noop);
  }

  delSaleFunc = async(valAjax, id)=>{

    try {
      const data = await this.props.ajax(valAjax);

      if (JSON.parse(data).result == "success") {
        let items = this.state.items;
        items = items.filter((item) => {return item.Id != id});
        this.setState({items});
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }



  }
  changeMoreVal(id,val){
    let tmpUsers = this.state.items;
    //userListAll
    tmpUsers.find(item => item.Id == id).More = val;
    this.setState({userList: tmpUsers})
  }
  unsetMore(itemId){
    let userList = this.state.userList;
    userList.find(item => item.Id == itemId).More = false;

    this.setState({userList });
  }

  render(){
    let breadCrumbsNav=[];
    let breadObject ={Title: 'ניהול מבצעים',TitleEng: 'Profile', Link:"" + this.props.state.lang};
    breadCrumbsNav.push(breadObject);
    let lang = this.props.state.lang;
    return (
        <div className="page-container history admin-history docs admin-sales">
          {this.state.salesPop ? ReactDOM.createPortal(
              <div className="my-modal prod-info">
                <div className="modal-wrapper animated returns">
                  <div className="popup-contant-header flex-container">
                    <div className="col-lg-10" >
                      <p>ניהול מבצעים</p>
                    </div>
                    <div className="close-popup col-lg-2">
                      <div className="close-popup-cont" onClick={this.closeSalePop}>
                        <img src={globalFileServer + 'icons/close_purple.svg'} />
                      </div>
                    </div>
                  </div>
                  <AdminSalesPop {...this}/>
                </div>
                <div onClick={this.closeSalePop} className="overflow"></div>
              </div>,
              document.getElementById('modal-root')
          ) : null}
          <div className="docs-sub-cont">
          
            <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''} lang={this.props.state.lang}/>
          

            {this.state.preload ?
                <div className="spinner-wrapper">
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                </div>
                : null}
          
              <div className="for-calendar flex-container card">
                <div className="flex-container right-side-header col-lg-7">
                  <div className={"flex-container col-lg-12 docs-agent-header-cls"}>

                  
                  </div>
                </div>
                <div className="flex-container left-side-header col-lg-5">
                  <div className="userInfo-cls flex-container">
                    <div className="left-side-comp header-btn-cont col-pay">
                    
              
                    <div className="select-cont">
                      <div onClick = {()=> this.setState({salesPop:true})} className="add-sale-btn">
                        <p>הוסף מבצע</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className={this.state.showCalendar ? 'doc-container active card' : 'doc-container card'}>
                {this.state.items && this.state.items.length ? 
                  <div id='lines-main-cont' className="lines-main-cont">
                    <table className="lines-sub-cont">
                      <tbody>
                        <tr className="heading">
                            <th className="col-cont sticky-col">
                              <p>קנה מוצר</p>
                            </th>
                            <th className="col-cont sticky-col">
                              <p>כמות</p>
                            </th>
                            <th className="col-cont">
                              <p>קבל מוצר</p>
                            </th>
                            <th className="col-cont">
                              <p>כמות</p>
                            </th>
                            <th className="col-cont">
                              <p>הנחה</p>
                            </th>
                            <th className="col-cont">
                              <p>מחיר</p>
                            </th>
                         
                            <th className="col-cont">
                              <p>תוקף</p>
                            </th>
                            <th className="col-cont">
                              <p>סטאטוס</p>
                            </th>
                           
                            <th className="col-cont">
                              <p>פעולות</p>
                            </th>
                        </tr>
                        {this.state.items && this.state.items.length ? this.state.items.map((element, index) => {
                          let docType = '';
                          let docAllowed = true;
                        
                          if( ( docAllowed == true) ){
                            let tmpDate = element.ValidDate.substring(0,10);
                            tmpDate = tmpDate.split("-");
                            tmpDate = tmpDate[2]+"/"+tmpDate[1]+"/"+tmpDate[0];
                            return(
                              
                                <tr key={index} className={"item"} id={'docRow_' + element.Id}>
                                    <th className="col-cont sticky-col" onClick={this.openSalePop.bind(this, element)}>
                                      <p className='AccountKey no-margin'>{'#' + element.ForCatalogNum}</p>
                                      <p>{element.ForTitle}</p>
                                    </th>
                                    <th className="col-cont sticky-col" onClick={this.openSalePop.bind(this, element)}>
                                      <p>{element.ForQuantity}</p>
                                    </th>
                                    <th className="col-cont" onClick={this.openSalePop.bind(this, element)}>
                                      <p>{element.ToTitle}</p>
                                    </th>
                                    <th className="col-cont" onClick={this.openSalePop.bind(this, element)}>
                                      <p>{element.ToQuantity}</p>
                                    </th>
                                    <th className="col-cont" onClick={this.openSalePop.bind(this, element)}>
                                      <p>{element.Discount}</p>
                                    </th>
                                    <th className="col-cont" onClick={this.openSalePop.bind(this, element)}>
                                      <p>{element.Price ? element.Price : "-"}</p>
                                    </th>
                                    <th className="col-cont" onClick={this.openSalePop.bind(this, element)}>
                                      <p>{tmpDate}</p>
                                    </th>
                                    <th className="col-cont status-btn">
                                      {!element.Unpublished ?
                                          <div onClick={(e) => this.updateInput(1, element.Id, 'Unpublished')} className="input active">
                                            <img src={globalFileServer + "icons/done.svg"} alt=""/>
                                          </div>
                                          :
                                          <div onClick={(e) => this.updateInput(null, element.Id, 'Unpublished')} className="input">
                                            <img src={globalFileServer + "icons/cross-bold.svg"} alt=""/>
                                          </div>
                                      }
                                    </th>
                                    <th className="col-cont">
                                      <span className="material-symbols-outlined"
                                        onClick={this.deleteItem.bind(this, element)}>delete</span>
                                    </th>
     
                                </tr>
                            );
                          }
                        }):null}
                      </tbody>
                    </table>
                  </div>
                :null}
              </div>
          </div>
        </div>
    )
  }
}
