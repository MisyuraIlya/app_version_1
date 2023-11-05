import React, { Component, Fragment } from 'react';
import YouTube from 'react-youtube';
import MyCropper from "../tools/MyCropper";
import SweetAlert from 'sweetalert2';
import BreadCrumbs from "../tools/BreadCrumbs";
import FilterBySlag from '../notifications/FilterBySlag';

const opts = {
	height: '200',
	width: '100%',
	playerVars: {
		autoplay: 0
	}
};
const groups = [
	{
		Id: 1,
		Title: 'כל המשתמשים'
	}/*,
	{
		Id: 2,
		Title: 'כל הלקוחות העסקיים'
	},
	{
		Id: 3,
    Title: 'כל משתמשי החנות הרגילים'
	}*/
]
const priceFor = [
	{
		Id: 1,
		Title: 'מניקור - פדיקור',
		Value: 20
	},
	{
		Id: 2,
		Title: 'איפור',
		Value: 30
	},
	{
		Id: 3,
		Title: 'קוסמטיקה',
		Value: 40
	},
	{
		Id: 4,
		Title: 'ספר',
		Value: 50
	}
];

export default class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			item: {},
			itemToSend: {},
			preload: false,
			courses: [],
			coursesRes: [],
			sendMobPush: false,
			slagAllUsers: false,
			slagPriceList: false,
			slagUserExId: false,
			slagName: false,
			slagAgent: false,
			onlyAgent: false,
			type:'',
			selected:null

		}
		this.getItems = this.getItems.bind(this);
		this.addItem = this.addItem.bind(this);
		this.returnDate = this.returnDate.bind(this);
		this.uploadImg = this.uploadImg.bind(this);
		this.setPreload = this.setPreload.bind(this);
		this.unsetPreload = this.unsetPreload.bind(this);
		this.save = this.save.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}
	componentDidMount() {
		this.getItems();
		setTimeout(() => { window.scrollTo(0, 0) }, 100);
	}
	componentWillUpdate(nextProps, nextState) { }
	componentWillUnmount() { }

	sendNotify = async (notify) => {
		let items = this.state.items;
		items.find(x => x.Id == notify.Id).Public = 1;
		this.setState({ items });

		let val = {
			itemId: notify.Id,
			paramName: 'Public',
			value: 1,
			sendMobPush: this.state.sendMobPush,
			siteURL: entry
		};


		const valAjax = {
			funcName: 'editItem',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
			val: val
		};

		try {
			const data = await this.props.ajax(valAjax);

			SweetAlert({
				title: 'ההודעה נרשמה בהצלחה.',
				type: 'success',
				showConfirmButton: false,
				timer: 4000
			}).catch(SweetAlert.noop);
			this.setState({
				item: {},
				itemToSend: {}
			})

		} catch (err) {
			console.log('connection error order');
			//this.orderError();
		}


	}
	clone = async (notify) => {
		this.setPreload();


		const valAjax = {
			funcName: 'cloneItem',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
			val: notify

		};

		try {
			const data = await this.props.ajax(valAjax);

			this.setState({
				items: data.Notifications,
				item: {},
				itemToSend: {}
			});
			this.unsetPreload();
		} catch (err) {
			console.log('connection error order');
			this.unsetPreload();

		}

	}
	deleteItem = async (id) => {
		SweetAlert({
			title: 'האם אתה בטוח?',
			text: 'האם ברצונך למחוק פריט זה? לא תוכל לשחזר זאת!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#22b09a',
			cancelButtonColor: '#d80028',
			confirmButtonText: 'מחק',
			cancelButtonText: 'בטל'
		}).then(function (id, res) {
			if (res.value) {
				let items = this.state.items.filter(item => item.Id != id);
				this.setState({ items });

				const val = {
					itemId: id,
					paramName: 'Unpublished',
					value: 1
				};
				const valAjax = {
					funcName: 'editItem',
					point: 'new-api/notification',
					token: localStorage.token,
					role: localStorage.role,
					val: val
				};

				this.deleteItemFunc(valAjax);

			}
		}.bind(this, id)).catch(SweetAlert.noop);
	}

	deleteItemFunc = async (valAjax) => {
		try {
			const data = await this.props.ajax(valAjax);

			this.setState({
				item: {},
				itemToSend: {}
			});
		} catch (err) {
			console.log('connection error order');
		}

	}
	isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	clearSearch() {
		this.setState({ coursesRes: [] });
		$('#courseSerch')[0].value = "";
	}



	save() {
		this.setState({ item: {} });
	}

	selectToEdit(item) {
		this.setState({ item, coursesRes: [], itemToSend: {} });
	}

	prepareToSend(itemToSend) {
		this.setState({ itemToSend, coursesRes: [], item: {} });
	}

	sendTo = async (elementId, groupId) => {
		let items = this.state.items;
		items.find(x => x.Id == elementId).SendTo = groupId;
		if (groupId == 1) {
			items.find(x => x.Id == elementId).CourseId = null;
			items.find(x => x.Id == elementId).PriceFor = null;
		}
		this.setState({ items });


		const valAjax = {
			funcName: 'editItem',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
			itemId: elementId,
			paramName: 'SendTo',
			value: groupId
		};

		try {
			const data = await this.props.ajax(valAjax);

		} catch (err) {
			console.log('connection error order');
		}

	}

	updateItem(id, paramName, e) {
		let items = this.state.items;
		items.find(x => x.Id == id)[paramName] = e.target.value;
		this.setState({ items });
	}
	editItem = async (id, paramName, e) => {
		const val = {
			itemId: id,
			paramName: paramName,
			value: e.target.value
		};

		const valAjax = {
			funcName: 'editItem',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
			val: val
		};


		try {
			const data = await this.props.ajax(valAjax);

		} catch (err) {
			console.log('connection error order');
		}
	}

	uploadImg = async (data) => {
		const valAjax = {
			funcName: 'uploadImg',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
			folder: data.folder,
			fileName: data.itemId + ".jpg",
			img: data.img,
			itemId: data.itemId,
			paramName: data.paramName
		};


		try {
			const d = await this.props.ajax(valAjax);
			if (d.result == "success") {

				let dateNew = new Date;
				dateNew = dateNew.toLocaleTimeString().slice(0, -3);
				let items = this.state.items;
				items.find(x => x.Id == valAjax.itemId)[valAjax.paramName] = valAjax.fileName + "?" + dateNew;

				this.setState({ items });
				this.unsetPreload();
			}
		} catch (err) {
			console.log('connection error upload');
			this.unsetPreload();
		}

	}

	setPreload() {
		this.setState({ preload: true });
	}

	unsetPreload() {
		this.setState({ preload: false });
	}

	addItem = async () => {
		let val = {
			token: localStorage.token,
			role: localStorage.role,
			funcName: 'addItem'
		};

		const valAjax = {
			funcName: 'addItem',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
		};

		try {
			const data = await this.props.ajax(valAjax);

			let items = this.state.items;
			items.push(data);
			items.sort((a, b) => b.Id - a.Id);
			this.setState({
				items,
				item: data,
				itemToSend: {}
			});

		} catch (err) {
			console.log('connection error order');
		}
	}

	getItems = async () => {
		let val = {
			token: localStorage.token,
			role: localStorage.role,
			funcName: 'viewItems'
		};

		const valAjax = {
			funcName: 'viewItems',
			point: 'new-api/notification',
			token: localStorage.token,
			role: localStorage.role,
		};

		try {
			const data = await this.props.ajax(valAjax);

			this.setState({
				items: JSON.parse(data.items).Notifications
			});
		} catch (err) {
			console.log('connection error order');
		}
	}

	returnDate(val) {
		let dateToReturn = "";
		let nDate = new Date;
		let d = nDate.getDate();
		let m = nDate.getMonth() + 1;
		let y = nDate.getFullYear();
		let date = d + "-" + m + "-" + y;

		let elementDate = val.split(' | ');

		if (elementDate[0] == date) {
			dateToReturn = elementDate[1];
		} else {
			dateToReturn = elementDate[0];
		}

		return dateToReturn;
	}

	handleSlags(type) {
		if(type == 'all'){
			this.setState({slagAllUsers: true, slagPriceList:false, slagUserExId:false, slagName:false, slagAgent:false, onlyAgent:false, type})
		} else if(type == 'PriceListBase') {
			this.setState({slagAllUsers: false, slagPriceList:true, slagUserExId:false, slagName:false, slagAgent:false, onlyAgent:false, type})
		} else if(type == 'ExId') {
			this.setState({slagAllUsers: false, slagPriceList:false, slagUserExId:true, slagName:false, slagAgent:false, onlyAgent:false, type})
		} else if(type == 'name') {
			this.setState({slagAllUsers: false, slagPriceList:false, slagUserExId:false, slagName:true, slagAgent:false, onlyAgent:false, type})
		} else if(type == 'AgentId') {
			this.setState({slagAllUsers: false, slagPriceList:false, slagUserExId:false, slagName:false, slagAgent:true, onlyAgent:false, type })
		} else if( type == 'onlyAgent') {
			this.setState({slagAllUsers: false, slagPriceList:false, slagUserExId:false, slagName:false, slagAgent:false, onlyAgent:true, type })
		}
	}

	async sendNot(element) {
		if(this.state.type) {

			let data = null

			if(this.state.type == 'all'){
				data = 'all'
			} else if(this.state.type == 'PriceListBase') {
				data = localStorage.PriceListBase ? JSON.parse(localStorage.PriceListBase) : null
			} else if(this.state.type == 'ExId') {
				data = localStorage.ExId ? JSON.parse(localStorage.ExId) : null
			} else if(this.state.type == 'AgentId') {
				data = localStorage.AgentId ? JSON.parse(localStorage.AgentId) : null
			} else if(this.state.type == 'onlyAgent') {
				data = localStorage.onlyAgent ? JSON.parse(localStorage.onlyAgent) : null
			}

			if(!data) {
				SweetAlert({
					title: 'אין נתונים לשליחה',
					type: 'error',
					showConfirmButton: false,
					timer: 4000
				})
				return null;
			}
			try {
				let val = {
					notificationId: element.Id,
					slag: this.state.type,
					slagValue: data
				}
	
				let valAjax = {
					point: 'new_app/index',
					classPoint:'Notifications',
					funcName: 'SendPush',
					val:val
				}
	
				const response = await this.props.ajax(valAjax)
				if(response.status === 'success'){
					SweetAlert({
						title: 'ההודעה נשלחה בהצלחה.',
						type: 'success',
						showConfirmButton: false,
						timer: 4000
					})

					this.setState({
						item: {},
						itemToSend: {}
					})
					this.getItems();
				}
			} catch(e) {
				console.log('error fetch by slag',e)
			} finally {
				setLoading(false)
			}
		} else {
			SweetAlert({
				title: 'אנא בחר מהרשימה',
				type: 'error',
				showConfirmButton: false,
				timer: 4000
			})
		}



	}

	render() {
		let breadCrumbsNav=[];
		let breadObject ={Title: 'הודעות פרסומיות',TitleEng: 'Profile', Link:"" + this.props.state.lang};
		breadCrumbsNav.push(breadObject);
		let lang = this.props.state.lang;
		return (
			<div className="page-container notification">
				{this.state.preload ?
					<div className="spinner-wrapper">
						<div className="spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
					</div>
					: null}

				<div className="container">
					<BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''} lang={this.props.state.lang}/>
					<div className="flex-container">
						<div className="add-mobile">
							<button onClick={() => this.addItem()}>
								<span className="material-symbols-outlined">add</span>
								<span>צור הודעה חדשה</span>
							</button>
						</div>
						<div className={Object.keys(this.state.item).length ? "col-lg-8 right-side hide" : "col-lg-8 right-side"}>
							<div className="items">
								{this.state.items.map((element, index) => {
									let sendGrp;
									if (element.SendTo == 1) {
										sendGrp = 'B2B2C';
									} else if (element.SendTo == 2) {
										sendGrp = 'B2B';
									} else if (element.SendTo == 3) {
										sendGrp = 'B2C';
									}
									return (
										<div key={index} className={element.Id == this.state.itemToSend.Id || element.Id == this.state.item.Id ? "item active" : "item"}>
											<div className="flex-container">
												<div className="col-lg-1 img">
													<div className="wr">
														{element.Img ?
															<img src={globalFileServer + 'notifications/' + element.Img} />
															:
															<img src={globalFileServer + 'placeholder.jpg'} />
														}
													</div>
												</div>
												<div className="col-lg-3 title">
													<div className="wr">
														<p>{element.Title ? element.Title : "כותרת ההודעה"}</p>
													</div>
												</div>
												<div className="col-lg-3 description">
													<div className="wr">
														<p>{element.Description ? (element.Description.length > 30 ? element.Description.substring(0, 30) + '...' : element.Description) : "מלל הודעה"}</p>
													</div>
												</div>
												<div className="col-lg-1 description">
													<div className="wr">
														{/*
														<p>{sendGrp}</p>
                            */}
													</div>
												</div>
												<div className="col-lg-2 date">
													<div className="wr">
														<p>{this.returnDate(element.Date)}</p>
													</div>
												</div>
												<div className="col-lg-2 actions-cont">
													<div className="wr actions">
														<div onClick={this.deleteItem.bind(this, element.Id)}>
															<span className="material-symbols-outlined">delete</span>
														</div>
														
														{element.Title && element.Description ?
															<div onClick={this.clone.bind(this, element)}>
																<span className="material-symbols-outlined">content_copy</span>
															</div>
															: null}
														{!element.Public ?
															<Fragment>
																<div onClick={this.selectToEdit.bind(this, element)}>
																	<span className="material-symbols-outlined">edit</span>
																</div>
																{element.Title && element.Description ?
																	<div>
																		{Object.keys(this.state.itemToSend).length && this.state.itemToSend.Id == element.Id ?
																			<span onClick={() => this.setState({ itemToSend: {} })} className="material-symbols-outlined">close</span>
																			:
																			<span onClick={this.prepareToSend.bind(this, element)} className="material-symbols-outlined">send</span>
																		}
																	</div>
																	: null}
															</Fragment>
															: null}
													</div>
												</div>
											</div>
											{element.Id == this.state.itemToSend.Id ?
												<div className="select-group">
													<h2>בחר מרשימה</h2>
													<div className="select-group-wrapper">
														{element.SendTo !== 5 && element.SendTo !== 6 ?
															<div>
																{/* {groups.map((el, ind) => {
																	return (
																		<div key={ind} className="option">
																			<input
																				type="radio"
																				id={"option_" + element.Id + "_" + el.Id}
																				value={el.Title}
																				checked={el.Id == element.SendTo}
																				onChange={this.sendTo.bind(this, element.Id, el.Id)}
																			/>
																			<label htmlFor={"option_" + element.Id + "_" + el.Id}>{el.Title}</label>
																		</div>
																	);
																})} */}
																<div className='flex-container' style={{padding:'20px'}}>
																	<div className='col-lg-2 option'>
																		<input
																			type="radio"
																			checked={this.state.slagAllUsers}
																			onClick={() => this.handleSlags('all')}
																		/>
																		<label>כל המשתמשים</label>
																	</div>	
																	<div className='col-lg-10'>
																	</div>	
																</div>	
																<div className='flex-container' style={{padding:'20px'}}>
																	<div className='col-lg-2 option'>
																		<input
																			type="radio"
																			checked={this.state.slagPriceList}
																			onClick={() => this.handleSlags('PriceListBase')}
																		/>
																		<label>לקוחות לפי קוד מיון</label>
																	</div>	
																	<div className='col-lg-10'>
																		<FilterBySlag slag={'PriceListBase'} isTableUser={true}/>
																	</div>	
																</div>	
																<div className='flex-container' style={{padding:'20px'}}>
																	<div className='col-lg-2 option'>
																		<input
																			type="radio"
																			checked={this.state.slagUserExId}
																			onClick={() => this.handleSlags('ExId')}
																		/>
																		<label>לקוחות לפי מספר לקוח:</label>
																	</div>	
																	<div className='col-lg-10'>
																		<FilterBySlag slag={'ExId'} isTableUser={true} />
																	</div>	
																</div>	
																{/* <div className='flex-container' style={{padding:'20px'}}>
																	<div className='col-lg-2 option'>
																		<input
																			type="radio"
																			checked={this.state.slagName}
																			onClick={() => this.setState({slagName: !this.state.slagName})}
																		/>
																		<label>לפי שם לקוח:</label>
																	</div>	
																	<div className='col-lg-10'>
																		<FilterBySlag slag={'Name'}/>
																	</div>	
																</div>	 */}
																<div className='flex-container' style={{padding:'20px'}}>
																	<div className='col-lg-2 option'>
																		<input
																			type="radio"
																			checked={this.state.slagAgent}
																			onClick={() => this.handleSlags('AgentId')}
																		/>
																		<label>לקוחות משוייכים לסוכן</label>
																	</div>	
																	<div className='col-lg-10'>
																		<FilterBySlag slag={'AgentId'} isTableUser={true}/>
																	</div>	
																</div>	

																<div className='flex-container' style={{padding:'20px'}}>
																	<div className='col-lg-2 option'>
																		<input
																			type="radio"
																			checked={this.state.onlyAgent}
																			onClick={() => this.handleSlags('onlyAgent')}
																		/>
																		<label>סוכנים לפי שם סוכן</label>
																	</div>	
																	<div className='col-lg-10'>
																		<FilterBySlag slag={'onlyAgent'} />
																	</div>	
																</div>	

																<div className="push-wrapp">
																	<div className="flex-container">
																		{/* <div className="col-lg-3">

																			{this.state.sendMobPush ?
																				<div onClick={() => this.setState({ sendMobPush: !this.state.sendMobPush })} className="input active">
																					<img src={globalFileServer + 'icons/doneBlack.svg'} />
																				</div>
																				:
																				<div onClick={() => this.setState({ sendMobPush: !this.state.sendMobPush })} className="input"></div>
																			}
																		</div> */}
																		{/* <div className="col-lg-9">
																			<p>שלח התראה לנייד</p>
																		</div> */}
																	</div>
																</div>
																<button 
																// onClick={this.sendNotify.bind(this, element)}
																className={(this.state.onlyAgent || this.state.slagAgent || this.state.slagUserExId || this.state.slagPriceList || this.state.slagAllUsers) ? '' : 'buttonDisabled'}
																onClick={() => this.sendNot(element)}
																>
																	<span>שלח</span>
																</button>
															</div>
															: null}
													</div>


												</div>
												: null}
										</div>
									);
								})}
							</div>
						</div>
						<div className="col-lg-4 left-side">
							{Object.keys(this.state.item).length ? this.state.items.map((element, index) => {
								if (this.state.item.Id == element.Id) {
									return (
										<div key={index} className={this.state.item.Id == element.Id ? "wrapper editing active" : "wrapper editing"}>
											<div className="inputs">
												<input
													type="text"
													placeholder='כותרת ההודעה'
													value={element.Title ? element.Title : ""}
													onChange={this.updateItem.bind(this, element.Id, 'Title')}
													onBlur={this.editItem.bind(this, element.Id, 'Title')}
												/>
												<textarea
													placeholder='מלל הודעה'
													value={element.Description ? element.Description : ""}
													onChange={this.updateItem.bind(this, element.Id, 'Description')}
													onBlur={this.editItem.bind(this, element.Id, 'Description')}
												/>
												{/*	<input
													type="text"
													placeholder='קישור'
													value={element.Link ? element.Link : ""}
													onChange={this.updateItem.bind(this, element.Id, 'Link')}
													onBlur={this.editItem.bind(this, element.Id, 'Link')}
												/>
												<input
													type="text"
													placeholder='YouTube video id'
													value={element.Video ? element.Video : ""}
													onChange={this.updateItem.bind(this, element.Id, 'Video')}
													onBlur={this.editItem.bind(this, element.Id, 'Video')}
												/>*/}
												{element.Video ?
													<YouTube
														videoId={element.Video}
														opts={opts}
													/>
													: null}
												<div className="upload-img">
													<img
														className="main-img"
														src={element.Img ? globalFileServer + "notifications/" + element.Img : globalFileServer + "placeholder.jpg"}
														onLoad={() => this.setState({ preload: false })}
													/>
													<MyCropper
														aspectRatio={16 / 9}
														itemId={element.Id}
														folder="notifications"
														dist="Img"
														appId={this.props.state.appId} {...this}
													/>

												</div>
											</div>
											<div className="save">
												<button className="cancel-post" onClick={this.save}>
													<span>בטל</span>
												</button>
												<button className="save-post" onClick={this.save}>
													<span>שמור</span>
												</button>
											</div>
										</div>
									);
								}
							}) :
								<div className="wrapper add">
									<button onClick={this.addItem}>
										<span className="img material-symbols-outlined">add</span>
										<span>חדש</span>
									</button>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
