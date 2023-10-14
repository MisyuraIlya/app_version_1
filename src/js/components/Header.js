import ReactDOM from "react-dom";
import React, {Component, Fragment, useState, useEffect, useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import UserEntry from './header/UserEntry';
import LiveChat from './header/LiveChat';
import {Helmet} from "react-helmet";
import UserContext from '../UserContext';
import CategorySlider from './header/CategorySliderOverflow';
import SiteNavEcare from './header/SiteNav';
import ProductPopUp from "./routs/productPage/ProductPopUp";
import ClosedForHolidays from './routs/modals/ClosedForHolidays';
import AgentActionsPop from './routs/modals/AgentActionsPop';
import NotificationIcon from "../modules/PushNotificationModule/components/NotificationIcon/NotificationIcon";
import { getCurrentUserId } from "../modules/Auth/helpers/getCurrentUserId";
import { removeFromStorage } from "../modules/Auth/helpers/auth.helper";
import CircleCount from "../modules/PushNotificationModule/components/CircleCount/CircleCount";
import CartLength from "./CartLength";
import { CatalogServices } from "../modules/Catalog/services/catalog.services";
import CatalogSearch from "../modules/Catalog/components/CatalogSearch/CatalogSearch";

let timeoutId;


const LangMenu = params => {
	const [preload, setPreload] = useState('');
	const app = useContext(UserContext);
	const history = useHistory();
	const [langActive, setLangActive] = useState(false);


	useEffect(() => {

	}, []);

	const selectLang = lang => {
		let replace = app.state.lang;

		app.selectLang(lang);
		setLangActive(false)
		let path = history.location.pathname.split('/');
		let foundIndex = path.findIndex(x => x == replace);

		if (foundIndex == -1) {
			if (path[0] == "") {
				path = ['home', lang];
			} else {
				path = [path[0], lang];
			}
		} else {
			path[foundIndex] = lang;
		}
		history.push(path.join('/'));
		if (window.outerWidth < 1050) {
			location.reload();
		}
	}

	return (
		<li className="lang-li">
			<div className="language-cont">
				<div className="lang-visible-cont" onClick={() => setLangActive(!langActive)}>
					<span className="material-symbols-outlined">language</span>
				</div>
				<div className={langActive ? "lang-select-cont active" : "lang-select-cont"}>
					<img src={globalFileServer + 'icons/eng.svg'} onClick={() => selectLang('en')} alt="logo"/>
					<img src={globalFileServer + 'icons/heb.svg'} onClick={() => selectLang("he")} alt="logo"/ >
				</div>
			</div>
		</li>
);

}

const MyProfileMenu = params =>
	{
		const [preload, setPreload] = useState('');
		const app = useContext(UserContext);
		const history = useHistory();


		useEffect(() => {

		}, []);


		const close = () => {
			const menu = document.getElementById('my-profile-cont');
			menu.classList.add('close');
			setTimeout(() => {
				menu.classList.remove('close');
			}, 500);
		}

		const closeAndOpenActions = () =>{
			close();
			params.openAgentActionsPop();
		}
		const beforeLogOut = () => {
			if (localStorage.role == "admin") {
				app.localStorageClear();
				removeFromStorage()
			} else if (localStorage.agent && !localStorage.user) {
				app.signOut('agent');
				removeFromStorage()
			} else if (localStorage.agent && localStorage.user) {

				history.push('/agentDashboard/' + JSON.parse(localStorage.agent).Id);
				app.signOut("agentForUser");
				
			} else {
				app.signOut('user');
				removeFromStorage()
			}
		}
		let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null
		return (
			<div id="MyProfileMenu-cont" className="MyProfileMenu-cont">
				<div className="MyProfileMenu-subcont">
					<div className="userDet-main-cont">
						<div className="userDet-sub-cont">
							{localStorage.role ?
								<>
									<p>{'אדמין'}</p>
									<p className='line'></p>
								</>
								: null}
							{localStorage.agent ?
								<>
									<p className="profile-cube-title">סוכן</p>
									<p>{JSON.parse(localStorage.agent).Name}</p>
								</>
								: null}
							{user ?
								<div className="userDet-client-cont">
									<p className="profile-cube-title">לקוח</p>

									<p>{user.Name}</p>
									<p>{user.ExId}</p>
									{app.state.selectedMode ? 
										<>
											{app.state.selectedMode==1 ?
												<p className="actions-title">{"הזמנה"}</p>
											:null}
											{app.state.selectedMode==2 ?
												<p className="actions-title">{"ה.מחיר"}</p>
											:null}
											{app.state.selectedMode==3 ?
												<p className="actions-title" >{"החזרה"}</p>
											:null}
										</>
									:null}
									
								</div>
							: null}
						</div>

						<div className="userDet-sub-cont">
							{localStorage.agent && localStorage.user ? 
								<div className="btn-cont col">
									<div className="logOutCont agent-actions" onClick={() => closeAndOpenActions()}>
										<p>{app.state.lang == 'he' ? 'פעולות' : 'Log Out'}</p>
									</div>
								</div>
							:null}
							<div className="btn-cont col">
								<div className="logOutCont" onClick={() => beforeLogOut()}>
									<p>{localStorage.user ? 'התנתק מלקוח' : 'התנתק'}</p>
								</div>
							</div>
						</div>
					</div>
					{localStorage.user ?
						<>
							<NavLink to={'/profile/' + app.state.lang}>
								<div className="MyProfile-row" onClick={() => close()}>
									<span className="material-symbols-outlined search-img">{'person'}</span>
									<p>{app.state.lang == 'he' ? "אזור אישי" : "Account"}</p>
								</div>
							</NavLink>
							{localStorage.user && app.state.profileObj ? app.state.profileObj.map((item, key) => {
								if(!item.OnlyAgent){
									return (
										<NavLink key={key} to={item.Link + app.state.lang}>
											<div key={key} className="MyProfile-row" onClick={() => close()}>
												<span className="material-symbols-outlined search-img">{item.Img}</span>
												<p>{app.state.lang == 'he' ? item.Title : item.TitleEng}</p>
											</div>
										</NavLink>
									)
								}
							}) : null}
						</>
						: null}
				</div>
			</div>
		);


	}
const SearchHook= params =>
	{
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
			if (word == "") {
				goInactive(word);
			}
		}

		const setMode = mode => {
			setSearchMode(mode);
			setSearch("");
		}

		const searchCheckEnter = (e) => {
			if (e.charCode == 13) {
				let url = '/category/search/0/0/0/1/0/' + params.lang + '?Search=' + e.target.value + '%26'
				params.searchPhpFunc('', searchMode)
				if (params.searchProds && params.searchProds.length) {
					params.props.history.push(url);
				}
			}
		}

		const prodPopUpFunc = (item) => {
			params.setProdPopUp(item);
		}

		const emptySearch = (item) => {
			setWord('');
			params.closeSearchMob();
		}

		return (
			<div className="search-cont-main">
				{localStorage.user || localStorage.agent || localStorage.role ? 
					<div className="search-cont">
						<div className="input">
							<input
								onChange={e => setWord(e.target.value)}
								value={search}
								type="text"
								placeholder={app.state.lang == 'he' ? "חיפוש מוצר..." : "Search"}
								onKeyPress={e => searchCheckEnter(e)}

							/>
							{search == "" ?
								<span className="material-symbols-outlined search-img">search</span>
								:
								<span className="material-symbols-outlined search-img"
									onClick={() => emptySearch()}>close</span>
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
								{params.searchProds && params.searchProds.length ? params.searchProds.map((item, key) => {
									if (key < 10) {
										return (
											<div key={key} className="searchRes-row flex-container"
												onClick={() => prodPopUpFunc(item)}>
												<div className="img-cont col-lg-3">
													{/* <img className="img"
														src={item.Img ? globalFileServer + 'products/' + item.Img : globalFileServer + 'logo.png'}
														onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}/> */}
												</div>
												<div className="content col-lg-9">
													<p className="title">{app.state.lang == 'he' ? item.Title : item.Description}</p>
													<p className="catalog">{"#" + item.CatalogNumber}</p>
													{/* {localStorage.user ?
														<p className="price">{item.Price ? "₪ " + parseFloat(item.Price).toFixed(1) : ''}</p>
														: null} */}
												</div>
											</div>
										)
									}
								}) : null}

								{params.searchProds && params.searchProds.length ?
									<div className="all-res-cont" onClick={() => params.closeSearchMob()}>
										<NavLink
											to={'/category/search/0/0/0/1/0/' + params.lang + '?Search=' + search + '%26'}
											onClick={() => params.searchPhpFunc('', searchMode)}>
											{app.state.lang == 'he' ?
												<p>{"מעבר לכל ה (" + params.searchProds.length + " ) תוצאות"}</p>
												:
												<p>{"Go to All(" + params.searchProds.length + " ) Results"}</p>
											}
										</NavLink>
									</div>
									: null}
								{!params.searchProds | !params.searchProds.length && (params.showNotFound || params.preload) ?
									<div className="all-res-cont not-found">
										<p>{app.state.lang == 'he' ? "לא נמצאו תוצאות" : 'No Results Found'}</p>
									</div>
									: null}
							</div>
							: null}
					</div>
				:null}
			</div>
		);
	}

