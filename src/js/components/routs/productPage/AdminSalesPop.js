import React, {Component, Fragment, useContext, useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
//import SearchProd from '../../tools/SearchProd';
import Calendar from 'react-calendar';
import SweetAlert from 'sweetalert2';
import UserContext from "../../../UserContext";

let appState;
let timeoutId;


const SearchHook= params => {
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
    if(word==""){
      goInactive(word);
    }
  }

  const setMode = mode => {
    setSearchMode(mode);
    setSearch("");
  }



  const prodSelectFunc = (item, param) => {
    params.setSelectFunc(item, param);
  }

  const emptySearch = (item) => {
    setWord('');
    params.closeSearchMob();
  }

  return(
      <div className="search-cont-main">

        <div className="search-cont">
          <div className="input">
            <input
                onChange={ e => setWord(e.target.value) }
                value={search}
                type="text"
                placeholder={app.state.lang == 'he' ? "חיפוש מוצר..." : "Search"}
            />
            {search == "" ?
                <span className="material-symbols-outlined search-img">search</span>
                :
                <span className="material-symbols-outlined search-img" onClick={()=> emptySearch()}>close</span>
            }

          </div>
          {search ?
              <div className="searchRes-cont">
                {params.preload ?
                    <div className="spinner-wrapper search-header">
                      <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    </div>
                    : null}
                {params.searchProds && params.searchProds.length ? params.searchProds.map((item,key) => {
                  return(
                      <div key={key} className="searchRes-row flex-container" onClick={()=> prodSelectFunc(item, params.inputParam)}>
                        <div className="content col-lg-12">
                          <p className="catalog">{"#" + item.CatalogNumber}</p>

                          <p className="title">{app.state.lang == 'he' ? item.Title : item.Description}</p>
                          {localStorage.user ?
                              <p className="price">{item.Price ? "₪ " + parseFloat(item.Price).toFixed(1) : ''}</p>
                          :null}
                        </div>
                      </div>
                  )
                }):null}
                {!params.searchProds | !params.searchProds.length && (params.showNotFound || params.preload) ?
                    <div className="all-res-cont not-found">
                      <span>{app.state.lang == 'he' ? "לא נמצאו תוצאות" : 'No Results Found'}</span>
                    </div>
                    :null}
              </div>
              :null}
        </div>
      </div>
  );
}



