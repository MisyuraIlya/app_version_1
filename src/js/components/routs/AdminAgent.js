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
import AdminAgentPop from "./productPage/AdminAgentPop";


let timeoutId;

const OnAgentHandler = ({agentId}) => {
  const {MyAgentMethods} = useMyAgent()
  const history = useHistory()
  // onClick={() => MyAgentMethods.chooseAgent(agentId)}
  const handleLinkAgent = () => {
    localStorage.setItem('agent', agentId)
    history.push(`/target/${agentId}`)
  }

  return (
      <div className="col-lg-1 col-cls status" >
        <div className="wrapp" onClick={() => handleLinkAgent()}>
          <span className="material-symbols-outlined search-img">{'support_agent'}</span>

        </div>
      </div>
  )
}

export default class AdminAgent extends Component {
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
      docTypeSortChosen: '-1',
      ordInfo: false,
      searchActive: false,
      filter:'',
      isChangePathToPageOne: false,
      orderState: 1,
      agentPop: false,
      selectedAgent:false



		}
    this.handleScroll = this.handleScroll.bind(this);
		this.selectDate = this.selectDate.bind(this);
    this.closeChecksPopUP = this.closeChecksPopUP.bind(this);

	}
	componentDidMount(){
    this.getItems();

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
  constructUri = ()=>{
    let searchParam = decodeURI(this.props.history.location.search);
    let orgSearchParam = searchParam;

    let searchParamSplit;
    let newSearchParam = '';

    newSearchParam = '?';
    searchParamSplit = searchParam.split('&');


    if(searchParam.search('fromDate') == -1){
      newSearchParam += 'fromDate=' + this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
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
      if(orgSearchParam!=''){
        timeoutId = setTimeout(() =>  this.getItems(tmpFromDate.toLocaleDateString('ru-RU').split('.').join('/'), tmpToDate.toLocaleDateString('ru-RU').split('.').join('/'), this.props.match.params,searchWord),200);
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
      pathname = '/docsHistory/1/'+this.props.state.lang;
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
    this.setState({ docTypeSortChosen:-1, preload:false, searchActive:false, tempItems:[], isChangePathToPageOne:true});
	}
	selectDate(calType){
		this.setState({showCalendar: true,calType});
	}
	getItems = async (date,toDate,param,searchWord) => {
    
    this.setState({preload:true});

    const valAjax = {
      funcName: 'view',
      point: 'new-api/admin-agents',
			token: localStorage.token,
			role: localStorage.role
    };


    try {
      const data = await this.props.ajax(valAjax);
      let items = JSON.parse(data);
      if(items.result == "success"){
        let items = JSON.parse(data).agents.Agents;

        items.map((item) => {
          item.More = false;
        })
        //debugger;
        this.setState({items, 
          tempItems: items,
          preload: false,
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
		let pathname = '/docsHistory/1/' + this.props.state.lang;
		this.props.history.push(pathname);
		this.props.history.location.search = '';
		this.setState({search:''})
    let date = this.state.date.toLocaleDateString('ru-RU').split('.').join('/');
    let toDate = this.state.toDate.toLocaleDateString('ru-RU').split('.').join('/');
    this.setState({isChangePathToPageOne:true})

    timeoutId = setTimeout(() => this.getItems(date, toDate, this.props.match.params,''), 20);

	 }

 

  saveAgent = async(selectedAgent) =>{
    let funcName;
    if(selectedAgent.Id){
      funcName = "update";
    }else{
      funcName = "insert";
    }

    let val = {
			selectedAgent: JSON.stringify(selectedAgent)
		};


    let valAjax = {
			funcName: funcName,
      point: 'new-api/admin-agents',
			token: localStorage.token,
			role: localStorage.role,
      val: val
		};

    try {
      const data = await this.props.ajax(valAjax);

      if(data.result == "success"){
        let items = this.state.items;
        if(selectedAgent.Id){
          items.map((ele,ind) => {
            if(ele.Id == selectedAgent.Id){
              items[ind] = selectedAgent;
            }
          })
        }else{
          selectedAgent.Id = data.id;
          items.unshift(selectedAgent);
        }
        this.setState({items , agentPop: false, selectedAgent:false});
      }else{
        this.setState({agentPop: false, selectedAgent:false});
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }




  }


  closeAdminPop = ()=>{
    this.setState({agentPop:false,agentTargetPop:false, selectedAgent:false});
  }
  openAgentPop=(element)=>{
    let items = this.state.items;
    items.find(item => item.Id == element.Id).More = false;

    this.setState({selectedAgent: element, agentPop:true, items})
  }

  openAgentTargetPop=(element)=>{
    let items = this.state.items;
    items.find(item => item.Id == element.Id).More = false;

    this.setState({selectedAgent: element, agentTargetPop:true, items})
  }

  deleteItem=(id)=>{
    this.closeAdminPop();
    let items = this.state.items;
    items.find(item => item.Id == id).More = false;

    this.setState({items})

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

        let val = {
					token: localStorage.token,
					role: localStorage.role,
					itemId: id,
					funcName: 'delete',
          point: 'new-api/admin-agents'
				};
        this.deleteItemFunc(val,id);

			} else {
				//this.unsetPreload();
			}
		}.bind(this, id)).catch(SweetAlert.noop);
	}

  deleteItemFunc = async(val, itemId) =>{

    try {
      const data = await this.props.ajax(val);
      if (data.result == "success") {
        let tempItems = this.state.tempItems;
        tempItems = tempItems.filter((item) => {return item.Id != itemId});
        this.setState({tempItems});
      }

    } catch(err) {
      console.log('connection error docs');
      this.setState({preload:false});
    }

  }


  changeMoreVal=(id,val)=>{
    let tmpUsers = this.state.items;
    //userListAll
    tmpUsers.find(item => item.Id == id).More = val;
    this.setState({userList: tmpUsers})
  }
  unsetMore=(itemId)=>{
    let userList = this.state.userList;
    userList.find(item => item.Id == itemId).More = false;

    this.setState({userList });
  }

	render(){
    let pagination = [...Array(Math.ceil(this.state.items.length / this.state.toShow)).keys()];
    let breadCrumbsNav=[];
    let breadObject ={Title: 'ניהול סוכנים',TitleEng: 'Profile', Link:"" + this.props.state.lang};
    breadCrumbsNav.push(breadObject);
    let lang = this.props.state.lang;
		return (
			<div className="page-container history admin-history docs ">
         {this.state.agentPop ? ReactDOM.createPortal(
          <div className="my-modal prod-info admin-agent">
            <div className="modal-wrapper animated">
              <div className="popup-contant-header flex-container">
                <div className="col-lg-10" >
                  <p>פרטי סוכן</p>
                </div>
                <div className="close-popup col-lg-2">
                  <div className="close-popup-cont" onClick={this.closeAdminPop}>
                    <img src={globalFileServer + 'icons/close_purple.svg'} />
                    </div>
                </div>
              </div>
              <AdminAgentPop {...this}/>
            </div>
            <div onClick={this.closeAdminPop} className="overflow"></div>
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

               
              </div>
            </div>
            <div className="flex-container left-side-header col-lg-5">
              <div className="userInfo-cls flex-container">
                <div className="left-side-comp header-btn-cont col-pay">
                
                <div className="select-cont">
                  <div onClick = {()=> this.setState({agentPop:true})} className="add-sale-btn">
                    <p>הוסף סוכן</p>
                  </div>
                </div>
                    
                    {/*
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
                    */}
                  
                </div>

              </div>
            </div>
          </div>

  				<div className={this.state.showCalendar ? 'doc-container active card' : 'doc-container card'}>
          
            {this.state.tempItems && this.state.tempItems.length ? 
              <div id='lines-main-cont' className="lines-main-cont">
                <table className="lines-sub-cont">
                 <tbody>
                    <tr className="heading">
                        <th className="col-cont sticky-col">
                          <p>שם</p>
                        </th>
                        <th className="col-cont sticky-col">
                          <p>מס' פנימי</p>
                        </th>
                        <th className="col-cont">
                          <p>שם משתמש</p>
                        </th>
                        <th className="col-cont">
                          <p>סיסמה</p>
                        </th>
                        <th className="col-cont">
                          <p>מאסטר</p>
                        </th>
                    </tr>
                    {this.state.tempItems && this.state.tempItems.length ? this.state.tempItems.map((element, index) => {
                      let docType = '';
                      let docAllowed = true;
                    
                      if( ( docAllowed == true) ){
                       
                        return(
                          
                            <tr key={index} className={"item"} id={'docRow_' + element.Id} onClick={()=> this.openAgentPop(element)}>
                                <th className="col-cont sticky-col">
                                  <p className='AccountKey no-margin'>{element.Name}</p>
                                </th>
                                <th className="col-cont sticky-col">
                                  <p> {element.ExId}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.Mail}</p>
                                </th>
                                <th className="col-cont">
                                  <p>{element.Password}</p>
                                </th>
                               
                                <th className="col-cont col-approved">
                                  {element.OrdStatus != 'Draft' ? 
                                  <>
                                    {!element.Super ? 
                                      <p className='Waiting'>{'רגיל'}</p>
                                    :
                                      <p className='Active'>{'מנהל'}</p>
                                    }
                                  </>
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

            {this.state.tempItems && this.state.tempItems.length && this.props && this.state.paginateObj && Object.keys(this.state.paginateObj).length ?
									<ClientPagination paginateObj={this.state.paginateObj} headProps={this.props.match.params}
									            headLocation={this.props.location.search} lang={this.props.state.lang} urlNav='/docsHistory/'/>
						: null}
          
    			</div>
        </div>
			</div>
		)
	}
}