const SiteNav = params =>
	{
		const [active, setActive] = useState(false);
		const [parent, setParent] = useState(false);
		const [activeHard, setActiveHard] = useState(false);
		const [parentHard, setParentHard] = useState(false);
		const [userEntry, setUserEntry] = useState(false);
		const [langActive, setLangActive] = useState(false);


		const app = useContext(UserContext);
		const history = useHistory();

		useEffect(() => {
			let el = document.getElementById('sub_categories');
			if (el) el.scrollTop = 0;
		}, [parent]);

		const getTitle = () => {
			let current = params.items.find(item => item.Id == parent);
			return current.Title;
		}

		const getSecondLavel = () => {
			let secondLavel = params.items.filter(item => item.Lvl2ParentMyId == parent);
			// /debugger;
			return secondLavel;
		}

		const closeNav = () => {
			setActive(false);
			setParent(false);
			setParentHard(false);
			if (params.active) params.close();
		}

		const setParentToHard = id => {
			if (!parentHard) {
				setParent(id);
				setParentHard(id);
			} else {
				if (parent == id) {
					setParent(false);
					setParentHard(false);
				} else {
					setParent(id);
					setParentHard(id);
				}
			}
		}

		const leaveCategory = () => {
			if (!parentHard) {
				setParent(false);
			}

		}

		const leaveSubCategory = () => {
			if (!parentHard) {
				setParent(false);
				setActive(false);
			}
		}

		const closeAll = () => {
			setParent(false);
			setActive(false);
			setParentHard(false);
		}

		const closeSubOnMobile = () => {
			if (window.innerWidth < 1050) {
				setParent(false);
				setParentHard(false);
			}
		}

		const close = () => {
			setUserEntry(false);
		}

		const selectLang = lang => {
			debugger;
			let replace = app.state.lang;

			app.selectLang(lang);
			setLangActive(false)

			let path = history.location.pathname.split('/');
			let foundIndex = path.findIndex(x => x == replace);

			if (foundIndex == -1) {
				if (path[0] == "") {
					path = ['', lang];
				} else {
					path = [path[0], lang];
				}
			} else {
				path[foundIndex] = lang;
			}
			debugger;
			history.push(path.join('/'));


		}
		const aboutContClose = () => {

			$(".about-cont-main").css({'visibility':"hidden"});
			setTimeout(() => $(".about-cont-main").css({'visibility':"visible"}), 300);

		}


		let categories = params.categories;
		let nav = app.state.nav.filter(item => item.Lang == app.state.lang);
		return (
			<nav className={params.active ? "site-nav active" : "site-nav"}>

				<div className="flex-container">
					<div className="reg-menu">
						<ul>
							<li>
								<div className="img" style={{cursor:'pointer'}}>
									<NavLink to={'/' + app.state.lang}>
										<img src={globalFileServer + 'logo.png'} alt=""/>
									</NavLink>
								</div>
							</li>
							{getCurrentUserId() &&
								<>
							<li>
								<div className="myCenter" onClick={() => history.push('/docsNew/1/he')} style={{cursor:'pointer'}}>
									<div style={{display:'flex', justifyContent:'center'}}>
										<img src={globalFileServer + 'Purchases.png'} alt=""/>
									</div>
									<span>הזמנות</span>
								</div>
							</li>
							<li>
								<div className="myCenter" onClick={() => history.push('/docsNew/1/he')} style={{cursor:'pointer'}}>
									<div style={{display:'flex', justifyContent:'center'}}>
										<img src={globalFileServer + 'Docs.png'} alt=""/>
									</div>
									<span>מסמכים</span>
								</div>
							</li>
							<li>
								<div className="myCenter" style={{cursor:'pointer'}}>
									<div style={{display:'flex', justifyContent:'center'}}>
										<img src={globalFileServer + 'repair.png'} alt=""/>
									</div>
									<span>מעבדה</span>
								</div>
							</li>
							<li>
								<div className="myCenter" style={{cursor:'pointer'}}>
									<div style={{display:'flex', justifyContent:'center'}}>
										<img src={globalFileServer + 'Dashboard.png'} alt=""/>
									</div>
									<span>מעבדה</span>
								</div>
							</li>
								
								</>
							}

							
							{localStorage.agent ? 
								<li className="about-li-hover">
									<div className="img icon">
										<span className="material-symbols-outlined">menu</span>
									</div>
									<div className="about-cont-main">
										<div className="about-sub-cont">
											{localStorage.agent && app.state.profileObj ? app.state.profileObj.map((item, key) => {
												if(item.OnlyAgent){
													let isGo = true;
													if(item.OnlyAgentSuper && !JSON.parse(localStorage.agent).Super){
														isGo = false;
													}
													if(item.notForMisrad && JSON.parse(localStorage.agent).IsMisrad){
														isGo = false;
													}
													if(isGo){
														return (
															<div key={key} className="about-row">
																<NavLink onClick={aboutContClose} to={item.Link + app.state.lang}>
																	<span className="material-symbols-outlined">{item.Img}</span>
																	<p>{app.state.lang == 'he' ? item.Title : item.TitleEng}</p>
																</NavLink>
															</div>
														)
													}
													
												}
											}) : null}
										</div>
									</div>
								</li>
							:null}
							{/*
            				<LangMenu />
							*/}
							{userEntry ?
								<UserEntry headProps={params.headProps} close={() => close()} action={userEntry}
								           lang={app.state.lang} {...this} /> : null}

							{localStorage.user && app.state.user.Type == 2 ?
								<li onClick={() => this.setState({toggleMenu: false})}>
									<NavLink to={"/collector-step-three"}>ליקוט</NavLink>
								</li>
								: null}
						</ul>
					</div>
					{/*
  				<div className="category-menu">
            <NavLink to={'/category-page/0/0/' + app.state.lang}>
    					<h2 onMouseEnter={e => leaveCategory()} onClick={e => setActive(!active)} className={active ? "title active" : "title"}>
    						<span>{app.state.lang == "he" ? "קטלוג" : "Catalog"}</span>
    					</h2>
            </NavLink>
  					<div className={active || parent ? "parent-nav active" : "parent-nav"}>
              <div className="parent-subnav">
    						<div className="flex-container parent-cat-cont">
    							{params.items.map((element, index) => {
    								let pathname = location.pathname.split('/');
    								let main = false;
    								if (pathname.length == 4) {
    									let currentActive = params.items.filter(item => item.Id == pathname[2]);
    									if (currentActive.length) main = currentActive[0].ParentId;
    								}
    								if (element.LvlNumber == '1') {
    									return (
    										<div className="col-lg-2 col-cont" key={index}>
    											<NavLink to={"/category-page/" + element.Id + "/0/0/" + app.state.lang}>
                            <img src={element.Img ? globalFileServer + 'categories/' + element.Img : globalFileServer + "placeholder.jpg"} />
                            <h3>{element.Title}</h3>
                          </NavLink>
    										</div>
    									);
    								}
    							})}
    						</div>
              </div>
  					</div>
            {parent ? <>
      				<div onClick={e => closeAll()} className="outline"></div>
      				<div onMouseLeave={e => leaveSubCategory()} className="sub-categories">
      					<div id="sub_categories" className="wrapper">
      						<h1 onClick={e => closeSubOnMobile()}>
      							<span>{getTitle()}</span>
      							<img src={globalFileServer + 'icons/back-dark.svg'} />
      						</h1>
      						<div onClick={e => closeNav()} className="wrapp">
      							{getSecondLavel().map((element, index) => {
      								let child = params.items.filter($item => $item.Lvl3ParentMyId == element.Id);
      								let pathname = location.pathname.split('/');
      								return (
      									<div className="col" key={index}>
      										<h3 className={pathname.length == 4 && pathname[2] == element.Id ? 'active' : null}>
      											<NavLink to={"/category-page/" + parent + "/" +  element.Id + '/0/'+ app.state.lang}>{element.Title}</NavLink>
      										</h3>
      										<ul>
      											{child.map((el, ind) => {
      												return (
      													<li key={ind}>
      														<NavLink to={'/category/' + parent + "/" +  element.Id + '/' +  el.Id + "/" + app.state.lang}>{el.Title}</NavLink>
      													</li>
      												);
      											})}
      										</ul>
      									</div>
      								);
      							})}
      						</div>
      					</div>
      				</div>
      			</> : null}
  				</div>
*/}
				</div>

			</nav>
		);
	}

