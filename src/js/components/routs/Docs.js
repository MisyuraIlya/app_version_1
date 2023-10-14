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
import BreadCrumbs from "../tools/BreadCrumbs";
import ClientPagination from "../tools/ClientPagination";
import DocsTabs from "../tools/DocsTabs";
import DocListTotals from './shopCart/DocListTotals';


let timeoutId;


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
			search: '',
      calType:'',
      toShow: 200,
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
      docTypeSortChosen: '',
      ordInfo: false,
      searchActive: false,
      filter:'',
      isChangePathToPageOne: false,
      orderState: 1,
      tabs:[]




		}
    this.handleScroll = this.handleScroll.bind(this);
		this.selectDate = this.selectDate.bind(this);
    this.closeChecksPopUP = this.closeChecksPopUP.bind(this);

	}
	componentDidMount(){

    this.constructUri();

    /*
    const params = new URLSearchParams(this.props.history.location.search);
    params.get('fromDate')
    debugger;
    


    history.push({
      pathname: '/dresses',
      search: '?color=blue'
    })
    */

    setTimeout(() => {
			window.addEventListener('scroll', this.handleScroll, true);
      window.scrollTo(0, 0);
		}, 500);
	} 

  

  componentWillReceiveProps(nextProps) {
    
		if (this.props.match.params.page != nextProps.match.params.page && !this.state.isChangePathToPageOne) {
      window.scrollTo(0, 0);
      localStorage.setItem('scrollInsideDoc', 0);
			this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'), nextProps.match.params)
		}
    
	}

  handleScroll(e){
    
		localStorage.setItem('scrollApproveDocs', e.currentTarget.pageYOffset);
	}

  componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, true);
		let approveDatesObj = {
			date: this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),
      toDate: this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'),
		};
		if (location.hash.includes('/approveDocItems')) {
			localStorage.setItem('approveDatesObj', JSON.stringify(approveDatesObj));

		}
	}
  subtractMonths = (date, months) =>{
    date.setMonth(date.getMonth() - months);
    return date;
  }
  constructUri = ()=>{
    let searchParam = decodeURI(this.props.history.location.search);
    let orgSearchParam = searchParam;

    let searchParamSplit;
    let newSearchParam = '';

    newSearchParam = '?';
    searchParamSplit = searchParam.split('&');


    if(searchParam.search('fromDate') == -1){
      let date = new Date();
      date = this.subtractMonths(date, 6);
      this.setState({date})
      newSearchParam += 'fromDate=' + date.toLocaleDateString('ru-RU').split('.').join('/');
    }else{
      searchParamSplit.map(item => {
        if(item.search('fromDate') != -1){
          newSearchParam += item.replace("?", "");
        }
      });
    }
    if(searchParam.search('toDate') == -1){
      newSearchParam += '&toDate=' + this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    }else{
      searchParamSplit.map(item => {
        if(item.search('toDate') != -1){
          newSearchParam += '&' + item;
        }
      });
    }

    if(searchParam.search('search') == -1){
      newSearchParam += '&search=' + '';
    }else{
      searchParamSplit.map(item => {
        if(item.search('search') != -1){
          newSearchParam += '&' + item;
        }
      });
    }

    if(searchParam.search('filter') == -1){
      newSearchParam += '&filter=' + '';
    }else{
      searchParamSplit.map(item => {
        if(item.search('filter') != -1){
          newSearchParam += '&' + item;
        }
      });
    }

    this.props.history.push(this.props.history.location.pathname + newSearchParam);
    searchParam = newSearchParam;
    searchParamSplit = searchParam.split('&');

    let searchWord = '';
    let tmpFromDate;
    let tmpToDate;
    let tmpFilter;

		if(searchParam!=''){
      searchParamSplit.map(item => {
        if(item.search('search') != -1){
          searchWord = item.replace("search=", "")
        }
      });
      searchParamSplit.map(item => {
        if(item.search('filter') != -1){
          tmpFilter = item.replace("filter=", "")
        }
      });

      searchParamSplit.map(item => {
        if(item.search('fromDate') != -1){
          tmpFromDate = item.replace("?fromDate=", "").split('/');
          tmpFromDate = new Date(tmpFromDate[2], tmpFromDate[1]-1, tmpFromDate[0])
        }
      });
      searchParamSplit.map(item => {
        if(item.search('toDate') != -1){
          tmpToDate = item.replace("toDate=", "").split('/');
          tmpToDate = new Date(tmpToDate[2], tmpToDate[1]-1, tmpToDate[0])
        }
      });
      


      this.setState({search: searchWord, date: tmpFromDate, toDate: tmpToDate, docTypeSortChosen:tmpFilter  })
      timeoutId = setTimeout(() =>  this.getItems(tmpFromDate.toLocaleDateString('ru-RU').split('.').join('/'), tmpToDate.toLocaleDateString('ru-RU').split('.').join('/'), this.props.match.params,searchWord),200);

      if(orgSearchParam!=''){
      }else{
        localStorage.removeItem('scrollInsideDoc');
      }
		}



  }

  updateUri = (searchWord, filterVal)=>{
    if(!searchWord){
      searchWord = '';
    }
    let searchParam = decodeURI(this.props.history.location.search);
    let searchParamSplit;
    let newSearchParam = '';

    newSearchParam = '?';
    searchParamSplit = searchParam.split('&');


    if(searchParam.search('fromDate') == -1){
      newSearchParam += 'fromDate=' + this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    }else{
      searchParamSplit.map(item => {
        if(item.search('fromDate') != -1){
          newSearchParam += 'fromDate=' + this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
        }
      });
    }
    if(searchParam.search('toDate') == -1){
      newSearchParam += '&toDate=' + this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    }else{
      searchParamSplit.map(item => {
        if(item.search('toDate') != -1){
          newSearchParam += '&toDate=' + this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
        }
      });
    }

    if(searchParam.search('search') == -1){
      newSearchParam += '&search=' + '';
    }else{
      searchParamSplit.map(item => {
        if(item.search('search') != -1){
          newSearchParam += '&search=' + searchWord;
        }
      });
    }

    if(searchParam.search('filter') == -1){
      if(this.state.docTypeSortChosen != '' && this.state.docTypeSortChosen!='-1'){
        newSearchParam += '&filter=' + this.state.docTypeSortChosen;

      }else{
        newSearchParam += '&filter=' + '';

      }
    }else{
      searchParamSplit.map(item => {
        if(item.search('filter') != -1){
          newSearchParam += '&filter=' + filterVal;
        }
      });
    }

    let pathname = this.props.history.location.pathname;
    if(this.state.isChangePathToPageOne){
      pathname = '/docs/1/'+this.props.state.lang;
    }
    this.props.history.push(pathname + newSearchParam);
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

        let items = JSON?.parse(data);

        if(items.result == "success"){

          let docItems = this.state.tempItems;
          docItems.map(item => {
            if(item.ID == id){
              item.Products = JSON?.parse(items.products);
            }
    			});

        }

        this.setState({activeOrder: this.state.activeOrder == id ? false : id});
        this.setState({ items:docItems, tempItems: docItems, preload: false});


      } catch(err) {
        console.log('connection error docs');
        this.setState({preload:false});
      }
    }else{
      this.setState({activeOrder: this.state.activeOrder == id ? false : id});
    }

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
	calendarChange(date){
    if(this.state.calType=='from'){
		    this.setState({ date, showCalendar: false });
    }else if(this.state.calType=='to'){
        this.setState({ toDate: date, showCalendar: false });
    }
    this.setState({ docTypeSortChosen:-1, preload:false, searchActive:false, tempItems:[], isChangePathToPageOne:true});
	}
	selectDate(calType){
		this.setState({showCalendar: true,calType});
	}
	getItems = async (date,toDate,param,searchWord) => {

    let filterVal = this.state.docTypeSortChosen;
    this.setState({preload:true});
    this.updateUri(searchWord, filterVal);
    if(this.state.isChangePathToPageOne){
      param.page = '1';
    }

    let tmpDate = date.split("/");
    let targetDate = tmpDate[2]+'-'+tmpDate[1]+'-'+tmpDate[0];

    tmpDate = tmpDate[2]+tmpDate[1]+tmpDate[0];
    let tmpToDate = toDate.split("/");
    tmpToDate = tmpToDate[2]+tmpToDate[1]+tmpToDate[0];
    let searchParamCheck = '';
		if (searchWord == '') {
			searchParamCheck = false;
		} else {
			searchParamCheck = searchWord;
		}
    let user = JSON.parse(localStorage.getItem('user'));

    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      agentExtId: localStorage.agentExId,
      date: tmpDate,
      toDate:tmpToDate,
      targetDate: targetDate,
      action: "docs",
      page: param.page,
      searchParam: searchParamCheck ? searchParamCheck : false,
      filterVal: filterVal,
      agentExtId: localStorage.agentExId,
      id: user.Id,
      ext_id: user.ExId,

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

        let docFilterArr = [];
  
        let tmpVal;
        tmpVal = {Id:'-1',Title:'הכל'};
        docFilterArr.push(tmpVal)
        let docTypeHeb = '';
        // unique.map((item) => {
        //   tmpVal = false;

        //   docTypeHeb = this.props.identifyHashavshevetDocType(item);
        //   tmpVal = {Id:item,Title:docTypeHeb};
        //   if(tmpVal){
        //     docFilterArr.push(tmpVal);
        //   }
        // })
        let initIsChangePathToPageOne = this.state.isChangePathToPageOne;
        this.setState({
           items:docItems,
           tempItems: docItems,
           preload: false,
           searchActive:true,
           paginateObj:items.paginateObj,
           isChangePathToPageOne: false,
           docFilterArr,
           tabs: items.allItems
         });
         const scrollDemo = document.querySelector("#lines-main-cont");
         scrollDemo.addEventListener("scroll", event => {
           localStorage.setItem('scrollInsideDoc', scrollDemo.scrollTop);
         }, { passive: true });

         let myDiv = document.getElementById('lines-main-cont');
         if(localStorage.scrollInsideDoc && !initIsChangePathToPageOne){
          myDiv.scrollTop = parseInt(localStorage.scrollInsideDoc);
         }else{
          myDiv.scrollTop = 0;
          localStorage.scrollInsideDoc = 0;
         }
      }

    } catch(err) {
      console.log('connection error docs',err);
      this.setState({preload:false});
    }


	}
  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  numberWithCommas = (x) =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  search = (e) =>{

		let value = e.target.value;
   
		clearTimeout(timeoutId);
		this.setState({search: value})
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		if(value==""){
			this.clearSearch();
		}
		if(inputLength === 0){
			this.setState({users: []})
		}else{
      let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
      let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
      this.setState({isChangePathToPageOne:true})
			timeoutId = setTimeout(() => this.getItems(date, toDate, this.props.match.params,value), 500);
		}
	 }
   

	 clearSearch = () =>{
		let pathname = '/docs/1/' + this.props.state.lang;
		this.props.history.push(pathname);
		this.props.history.location.search = '';
		this.setState({search:''})
    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    this.setState({isChangePathToPageOne:true})

    timeoutId = setTimeout(() => this.getItems(date, toDate, this.props.match.params,''), 20);

	 }

  goToItemFunc = (element) =>{
      this.props.history.push('/docsItems/'+ element.ID +'/'+this.props.state.lang);
  }

  editDocTypeSort = (event ) =>{
    let value = (event.target.value);

    let tempItems = this.state.items;
    if(value != '-1'){
      tempItems = tempItems.filter(item => item.DocumentID == value);
    }

    this.setState({docTypeSortChosen:value,
                    isChangePathToPageOne:true
                  });
    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    timeoutId = setTimeout(() => this.getItems(date, toDate, this.props.match.params,this.state.search), 500);

  }

	render(){
    let pagination = [...Array(Math.ceil(this.state.items.length / this.state.toShow)).keys()];
    let breadCrumbsNav=[];
    let breadObject ={Title: 'מסמכי לקוחות',TitleEng: 'Profile', Link:"" + this.props.state.lang};
    breadCrumbsNav.push(breadObject);
    let lang = this.props.state.lang;
		return (
			<div className="page-container history admin-history docs ">
        <div className="docs-sub-cont">
          {/*
          <BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''} lang={this.props.state.lang}/>
          */}
  				{this.state.preload ?
  					<div className="spinner-wrapper">
  						<div className="spinner">
  							<div className="bounce1"></div>
  							<div className="bounce2"></div>
  							<div className="bounce3"></div>
  						</div>
  					</div>
  				: null}
          
          <Calendar
            onChange={(date) => this.calendarChange(date)}
            value={this.state.date}
            calendarType="Hebrew"
            locale="he-IL"
            className={this.state.showCalendar ? 'active' : null}
          />
          <DocsTabs activeTab={1} lang={this.props.state.lang}/>

          <div className="for-calendar flex-container card">
            <div className="flex-container right-side-header col-lg-7">
              <div className={"flex-container col-lg-12 docs-agent-header-cls"}>

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
                <div onClick={()=>this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'), this.props.match.params, this.state.search)} className="cal-cls searchBtn-cont">
                  <p>חפש</p>
                </div>
              </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
              <div className="userInfo-cls flex-container">
                <div className="left-side-comp header-btn-cont col-pay">
                
                  
                    
                  <div className="clientsAgentSearchWrapper">
                    <div className="search-cont">
                      <input
                        onChange={this.search}
                        value={this.state.search}
                        type="text"
                        placeholder="חיפוש..."
                      />
                      {this.state.search ?
                        <span className="material-symbols-outlined search-img"
                          onClick={() => this.clearSearch()}>close</span>
                        :
                        <span className="material-symbols-outlined search-img">search</span>
                      }
                    </div>
                  </div>
                  <div className="select-cont">
                    <select value={this.state.docTypeSortChosen} onChange={(e) => this.editDocTypeSort(e)}>
                      {this.state.tabs?.map((ele, ind) => {
                        return (
                          <option key={ind} id={parseInt(ind)} value={parseInt(ind)}>{ele}</option>
                        )
                      })}
                    </select>
                  </div>
                  
                </div>

              </div>
            </div>
          </div>

  				<div className={this.state.showCalendar ? 'doc-container active card' : 'doc-container card'}>
            {!this.state.searchActive ?
              <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
            :null}
            {this.state.searchActive && this.state.tempItems.length == 0 ? <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1> : null}
            {this.state.tempItems && this.state.tempItems.length ? 
              <div id='lines-main-cont' className="lines-main-cont">
                <table className="lines-sub-cont">
                 <tbody>
                    <tr className="heading">
                        <th className="col-cont sticky-col">
                          <p>#</p>
                        </th>
                        <th className="col-cont sticky-col">
                          <p>לקוח</p>
                        </th>
                        <th className="col-cont">
                          <p>סוג</p>
                        </th>
                        <th className="col-cont">
                          <p>ת.ערך</p>
                        </th>
                        <th className="col-cont">
                          <p>ת.תשלום</p>
                        </th>
                      
                        <th className="col-cont">
                          <p>סה״כ</p>
                        </th>
                        <th className="col-cont">
                          <p>סטאטוס</p>
                        </th>
                    </tr>
                    {this.state.tempItems && this.state.tempItems.length ? this.state.tempItems.map((element, index) => {
                      let docType = '';
                      let docAllowed = true;
                    
                      if( ( docAllowed == true) ){
                       
                        let DocType = 'הזמנה';
                        switch(element.DocumentID){
                          case '1':
                            docType = 'חשבונית';
                          break;
                          case '4':
                            docType = 'ת.משלוח';
                          break;
                          case '2':
                            docType = "חש' מס קבלה";
                          break;
                          case '31':
                            docType = 'קבלה';
                          break;
                          case '3':
                            docType = 'זיכוי';
                          break;
                          case '37':
                            docType = "ח.ריכוז";
                          break;
                          case '43':
                            docType = "העברה";
                          break;
                          case '9':
                            docType = "חש' סוכן";
                          break;
                          case '19':
                            docType = "העברה";
                          break;
                          case '5':
                            docType = "החזרה";
                          break;
                          case '11':
                            docType = "ה.סוכן";
                          break;
                          case '6':
                            docType = "הזמנה";
                          break;
                          case '7':
                            docType = "ה.מחיר";
                          break;
                          case '74':
                            docType = "החזרת סוכן";
                          break;
                        }
                        // let tmpDate = element.ValueDate?.substring(0,10);
                        // console.log('tmpDate',tmpDate)
                        // tmpDate = tmpDate?.split("-");
                        // tmpDate = tmpDate[2]+"/"+tmpDate[1]+"/"+tmpDate[0];

                        // let tmpDueDate = element.DueDate?.substring(0,10);
                        // tmpDueDate = tmpDueDate.split("-");
                        // tmpDueDate = tmpDueDate[2]+"/"+tmpDueDate[1]+"/"+tmpDueDate[0];
                        return(
                          
                            <tr key={index} className={"item"} id={'docRow_' + element.Id} onClick={()=> this.goToItemFunc(element)}>
                                <th className="col-cont sticky-col">
                                  <p className='AccountKey no-margin'>{'#' + element.document_number}</p>
                                </th>
                                <th className="col-cont sticky-col">
                                  <p className='AccountKey no-margin'>{'#' + element.AccountKey}</p>
                                  <p className='AccountName  no-margin'>{element.user_name}</p>      
                                </th>
                                <th className="col-cont">
                                  <p>{element.type}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.date}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.date_payed}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{parseFloat(element.total).toFixed(1)}</p>
                                </th>
                                <th className="col-cont col-approved">
                                  {element.status ?
                                    <p className='Active'>{element.status ? element.status : 'אושר'}</p>
                                    :
                                    <p className='NotActive'>ממתין</p>
                                  }
                                </th>
                    
                                <th className="col-cont">
                                  {element.DocumentID != '31' && element.DocumentID != '3' ?
                                    <div className="file-cont" onClick={()=>this.downloadFile(element, 'pdf')}>
                                      <span className="material-symbols-outlined">picture_as_pdf</span>
                                    </div>
                                  :null}
                                </th>
                               
                            </tr>
                        );
                      }
                    }):null}

                  </tbody>
                </table>
              </div>
            :null}
            {this.state.tempItems && this.state.tempItems.length && this.state.docTypeSortChosen!='-1' && this.state.docTypeSortChosen!='' ?
              <DocListTotals items={this.state.tempItems}  props={this.props}/>
            :null}
            {console.log('this.props.match.params',this.props.match.params)}
            {this.state.tempItems && this.state.tempItems.length && this.props && this.state.paginateObj && Object.keys(this.state.paginateObj).length ?
									<ClientPagination paginateObj={this.state.paginateObj} headProps={this.props.match.params}
									            headLocation={this.props.location.search} lang={this.props.state.lang} urlNav='/docs/'/>
						: null}
          
    			</div>
        </div>
			</div>
		)
	}
}
