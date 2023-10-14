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


let timeoutId;


export default class DocsAgentApproval extends Component {
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
      docTypeSortChosen: '1',
      ordInfo: false,
      searchActive: false,
      filter:'',
      isChangePathToPageOne: false



		}
    this.handleScroll = this.handleScroll.bind(this);
		this.selectDate = this.selectDate.bind(this);
    this.closeChecksPopUP = this.closeChecksPopUP.bind(this);

	}
	componentDidMount(){

    this.constructUri();
    
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
    /*
		localStorage.setItem('scrollApproveDocs', e.currentTarget.pageYOffset);
    */
	}

  componentWillUnmount() {
    /*
		window.removeEventListener('scroll', this.handleScroll, true);
		let approveDatesObj = {
			date: this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),
      toDate: this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'),
		};
		if (location.hash.includes('/approveDocItems')) {
			localStorage.setItem('approveDatesObj', JSON.stringify(approveDatesObj));
		}
    */
  
	}
  subtractMonths = (date, months) =>{
    date.setMonth(date.getMonth() - months);
    return date;
  }
  constructUri = ()=>{
    let tmpDocFilterArr = [];
    tmpDocFilterArr.push({Id:'1',Title:'ממתין', urlTitle:'Waiting'})
    tmpDocFilterArr.push({Id:'2',Title:'אושר', urlTitle:'Approved'})
    tmpDocFilterArr.push({Id:'3',Title:'נדחה', urlTitle:'Denied'})
    tmpDocFilterArr.push({Id:'4',Title:'הכל', urlTitle:'All'})
    this.setState({docFilterArr:tmpDocFilterArr})



    let searchParam = decodeURI(this.props.history.location.search);
    let orgSearchParam = searchParam;
    let searchParamSplit;
    let newSearchParam = '';

    newSearchParam = '?';
    searchParamSplit = searchParam.split('&');


    if(searchParam.search('fromDate') == -1){
      let date = new Date();
      date = this.subtractMonths(date, 2);
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
    let docTypeSortChosen = '1';
    if(searchParam.search('filter') == -1){
      newSearchParam += '&filter=' + 'Waiting';
    }else{
      searchParamSplit.map(item => {
        if(item.search('filter') != -1){
          newSearchParam += '&' + item;
          docTypeSortChosen = tmpDocFilterArr.find(i => i.urlTitle == item.replace("filter=", ""))['Id'];
          this.setState({docTypeSortChosen})

        }
      });
    }

    this.props.history.push(this.props.history.location.pathname + newSearchParam);
    searchParam = newSearchParam;
    searchParamSplit = searchParam.split('&');

    let searchWord = '';
    let tmpFromDate;
    let tmpToDate;

		if(searchParam!=''){
      searchParamSplit.map(item => {
        if(item.search('search') != -1){
          searchWord = item.replace("search=", "")
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


      this.setState({search: searchWord, date: tmpFromDate, toDate: tmpToDate  })
      timeoutId = setTimeout(() =>  this.getItems(tmpFromDate.toLocaleDateString('ru-RU').split('.').join('/'), tmpToDate.toLocaleDateString('ru-RU').split('.').join('/'), this.props.match.params,searchWord, docTypeSortChosen),200);
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
      newSearchParam += '&filter=' + '';
    }else{
      searchParamSplit.map(item => {
        if(item.search('filter') != -1){
          newSearchParam += '&filter=' + filterVal;
        }
      });
    }

    let pathname = this.props.history.location.pathname;
    if(this.state.isChangePathToPageOne){
      pathname = '/approveDoc/1/'+this.props.state.lang;
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
    this.setState({  preload:false, searchActive:false, tempItems:[], isChangePathToPageOne:true});
	}
	selectDate(calType){
		this.setState({showCalendar: true,calType});
	}
	getItems = async (date,toDate,param,searchWord,docTypeSortChosen) => {
    
    let filterVal = '';
    let tmpDocFilterArr =this.state.docFilterArr;
    filterVal = tmpDocFilterArr.find(item => item.Id == parseInt(docTypeSortChosen))['urlTitle'];

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


    let val = {
      sess_id: localStorage.sessionId,
      token: localStorage.token,
      agentExtId: localStorage.agentExId,
      date: tmpDate,
      toDate:tmpToDate,
      targetDate: targetDate,
      action: "GetDocsAgentApproval",
      page: param.page,
      searchParam: searchParamCheck ? searchParamCheck : false,
      filterVal: filterVal

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
      

        let initIsChangePathToPageOne = this.state.isChangePathToPageOne;
        this.setState({items:docItems,
           tempItems: docItems,
           preload: false,
           searchActive:true,
           paginateObj:items.paginateObj,
           isChangePathToPageOne: false
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
      let selectPicker = document.getElementById('selectPicker');
      selectPicker.value = parseInt(docTypeSortChosen);

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }


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
			timeoutId = setTimeout(() => this.getItems(date, toDate, this.props.match.params,value, this.state.docTypeSortChosen), 500);
		}
	 }

   setFilter = (event) => {
    let value = parseInt(event.target.value);
    this.setState({docTypeSortChosen:value});
    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    this.getItems(date, toDate, this.props.match.params,this.state.search,value)
   }
   

	 clearSearch = () =>{
		let pathname = '/approveDoc/1/' + this.props.state.lang;
		this.props.history.push(pathname);
		this.props.history.location.search = '';
		this.setState({search:''})
    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    this.setState({isChangePathToPageOne:true})

    timeoutId = setTimeout(() => this.getItems(date, toDate, this.props.match.params,'',this.state.docTypeSortChosen), 20);

	 }

  goToItemFunc = (element) =>{
    let searchParam = decodeURI(this.props.history.location.search);
    localStorage.setItem('lastApprovePageParams', searchParam);
    this.props.history.push('/approveDocItems/'+ element.Id +'/'+this.props.state.lang);
  }

	render(){
    let pagination = [...Array(Math.ceil(this.state.items.length / this.state.toShow)).keys()];
    let breadCrumbsNav=[];
    let breadObject ={Title: 'מסמכים לאישור',TitleEng: 'Profile', Link:"" + this.props.state.lang};
    breadCrumbsNav.push(breadObject);

		return (
			<div className="page-container history admin-history docs agent-docs agent-docs-approvePage karteset gviya">
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
          
          <Calendar
            onChange={(date) => this.calendarChange(date)}
            value={this.state.date}
            calendarType="Hebrew"
            locale="he-IL"
            className={this.state.showCalendar ? 'active' : null}
          />

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
                <div onClick={()=>this.getItems(this.state.date.toLocaleDateString('ru-RU').split('.').join('/'),this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/'), this.props.match.params, this.state.search, this.state.docTypeSortChosen)} className="cal-cls searchBtn-cont">
                  <p>חפש</p>
                </div>
              </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
              {this.state.userInfo ?
                <div className="userInfo-cls flex-container">
                  <div className="left-side-comp header-btn-cont col-pay">
                     
                  <div className="select-cont">
                    <select id="selectPicker" value={this.state.docTypeSortChosen} onChange={(e) => this.setFilter(e)}>
                      {this.state.docFilterArr.map((ele, ind) => {
                        return (
                          <option key={ind} id={ele.Id} value={ele.Id}>{ele.Title}</option>
                        )
                      })}
                    </select>
                  </div>
                    
                  <div className="clientsAgentSearchWrapper">
                    <div className="search-cont">
                      <input
                        onChange={this.search}
                        value={this.state.search}
                        type="text"
                        placeholder="חיפוש לקוח..."
                      />
                      {this.state.search ?
                        <span className="material-symbols-outlined search-img"
                          onClick={() => this.clearSearch()}>close</span>
                        :
                        <span className="material-symbols-outlined search-img">search</span>
                      }
                    </div>
                  </div>
                  </div>

                </div>
              :null}
            </div>
          </div>

  				<div className={this.state.showCalendar ? 'doc-container active card' : 'doc-container card'}>
            {!this.state.searchActive ?
              <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
            :null}
            {this.state.searchActive && this.state.tempItems.length == 0 ? <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1> : null}
            {this.state.tempItems && this.state.tempItems.length ? 
              <div id = "lines-main-cont" className="lines-main-cont">
                <table className="lines-sub-cont">
                  <tbody>
                    <tr className="heading">
                        <th className="col-cont sticky-col">
                          <p>לקוח</p>
                        </th>
                        <th className="col-cont">
                          <p></p>
                        </th>
                        <th className="col-cont">
                          <p>#</p>
                        </th>
                        <th className="col-cont">
                          <p>סוג</p>
                        </th>
                      
                        <th className="col-cont">
                          <p>תאריך</p>
                        </th>
                      
                        <th className="col-cont">
                          <p>סוכן</p>
                        </th>
                        <th className="col-cont">
                          <p>סה״כ</p>
                        </th>
                        <th className="col-cont">
                          <p>אסמכתא</p>
                        </th>
                        <th className="col-cont">
                          <p>סטאטוס</p>
                        </th>
                        <th className="col-cont">
                          <p>גורם מאשר</p>
                        </th>
                    </tr>
                

                    {this.state.tempItems && this.state.tempItems.length ? this.state.tempItems.map((element, index) => {
                      let docType = '';
                      let docAllowed = true;
                    
                      if( ( docAllowed == true) ){
                        let firstProd = null;
                        if(element.Products && element.Products.length>0){
                          firstProd = this.props.state.products.filter((e,i) => {return e.CatalogNumber == element.Products[0].ItemKey});
                        }
                        let DocType = 'הזמנה';
                        switch(element.OrdType){
                          case '3':
                            DocType = 'החזרה';
                          break;
                          case '2':
                            DocType = 'ה.מחיר';
                          break;
                        }

                        let ordStatus = 'ממתין';
                        let ordStatusClass = 'Waiting';
                        if(element.Approved){
                          ordStatus = 'אושר';
                          ordStatusClass = 'Active';
                        }else if(element.OrdStatus=='Denied'){
                          ordStatus = 'נדחה';
                          ordStatusClass = 'Blocked';
                        }
                        return(
                          

                            <tr key={index} className={"item"} id={'docRow_' + element.Id} onClick={()=> this.goToItemFunc(element)}>
                                <th className="col-cont sticky-col">
                                  <p className='AccountKey no-margin'>{'#' + element.ExId}</p>
                                  <p className='AccountName  no-margin'>{element.ClientName}</p>                      
                                </th>
                                <th className="col-cont">
                                  {element.IsAgentDoc ? 
                                    <span className="material-symbols-outlined search-img">{'support_agent'}</span>
                                  :
                                    <span className="material-symbols-outlined search-img">{'person'}</span>
                                  }
                                </th>
                                <th className="col-cont">
                                  <p>{element.Id}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{DocType}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.OrderDate}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.AgentName}</p>
                                </th>
                              
                                
                                <th className="col-cont">
                                  <p>{parseFloat(element.Total).toFixed(1)}</p>
                                </th>
                                <th className="col-cont">
                                  <p className='docId  no-margin'>{element.OrdExtId ? '#'+element.OrdExtId : '-'}</p>
                                  <p className='docNumber  no-margin'>{element.Approved ? '#'+element.Approved : ''}</p>
                                </th>
                                <th className="col-cont col-approved">
                                    <p className={ordStatusClass}>{ordStatus}</p>
                                    
                                </th>
                                <th className="col-cont">
                                  <p>{element.SuperAgentName ? element.SuperAgentName : '-'}</p>
                                </th>
                            </tr>
                        );
                      }
                    }):null}
                  </tbody>
                </table>
              </div>
            :null}

            {this.state.tempItems && this.state.tempItems.length && this.props && this.state.paginateObj && Object.keys(this.state.paginateObj).length ?
									<ClientPagination paginateObj={this.state.paginateObj} headProps={this.props.match.params}
									            headLocation={this.props.location.search} lang={this.props.state.lang} urlNav='/approveDoc/'/>
						: null}
          
    			</div>
        </div>
			</div>
		)
	}
}