const Navigation = params =>
	{
		const app = useContext(UserContext);
		let nav = app.state.nav.filter(item => item.Lang == app.state.lang);
		return (
			<nav>
				<ul>
					{nav.map((element, index) => {
						return (
							<li key={index}>
								{
									<NavLink to={element.Link + app.state.lang}>{element.Title}</NavLink>
								}
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

const SelectLang = params =>
	{

		const [view, setView] = useState(false);

		const app = useContext(UserContext);

		const history = useHistory();

		const selectLang = lang => {
			let replace = app.state.lang;

			app.selectLang(lang);
			setView(false);

			//let replace = lang == 'he' ? 'en' : 'he';
			let path = history.location.pathname.split('/');
			let foundIndex = path.findIndex(x => x == replace);

			if (foundIndex == -1) {
				if (path[0] == "") {
					path = ['', lang];
				} else {
					path = [path[0], lang];

				}
				//debugger;

			} else {
				//let foundIndex = path.findIndex(x => x == replace);
				path[foundIndex] = lang;
			}
			history.push(path.join('/'));
		}

		return (
			<li className="lang">
				<p onClick={e => setView(!view)}>
					<img src={globalFileServer + 'icons/arrow-down-smoll.svg'}/>
					<span>{app.state.lang.toUpperCase()}</span>
				</p>
				{view ?
					<div className="items">
						{['he', 'en'].map((element, index) => {
							return (
								<div
									key={index}
									onClick={e => selectLang(element)}
									className={element == app.state.lang ? 'item active' : 'item'}
								>
									<span>{element.toUpperCase()}</span>
								</div>
							);
						})}
					</div>
					: null}
			</li>
		);
	}

const MobileNav = params =>
	{
		let user = localStorage.user ? JSON.parse(localStorage.user) : {};
		const [active, setActive] = useState(false);
		let userEntry = params.userEntry;
		const handleClick = funk => {
			if (funk == 1) {
				setActive(!active);
			}
		}
		const nav = [
			{
				Title: 'בית',
				Link: '/',
				Img: 'home-mob.svg'
			},
			{
				Title: 'אזור אישי',
				Link: Object.keys(user).length ? '/user-info/' + user.Id : '/user-info/0',
				Img: 'avatar.svg',
				toggleModal: false
			},
			{
				Title: 'כל המוצרים',
				Link: '/',
				Img: 'list-mob.svg',
				Categories: true,
				Funk: 1
			},
			{
				Title: 'ההזמנות שלי',
				Link: Object.keys(user).length ? '/user-info/' + user.Id : '/cart',
				Img: 'shopping-bag.svg'
			},
			{
				Title: 'עגלת קניות',
				Link: Object.keys(user).length ? '/user-cart/' + user.Id : '/user-cart/0',
				Img: 'cart.svg',
				Cart: true
			}
		];
		return (
			<Fragment>


				<SiteNav active={active} items={params.items} site={params.site} close={e => setActive(false)}/>
				<div className="mobile-nav">
					<div className="flex-container">
						{nav.map((element, index) => {
							return (
								<div key={index} className="col-g-5">
									{!element.Funk ?
										<NavLink exact={element.Link == '/' ? true : null} to={element.Link}>
											<div className="img">
												{element.Cart ? <div className="counter">
													<span>{params.products}</span>
												</div> : null}
												<img src={globalFileServer + 'icons/' + element.Img}/>
											</div>
											<p>{element.Title}</p>
										</NavLink> :
										<a onClick={e => handleClick(element.Funk)}
										   className={element.Categories ? 'cat' : null}>
											<div className="img">
												<img src={globalFileServer + 'icons/' + element.Img}/>
											</div>
											<p className={active ? 'active' : null}>{element.Title}</p>
										</a>
									}
								</div>
							);
						})}
					</div>
				</div>
			</Fragment>
		);
	}


let user;


const SubMenu = (that) => (
	<div className={that.state.showCategories ? "sub-menu flex-container active" : "sub-menu flex-container"}>
		<div className="sub-menu-big-cont">

			{that.props.state.defaults.catLevels == "1" ?
				that.props.state.categories.map((element, index) => {
					return (
						<div key={index} className="col-lg-4" onClick={() => that.toggleShowCategories()}>
							<NavLink to={"/categories/" + element.Id}
							         className={that.props.state.matchSubId == element.Id ? 'active' : null}>
								{element.Title}
							</NavLink>
						</div>
					)
				})
				:
				that.props.state.categories.map((element, index) => {
					let subCat = that.props.state.categories.filter(item => item.ParentId == element.Id);
					// console.log('yuli'+element.ParentId);
					if (!element.ParentId && subCat.length > 0) {
						return (
							<div key={index} className="sub-menu-cont" onClick={() => that.toggleShowCategories()}>
								<h3>
									<NavLink to={"/categories/" + element.Id}
									         className={that.props.state.matchSubId == element.Id ? 'active' : null}>
										{element.Title}
									</NavLink>
								</h3>
								{
									subCat.map((el, i) => {
										return (
											<NavLink
												key={i}
												onClick={() => that.toggleShowCategories()}
												to={'/category-page/' + element.Id + '/' + el.Id}>
												{el.Title}
											</NavLink>
										)
									})
								}
							</div>
						)
					}
				})
			}
		</div>

	</div>
);

export default class Header extends Component
	{
		constructor(props)
		{
			super(props);
			this.state = {
				userEntry: false,
				openChat: false,
				foundProducts: [],
				search: false,
				toggleMenu: false,
				showCategories: false,
				seo: false,
				users: [],
				chatCounter: false,
				prevPath: '/',
				nav: false,
				searchProds: [],
				selectedProd: [],
				ProductPopUp: false,
				showSearchMob: false,
				myProfileCont: false,
				agentActionsPop: false


			}
			this.close = this.close.bind(this);
			this.open = this.open.bind(this);
			this.toggleMenu = this.toggleMenu.bind(this);
			this.toggleShowCategories = this.toggleShowCategories.bind(this);
			this.getUsers = this.getUsers.bind(this);
			this.notVieWed = this.notVieWed.bind(this);
			this.inputRef = React.createRef();
			this.reset = this.reset.bind(this);
		}
		componentDidMount()
		{
			if (localStorage.user) {
				user = JSON.parse(localStorage.user)
			}
			//localStorage.role || localStorage.agent ? this.getUsers() : null;
			this.setState({prevPath: this.props.location.pathname});
		}
		componentWillReceiveProps(nextProps)
		{
			if (nextProps.location !== this.props.location) {
				this.setState({prevPath: this.props.location.pathname});
			}
			if (JSON.stringify(this.props.state.agentPriceOverwriteArr)  != JSON.stringify(nextProps.state.agentPriceOverwriteArr) && this.state.searchProds && this.state.searchProds.length){

				let products = this.reWriteProductsRecievePros(this.state.searchProds, nextProps.state.agentPriceOverwriteArr);
				this.setState({
					products
				});
			}
		}
		componentWillUpdate(nextProps, nextState)
		{
		}
		reset()
		{
			this.inputRef.current.value = "";
			this.setState({foundProducts: [], search: false, toggleMenu: false, showCategories: false});
		}


		notVieWed(items, userId)
		{
			let notVieWed;
			if (localStorage.role || localStorage.agent) {
				notVieWed = items.filter(item => !item.SendTo && !item.Viewed);
			} else {
				notVieWed = items.filter(item => item.SendTo == user.Id && !item.Viewed);
			}
			this.setState({chatCounter: notVieWed.length});
		}
		getUsers = async () => {


			const valAjax = {
				funcName: '',
				point: 'user_list_slim',
				token: localStorage.token,
				sess_id: localStorage.sessionId
			};

			try {
				const data = await this.props.ajax(valAjax);

				this.setState({users: data.Userss});

			} catch (err) {
				console.log('connection error order');
			}


		}
		toggleShowCategories()
		{
			this.setState({showCategories: !this.state.showCategories})
		}
		startSeo(seo)
		{
			if (this.state.seo) {
				this.setState({seo: false});
			} else {
				let seoClone = Object.assign({}, seo);
				this.setState({seo: seoClone});
			}
		}
		saveSeo(seo, paramName)
		{
			this.props.saveSeo(seo, paramName);
			let seoClone = this.state.seo;
			seoClone[paramName] = seo[paramName];
			this.setState({seo: seoClone});
		}
		toggleMenu()
		{
			this.setState({toggleMenu: !this.state.toggleMenu});
			if (!this.props.location.pathname.includes("category-blog") && this.props.location.pathname.includes("category") || this.props.location.pathname.includes("product")) {
				//this.setState({ showCategories: true });
			}
		}

		close()
		{
			this.setState({
				userEntry: false,
				openChat: false
			});
		}
		open()
		{
			this.setState({openChat: true});
		}
		toggleSearch()
		{
			this.props.toggleSearch(true);
			this.props.history.push("/wishList/" + this.props.state.lang);
		}
		goToWishList = () => {
			this.setState({toggleMenu: false, showCategories: false});
			this.props.toggleSearch(false);
			this.props.history.push("/wishList/" + this.props.state.lang);

		}
		beforeLogOut(user)
		{
			this.props.history.push('/');

			if (user == "admin") {
				this.props.localStorageClear();
			} else if (user == "agent") {
				this.props.signOut(user);
			} else {
				this.props.signOut(user);
			}
		}
		goBack = () => {
			if (this.state.prevPath !== '/') {
				this.props.history.goBack();
			} else {
				this.props.history.push('/');
			}
		}
		goToContact = () => {
			this.setState({toggleMenu: false, showCategories: false})

			setTimeout(() => {
				$('html, body').animate({
					scrollTop: $("#contact-footer").offset().top - 50
				}, 0);
			}, 500);
			this.props.history.push('/');
		}
		scrollUp = () => {
			window.scrollTo({top: 0, behavior: 'smooth'});
		}
		toggleNav = () => {
			this.setState({nav: !this.state.nav});
		}
		searchPhpFunc = async (value, mode) => {

			this.setState({searchString: value})

			if (value && value != "") {

				this.setState({preload: true, showNotFound: false})

				let user = false;
				localStorage.user ? user = JSON.parse(localStorage.user) : null;

				let wordArr = [];
				let split = value.split(" ");
				if (split.length && split[1] != "") {
					wordArr = split;
				} else {
					wordArr.push(value);
				}

				let val = {
					'wordArr': wordArr,
					'b2cPriceCode': this.props.state.b2cPriceCode,
					'priceNoLogin': this.props.state.priceNoLogin,
					'mode': mode,
					'lang': this.props.state.lang,
					'selectedMode': localStorage.selectedMode

				};
				user ? val.priceFor = user.Type : null;
				user ? val.priceCode = user.PriceList : null;
				user ? val.userId = user.Id : null;
				user ? val.userExtId = user.ExId : null;

				const valAjax = {
					funcName: '',
					point: 'product_searchh',
					val: val
				};

				try {
					const data = await CatalogServices.ProductSearch(value);
					this.setState({preload: false})
					let products = data.data;
					// products = this.reWriteProductsRecievePros(products, this.props.state.agentPriceOverwriteArr);

					this.setState({searchProds: products, showNotFound: true});
				} catch (err) {
					console.log('connection error docs');
					this.setState({preload: false});
				}

			} else {
				this.setState({searchProds: []});
				this.setState({preload: false, showNotFound: false})

			}
		}

		reWriteProductsRecievePros = (products, agentPriceOverwriteArr) => {

			products.map((prodItem,index1) => {
				agentPriceOverwriteArr.map((overWriteItem,index2) => {
					if(prodItem.CatalogNumber == overWriteItem.CatalogNumber){

						//prodItem.OrgPrice = prodItem.OrgPrice;
						prodItem.Price = overWriteItem.Price;
						prodItem.RePrice = true;
					}
				});
			});
			return products;
		}
		setProdPopUp = (element) => {
			this.setState({selectedProd: element, ProductPopUp: true});
		}

		closeSearchMob = () => {
			this.setState({showSearchMob: false})
		}
		setAgentActionsPop = () =>{
			this.setState({agentActionsPop: true})
		}
		closeAgentActionsPop = () =>{
			this.setState({agentActionsPop: false})
		}

		render()
		{
			let seo = this.props.state.seo.filter(item => '/' + item.Link == this.props.history.location.pathname)[0];
			const max = {Title: 70, Description: 240, Keywords: 240};
			let lang = this.props.state.lang;

			let siteMenu =
				<div className="header-right-cont col-lg-5 header-mob-right-cont">
					<ul className={this.state.showCategories ? 'to-left' : null}>
						{/* <li className="logo" onClick={() => this.setState({ toggleMenu: false, showCategories: false })}>
					<NavLink exact to="/">
						<img src={globalFileServer + 'main-logo.png'} />
					</NavLink>
				</li> */}
						<NavLink exact to="/">
							<li onClick={() => this.setState({toggleMenu: false, showCategories: false})}>
								<p>{lang == 'he' ? 'בית' : 'Home'}</p>
							</li>
						</NavLink>
						{localStorage.user || localStorage.agent ?
						<>
							<NavLink to={'/category/sales/0/0/0/1/0/' + lang}>
								<li onClick={() => this.setState({toggleMenu: false, showCategories: false})}>
									<p>{lang == 'he' ? "מבצעים" : "Sales"}</p>
								</li>
							</NavLink>
						
							<NavLink to={'/brands/collection/0/' + lang}>
								<li onClick={() => this.setState({toggleMenu: false, showCategories: false})}>
									<p>{lang == 'he' ? "סדרות" : "Brands"}</p>
								</li>
							</NavLink>
							<NavLink to={'/brands/brands/0/' + lang}>
								<li onClick={() => this.setState({toggleMenu: false, showCategories: false})}>
									<p>{lang == 'he' ? "מותגים" : "Brands"}</p>
								</li>
							</NavLink>
						
							</>
						:null}
						{localStorage.agent && this.props.state.profileObj ? this.props.state.profileObj.map((item, key) => {
							if(item.OnlyAgent && !item.OnlyDesktop){
								let isGo = true;
								if(item.OnlyAgentSuper && !JSON.parse(localStorage.agent).Super){
									isGo = false;
								}
								if(isGo){
									return (
										<NavLink key={key} to={item.Link + this.props.state.lang}>
											<li onClick={() => this.setState({toggleMenu: false, showCategories: false})}>
												<p>{this.props.state.lang == 'he' ? item.Title : item.TitleEng}</p>
											</li>
										</NavLink>
									)
								}
							}
						}) : null}

						{localStorage.user && !localStorage.agent ?
							<NavLink to={'/profile/' + lang}>
								<li onClick={() => this.setState({toggleMenu: false, showCategories: false})}>
									<p>{lang == 'he' ? "אזור אישי" : "My Profile"}</p>
								</li>
							</NavLink>
						: null}
							

					</ul>
				</div>
			return (
				<header className={lang == 'he' ? 'he' : 'ru'} id="header">
					{this.state.ProductPopUp ? ReactDOM.createPortal(
						<div className="my-modal prod-info">
							<div className="modal-wrapper animated">
								<div className="close-cont">
									<div onClick={() => this.setState({ProductPopUp: !this.state.ProductPopUp})}
									     className="close">
										<img src={globalFileServer + 'icons/close.svg'}/>
									</div>
								</div>
								<ProductPopUp {...this} lang={lang}/>
							</div>
							<div onClick={this.close} className="overflow"></div>
						</div>,
						document.getElementById('modal-root')
					) : null}
					{!location.href.includes("cart") && !localStorage.agent ?
						<div onClick={this.scrollUp} className="up">
							<img src={globalFileServer + 'icons/up.svg'} alt=""/>
						</div>
						: null}
					{this.props.state.closedForHolidays
						? ReactDOM.createPortal(
							<ClosedForHolidays {...this} />,
							document.getElementById("modal-root")
						)
						: null}
					{this.state.agentActionsPop
						? ReactDOM.createPortal(
							<AgentActionsPop {...this} isHeader={true} closeAgentActionsPop={()=> this.closeAgentActionsPop()} />,
							document.getElementById("modal-root")
						)
						: null}
					{this.state.userEntry ?
						<UserEntry headProps={this.props} close={() => close()} action={this.state.userEntry}
						           lang={this.props.state.lang} {...this} /> : null}

					{localStorage.agent || localStorage.role || localStorage.user ? <LiveChat {...this} /> : null}

					<div className={localStorage.user || localStorage.agent || localStorage.role ? "header-wrapper" : "header-wrapper no-cats"}>
						<div className="header-wrapper-subcont flex-container">
							<div className={this.state.toggleMenu ? "main-menu col-lg-6 opened" : "main-menu col-lg-6 closed"}>
									<div className="open-menu">
										<div onClick={this.toggleMenu}
											className={this.state.toggleMenu ? "nav-icon3 open" : "nav-icon3"}>
											<span></span><span></span><span></span><span></span>
											
										</div>
										{/*
										<NotificationIcon/>
										*/}
										<div className="main-logo-mobile">
											{/* <NavLink to="/">
												<img src={globalFileServer + 'logo.png'} width={50}/>
											</NavLink> */}
											
										</div>

										<div>
											<div className="back" onClick={this.goBack}>
												<span className="material-symbols-outlined">arrow_back_ios</span>
											</div>
											<div className="search-icon"
												onClick={() => this.setState({showSearchMob: !this.state.showSearchMob})}>
												<span className="material-symbols-outlined">search</span>
											</div>
										</div>
									</div>
								<>
									<nav className={this.state.toggleMenu ? "header-right-cont-main-bigRes opened" : "header-right-cont-main-bigRes closed"}>
										{localStorage.role ?
											<div onClick={this.props.toggleMenu.bind(this)} className="menu-new">
												<img src={globalFileServer + 'icons/head_icons/menu_new.svg'}/>
											</div>
											:
											null
										}

										<div className="header-right-cont">
											<SiteNav headProps={this.props} goToWishList={() => this.goToWishList()}
											         currState={this.state} items={this.props.state.categories}/>
										</div>
										<div onClick={() => this.setState({toggleMenu: false, showCategories: false})}
										     className="hide-on-desctop logo">
											{/* <img src={globalFileServer + 'icons/logo-black.png'} /> */}
										</div>
									</nav>
									<div className="header-right-cont-main-smallRes">
										<nav className={this.state.toggleMenu ? "opened" : "closed"}>
											{siteMenu}
										</nav>
										<div onClick={() => this.setState({toggleMenu: false, showCategories: false})}
										     className={this.state.toggleMenu ? "fake-click opened" : "fake-click closed"}></div>
									</div>
								</>


							</div>
							<div className={!this.state.showSearchMob ? "search-li col-lg-4 hide-mob" : "search-li show-mob"}>
								{/* <SearchHook searchPhpFunc={this.searchPhpFunc} setProdPopUp={this.setProdPopUp}
								            searchProds={this.state.searchProds} preload={this.state.preload}
								            showNotFound={this.state.showNotFound} props={this.props} lang={lang}
								            closeSearchMob={this.closeSearchMob}/> */}
								<CatalogSearch />
							</div>

							<div className="actions col-lg-2">
								<ul className={!localStorage.user ? "prelogIn" : "afterLog"}>
									{/*
											<LangMenu />
									*/}
									<li id="my-profile-cont"
									    className={!this.state.myProfileCont ? "my-profile-cont close" : "my-profile-cont open"}
									    onMouseEnter={window.innerWidth > 1150 ? () => this.setState({myProfileCont: true}) : null}
									    onMouseLeave={() => this.setState({myProfileCont: false})}
									    onClick={() => this.setState({myProfileCont: !this.state.myProfileCont})}
									>
										{localStorage.user || localStorage.agent || localStorage.role ?
											<>
												{window.innerWidth > 1150 ?
													<NavLink to={localStorage.agent && !localStorage.user ? '/agentDashboard/' + JSON.parse(localStorage.agent).Id : '/profile/' + lang}>
														<div className="img icon">
															<span className="material-symbols-outlined">person</span>
															{localStorage.agent ?
																<p className="agent-title">סוכן</p>
																: null}
														</div>
													</NavLink>
													:
													<>
														<div className="img icon">
															<span className="material-symbols-outlined">person</span>
															{localStorage.agent ?
																<p className="agent-title">סוכן</p>
																: null}
														</div>
													</>
												}
											</>
											:
											<div className="img icon"
											     onClick={() => this.setState({userEntry: "login"})}>
												<span className="material-symbols-outlined">person</span>
											</div>
										}
										{localStorage.role || localStorage.agent || localStorage.user ?
											<MyProfileMenu props={this.props} openAgentActionsPop={this.setAgentActionsPop} lang={lang}/>
											: null}
									</li>

										{localStorage.agent ?
												<li className={"left"}>
														<NavLink to={"/ClientsAgent/1/" + lang}>
																<span className="material-symbols-outlined">StoreFront</span>
														</NavLink>
												</li>

												:null}
									 	<>
										<NotificationIcon handleOpen={this.props.toggleNotification.bind(this)} isOpen={this.props.state.openNotification}/>
										</>

									{localStorage.user && this.props.state.user.Type != 2 && this.props.state.selectedMode ?
										<li>
											<NavLink onClick={this.props.toggleCart.bind(this)} to={"/cart/" + lang}>
												<button onClick={this.props.toggleCart.bind(this)} className="icon">
													{this.props.state.productsInCart.length ?
														<div
															className="cart-counter">
																
																<CartLength/>
															</div> : null}
													<span className="material-symbols-outlined">shopping_cart</span>
													{parseInt(this.props.state.totalBasket) != 0 ?
														<p className="ttl">{this.props.state.totalBasket}</p>
														: null}

												</button>
											</NavLink>
										</li>
										: null}
									{(localStorage.agent || localStorage.role) ?
										<li className="menu_new_2">
											<button onClick={this.props.toggleMenu.bind(this)} className="icon">
												<img src={globalFileServer + 'icons/menu_new_2.svg'}/>
											</button>
										</li>
										: null}
									{/*
  								{this.props.state.user.Type != 2 && ((localStorage.user && !localStorage.agent) || localStorage.role || (localStorage.agent && !localStorage.user)) ?
  									<li>
  										<button className="icon" onClick={() => this.setState({ openChat: true })}>
  											{this.state.chatCounter ? <span>{this.state.chatCounter}</span> : null}
  											<img src={globalFileServer + 'icons/head_icons/chat.svg'} />
  										</button>
  									</li>
  								: null}
*/}
									{/*
    								<li>
    									<button onClick={this.toggleSearch.bind(this)} className="icon">
    										<img src={globalFileServer + 'icons/search-amit.svg'} />
    									</button>
    								</li>

  								{window.innerWidth < 1050 && (localStorage.agent || localStorage.role || localStorage.user) ?
  									<li>
  										<button onClick={this.props.toggleMenu.bind(this)} className="icon">
  											<img src={globalFileServer + 'icons/menu_new_2.svg'} />
  										</button>
  									</li>
  									: null}
                  */}
								</ul>
								<div className={'identify-cont'}>

										{!localStorage.agent && !localStorage.user && !localStorage.role ?
												<span>{'ברוכים הבאים, בצעו כניסה / הרשמה'}</span>

												:null}
										{localStorage.agent ?
												<span>{JSON.parse(localStorage.agent).Name}</span>
												:null}
										{localStorage.role ?
												<span>{'אדמיניסטרטור'}</span>
												:null}
										{localStorage.user ?
												<>
												<span>{" | "}</span>
												<span>{this.props.state.user.Name && this.props.state.user.Name.length > 32 ? this.props.state.user.Name.substring(0, 32) + '...' : this.props.state.user.Name}</span>
												{this.props.state.selectedMode ? 
													<>
														<span>{" | "}</span>
														{this.props.state.selectedMode==1 ?
															<span>{"הזמנה"}</span>
														:null}
														{this.props.state.selectedMode==2 ?
															<span>{"ה.מחיר"}</span>
														:null}
														{this.props.state.selectedMode==3 ?
															<span>{"החזרה"}</span>
														:null}
													</>
												:null}
												</>
										:null}

								</div>
							</div>
						</div>
						<SiteNavEcare nav={this.state.nav} toggleNav={this.toggleNav}/>
						{this.props.state.categories && this.props.state.categories.length ?
							<CategorySlider lang={this.props.state.lang}/> : null}

					</div>

					{lang == 'ru' ?
						<style
							dangerouslySetInnerHTML={{__html: `h1, h2, h3, h4, p, span, a, button, input, textarea, li { direction: ltr; }`}}/>
						:
						<style dangerouslySetInnerHTML={{__html: `[dir='rtl'] .slick-slide {float: left;}`}}/>
					}
					{this.state.showCategories ?
						<div onClick={() => this.setState({showCategories: false})} className="close-categories"></div>
						: null}
				</header>
			)
		}
	}
