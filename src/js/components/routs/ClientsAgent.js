import ReactDOM from "react-dom";
import React, {Component, Fragment, useState, useEffect, useContext} from 'react';
import {NavLink} from "react-router-dom";
import ClientPagination from "../tools/ClientPagination";
import SweetAlert from 'sweetalert2';

let timeoutId;

export default class ClientsAgent extends Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			preload: false,
      		search:"",
		}

	}
	componentDidMount() {
		let searchParam = this.props.history.location.search;
		let searchWord = '';
		if(searchParam!=''){
			searchWord = searchParam.replace("?search=", "");
			searchWord = decodeURI(searchWord)
			this.setState({search: searchWord })
		}

		this.getUsers(this.props.match.params, searchWord, false);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.page != nextProps.match.params.page) {
			window.scrollTo(0, 0);
			this.getUsers(nextProps.match.params, this.state.search, false);
		}
	}


	onChange(event, { newValue }) {
		this.setState({	value: newValue	});
	}

	getUsers = async(param, searchWord, changePath) => {
		this.setState({preload: true});

		if(changePath){
			let pathname = '/ClientsAgent/1/'+this.props.state.lang;
			this.props.history.push(pathname + '?search=' + searchWord);
			this.props.history.location.search = pathname + '?search=' + searchWord;
			param.page = '1';
		}
		
		
		let user = false;

		let searchParamCheck = '';
		if (searchWord == '') {
			searchParamCheck = false;
		} else {
			searchParamCheck = searchWord;
		}

		let val = {
			'page': param.page,
			'action': 'SearchUsersAgent',
			'searchParam': searchParamCheck ? searchParamCheck : false,
			'token': localStorage.agentToken

		};
	
		localStorage.role ? val.admin = true : null;
		localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;

		const valAjax = {
			funcName: 'SearchUsersAgent',
			point: 'users',
			val: val,

		};
		try {
			const data = await this.props.ajax(valAjax);
			let encodeData = JSON.parse(data);
			if(encodeData.result == 'success'){
				this.setState({users: encodeData.users, paginateObj:encodeData.paginateObj});

			}

			this.setState({preload: false});
		} catch (err) {
			console.log('connection error GetSales');
			this.setState({preload: false});
		}
		
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

			timeoutId = setTimeout(() => this.getUsers(this.props.match.params, value, true), 500);
		}
   
   
	 }
   
	 clearSearch = () =>{
		let pathname = '/ClientsAgent/1/' + this.props.state.lang;
		this.props.history.push(pathname);
		this.props.history.location.search = '';
		this.setState({search:''})
		this.getUsers(this.props.match.params, '', false);
	 }

	 selectUser = (user) =>{
		if(localStorage.products){

			SweetAlert({
			title: 'האם אתה בטוח?',
			text: 'כל המוצרים בעגלת הקניות יימחקו',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#22b09a',
			cancelButtonColor: '#d80028',
			confirmButtonText: 'אשר',
			cancelButtonText: 'בטל'
			}).then(function (res) {
				if (res.value) {
					localStorage.setItem('selectedMode', 0);
					this.props.setSelectedMode();
					this.props.simpleClearCart();
					this.selectUserFinalFunc(user);
				}
			}.bind(this)).catch(SweetAlert.noop);
		}else{
			this.selectUserFinalFunc(user);
		}
	 }
	 selectUserFinalFunc = (user) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('type', user.Type);
		localStorage.setItem('name', user.Name);
		localStorage.setItem('id', user.Id);
		localStorage.setItem('exId', user.ExId);
		this.props.AgentLog("in");
		this.props.history.push('/profile/' + this.props.state.lang);
	 }
	render(){
		let lang = this.props.state.lang;

		return (
			<div className="page-container ClientsAgent">
				{this.state.preload ?
					<div className="spinner-wrapper">
						<div className="spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
					</div>
				: null}
				<div className="clients-wrapper">
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
					<div className="clientsAgent-Wrapper">
						<div className="clientsAgent-Heading">
								<div className="flex-container">
										<div className="col-lg-3">
												<div className="wrapp">
														<p>שם לקוח</p>
												</div>
										</div>
										<div className="col-lg-2">
												<div className="wrapp">
														<p>מס' לקוח</p>
												</div>
										</div>
										<div className="col-lg-2">
												<div className="wrapp">
														<p>ח.פ/ע.מ</p>
												</div>
										</div>
										<div className="col-lg-2">
												<div className="wrapp">
														<p>כתובת</p>
												</div>
										</div>
										<div className="col-lg-2">
												<div className="wrapp">
														<p>עיר</p>
												</div>
										</div>
										<div className="col-lg-1">
												<div className="wrapp">
														<p>סטאטוס</p>
												</div>
										</div>

								</div>
						</div>
						<div className="clientsAgentBody">

								{this.state.users.length ? this.state.users.map((element, index) => {
									return (
										<div key={index} className="flex-container user-row" onClick={()=> this.selectUser(element)}>
											<div className="col-lg-3 num-col col-cls">
												<div className="wrapp">
													<p>{element.Name}</p>
												</div>
											</div>
											<div className="col-lg-2 name-col col-cls">
												<div className="wrapp">
													<p>{'# ' + element.ExId}</p>
												</div>
											</div>
											<div className="col-lg-2 hp-col col-cls">
												<div className="wrapp">
													<p>{element.Hp ? element.Hp : '-'}</p>

												</div>
											</div>
											<div className="col-lg-2 type-col col-cls">
												<div className="wrapp">
													<p>{element.Address ? element.Address : '-'}</p>

												</div>
											</div>
											<div className="col-lg-2 type-col col-cls">
												<div className="wrapp">
													<p>{element.Town ? element.Town : '-'}</p>
												</div>
											</div>

											<div className="col-lg-1 status col-cls">
												<div className="wrapp">
													{element.Blocked ? <p className='Blocked'>חסום</p>:null}
													{!element.Blocked ? <p className='Active'>פעיל</p>:null}
												</div>
											</div>
										</div>
									)
								}) : null}
							
						</div>
					</div>
					{this.props && this.state.paginateObj && Object.keys(this.state.paginateObj).length ?
									<ClientPagination paginateObj={this.state.paginateObj} headProps={this.props.match.params}
									            headLocation={this.props.location.search} lang={lang} urlNav='/ClientsAgent/'/>
									: null}
				</div>
			</div>
		)
	}
}
