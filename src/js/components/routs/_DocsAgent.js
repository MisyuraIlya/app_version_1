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




export default class Docs extends Component {
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
      orderState: 1,
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
      monthlyTarget: 0,
      monthlyTotall: 0,
      docFilterArr:[],
      docTypeSortChosen: '-1',
      ordInfo: false



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

    let tmpDate = new Date();
    let firstDay = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1);

    let monthChosen = (tmpDate.getMonth()+1).toString();
    let yearChosen = (tmpDate.getFullYear()).toString();
    this.setState({monthChosen,yearChosen });
/*
    let date = firstDay.toLocaleDateString('ru-RU').split('.').join('/');
    let lastDay;
    lastDay = new Date(yearChosen, tmpDate.getMonth()+1, 0);
    let toDate = lastDay.toLocaleDateString('ru-RU').split('.').join('/');
*/
    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');

    this.getItems(date,toDate,this.state.orderState, monthChosen, yearChosen);

		setTimeout(() => window.scrollTo(0, 0), 200);
	}

  closeChecksPopUP(){
    this.setState({checksPopUP:false});
  }


  setActiveRegOrder = (id) => {
    this.setState({activeOrder: this.state.activeOrder == id ? false : id});

  }

  setActiveOrder = async(id) => {



    if(!this.state.activeOrder || this.state.activeOrder!= id){
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
		let items = this.state.items.filter(item => item.DocNumber ? item.DocNumber.includes(val) : null);

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
    // this.setState({items:[], tempItems: [], search: false, docTypeSortChosen:-1, preload:false});
     this.setState({ docTypeSortChosen:-1, preload:false});

	}
	selectDate(calType){
		this.setState({showCalendar: true,calType});
	}
	getItems = async (date,toDate,orderState, monthChosen, yearChosen) => {

    this.setState({preload:true});

    let tmpDate = date.split("/");
    let targetDate = tmpDate[2]+'-'+tmpDate[1]+'-'+tmpDate[0];

    tmpDate = tmpDate[2]+tmpDate[1]+tmpDate[0];
    let tmpToDate = toDate.split("/");
    tmpToDate = tmpToDate[2]+tmpToDate[1]+tmpToDate[0];

    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      agentExtId: localStorage.agentExId,
      date: tmpDate,
      toDate:tmpToDate,
      targetDate: targetDate,
      monthChosen: monthChosen,
      yearChosen: yearChosen,
      action: "agentDocs"//docs//docsForPayment
    };
  //  debugger;

    const valAjax = {
      funcName: '',
      point: 'new-api/docs',
      val: val
    };


    try {
      const data = await this.props.ajax(valAjax);

      let items = JSON.parse(data);
console.log(JSON.stringify(items.items))
      if(items.result == "success"){
        let docItems = items.items;
        let monthlyTarget = 0;
        if(items.target){
          monthlyTarget = items.target.Value1;
        }

        let glbSum = 0;

        let tmpDocFilterArr = [];


        docItems.map((item) => {
          if((item.DocumentId == '5')){
            glbSum -= parseFloat(item.TFtal);
          }else if((item.DocumentId == '1')){
            glbSum += parseFloat(item.TFtal);
          }
          tmpDocFilterArr.push(item.DocumentId);
          // if(item.DocNumber == '90533'){
          //   debugger;
          // }

        })

      var unique = tmpDocFilterArr.filter(this.onlyUnique);
      unique.sort();
      let docFilterArr = [];

      let tmpVal;
      tmpVal = {Id:'-1',Title:'הכל'};
      docFilterArr.push(tmpVal)
      unique.map((item) => {
        tmpVal = false;
        switch(item){
          case '31':
          tmpVal = {Id:item,Title:'קבלה'};
          break;
          case '3':
          tmpVal = {Id:item,Title:'זיכוי'};
          break;
          case '11':
          tmpVal = {Id:item,Title:'ה.סוכן'};
          break;
          case '1':
          tmpVal = {Id:item,Title:'חשבונית'};
          break;
          case '6':
          tmpVal = {Id:item,Title:'הזמנה'};
          break;
          case '7':
          tmpVal = {Id:item,Title:'ה.מחיר'};
          break;
          case '5':
          tmpVal = {Id:item,Title:'החזרה'};
          break;
          case '4':
            tmpVal = {Id:item,Title:'ת.משלוח'};
           break;


        }
        if(tmpVal){
          docFilterArr.push(tmpVal);
        }
      })



        glbSum = glbSum.toFixed(1)

        this.setState({items:docItems,
           tempItems: docItems,
           search: false,
           preload: false,
           monthlyTotall:glbSum,
           monthlyTarget,
           docFilterArr
         });
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }


	}


  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  numberWithCommas = (x) =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'),orderState);

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

  downloadFile = async(element, fileType) => {

    this.setState({preload:true, morePop: false});


    let val = {
      ext_id: element.ID,
      fileType: fileType
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


    let date = firstDay.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = lastDay.toLocaleDateString('ru-RU').split('.').join('/');

    this.setState({monthChosen,yearChosen });
    this.setState({date, toDate});


    this.getItems(date,toDate,this.state.orderState, monthChosen, yearChosen);


  }

  editDocTypeSort = (event ) =>{
    let value = parseInt(event.target.value);

    let tempItems = this.state.items;
    if(value != '-1'){
      tempItems = tempItems.filter((item) => {return item.DocumentId == value});
    }
    this.setState({docTypeSortChosen:value,
                    tempItems
                  });

    //docTypeSortChosen

  }

	render(){
    let pagination = [...Array(Math.ceil(this.state.items.length / this.state.toShow)).keys()];

		return (
			<div className="page-container history admin-history docs agent-docs">
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
          <Calendar
            onChange={(date) => this.calendarChange(date)}
            value={this.state.date}
            calendarType="Hebrew"
            locale="he-IL"
            className={this.state.showCalendar ? 'active' : null}
          />
  				<h1 className="title">היסטוריית מסמכים</h1>


          <div className="for-calendar flex-container">
            <div className="flex-container right-side-header col-lg-7">
              <div className={"flex-container col-lg-12 docs-agent-header-cls"}>
{/*
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
*/}
                <div className="cal-cls  right-side-comp">
                  <div className="open-calendar">
                    <p className="inline-cls">מתאריך</p>
                    <button className="inline-cls" onClick={this.selectDate.bind(this,'from')}>
                      <img src={globalFileServer + 'icons/calendar.svg'} alt=""/>
                      <span>{this.state.date.toLocaleDateString('he-IL').split('.').join('/')}</span>
                    </button>
                  </div>
                </div>
                <div className="cal-cls  right-side-comp">
                  <div className="open-calendar">
                    <p className="inline-cls">לתאריך</p>
                    <button className="inline-cls" onClick={this.selectDate.bind(this,'to')}>
                      <img src={globalFileServer + 'icons/calendar.svg'} alt=""/>
                      <span>{this.state.toDate.toLocaleDateString('he-IL').split('.').join('/')}</span>
                    </button>
                  </div>
                </div>
{/*
                <div onClick={()=>this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'),this.state.orderState)} className="cal-cls searchBtn-cont">
                  <p>חפש</p>
                </div>
*/}
                <div className="select-cont">
                  <p>סוג מסמך</p>
                  <select value={this.state.docTypeSortChosen} onChange={(e) => this.editDocTypeSort(e)}>
                    {this.state.docFilterArr.map((ele, ind) => {
                      return (
                        <option key={ind} id={parseInt(ele.Id)} value={parseInt(ele.Id)}>{ele.Title}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
              {this.state.userInfo ?
                <div className="userInfo-cls flex-container">

{/*
                  {localStorage.agent ?
                    <div className="left-side-comp header-btn-cont col-pay col-lg-2">
                      <div className="btn-small-cont" onClick={()=> this.setState({returnsPop:true})}>
                        <img className="info-icon-img xls-btn-icon" src={globalFileServer + 'icons/refunding.svg'} />
                      </div>
                    </div>
                  :null}
*/}
                  <div className="left-side-comp header-btn-cont col-pay">

                  </div>
{/*
                  <div className="left-side-comp header-btn-cont col-pay">
                    <div className="btn-small-cont" onClick={()=> this.setState({checksPopUP:true, popAction:"payment"})}>
                      <img className="info-icon-img xls-btn-icon" src={globalFileServer + 'icons/credit.svg'} />
                    </div>
                  </div>
  */}
{/*
                  <div className="left-side-comp header-btn-cont col-cheq">
                    <div className="btn-small-cont" onClick={()=> this.setState({checksPopUP:true, popAction:"cheq"})}>
                      <img className="info-icon-img xls-btn-icon" src={globalFileServer + 'icons/cheque.svg'} />
                    </div>
                  </div>

                  <div className="left-side-comp userInfoCol col-lg-3">
                    <p>סה״כ</p>
                    <p className="infoVal">{parseFloat(this.state.monthlyTotall).toFixed(1)}</p>
                  </div>

                  <div  className="left-side-comp userInfoCol col-lg-3">
                    <p>יעד חודשי</p>
                    <p className="infoVal">{(parseFloat(this.state.monthlyTarget))}</p>
                  </div>
*/}
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
           {/*
            <div className="tabs-main-cont">
              <div className="tabs-main-subcont">
                <div className="tab-cont">
                  <NavLink to={'/docs'}>
                    <p className={this.state.orderState == 1 ? "active" : null} >{"מסמכים"}</p>
                  </NavLink>
                </div>
                <div className="tab-cont">
                  <NavLink to={'/docsHistoryAgent'}>
                    <p className={this.state.orderState == 0 ? "active" : null}>{"הזמנות web"}</p>
                  </NavLink>
                </div>
                <div className="tab-cont">
                  <NavLink to={'/agentGviya'}>
                    <p className={this.state.orderState == 2 ? "active" : null}>{"גביה"}</p>
                  </NavLink>
                </div>
                <div className="tab-cont">
                  <NavLink to={'/docsDrafts'}>
                    <p className={this.state.orderState == 2 ? "active" : null}>{"טיוטות"}</p>
                  </NavLink>
                </div>
             
              </div>
            
            </div>
                 */}
            <div className="items">
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
                  <div className="col-lg-2">
                    <div className="wrapp">
                      <p>לקוח</p>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="wrapp">
                      <p>סוג</p>
                    </div>
                  </div>

                  <div className="col-lg-1">
                    <div className="wrapp">
                      <p>ת.ערך</p>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="wrapp">
                      <p>ת.תשלום</p>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="wrapp">
                      <p>אסמכתא</p>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="wrapp">
                      <p>סה״כ</p>
                    </div>
                  </div>


                  <div className="col-lg-1">
                    <div className="wrapp">
                      <p>סטאטוס</p>
                    </div>
                  </div>

                  <div className="col-lg-1">
                  {/*
                    <div className="wrapp">
                      <p>אקסל</p>
                    </div>
                    */}
                  </div>
                  <div className="col-lg-1">
                  {/*
                    <div className="wrapp">
                      <p>PDF</p>
                    </div>
                    */}
                  </div>
                </div>
              </div>

              {this.state.tempItems && this.state.tempItems.length ?
                <div className="body">

                  {this.state.orderState == 1 ?
                    <Fragment>
                      {!this.state.tempItems.length ? <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1> : null}
                      {this.state.tempItems.map((element, index) => {
                        if (index < this.state.toShow * this.state.currentPage && index >= (this.state.currentPage - 1) * this.state.toShow) {
                          let docType = '';
                          let docAllowed = true;

                          if(element.DocumentId == '1'){
                            docType = 'חשבונית';
                          }else if(element.DocumentId == '4'){
                            docType = 'ת.משלוח';
                          }else if(element.DocumentId == '2'){
                            docType = "חש' מס קבלה";
                          }else if(element.DocumentId == '31'){
                            docType = 'קבלה';
                          }else if(element.DocumentId == '3'){
                            docType = 'זיכוי';
                          }else if(element.DocumentId == '37'){
                            docType = "חש' מס ריכוז";
                          }else if(element.DocumentId == '43'){
                            docType = "העברה";
                          }else if(element.DocumentId == '9'){
                            docType = "חש' סוכן";
                          }else if(element.DocumentId == '19'){
                            docType = "העברה";
                          }else if(element.DocumentId == '5'){
                            docType = "החזרה";
                          }else if(element.DocumentId == '11'){
                            docType = "ה.סוכן";
                          }else if(element.DocumentId == '6'){
                            docType = "הזמנה";
                          }else if(element.DocumentId == '7'){
                            docType = "ה.מחיר";
                          }else{
                            docAllowed = false;
                          }

                          if( ( docAllowed == true) ){
                            let firstProd = null;
                            if(element.Products && element.Products.length>0){
                              firstProd = this.props.state.products.filter((e,i) => {return e.CatalogNumber == element.Products[0].ItemKey});
                            }
                            let tmpDate = element.ValueDate.substring(0,10);
                            tmpDate = tmpDate.split("-");
                            tmpDate = tmpDate[2]+"/"+tmpDate[1]+"/"+tmpDate[0];

                            let tmpDueDate = element.DueDate.substring(0,10);
                            tmpDueDate = tmpDueDate.split("-");
                            tmpDueDate = tmpDueDate[2]+"/"+tmpDueDate[1]+"/"+tmpDueDate[0];

                            return(
                              <div key={index} className={this.state.activeOrder == element.ID ? "item active" : "item"}>
                                <div className="flex-container body-main-cls">
                                  <div className="col-lg-1 col-drop" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    {element.DocumentId != '31' ?
                                      <div className="wrapp">
                                        <div className="img">
                                          {this.state.activeOrder == element.ID ?
                                            <img src={globalFileServer + 'icons/up-purple.svg'} alt=""/>
                                            :
                                            <img src={globalFileServer + 'icons/down-purple.svg'} alt=""/>
                                          }
                                        </div>
                                      </div>
                                    :null}
                                  </div>
                                  <div className="col-lg-1 col-id" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p>{element.ID}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-client" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p className='AccountKey'>{'#' + element.AccountKey}</p>
                                      <p className='AccountName'>{element.AccountName}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-1 col-status doc-type" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p>{docType}</p>
                                    </div>
                                  </div>

                                  <div className="col-lg-1 col-valDate" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p>{tmpDate}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-1 col-valDueDate" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p>{tmpDueDate}</p>
                                    </div>
                                  </div>


                                  <div className="col-lg-1 col-docNum" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p>{element.DocNumber}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-1 col-sum1" onClick={this.setActiveOrder.bind(this, element.ID)}>
                                    <div className="wrapp">
                                      <p>{parseFloat(element.TFtalVat).toFixed(1)}</p>
                                    </div>
                                  </div>


                                  <div className="col-lg-1 col-approved">
                                    <div className="wrapp">
                                      {element.Status==1?
                                        <p className='Active'>{element.ExtraText4 ? element.ExtraText4 : 'הופק'}</p>
                                        :
                                        <p className='NotActive'>ממתין</p>
                                      }
                                    </div>
                                  </div>
                                  {/*
                                  {element.ExtraText2 ?
                                    <div className="col-lg-third xls col-info-order">
                                      <div className="xls-btn-small-cont">
                                        <img className="info-icon-img xls-btn-icon" src={globalFileServer + 'icons/info.svg'} onClick={() => this.setState({ordInfo: element})}/>
                                      </div>
                                      {this.state.ordInfo && this.state.ordInfo.ID == element.ID ?
                                        <div className="user-info-wrapp">
                                          <div className="popup-contant">
                                            <div className="popup-contant-header flex-container">
                                              <div className="col-lg-10" >
                                                <p>מידע</p>
                                              </div>
                                              <div className="close-popup col-lg-2">
                                                <div className="close-popup-cont" onClick={() => this.setState({ordInfo: false})}>
                                                  <img src={globalFileServer + 'icons/close_purple.svg'} />
                                                  </div>
                                              </div>
                                            </div>
                                            <div className="all-row-cont">
                                              <div className="flex-container row-cont">
                                                <div className="col-lg-4 title">
                                                  <p>שם הלקוח</p>
                                                </div>
                                                <div className="col-lg-8 value">
                                                  <p>{element.AccountName}</p>
                                                </div>
                                              </div>
                                              <div className="flex-container row-cont">
                                                <div className="col-lg-4 title">
                                                  <p>הערה</p>
                                                </div>
                                                <div className="col-lg-8 value">
                                                  <p>{element.ExtraText2}</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      : null}
                                    </div>
                                  :null}
                                      */}
                                        {element.DocumentId != '31' && element.DocumentId != '3' ?
                                    <div className="col-lg-2 xls">
                                      
                                     {/* <div className="file-cont" onClick={()=>this.downloadFile(element, 'xls')}>
                                        <img className="info-icon-img xls-btn-icon" src={globalFileServer + 'icons/excel.svg'} />
                                    </div>*/}
                                      <div className="file-cont" onClick={()=>this.downloadFile(element, 'pdf')}>
                                        <span className="material-symbols-outlined">picture_as_pdf</span>
                                      </div>
                                    </div>
                                  :null}
                                  

                                </div>
                                <div className="products">
                                  <div className="heading heading-prod">
                                    <div className="flex-container heading-prod-cont">
                                      <div className="col-lg-1">
                                        <div className="wrapp">
                                          <p></p>
                                        </div>
                                      </div>
                                      <div className="col-lg-2">
                                        <div className="wrapp title">
                                          <p>מק״ט</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-3">
                                        <div className="wrapp">
                                          <p>שם פריט</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-2">
                                        <div className="wrapp">
                                          <p>מחיר</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-2">
                                        <div className="wrapp">
                                          <p>כמות</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-2">
                                        <div className="wrapp">
                                          <p>סה״כ</p>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  {element.Products ? element.Products.map((el, ind) => {
                                    //let image = this.props.state.images.length ? this.props.state.images.filter(item => item == el.ItemKey) : [];
                                    let singlePrice = parseFloat(el.Price);
                                    let linePrice = parseFloat(el.TFtal);
                                    let disPerc = parseFloat(el.DiscountPrc);
                                    if(disPerc){
                                      singlePrice = singlePrice - (singlePrice  * disPerc / 100);
                                      linePrice = linePrice - (linePrice  * disPerc / 100);

                                    }
                                    return(
                                      <div key={ind} className="product">
                                        <div className="flex-container row-cls">
                                          <div className="col-lg-1 col-prod-img">
                                            <div className="wrapp">
                                              <div className="img">
                                                {/*
                                                <img className="img" src={globalFileServer + "products/" + el.ItemKey + ".jpg"} onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'} />
                                              */}
                                                </div>
                                            </div>
                                          </div>
                                          <div className="flex-container col-lg-5 united-cls">
                                            <div className="col-lg-5 col-prod-catalog">
                                              <div className="wrapp title">
                                                <p>{el.ItemKey}</p>
                                              </div>
                                            </div>
                                            <div className="col-lg-7 col-prod-title">
                                              <div className="wrapp">
                                                <p>{el.ItemName}</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-2 col-prod-price">
                                            <div className="wrapp">
                                              <p>{(parseFloat(singlePrice)).toFixed(1)}</p>
                                            </div>
                                          </div>
                                          <div className="col-lg-2 col-prod-quan">
                                            <div className="wrapp comment">
                                              <p>{parseFloat(el.Quantity).toFixed(1)}</p>
                                            </div>
                                          </div>
                                          <div className="col-lg-2 col-prod-ttlprice">
                                            <div className="wrapp">
                                              <p>{parseFloat(linePrice).toFixed(1)}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }):null}
                                </div>
                              </div>
                            );
                          }
                        }
                      })}
                    </Fragment>
                  :null}


                </div>
              :null}


            </div>
            {pagination.length > 1 ?
              <div className="pagination">
                <ul>
                  {this.state.currentPage > 1 ?
                    <li onClick={this.setPage.bind(this, this.state.currentPage - 1)}>
                      <img src={globalFileServer + 'icons/right-arrow.svg'} alt="back"/>
                    </li>
                  : null}
                  {pagination.map((element, index) => {
                    let pageN = element + 1;
                    return(
                      <li onClick={this.setPage.bind(this, pageN)} key={index} className={pageN == this.state.currentPage ? 'active' : null}>
                        <span>{pageN}</span>
                      </li>
                    );
                  })}
                  {this.state.currentPage < pagination.length ?
                    <li onClick={this.setPage.bind(this, this.state.currentPage + 1)}>
                      <img src={globalFileServer + 'icons/left-arrow.svg'} alt="next"/>
                    </li>
                  : null}
                </ul>
              </div>
            : null}
    				</div>
        </div>
			</div>
		)
	}
}