export default class AdminSalesPop extends Component {
	constructor(props){
		super(props);
		this.state = {
          selectedSale:[],
          showCalendar: false,
          date: new Date(),
          prevDate: "",
          forUnitArr: [],
          toUnitArr: [],
          searchProds: [],
          selectedProd:[],
          showSearchMob:false,
          showNotFound: false
        }
    this.selectDate = this.selectDate.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.selectChildren = this.selectChildren.bind(this);
    this.saveSale = this.saveSale.bind(this);


	}
	componentDidMount(){
      if(this.props.state.selectedSale){
        let selectedSale = JSON.stringify(this.props.state.selectedSale);
        selectedSale = JSON.parse(selectedSale);

        //ProdForUnit//ProdToPackQuan//ProdToUnit
        let forUnitArr  = [];
        let toUnitArr = [];


        if(selectedSale.ProdForUnit == "2"){
          if(forProd.PackQuan && parseInt(selectedSale.ProdForUnit)>1){
            forUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}, {id:1, title: "אריזות"}];
          }else{
            forUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}];
          }
        }else{
          if(selectedSale.ProdForPackQuan && selectedSale.ProdForPackQuan != "1"){
            forUnitArr = [{id:-1, title: "בחר"}, {id:1, title: "אריזות"}];
          }else{
            forUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}];
          }
        }

        if(selectedSale.ToCatalogNum!=''){
          if(selectedSale.ToCatalogNum == "2"){
            if(selectedSale.ProdToPackQuan && parseInt(selectedSale.ProdToPackQuan)>1){
              toUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}, {id:1, title: "אריזות"}];
            }else{
              toUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}];
            }
          }else{
            if(selectedSale.ProdToPackQuan && selectedSale.ProdToPackQuan != "1"){
              toUnitArr = [{id:-1, title: "בחר"}, {id:1, title: "אריזות"}];
            }else{
              toUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}];
            }
          }
        }



        let date = selectedSale.ValidDate.split("-");
        let dateForCal = date = new Date(date[0], parseInt(date[1])-1, date[2]);
        date = date.toLocaleDateString('ru-RU').split('.').join('/');
        //selectedSale.ValidDate = date;
        this.setState({selectedSale, forUnitArr, toUnitArr, prevDate: date, date: dateForCal})
      }else{
        let date = new Date();
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        date = date.toLocaleDateString('ru-RU').split('.').join('/');

        let selectedSale = {
          Id: "",
          ForCatalogNum: "",
          ForTitle: "",
          ForUnit: "",
          ForQuantity: "",
          ToCatalogNum: "",
          ToTitle: "",
          ToQuantity: "",
          ToUnit: "",
          Unpublished: "",
          ValidDate: "",
          Discount: "",
          Price: ""
        };
        this.setState({selectedSale,prevDate: date});
      }

	}
  changeValue(params,e){
    let selectedSale = this.state.selectedSale;
    selectedSale[params] = e.target.value;
    this.setState({selectedSale});

  }
  getProdFromSearch(catalogNumber, title, id, action) {


    let all_sales = this.props.state.items;

    let match = all_sales.filter((ele,ind) => {return ele.ForCatalogNum == catalogNumber && !ele.Unpublished});

    //this.state.selectedSale
    if(!match.length){
      let selectedSale = this.state.selectedSale;

      let all_prods = this.props.props.state.products;
      let element = all_prods.filter((ele,ind) => {return ele.CatalogNumber == catalogNumber});
      debugger;
      let forUnitArr = this.state.forUnitArr;
      let toUnitArr = this.state.toUnitArr;

      if(action == "ForCatalogNum"){
        selectedSale[action] = catalogNumber;
        selectedSale.ForTitle = title;
        if(element[0].Unit == "2"){
          if(element[0].PackQuan && parseInt(element[0].PackQuan)>1){
            forUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}, {id:1, title: "אריזות"}];
          }else{
            forUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}];
          }
        }else{
          if(element[0].PackQuan && element[0].PackQuan != "1"){
            forUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}, {id:1, title: "אריזות"}];
          }else{
            forUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}];
          }
        }

      }else{
        selectedSale[action] = catalogNumber;
        selectedSale.ToTitle = title;
        if(element[0].Unit == "2"){
          if(element[0].PackQuan && parseInt(element[0].PackQuan)>1){
            toUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"} , {id:1, title: "אריזות"}];

          }else{
            toUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}];
          }
        }else{
          if(element[0].PackQuan && element[0].PackQuan != "1"){
            toUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}, {id:1, title: "אריזות"}];
          }else{
            toUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}];
          }
        }
      }
      this.setState({selectedSale, forUnitArr, toUnitArr});
    }else{
      SweetAlert({
        title: 'מבצע עבור פריט זה קיים.',
        type: 'info',
        showConfirmButton: false,
        timer: 4000
      }).catch(SweetAlert.noop);
    }

  }

  selectDate(){
		this.setState({showCalendar: true});
	}

  calendarChange(date){

    let dateForView = date.toLocaleDateString('ru-RU').split('.').join('/');
  //  let selectedSale = this.state.selectedSale;
  //  selectedSale.ValidDate = dateForView;
		this.setState({ date, showCalendar: false, prevDate:  dateForView});

	}
  closeSearch(Id, action){

  }
  selectChildren(params, event){
    let selLine = event.target.value;
    let selectedSale = this.state.selectedSale;

    selectedSale[params] = selLine;
    this.setState({selectedSale});

  }
  saveSale(){

    let selectedSale = this.state.selectedSale;
    let date = this.state.prevDate.split("/");
    selectedSale.ValidDate = date[2] + "-" + date[1] + "-" + date[0];

    if((selectedSale.ForCatalogNum != "" && selectedSale.ForUnit && selectedSale.ForQuantity && parseInt(selectedSale.ForQuantity)>=1) ||
      (selectedSale.ForCatalogNum != "" && selectedSale.ForUnit && selectedSale.ForQuantity && selectedSale.ToCatalogNum &&
      selectedSale.ToQuantity && selectedSale.ToUnit && (selectedSale.Discount || selectedSale.Price))){
      if(selectedSale.Discount && selectedSale.Price){
        SweetAlert({
          title: 'אנא הגדר או הנחה או מחיר קבוע',
          type: 'info',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);
      }else{
        if(selectedSale.ToCatalogNum && selectedSale.ForCatalogNum == selectedSale.ToCatalogNum && selectedSale.ForUnit != selectedSale.ToUnit && selectedSale.Discount != 100){
          SweetAlert({
            title: 'אנא הגדר אמת מידה אחידה בשני המוצרים',
            type: 'info',
            showConfirmButton: false,
            timer: 4000
          }).catch(SweetAlert.noop);
        }else{
          selectedSale.ToCatalogNum == "" ? selectedSale.ToCatalogNum = null : null;
          selectedSale.ToQuantity == "" ? selectedSale.ToQuantity = null : null;
          selectedSale.ToUnit == "" ? selectedSale.ToUnit = null : null;
          selectedSale.Price == "" ? selectedSale.Price = null : null;
          selectedSale.Discount == "" ? selectedSale.Discount = null : null;

          let all_prods = this.props.props.state.products;

          !selectedSale.ProdForPackQuan ? selectedSale.ProdForPackQuan = selectedSale.ForObj.PackQuan : null;
          if(selectedSale.ToObj && selectedSale.ToObj.PackQuan){
            !selectedSale.ProdToPackQuan ? selectedSale.ProdToPackQuan = selectedSale.ToObj.PackQuan : null;
          }


          this.props.saveSale(selectedSale);
        }
      }

    }else{
      SweetAlert({
        title: 'חסרים נתונים',
        type: 'info',
        showConfirmButton: false,
        timer: 4000
      }).catch(SweetAlert.noop);
    }

  }

  searchPhpFunc = async (value, mode) => {

    this.setState({searchString: value})

    if (value && value!="") {

      this.setState({preload: true, showNotFound:false})

      let user = false;
      localStorage.user ? user = JSON.parse(localStorage.user) : null;

      let wordArr = [];
      let split = value.split(" ");
      if(split.length && split[1] != ""){
        wordArr = split;
      }else{
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
        const data = await this.props.props.ajax(valAjax);
        this.setState({preload: false})
        let products = data;

        this.setState({ searchProds: products , showNotFound:true});
      } catch(err) {
        console.log('connection error docs');
        this.setState({preload:false});
      }

    } else {
      this.setState({ searchProds:[] });
      this.setState({preload: false, showNotFound:false})

    }
  }

  setSelectFunc = (element, action) => {


    let all_sales = this.props.state.items;
    let match = all_sales.filter((ele,ind) => {return ele.ForCatalogNum == element.CatalogNumber && !ele.Unpublished});

    if(!match.length){
      let selectedSale = this.state.selectedSale;

      let all_prods = this.props.props.state.products;
      let forUnitArr = this.state.forUnitArr;
      let toUnitArr = this.state.toUnitArr;

      if(action == "ForCatalogNum"){
        selectedSale.ForObj = element;
        selectedSale[action] = element.CatalogNumber;
        selectedSale.ForTitle = element.Title;
        if(element.Unit == "2"){
          if(element.PackQuan && parseInt(element.PackQuan)>1){
            forUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}, {id:1, title: "אריזות"}];
          }else{
            forUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}];
          }
        }else{
          if(element.PackQuan && element.PackQuan != "1"){
            forUnitArr = [{id:-1, title: "בחר"}, {id:1, title: "אריזות"}];
          }else{
            forUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}];
          }
        }

      }else{
        selectedSale.ToObj = element;
        selectedSale[action] = element.CatalogNumber;
        selectedSale.ToTitle = element.Title;
        if(element.Unit == "2"){
          if(element.PackQuan && parseInt(element.PackQuan)>1){
            toUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"} , {id:1, title: "אריזות"}];

          }else{
            toUnitArr = [{id:-1, title: "בחר"}, {id:2, title: "קילו"}];
          }
        }else{
          if(element.PackQuan && element.PackQuan != "1"){
            toUnitArr = [{id:-1, title: "בחר"}, {id:1, title: "אריזות"}];
          }else{
            toUnitArr = [{id:-1, title: "בחר"}, {id:0, title: "יחידות"}];
          }
        }
      }

      this.setState({selectedSale, forUnitArr, toUnitArr});
    }else{
      SweetAlert({
        title: 'מבצע עבור פריט זה קיים.',
        type: 'info',
        showConfirmButton: false,
        timer: 4000
      }).catch(SweetAlert.noop);
    }
  }

  closeSearchMob = () => {
    this.setState({showSearchMob : false})
  }

  render(){
		return(
			<div className="wrapper admin-sales-pop">
        <Calendar
          onChange={(date) => this.calendarChange(date)}
          value={this.state.date}
          calendarType="Hebrew"
          locale="he-IL"
          className={this.state.showCalendar ? 'active' : null}
        />
        <div className="sales-main-cont flex-container">
          <div className="right-col-cont col-lg-6">
            <div className="right-col-sub-cont">
              <p className="col-title">קנה מוצר</p>
              <div className="input-cont">
                <p>מק״ט</p>
                {this.state.selectedSale.Id == "" && this.state.selectedSale.ForCatalogNum == "" ?
                  <SearchHook searchPhpFunc={this.searchPhpFunc}
                              setSelectFunc={this.setSelectFunc}
                              searchProds={this.state.searchProds}
                              preload={this.state.preload}
                              showNotFound={this.state.showNotFound}
                              props={this.props}
                              closeSearchMob={this.closeSearchMob}
                              inputParam = 'ForCatalogNum'/>
                 :
                  <div className="div-input catalog-num">
                    <p>{this.state.selectedSale.ForCatalogNum}</p>
                  </div>
                }
              </div>
              <div className="input-cont">
                <p>שם המוצר</p>
                <div className="div-input">
                  <p>{this.state.selectedSale.ForTitle}</p>
                </div>
              </div>
              {this.state.forUnitArr && this.state.forUnitArr.length > 0 ?
                <div className="input-cont">
                  <p>יחידה</p>
                    <select
                      onChange={this.selectChildren.bind(this,"ForUnit")}
                      value={this.state.selectedSale.ForUnit}
                      >
                      {this.state.forUnitArr.map((element, index) => {
                        return (
                          <option key={index} id={element.id} value={element.id}>{element.title}</option>
                        )
                      })}
                    </select>
                </div>
              :null}
              <div className="input-cont">
                <p>כמות</p>
                <input
                  type="text"
                  value={this.state.selectedSale.ForQuantity}
                  onChange={this.changeValue.bind(this,"ForQuantity")}
                />
              </div>
            </div>
          </div>
          <div className="left-col-cont col-lg-6">
            <div className="left-col-sub-cont">
              <p className="col-title">קבל מוצר</p>
              <div className="input-cont">
                <p>מק״ט</p>
                {this.state.selectedSale.Id == "" && this.state.selectedSale.ToCatalogNum == "" ?
                    <SearchHook searchPhpFunc={this.searchPhpFunc}
                                setSelectFunc={this.setSelectFunc}
                                searchProds={this.state.searchProds}
                                preload={this.state.preload}
                                showNotFound={this.state.showNotFound}
                                props={this.props}
                                closeSearchMob={this.closeSearchMob}
                                inputParam = 'ToCatalogNum'/>
                    :
                    <div className="div-input catalog-num">
                      <p>{this.state.selectedSale.ToCatalogNum}</p>
                    </div>
                }
              </div>
              <div className="input-cont">
                <p>שם המוצר</p>
                <div className="div-input">
                  <p>{this.state.selectedSale.ToTitle}</p>
                </div>
              </div>
              {this.state.toUnitArr && this.state.toUnitArr.length > 0 ?
                <div className="input-cont">
                  <p>יחידה</p>
                    <select onChange={this.selectChildren.bind(this,"ToUnit")}
                      value={this.state.selectedSale.ToUnit}
                      >
                      {this.state.toUnitArr.map((element, index) => {
                        return (
                          <option key={index} id={element.id} value={element.id}>{element.title}</option>
                        )
                      })}
                    </select>
                </div>
              :null}
              <div className="input-cont">
                <p>כמות</p>
                <input
                  type="text"
                  value={this.state.selectedSale.ToQuantity}
                  onChange={this.changeValue.bind(this,"ToQuantity")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sales-bottom-cont flex-container">
          <div className="left-col-cont col-lg-3">
            <div className="input-cont">
              <p>הנחה</p>
              <input
                type="text"
                value={this.state.selectedSale.Discount}
                onChange={this.changeValue.bind(this,"Discount")}
              />
            </div>
          </div>
          <div className="left-col-cont col-lg-2">
            <div className="input-cont">
              <p>מחיר</p>
              <input
                type="text"
                value={this.state.selectedSale.Price}
                onChange={this.changeValue.bind(this,"Price")}
              />
            </div>
          </div>
          <div className="input-cont col-lg-2">
            {/*
            <p>לקוח</p>
              <select onChange={this.selectChildren.bind(this,"Type")} value={this.state.selectedSale.Type}>
                <option id={1} value={1}>{'B2B'}</option>
                <option id={2} value={2}>{'b2c'}</option>
              </select>
          */}
          </div>
          <div className="left-col-cont col-lg-4">
            <p>תוקף</p>
            <button onClick={this.selectDate.bind(this)}>
              <img src={globalFileServer + 'icons/calendar.svg'} alt=""/>
              <span>{this.state.prevDate}</span>
            </button>
          </div>
        </div>
        <div className="btn-container">
          <div onClick = {this.saveSale.bind(this)} className="add-sale-btn">
            <p>שמור</p>
          </div>
        </div>
			</div>
		);
	}
}
