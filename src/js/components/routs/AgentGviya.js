import ReactDOM from "react-dom";
import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SweetAlert from 'sweetalert2';
import Calendar from 'react-calendar';
import PayPopup from '././shopCart/PayPopup';
import ChecksPopUP from "./productPage/ChecksPopUP";
import ReturnsPop from "./productPage/ReturnsPop";
import { NavLink, useHistory } from "react-router-dom";




export default class DocsKarteset extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: new Date(),
      toDate: new Date(),
			items: [],
			tempItems: [],
			product: false,
			showCalendar: false,
			preload: false,
			search: false,
      calType:'',
      orderState: 2,
      toShow: 50,
      currentPage: 1,
      toPayPopup: false,
      chosenDoc:[],
      userInfo:[],
      checksPopUP: false,
      popAction:"",
      returnsPop: false,
      orderHistory: [],
      glbSum: 0,
      hisOrders:[],
      monthChosen: '',
      yearChosen: '',
      dateObj:[]


		}
		this.selectDate = this.selectDate.bind(this);
		this.sortItems = this.sortItems.bind(this);
		this.closePayPopup = this.closePayPopup.bind(this);
    this.splitPaymentsPay = this.splitPaymentsPay.bind(this);
    this.closeChecksPopUP = this.closeChecksPopUP.bind(this);
    this.goToTranzillaFunc = this.goToTranzillaFunc.bind(this);
    this.closeReturnPop = this.closeReturnPop.bind(this);

	}
	componentDidMount(){
/*
    let tmpDate = new Date();
    let firstDay = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1);

    tmpDate.setDate(tmpDate.getDate() - 90);
    firstDay = tmpDate;

    this.setState({date:firstDay});

		let date = firstDay.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
		//this.getItems(date,toDate,this.state.orderState);

*/
    let tmpDate = new Date();
    let firstDay = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1);

    let monthChosen = (tmpDate.getMonth()+1).toString();
    let yearChosen = (tmpDate.getFullYear()).toString();
    this.setState({monthChosen,yearChosen });

    let date = firstDay.toLocaleDateString('ru-RU').split('.').join('/');
    let lastDay;
    lastDay = new Date(yearChosen, tmpDate.getMonth()+1, 0);
    let toDate = lastDay.toLocaleDateString('ru-RU').split('.').join('/');

    //this.getItems( monthChosen, yearChosen);

		setTimeout(() => window.scrollTo(0, 0), 200);
	}

  closeChecksPopUP(){
    this.setState({checksPopUP:false});
  }


  setActiveRegOrder = (id) => {
    this.setState({activeOrder: this.state.activeOrder == id ? false : id});

  }

  setActiveOrder = async(id) => {



    if(!this.state.activeOrder){
      this.setState({preload:true});

      let val = {
        sess_id: localStorage.sessionId,
        token: localStorage.token,
        ext_id: id,
        action: "docItems"//docs//docsForPayment
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

          let docItems = this.state.tempItems;
          docItems.map(item => {
            if(item.ID == id){
              item.Products = JSON.parse(items.products);
            }
    			});

        }
        this.setState({activeOrder: this.state.activeOrder == id ? false : id});
        this.setState({ items:docItems, tempItems: docItems, search: false, preload: false});


      } catch(err) {
        console.log('connection error docs');
        this.setState({preload:false});
      }
    }else{
      this.setState({activeOrder: this.state.activeOrder == id ? false : id});
    }

	}

  goToTranzillaFunc(price){
    this.setState({chosenPrice: price, toPayPopup: true, checksPopUP:false});
  }

  downloadPdf(exFile){
    this.setState({preload:true});


    let split = exFile.replace(/\\/g , "/");
    split = split.split("/");

    let fileName = split[split.length-1];
    let extPath = "";
    for(let i=0; i<split.length;i++){
      if(i != split.length-1){
        extPath += split[i] + "/";
      }
    }

    let val = {
      fileName: fileName,
      extPath: extPath
    };

    $.ajax({
      url: globalServer + 'new-api/docs_pdf_download.php',
			type: 'POST',
			data: val,
		}).done(function(data) {
      var win = window.open(globalServer + 'new-api/sync/docs/' + fileName , '_blank');
      this.setState({preload:false});
		}.bind(this)).fail(function() {
      console.log("error");
      this.setState({preload:false});
    });
  }
  setPage(currentPage){
		this.setState({currentPage});
		window.scrollTo(0, 0);
	}

	sortItems(e){
		let val = e.target.value.toLowerCase();
		this.setState({search: val});
		let items = this.state.items.filter(item => item.FullName.includes(val) || item.AccountKey.includes(val));

    this.setState({tempItems:items});
	}
	calendarChange(date){
    if(this.state.calType=='from'){
		    this.setState({ date, showCalendar: false });
        this.getItems(date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'),this.state.orderState);
    }else if(this.state.calType=='to'){
        this.setState({ toDate: date, showCalendar: false });
        this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.orderState);
    }
	}
	selectDate(calType){
		this.setState({showCalendar: true,calType});
	}
	getItems = async (monthChosen, yearChosen) => {

    this.setState({preload:true});
    let user = JSON.parse(localStorage.getItem('user'));


    if(monthChosen<10){
      monthChosen = '0'+monthChosen;
    }
    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      monthChosen:monthChosen,
      yearChosen:yearChosen,
      agentExtId: localStorage.agentExId,
      action: "agentGviya"
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
        let docItems = items.lines;
        let dateObj = items.DatesObj;


        this.setState({items:docItems, tempItems: docItems, dateObj,search: false, preload: false});
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }
	}

  createNewCart = async(order) => {

    this.setState({preload:true});

    this.props.simpleClearCart();
    let user = JSON.parse(localStorage.getItem('user'));

    let ordProducts = [];
    let obj;

    order.Products.map((ele,ind) => {
      obj = {'CatalogNumber':ele.ItemKey,
             'Price': ele.Price,
             'Discount': null,
             'Title': ele.ItemName,
             'PurchQuantity': ele.PurchQuantity
            };
      ordProducts.push(obj);
    })

    let val = {
     userId: user.Id,
     priceCode: user.PriceList,
     Products: ordProducts,
     userExtId: user.ExId
   };
   const valAjax = {
     funcName: '',
     point: 'new-api/return_prices_for_products',
     val: val
   };

   try {
     const data = await this.props.ajax(valAjax);

     let newProducts = [];
     let product;
     let tmpProd;
     let prodFromDb;

     ordProducts.map((item) => {
       product = this.props.state.products.filter((e,i) => {return e.CatalogNumber == item.CatalogNumber});
       if(product.length && !product[0].SpecialPrice){
         prodFromDb = data.filter((e,i) => {return e.CatalogNumber == item.CatalogNumber});
         product[0].Price = prodFromDb[0].Price;
         product[0].Discount = prodFromDb[0].Discount;
         tmpProd = { 'Id' : parseInt(product[0].Id),
                     "Quantity" : parseFloat(item.PurchQuantity),
                     "Products" : product[0],
                     "UnitChosen": product[0].Unit == "2" ? 2 : 0,
                     "CategoryId": product[0].CategoryId
                   };
         newProducts.push(tmpProd);
       }
     });
     this.setState({preload:false});

     this.props.restoreCart(newProducts);
     this.props.history.push("/cart");

   } catch(err) {
     console.log('connection error return_prices_for_products');
     this.setState({preload:false});
   }

  }


	closePayPopup(){
		this.setState({toPayPopup: false, payAgentPopup: false});
	}


  splitPaymentsPay = async(data) =>{

    let chosenDoc = {};
    let paymentData = JSON.parse(data);
    let credTypeArr = ["ישראכרט",
    "ויזה",
    "דיינרס",
    "אמריקן",
    "JCB",
    "לאומיכארד"];

    let paymentDataString = "עסקת אשראי: " + paymentData.Tempref + " , " + "4 ספרות: " +
    paymentData.ccno + " , " + "תוקף: " + paymentData.expmonth + "-" + paymentData.expyear + " , " + "סוג: " + credTypeArr[parseInt(paymentData.cardtype)] + " , " +
    "תשלומים: " + paymentData.cred_type + " , " + "סכום: " + paymentData.sum;

    chosenDoc.paymentDataString = paymentDataString;
    chosenDoc.TFtalVat = paymentData.sum;


    let val = {
			token: localStorage.token,
			role: localStorage.role,
      action: "writeKabalatSohen",
      prodObj: JSON.stringify(chosenDoc),
      docId: 31,
      userObj: JSON.stringify(this.props.state.user)
		};

    const valAjax = {
      funcName: 'writeKabalatSohen',
      point: 'new-api/write_docs',
      token: localStorage.token,
      role: localStorage.role,
      val: val
    };

    this.closePayPopup();

    this.setState({preload:true});

    try {
      const data = await this.props.ajax(valAjax);
      this.setState({preload:false});

      if(data.result == "success"){
        SweetAlert({
          title: 'תשלום התקבל בהצלחה',
          type: 'success',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);
      }else{
        SweetAlert({
          title: 'התשלום התקבל אך לא הונפקה קבלה. נציג יצור עמך קשר בהקדם',
          type: 'info',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }



  }

  closeReturnPop(){
    this.setState({returnsPop:false});
  }

  saveReturns = async(returnObj) => {

    let val = {
      prodObj: JSON.stringify(returnObj),
      docId: 5,
      userObj: JSON.stringify(this.props.state.user),
      userExtId: this.props.state.user.ExId,
      agentExId: localStorage.agentExId
		};

    const valAjax = {
      funcName: 'writeReturns',
      point: 'new-api/write_docs',
      token: localStorage.token,
      role: localStorage.role,
      val: val
    };

    try {
      const data = await this.props.ajax(valAjax);
      debugger;
      if(data.result == "success"){
        SweetAlert({
          title: 'בקשה לזיכוי נשלחה בהצלחה',
          type: 'success',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);

        let tmpDate = new Date();
        let firstDay = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1);
        this.setState({date:firstDay});

        let date = firstDay.toLocaleDateString('ru-RU').split('.').join('/');
        let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
        this.getItems(date,toDate,this.state.orderState);

        this.closeReturnPop();
      }else{
        SweetAlert({
          title: 'בקשה לזיכוי לא נשלחה. אנא צור קשר',
          type: 'info',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }


  }

  orderStateChange = (orderState) => {

    this.setState({orderState, tempItems: [], items:[]});
    //this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'),orderState);

  }

  downloadReceipt = (args) => {
  var fileTransfer = new FileTransfer();
  var uri = encodeURI(args.url);

  fileTransfer.download(
    uri, // file's uri
    args.targetPath, // where will be saved
    function(entry) {
      console.log("download complete: " + entry.toURL());
      window.open(entry.toURL(), '_blank', 'location=no,closebuttoncaption=Cerrar,toolbar=yes,enableViewportScale=yes');
    },
    function(error) {
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("upload error code" + error.code);
    },
    true,
    args.options
  );
}

  downloadFile = async(fileType) => {

    this.setState({preload:true, morePop: false});
    let user = JSON.parse(localStorage.getItem('user'));



    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    let tmpDate = date.split("/");
    tmpDate = tmpDate[2]+tmpDate[1]+tmpDate[0];
    let tmpToDate = toDate.split("/");
    tmpToDate = tmpToDate[2]+tmpToDate[1]+tmpToDate[0];


    let val = {
      ext_id: user.ExId,
      fileType: fileType,
      date: tmpDate,
      toDate:tmpToDate
    };

    const valAjax = {
      funcName: 'GetKarteset',
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
  editProduct = (event, param ) =>{
    let value = parseInt(event.target.value);

    let tmpDate = new Date();
    let firstDay;
    let lastDay;
    let monthChosen;
    let yearChosen;

    if(param=='Month'){
      this.setState({monthChosen: value})
      firstDay = new Date(this.state.yearChosen, parseInt(value)-1, 1);
      lastDay = new Date(this.state.yearChosen, parseInt(value), 0);
      monthChosen = (parseInt(value)).toString();
      yearChosen = (this.state.yearChosen).toString();
    }else{
      this.setState({yearChosen: value})
      firstDay = new Date(value, parseInt(this.state.monthChosen)-1, 1);
      lastDay = new Date(value, parseInt(this.state.monthChosen)-1, parseInt(value), 0);
      monthChosen = (this.state.monthChosen).toString();
      yearChosen = (parseInt(value)).toString();
    }


    this.setState({monthChosen,yearChosen });


  }


	render(){
    let pagination = [...Array(Math.ceil(this.state.items.length / this.state.toShow)).keys()];

		return (
			<div className="page-container history admin-history docs karteset gviya">
        <div className="docs-sub-cont">

          {this.state.checksPopUP ? ReactDOM.createPortal(
            <div className="my-modal prod-info checksPopUP">
              <div className="modal-wrapper animated">
                <div className="popup-contant-header flex-container">
                  <div className="col-lg-10" >
                    {this.state.popAction == "payment" ?
                      <p>הזן סכום לתשלום</p>
                      :
                      <p>המחאות עתידיות</p>
                    }
                  </div>
                  <div className="close-popup col-lg-2">
                    <div className="close-popup-cont" onClick={this.closeChecksPopUP}>
                      <img src={globalFileServer + 'icons/close_purple.svg'} />
                      </div>
                  </div>
                </div>
                <ChecksPopUP {...this}/>
              </div>
              <div onClick={this.closeChecksPopUP} className="overflow"></div>
            </div>,
            document.getElementById('modal-root')
          ) : null}
          {this.state.returnsPop ? ReactDOM.createPortal(
            <div className="my-modal prod-info">
              <div className="modal-wrapper animated returns">
                <div className="popup-contant-header flex-container">
                  <div className="col-lg-10" >
                    <p>מוצרים לזיכוי</p>
                  </div>
                  <div className="close-popup col-lg-2">
                    <div className="close-popup-cont" onClick={this.closeReturnPop}>
                      <img src={globalFileServer + 'icons/close_purple.svg'} />
                      </div>
                  </div>
                </div>
                <ReturnsPop {...this}/>
              </div>
              <div onClick={this.closeReturnPop} className="overflow"></div>
            </div>,
            document.getElementById('modal-root')
          ) : null}
  				{this.state.preload ?
  					<div className="spinner-wrapper">
  						<div className="spinner">
  							<div className="bounce1"></div>
  							<div className="bounce2"></div>
  							<div className="bounce3"></div>
  						</div>
  					</div>
  				: null}
          {this.state.toPayPopup ? ReactDOM.createPortal(
  					<PayPopup {...this}/>,
  					document.getElementById('modal-root')
  				) : null}
  				<h1 className="title">גביה</h1>
  				<Calendar
  					onChange={(date) => this.calendarChange(date)}
  					value={this.state.date}
  					calendarType="Hebrew"
  					locale="he-IL"
  					className={this.state.showCalendar ? 'active' : null}
  				/>
          <div className="for-calendar flex-container">
            <div className="flex-container right-side-header col-lg-7">
              <div className="select-cont">
                <p>חודש</p>
                <select value={this.state.monthChosen} onChange={(e) => this.editProduct(e, "Month")}>
                  {this.props.state.monthArr.map((ele, ind) => {
                    return (
                      <option key={ind} id={parseInt(ele.Id)} value={parseInt(ele.Id)}>{ele.Title}</option>
                    )
                  })}
                </select>
              </div>
              <div className="select-cont">
                <p>שנה</p>
                <select value={this.state.yearChosen} onChange={(e) => this.editProduct(e, "Year")}>
                  {this.props.state.yearArr.map((ele, ind) => {
                    return (
                      <option key={ind} id={parseInt(ele.Id)} value={parseInt(ele.Id)}>{ele.Title}</option>
                    )
                  })}
                </select>
              </div>
              <div onClick={()=>this.getItems(this.state.monthChosen, this.state.yearChosen)} className="cal-cls searchBtn-cont">
                <p>חפש</p>
              </div>
              <div className="search-cls  right-side-comp">
                <div className="search">
                  <input
                    type="text"
                    value={this.state.search ? this.state.search : ''}
                    onChange={this.sortItems}
                    placeholder="חפש לקוח"
                  />
                  {!this.state.search ?
                    <img src={globalFileServer + 'icons/search-gray.svg'} alt=""/>
                  :
                    <img onClick={() => this.setState({search: false, tempItems: this.state.items})} src={globalFileServer + 'icons/close.svg'} alt=""/>
                  }
                </div>
              </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
              {this.state.userInfo ?
                <div className="userInfo-cls flex-container">
                  <div className="left-side-comp header-btn-cont col-pay">

                  </div>
                  {/*
                  <div  className="left-side-comp userInfoCol col-lg-3">
                    <p>סה״כ: </p>
                    <p className="infoVal">{this.state.glbSum}</p>
                  </div>
                  */}
                </div>
              :null}
            </div>
          </div>

  				<div className={this.state.showCalendar ? 'doc-container active' : 'doc-container'}>
         
            <div className="lines-main-cont">
              <table className="lines-sub-cont">
                {this.state.dateObj && this.state.dateObj.length>0 ?
                  <tr className="heading">
                    <th className="col-cont long-col">
                        <p>שם חשבון</p>
                    </th>
                    <th className="col-cont">
                        <p>מס' חשבון</p>
                    </th>
                    <th className="col-cont">
                      <p>י.פתיחה</p>
                    </th>
                    {this.state.dateObj.map((item, index) => {
                      return(
                        <th key={index} className="col-cont">
                          <p>{item.MonthlyTitle}</p>
                        </th>
                      )
                    })}
                    <th className="col-cont">
                      <p>סה״כ</p>
                    </th>
                  </tr>
                :null}
                {this.state.tempItems && this.state.tempItems.length ? this.state.tempItems.map((element, index) => {
                  return(
                    <tr key={index} className={"item"}>
                      <th className="col-cont long-col">
                        <p>{element.FullName}</p>
                      </th>
                      <th className="col-cont title-col">
                        <p>{element.AccountKey}</p>
                      </th>
                      <th className="col-cont">
                        <p className={parseInt(element.InitSum)==0 ? "grey" : null}>{parseFloat(element.InitSum).toFixed(1)}</p>
                      </th>
                      {element.DatesObj && element.DatesObj.length>0 ? element.DatesObj.map((e,i) => {
                        return(
                          <th className="col-cont">
                            <p className={parseInt(e.Balance)==0 ? "grey" : null}>{e.Balance.toFixed(1)}</p>
                          </th>
                        )
                      }):null}
                      <th className="col-cont">
                        <p>{parseFloat(element.GlbBalance).toFixed(1)}</p>
                      </th>

                    </tr>
                  );
                }):null}
              </table>
            </div>
          </div>
        </div>
			</div>
		)
	}
}
