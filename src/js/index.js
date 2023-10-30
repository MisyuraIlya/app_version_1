import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import {Switch, HashRouter as Router, Route} from "react-router-dom";
import SweetAlert from 'sweetalert2';
import UserContext from './UserContext';

import Home from './components/routs/Home';
import PromotionPage from './components/routs/PromotionPage';

import CategoryPage from './components/routs/CategoryPage';
import CategoryView from './components/routs/CategoryView';
import BrandsPage from './components/routs/BrandsPage';

import ShopCart from './components/routs/ShopCart';
import WishList from './components/routs/WishList';


import ForSale from './components/routs/ForSale';
import Profile from './components/routs/Profile';
import AgentProfile from './components/routs/AgentProfile';


import AdminProfil from './components/routs/AdminProfil';
import Notification from './components/routs/Notification';
import History from './components/routs/History';
import AdminHistory from './components/routs/AdminHistory';
import AdminSales from './components/routs/AdminSales';
import AdminInfo from './components/routs/AdminInfo';


import Contact from './components/routs/Contacts';
import NotFound from './components/routs/NotFound';
import Filters from './components/routs/Filters';
import Gis from './components/routs/Gis';
import AdminAgent from './components/routs/AdminAgent';

// import Header from './components/Header';
import Header from "./modules/Header/Header";
import Footer from './components/Footer';
// import MiniCart from './components/MiniCart';
import Nav from './components/Nav';
import NotificationView from './components/NotificationView';
import Chat from './components/header/LiveChat';
// import Clients from './components/routs/Clients';
import Clients from "./modules/Admin/pages/Clients";
import ClientsAgent from './components/routs/ClientsAgent';

import Docs from './components/routs/Docs';
import DocsHistory from './components/routs/DocsHistory';
import DocsKarteset from './components/routs/DocsKarteset';
import AgentGviya from './components/routs/AgentGviya';
import DocsAgent from './components/routs/DocsAgent';
import DocsAgentItems from './components/routs/DocsAgentItems';
import DocsHistoryItems from './components/routs/DocsHistoryItems';




// import DocsAgentApproval from './components/routs/DocsAgentApproval';
import Orders from "./modules/Admin/pages/Orders";
import DocsItemsAgentApproval from './components/routs/DocsItemsAgentApproval';

import DocsHistoryAgent from './components/routs/DocsHistoryAgent';
import AgentDrafts from './components/routs/AgentDrafts';


import Shoppinglist from './components/routs/Shoppinglist';
import ShoppinglistItems from './components/routs/ShoppinglistItems';


import Returns from './components/routs/Returns';


import CategoryEdit from "./modules/Admin/pages/CategoryEdit";
import BrandsEdit from './components/routs/BrandsEdit';

// import ProductsEdit from './components/routs/ProductsEdit';
import ProductsEdit from "./modules/Admin/pages/ProductsEdit";
import ProductEdit from './components/routs/ProductEdit';
import ProductParent from './components/routs/ProductParent';

import About from './components/routs/About';
import Departments from './components/routs/Department';
import CategoryBuild from './components/routs/CategoryBuild';
import DeptEdit from './components/routs/DeptEdit';


import Employee from './components/routs/Employee';
import EmployeePage from './components/routs/EmployeePage';
import CollectorStepThree from './components/routs/CollectorStepThree';
import CollectorStepFour from './components/routs/CollectorStepFour';
import AdminCollectorStepFour from './components/routs/AdminCollectorStepFour';

import {ShopProvider} from "./adminStatistics/states/ShopProvider";
import {AgentStatsProvider} from "./adminStatistics/states/AgentsStatsPorvider";

import {MyCalendarProvider} from "./adminStatistics/states/CalendarProvider";

import './App.scss';
import AdminStatisticsNew from "./adminStatistics/AdminStatisticsNew";
import AgentStatistics from "./adminStatistics/AgentStatisticsNew";

import AdminComparison from "./adminStatistics/AdminComparison";

import { MyQuestionDocsStoreProvider } from "./agents/store/QuestionDocsStore";
import Objectives from './agents/pages/Objectives';
import Target from "./agents/pages/Target";
import AgentReducer from './agents/AgentReducer';
import Visits from './agents/pages/Visits';
import QuestionDocs from './agents/pages/QuestionDocs';
import AgentDashboard from './agents/pages/AgentDashboard'
import QuestionFormCompelte from "./agents/pages/QuestionFormCompelte";
import { AuthProvider } from "./modules/Auth/providers/AuthProvider";
import { NotificationsProvider } from "./modules/PushNotificationModule/provider/PushNotification";
import { getPayloadToken } from "./modules/Auth/helpers/auth.helper";
import PushNotificationHandlers from "./modules/PushNotificationModule/components/PushNotificationHandlers";
import DocumentsModule from "./modules/Documents/pages/DocumentsPage/DocumentsPage";
import DocCard from "./modules/Documents/pages/DocCard/DocCard";
import CartessetPage from "./modules/Documents/pages/CartessetPage/CartessetPage";
import CartPage from "./modules/Cart/pages/CartPage";
import StockNotify from "./modules/Modals/components/StockNotify/StockNotify";
import { ModalsProvider } from "./modules/Modals/provider/ModalsProvider";
import Category from "./modules/Catalog/pages/Catalog";
import Catalog from "./modules/Catalog/pages/Catalog";
import OrderItemPage from "./modules/Admin/pages/OrderItemPage";
import HomePage from "./modules/Home/pages/HomePage";
import CategoryViewPage from "./modules/Catalog/pages/CategoryViewPage";
import ProfilePage from "./modules/Auth/pages/ProfilePage";
import HistoryPage from "./modules/NewDocuments/pages/HistoryPage";
import HistoryItemPage from "./modules/Documents/pages/HistoryItemPage/HistoryItemPage";
import DocumentsPage from "./modules/NewDocuments/pages/DocumentsPage";
import KartessetPage from "./modules/NewDocuments/pages/KartessetPage";
import { DocumentsProvider } from "./modules/NewDocuments/provider/DocumentsProvider";
import DocumentsItemPage from "./modules/NewDocuments/pages/DocumentsItemPage";
require('./globals.js');

if (module.hot) {
	module.hot.accept();
}


const BasicRouter = (prop) => (
	<Router>
		<AuthProvider>
		<NotificationsProvider>
		<AgentReducer>
		<Fragment>
		<PushNotificationHandlers/>
			<ModalsProvider>
				<header id="header">
					{/* <Route {...prop} render={matchProps => (<Header {...matchProps}{...prop} />)}/> */}
					<Route {...prop} render={matchProps => (<Header {...matchProps}{...prop} />)}/>
				</header>
				<Route {...prop} render={matchProps => (<Nav {...matchProps}{...prop} />)}/>
				{<Route {...prop} render={matchProps => (<NotificationView {...matchProps}{...prop} />)}/>}
					<main id={prop.state.toggleMenu ? 'active' : null} className={'he'}>
						<Switch>
		

											{/*AgentDashboard*/ }

									<Route path="/home"
										render={(props) => (<Home key={props.match.params.lang} {...props}{...prop}/>)}/>

									<Route path="/promotionPage" render={(props) => (<PromotionPage {...props}{...prop}/>)}/>

							{localStorage.role || localStorage.agent || localStorage.user ?  <Route path="/categoryOld/:type/:lvl1/:lvl2/:lvl3/:page/:parent" render={(props) => (<CategoryPage {...props}{...prop}/>)}/>: null}

							
							<Route path="/productParent/:lvl1/:lvl2/:lvl3/:id"
								render={(props) => (<ProductParent {...props}{...prop}/>)}/>

							<Route path="/brands/:type/:rule" render={(props) => (<BrandsPage {...props}{...prop}/>)}/>


									<Route path="/cartOld" render={(props) => (<ShopCart {...props}{...prop}/>)}/>
									<Route path="/wishList" render={(props) => (<WishList {...props}{...prop}/>)}/>

									<Route path="/sales/:id" render={(props) => (<ForSale {...props}{...prop} />)}/>

									
									{localStorage.role ?
										<Route path="/admin-history" render={(props) => (<AdminHistory {...props}{...prop}/>)}/> : null}
									{localStorage.role ?
										<Route path="/admin-sales" render={(props) => (<AdminSales {...props}{...prop}/>)}/> : null}
									{localStorage.role ?
										<Route path="/admin-info" render={(props) => (<AdminInfo {...props}{...prop}/>)}/> : null}


									<Route path="/brands-edit" render={(props) => (<BrandsEdit {...props}{...prop}/>)}/>

									<Route path="/editproduct/:id" render={(props) => (<ProductEdit {...props}{...prop}/>)}/>
									<Route path="/category-build/:id" render={(props) => (<CategoryBuild {...props}{...prop}/>)}/>
									<Route path="/deptEdit" render={(props) => (<DeptEdit {...props}{...prop}/>)}/>


									<Route path="/notification" render={(props) => (<Notification {...props}{...prop}/>)}/>
									<Route path="/departments/:id" render={(props) => (<Departments {...props}{...prop}/>)}/>

							{localStorage.user ?
								<Route path="/history" render={(props) => (<History {...props}{...prop}/>)}/> : null}
							{localStorage.user ? <Route path="/docs/:page" render={(props) => (<Docs {...props}{...prop}/>)}/> : null}
							{localStorage.agent ?
								<Route path="/docsAgent/:page" render={(props) => (<DocsAgent {...props}{...prop}/>)}/> : null}

							{localStorage.agent || localStorage.role ?
								<Route path="/approveDoc/:page" render={(props) => (<DocsAgentApproval {...props}{...prop}/>)}/> : null}

							{localStorage.agent || localStorage.role ?
								<Route path="/approveDocItems/:id" render={(props) => (<DocsItemsAgentApproval {...props}{...prop}/>)}/> : null}

							<Route path="/docsItems/:id" render={(props) => (<DocsAgentItems {...props}{...prop}/>)}/>
							<Route path="/docsItemsNew/:id" render={(props) => (<DocCard {...props}{...prop}/>)}/>
							
								<Route path="/docsHistoryItems/:id" render={(props) => (<HistoryItemPage {...props}{...prop}/>)}/> 

						

							{localStorage.agent ? <Route path="/docsHistoryAgent/:page"
														render={(props) => (<DocsHistoryAgent {...props}{...prop}/>)}/> : null}
							{localStorage.agent ?
								<Route path="/agentGviya" render={(props) => (<AgentGviya {...props}{...prop}/>)}/> : null}
							{localStorage.agent && !localStorage.role ? <Route path="/agentDrafts/:page" render={(props) => (<AgentDrafts {...props}{...prop}/>)} /> :null}

							
							{localStorage.user ?
								<Route path="/docsHistory" render={(props) => (<HistoryPage {...props}{...prop}/>)}/> : null}


									{localStorage.user ? <Route path="/shoppinglist"
																render={(props) => (<Shoppinglist {...props}{...prop}/>)}/> : null}
									{localStorage.user ? <Route path="/shoppinglistItems/:id"
																render={(props) => (<ShoppinglistItems {...props}{...prop}/>)}/> : null}


									{localStorage.user ?
										<Route path="/returns" render={(props) => (<Returns {...props}{...prop}/>)}/> : null}

									<Route path="/filters" render={(props) => (<Filters {...props}{...prop}/>)}/>
									<Route path="/contact" render={(props) => (<Contact {...props}{...prop}/>)}/>
									<Route path="/about" render={(props) => (<About {...props}{...prop}/>)}/>

									<Route path="/gis" render={(props) => (<Gis {...props}{...prop}/>)}/>
									{localStorage.role ?
										<Route path="/agents" render={(props) => (<AdminAgent {...props}{...prop}/>)}/> : null}
									<Route path="/chat" render={(props) => (<Chat {...props}{...prop}/>)}/>
									{localStorage.role ?
									<Route path="/clients" render={(props) => (<Clients {...props}{...prop}/>)}/> : null}
									{localStorage.agent ? <Route path="/ClientsAgent/:page" render={(props) => (<ClientsAgent {...props}{...prop}/>)} /> : null}



										{localStorage.role ? <Route path="/statistics/:date" render={(props) => (<AdminStatisticsNew {...props}{...prop}/>)} /> : null}
										{localStorage.role ? <Route path="/comprasion" render={(props) => (<AdminComparison {...props}{...prop}/>)} /> : null}


									<Route path="/employee" render={(props) => (<Employee {...props}{...prop}/>)}/>
									<Route path="/employe/:id" render={(props) => (<EmployeePage {...props}{...prop}/>)}/>
									{(localStorage.user && JSON.parse(localStorage.user).Type == 2) || localStorage.role ?
										<Route path="/collector-step-three"
											render={(props) => (<CollectorStepThree {...props}{...prop}/>)}/> : null}
									{(localStorage.user && JSON.parse(localStorage.user).Type == 2) || localStorage.role ?
										<Route path="/collector-step-four/:order/:dept"
											render={(props) => (<CollectorStepFour {...props}{...prop}/>)}/> : null}
									{localStorage.role ? <Route path="/admin-collector-step-four/:order" render={(props) => (
										<AdminCollectorStepFour {...props}{...prop}/>)}/> : null}

							{/*
		QuestionFormListComplete
		*/}

							{/* FIXED CLIENT  */}
							{!localStorage.agent  ?
									<Route path="/" exact render={(props) => (<HomePage key={props.match.params.lang} {...props}{...prop}/>)} />
									:
									<Route path="/" exact render={(props) => (<AgentDashboard key={props.match.params.lang} {...props}{...prop}/>)} />
							}
							<Route path="/client/:documentType/:lvl1/:lvl2/:lvl3" render={(props) => (<Catalog {...props}{...prop}/>)}/>
							{/* <Route path="/catalogSearch/:lvl1/:lvl2/:lvl3" render={(props) => (<CatalogSearchPage {...props}{...prop}/>)}/> */}
							<Route path="/cart" render={(props) => (<CartPage {...props}{...prop}/>)}/>

							<Route path="/categoryPage/:lvl1/:lvl2/:lvl3" render={(props) => (<CategoryViewPage {...props}{...prop}/>)}/>
							<Route path="/profile" render={(props) => (<ProfilePage {...props}{...prop}/>)}/>
							{/* DOCUMENTS */}
							<DocumentsProvider>
								{localStorage.user ? <Route path="/documentPage" render={(props) => (<DocumentsPage/>)}/> : null}
								{localStorage.user ? <Route path="/kartessetPage" render={(props) => (<KartessetPage {...props}{...prop}/>)}/> : null}
								{localStorage.user ? <Route path="/historyPage" render={(props) => (<HistoryPage {...props}{...prop}/>)}/> : null}
							</DocumentsProvider>
							<Route path="/documentItem/:id" render={(props) => (<DocumentsItemPage {...props}{...prop}/>)}/>

							{/* FIXED ADMIN */}
							<Route path="/admin/category-edit/:lvl1/:lvl2/:lvl3" render={(props) => (<CategoryEdit {...props}{...prop}/>)}/>
							<Route path="/admin/products-edit/:lvl1/:lvl2/:lvl3" render={(props) => (<ProductsEdit key={props.match.params.id} {...props}{...prop}/>)}/>
							<Route path="/admin/clients" render={(props) => (<Clients {...props}{...prop}/>)}/>
							<Route path="/admin/approveDoc" render={(props) => (<Orders {...props}{...prop}/>)}/>
							<Route path="/admin/approveDocItems/:id" render={(props) => (<OrderItemPage {...props}{...prop}/>)}/>

							{/* agenet */}
							{localStorage.role || localStorage.agent ? <Route path="/agent-statistics/:date" render={(props) => (<AgentStatistics {...props}{...prop}/>)} /> : null}
							{localStorage.agent || localStorage.role ? <Route path="/objectives/:id" render={(props) => (<Objectives {...props}{...prop}/>)}/> : null}
							{localStorage.agent || localStorage.role ? <Route path="/target/:id" render={(props) => (<Target {...props}{...prop}/>)}/> : null}
							{localStorage.agent || localStorage.role ? <Route path="/visits/:id/:page" render={(props) => (<Visits {...props}{...prop}/>)}/> : null}
							{localStorage.agent || localStorage.role ? <Route path="/questionDocs/:id/:page" render={(props) => (<QuestionDocs {...props}{...prop}/>)}/> : null}
							{localStorage.agent || localStorage.role ? <Route path="/agentDashboard/:id" render={(props) => (<AgentDashboard {...props}{...prop}/>)}/> : null}
							{localStorage.agent || localStorage.role ? <Route path="/QuestionFormCompelte" render={(props) => (<QuestionFormCompelte {...props}{...prop}/>)}/> : null}
							{/* ------- */}
							<Route render={(props) => (<NotFound {...props}{...prop}/>)}/>
						</Switch>
					</main>

				{location.href.includes("category") || location.href.includes("cart") || location.href.includes("brands") ? null :
					<Route {...prop} render={matchProps => (<Footer {...matchProps}{...prop} />)}/>}
			</ModalsProvider>

		</Fragment>
		</AgentReducer>
		</NotificationsProvider>
		</AuthProvider>
	</Router>
);
export default BasicRouter;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			header: 1,
			categories: [],
			items: [],
			productsInCart: [],
			openCart: false,
			price: 0,
			wishList: [],
			lang: 'he',
			maam: 0,
			delivery: [],
			paymentTypes: [],
			seo: [],
			toggleMenu: false,
			matchId: false,
			matchSubId: false,
			user: false,
			images: [],
			productSales: [],
			categorySales: [],
			productSalesDiffQuan: [],
			products: [],
			openNotification: false,
			notifications: 0,
			defaults: [],
			b2cPriceCode: "8",
			priceNoLogin: "0",
			b2cAvailiable: false,
			searchMode: false,
			appId: "",
			updateImgs: false,
			dateNew: "",
			headerPop: false,
			constants: {},
			nav: [],
			showCase: [],
			parallax: [],
			departments: [],
			imageText: [],
			contacts: [],
			ContactBtm: [],
			ContactFormInputs: [],
			about: [],
			employee: "",
			listView: "",
			totalBasket: 0,
			profileObj: [],
			monthArr: [],
			yearArr: [],
			selectedMode: 0,
			returnSelectedMode: 0,
			closedForHolidays: false,
			agentChangePriceAllowed: true,
			agentPriceOverwriteArr: [],
			webDb: null
		}

	}



	componentDidMount() {
		let htmlElement = document.querySelector("html");
		let body = document.querySelector("body");
		htmlElement.setAttribute('dir', 'rtl');
		htmlElement.setAttribute('lang', 'he');


		localStorage.user ? this.setState({user: JSON.parse(localStorage.user)}) : null;
		localStorage.products ? this.getProducts() : null;
		this.getCategories();
		localStorage.wishList ? this.setState({wishList: JSON.parse(localStorage.getItem('wishList'))}) : null;
		localStorage.freeProdsInCart ? localStorage.removeItem('freeProdsInCart') : null;

		this.getLang();
		if (!localStorage.listView) {
			localStorage.listView = 'false';
		}
		this.setProfileObj();
		this.setState({listView: localStorage.listView});
		if(localStorage.selectedMode){
			this.setSelectedMode();
    	}
		

		let monthArr = [{Id:0,Title:"בחר"},
                    {Id:1,Title:"01"},
                    {Id:2,Title:"02"},
                    {Id:3,Title:"03"},
                    {Id:4,Title:"04"},
                    {Id:5,Title:"05"},
                    {Id:6,Title:"06"},
                    {Id:7,Title:"07"},
                    {Id:8,Title:"08"},
                    {Id:9,Title:"09"},
                    {Id:10,Title:"10"},
                    {Id:11,Title:"11"},
                    {Id:12,Title:"12"},

                  ];

		let yearArr = [{Id:0,Title:"בחר"},
						{Id:2021,Title:"2021"},
						{Id:2022,Title:"2022"},
						{Id:2023,Title:"2023"},
						{Id:2024,Title:"2024"},
						{Id:2025,Title:"2025"},
						{Id:2026,Title:"2026"}
					];

		this.setState({monthArr, yearArr})
		
		let agentPriceOverwriteArr = [];
		if(localStorage.agentPriceOverwriteArr){
			agentPriceOverwriteArr = JSON.parse(localStorage.agentPriceOverwriteArr);
		}else{
			localStorage.agentPriceOverwriteArr = JSON.stringify(agentPriceOverwriteArr);
		}

		this.setState({agentPriceOverwriteArr})

		document.addEventListener('gesturestart', function (e) {
			e.preventDefault();
		});

	}

	

	setProfileObj = () => {
		let profileObj = [
			/*
			{
				Title: 'ראשי',
				TitleEng: 'Shopping List',
				Link: '/',
				Img: 'home',
				OnlyAgent: false,
				OnlyAgentSuper: false,
				OnlyDesktop:true
			},*/
			
			{
				Title: 'מסמכי לקוח',
				TitleEng: 'My Orders',
				Link: '/docsNew/1/',
				Img: 'storefront',
				OnlyAgent: false,
				OnlyAgentSuper: false,
				OnlyDesktop:false,
				notForMisrad:false
			},
			// {
			// 	Title: 'סל קבוע',
			// 	TitleEng: 'My Products',
			// 	Link: '/category/regular/0/0/0/1/0/',
			// 	Img: 'shopping_bag',
			// 	OnlyAgent: false,
			// 	OnlyAgentSuper: false,
			// 	OnlyDesktop:false,
			// 	notForMisrad:false
			// },
			// {
			// 	Title: 'מומלצים עבורך',
			// 	TitleEng: 'Recommended Products',
			// 	Link: '/category/recommended/0/0/0/1/0/',
			// 	Img: 'star',
			// 	OnlyAgent: false,
			// 	OnlyAgentSuper: false,
			// 	OnlyDesktop:false,
			// 	notForMisrad:false
			// },
			/*{
				Title: 'רשימות קניות',
				TitleEng: 'Shopping List',
				Link: '/shoppinglist/',
				Img: 'checklist',
				OnlyAgent: false
			},*/
			
			{
				Title: 'מסמכים לאישור',
				TitleEng: 'Approve Docs',
				Link: '/approveDoc/1/',
				Img: 'checklist_rtl',
				OnlyAgent: true,
				OnlyAgentSuper: true,
				OnlyDesktop:false,
				notForMisrad:true
			},
			{
				Title: 'מסמכים',
				TitleEng: 'Shopping List',
				Link: '/docsAgent/1/',
				Img: 'article',
				OnlyAgent: true,
				OnlyAgentSuper: false,
				OnlyDesktop:false,
				notForMisrad:false
			},
			/*{
				Title: 'טיוטות',
				TitleEng: 'Shopping List',
				Link: '/agentDrafts/1/',
				Img: 'draft_orders',
				OnlyAgent: true,
				OnlyAgentSuper: false,
				OnlyDesktop:false
			},*/
			{
				Title: 'טיוטות/הזמנות',
				TitleEng: 'Shopping List',
				Link: '/DocsHistoryAgent/1/',
				Img: 'article',
				OnlyAgent: true,
				OnlyAgentSuper: false,
				OnlyDesktop:false,
				notForMisrad:false
			},
			/*{
				Title: 'גביה',
				TitleEng: 'Shopping List',
				Link: '/agentGviya/',
				Img: 'account_balance_wallet',
				OnlyAgent: true,
				OnlyAgentSuper: false,
				OnlyDesktop:false
			},*/
			{
				Title: 'אחרונים במלאי',
				TitleEng: 'Shopping List',
				Link: '/category/lastOnHand/0/0/0/1/0/',
				Img: 'inventory_2',
				OnlyAgent: true,
				OnlyAgentSuper: false,
				OnlyDesktop:false,
				notForMisrad:false
			},
			
			{
				Title: 'ביצועי סוכנים',
				TitleEng: 'Shopping List',
				Link: '/agent-statistics/1/',
				Img: 'support_agent',
				OnlyAgent: true,
				OnlyAgentSuper: true,
				OnlyDesktop:false,
				notForMisrad:true
			}
		];
		this.setState({profileObj})
	}
	saveAppId = async (appId) => {
		let value = {
			appId: appId
		}
		if (localStorage.user) {
			if (JSON.parse(localStorage.user) && !localStorage.agent) {
				value.userId = JSON.parse(localStorage.user).Id;
			}
		}
		if (localStorage.agent) {
			value.agent = localStorage.agent;
		}
		if (localStorage.role) {
			value.admin = "1";
		}
		this.setState({appId})

		const valAjax = {
			funcName: '',
			point: 'new-api/save_app_id',
			val: value
		};
		try {
			const data = await this.ajax(valAjax);
		} catch (err) {
			console.log('connection error catsview');
		}

	}
	ajax = (value) => {

		//this.checkInternetConnection();

		return $.ajax({
			url: entry + '/app/app_data.php',
			type: 'POST',
			data: value,
		}).done(function (data, textStatus, request) {
			if (request.getResponseHeader('shabat') == 'true' && !localStorage.role) {
				this.setState({closedForHolidays: false})
			} else {
				this.setState({closedForHolidays: false})
			}
		}.bind(this)).fail(function () {
			console.log('error');
		});

	}

	checkInternetConnection = () => {
		debugger;
		if (navigator.onLine) {
			//console.log("You are online!");
		} else {
			//console.log("You are offline.");
		}
	}
	  

	setUpLocalDB = () =>{
		const db = openDatabase('DigiDB', '1.0', 'My Database', 2 * 1024 * 1024);
  


		db.transaction(function (tx) {
			tx.executeSql(
			  `DROP TABLE IF EXISTS categories`,
			  [],
			  function () {
				console.log(`Table categories dropped successfully.`);
			  },
			  function (error) {
				console.error(`Error dropping table categories: ${error.message}`);
			  }
			);
		  });
		  

		  // Create the table if it doesn't exist
		db.transaction(tx => {
			tx.executeSql(
			  'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT' + 
			  ', ExtId varchar(255) DEFAULT NULL' + 
			  ', LvlNumber varchar(255) DEFAULT NULL' + 
			  ', ParentId varchar(255) DEFAULT NULL' + 
			  ', ParentExtId varchar(255) DEFAULT NULL' + 
			  ', Title varchar(255) DEFAULT NULL' + 
			  ', Img varchar(255) DEFAULT NULL' + 
			  ', Orden int DEFAULT NULL' + 
			  ', Unpublished int DEFAULT NULL' + 
			  ')'
			);
		  });

		 
		  this.setState({webDb:db})
/*
		const tableName = 'categories';

			// Execute the PRAGMA statement to get column information
			db.transaction(function (tx) {
			tx.executeSql(
				`PRAGMA table_info(${tableName})`,
				[],
				function (tx, result) {
				// Process the results returned from the query
				const columns = result.rows;
				if (columns.length > 0) {
					console.log(`Columns of table '${tableName}':`);
					for (let i = 0; i < columns.length; i++) {
					console.log(columns.item(i));
					}
				} else {
					console.log(`Table '${tableName}' does not exist or has no columns.`);
				}
				},
				function (error) {
				console.error('Error retrieving column information: ' + error.message);
				}
			);
			});
	*/
		//setDatabase(db);
  
	}

	writeCategoriesLocalDb = (categories) => {
		
		categories.map((item,index) => {
			this.state.webDb.transaction(tx => {
				tx.executeSql('INSERT INTO categories (ExtId,LvlNumber,ParentId,ParentExtId,Title,Img,Orden,Unpublished) VALUES (?,?,?,?,?,?,?,?)',
													[item.ExtId,item.LvlNumber,item.ParentId,item.ParentExtId,item.Title,item.Img,item.Orden,item.Unpublished], (_, { rowsAffected }) => {
						/*if (rowsAffected > 0) {
							console.log('Item added successfully');
						} else {
							console.log('Failed to add item');
						}*/
				});
		  	});
		});
	
	}

	whoIs = () => {
		let user = {
			type: 'guest',
			mobile: window.outerWidth < 1050 ? true : false,
		};
		if (localStorage.role === 'super_user') {
			user.type = 'admin';
			user.role = localStorage.role;
			user.session_id = localStorage.session_id;
			user.token = localStorage.token;
		}
		if (localStorage.role === 'user') {
			user = {...JSON.parse(localStorage.user)}
			user.type = 'user';
			user.role = 'user';
			user.token = localStorage.token;
			user.mobile = window.outerWidth < 1000 ? true : false;
		}
		return user;
	}
	connectionError = (value) => {
		alert(value);
	}
	setNotify = (data) => {
		this.setState({notifications: data});
	}
	clearCart = (data) => {
		this.setState({productsInCart: []});
		localStorage.removeItem('products');
		if (data) {
			this.localStorageClear();
			setTimeout(() => location = '/', 2000);
		} else {
			setTimeout(() => location = '/history', 2000);
		}
	}
	simpleClearCart = () => {
		this.setState({productsInCart: []});
		localStorage.removeItem('products');
		localStorage.removeItem('orderSpecialSetting');
		localStorage.removeItem('agentPriceOverwriteArr');
		localStorage.removeItem('OrdComment');
		localStorage.setItem('selectedMode', 0);
		
		this.setState({agentPriceOverwriteArr:[]})
		this.setSelectedMode();
	}

	signOut = (user) => {
		if (this.state.productsInCart.length == 0 && user == "agentForUser") {
			this.localStorageClear(user);
		} else {
			SweetAlert({
				title: 'האם אתה בטוח?',
				text: 'כל העסקאות והמוצרים מהעגלה יימחקו.',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#22b09a',
				cancelButtonColor: '#d80028',
				confirmButtonText: 'אשר',
				cancelButtonText: 'בטל'
			}).then(function (res) {
				if (res.value) {
					this.localStorageClear(user);
				}
			}.bind(this)).catch(SweetAlert.noop);
		}
	}

	localStorageClear = (isAgent) => {
		let tmpLocalStorage = JSON.stringify(localStorage);
		let siteVer = localStorage.siteVer;
		let accessibility = false;
		if(localStorage.accessibility){
			accessibility = localStorage.accessibility;
		}
		


		localStorage.clear();
		this.setState({agentPriceOverwriteArr:[]})
		tmpLocalStorage = JSON.parse(tmpLocalStorage);

		if (tmpLocalStorage.agent && isAgent != "agent") {
			localStorage.setItem('agent', tmpLocalStorage.agent);
			localStorage.setItem('agentExId', tmpLocalStorage.agentExId);
			localStorage.setItem('date', tmpLocalStorage.date);
			localStorage.setItem('listView', tmpLocalStorage.listView);
			localStorage.setItem('selectedMode', 0);
			this.setSelectedMode();
			/*
			localStorage.setItem('agentName', tmpLocalStorage.agentName);
			localStorage.setItem('agentToken', tmpLocalStorage.agentToken);
			localStorage.setItem('sessionId', tmpLocalStorage.sessionId);
			*/

		}
		tmpLocalStorage.notifications ? localStorage.setItem('notifications', tmpLocalStorage.notifications) : null;
		tmpLocalStorage.logMail ? localStorage.setItem('logMail', tmpLocalStorage.logMail) : null;
		tmpLocalStorage.logPass ? localStorage.setItem('logPass', tmpLocalStorage.logPass) : null;
		if(accessibility){
			localStorage.accessibility = accessibility;

		}
		localStorage.siteVer = siteVer;

		if (isAgent == "agentForUser") {
			this.setState({productsInCart: [], user: false});
		} else {
			location = '/';
			setTimeout(() => location.reload(), 200);
		}


	}

	setActiveModel = (id) => {
		this.setState({chatModel: id});
	}
	addToCart = (product, id, saleProdObj) => {

		let unitChosen = 0;
		if (product.Unit == '0') {
			unitChosen = 0;
		} else if (parseInt(product.PackQuan) != 1 && product.Unit == '1') {
			unitChosen = 1;
		} else if (product.Unit == '2') {
			unitChosen = 0;
		} else {
			unitChosen = 0;
		}

		let newProduct = {
			Id: id,
			//Quantity: parseInt(product.PackQuan),
			Quantity: 1,
			Products: product,
			CategoryId: product.CategoryId,
			//UnitChosen: saleProdObj ? saleProdObj.Val : product.Unit == "2" ? 2 : 0
			UnitChosen: unitChosen
		};
		let findProd = product;
		let actualQuan = parseFloat(product.OnHand);
		//let nextQuantity = unitChosen == 1 ? parseFloat(product.PackQuan) : 1;
		let nextQuantity = parseFloat(product.PackQuan);
		if (nextQuantity <= actualQuan || this.state.selectedMode!='1') {
			let productsSet = [];
			localStorage.products ? productsSet = JSON.parse(localStorage.getItem('products')) : null;
			productsSet.push(newProduct);
			localStorage.setItem('products', JSON.stringify(productsSet));
			if (window.innerWidth > 1000) {
				this.setState({productsInCart: productsSet});
			} else {
				this.setState({productsInCart: productsSet});
			}
			document.getElementById('header-popup-id').innerHTML = 'מוצר התווסף לעגלה';

			this.setState({headerPop: true});
			setTimeout(() => {
				this.setState({headerPop: false});
			}, 3000);
			if (window.innerWidth > 1000) {
				setTimeout(() => {
					$("#input_" + id).focus();
				}, 200);
				setTimeout(() => {
					$("#input_" + id).select();
				}, 300);
			}
		} else {
			document.getElementById('header-popup-id').innerHTML = 'כמות מלאי אינה מספקת';
			this.setState({headerPop: true});
			setTimeout(() => {
				this.setState({headerPop: false});
			}, 3000);
		}
		// setTimeout(() => {
		//   this.writeGlbTotal();
		// }, 100);

	}
	addToWish = (element) => {
		let wishList = [];
		localStorage.wishList ? wishList = JSON.parse(localStorage.getItem('wishList')) : null;
		wishList.push(element);
		localStorage.setItem('wishList', JSON.stringify(wishList));
		this.setState({wishList});
	}

	increaseCart = (id, isCart) => {
		let productsSet = JSON.parse(localStorage.getItem('products'));
		let findProd = productsSet.find(item => item.Id == id);
		let actualQuan = parseFloat(findProd.Products.OnHand);
		let nextQuantity = (findProd.Quantity + 1) * parseFloat(findProd.Products.PackQuan);

		if (nextQuantity <= actualQuan || this.state.selectedMode!='1') {
			productsSet.find(item => item.Id == id).Quantity += 1;
			localStorage.setItem('products', JSON.stringify(productsSet));

			if (window.innerWidth > 1000 && isCart != "cart") {
				this.setState({productsInCart: productsSet});
			} else {
				this.setState({productsInCart: productsSet});
			}
		} else {
			document.getElementById('header-popup-id').innerHTML = 'כמות מלאי אינה מספקת';
			this.setState({headerPop: true});
			setTimeout(() => {
				this.setState({headerPop: false});
			}, 3000);
		}


		// setTimeout(() => {
		//   this.writeGlbTotal();
		// }, 100);
	}
	decreaseCart = (id, isCart) => {
		let productsSet = JSON.parse(localStorage.getItem('products'));

		productsSet.find(item => item.Id == id).Quantity -= 1;
		// productsSet.map((item,index) => {
		//   if(item.Id == id){
		//     item.Quantity = (Math.floor(parseFloat(item.Quantity)/parseInt(item.Products.PackQuan))*parseInt(item.Products.PackQuan)) - parseInt(item.Products.PackQuan);
		//
		//   }
		// });

		localStorage.setItem('products', JSON.stringify(productsSet));
		if (window.innerWidth > 1000 && isCart != "cart") {
			this.setState({productsInCart: productsSet});
		} else {
			this.setState({productsInCart: productsSet});
		}
		// setTimeout(() => {
		//   this.writeGlbTotal();
		// }, 100);
	}
	deleteProduct = (element, isCart) => {
		let productsInCart = this.state.productsInCart.filter(item => item.Id != element);

		if (window.innerWidth > 1000 && isCart != "cart") {
			this.setState({productsInCart});
		} else {
			this.setState({productsInCart});
		}
		localStorage.products = JSON.stringify(productsInCart);

		localStorage.freeProdsInCart ? localStorage.removeItem('freeProdsInCart') : null;

		// if(productsInCart.length > 0){
		//   productsInCart.map((element) => {
		//     this.globalPriceCalc(element.Products, element.Quantity, element.UnitChosen);
		// 	});
		// }
		// setTimeout(() => {
		//   this.writeGlbTotal();
		// }, 100);
	}
	agentReprice = (ele, e) => {
		if(e){
			let value = "";
			value = parseFloat(e.target.value);
			let agentPriceOverwriteArr = [];
			let isFound = false;

			if(localStorage.agentPriceOverwriteArr){

				agentPriceOverwriteArr = JSON.parse(localStorage.agentPriceOverwriteArr);
				agentPriceOverwriteArr.map((item) => {
					if(item.CatalogNumber == ele.CatalogNumber){
						item.Price = value;
						item.CatalogNumber = ele.CatalogNumber;
						isFound = true;
					}
				});
			}

			if(!isFound){
				let newProduct = {
					Price: value,
					CatalogNumber: ele.CatalogNumber
				};
				agentPriceOverwriteArr.push(newProduct);
			}

			localStorage.agentPriceOverwriteArr = JSON.stringify(agentPriceOverwriteArr);
			this.setState({agentPriceOverwriteArr});

			// setTimeout(() => {
			// 	this.validateAgentReprice();
			// }, 200);
		}
		
	}
	agentRepriceIncVat = (ele, e) => {
		if(e){
			let value = "";
			value = parseFloat(e.target.value);

			let isFound = false;
			let initPrice=0;
			let agentPriceOverwriteArr = [];
			if(localStorage.agentPriceOverwriteArr){
				agentPriceOverwriteArr = JSON.parse(localStorage.agentPriceOverwriteArr);
				agentPriceOverwriteArr.map((item) => {
					if(item.CatalogNumber == ele.CatalogNumber){	
						item.Price = value / 1.17;
						item.CatalogNumber = ele.CatalogNumber;
						isFound = true;
					}
				});
			}
		
			if(!isFound){
				initPrice = parseFloat(ele.OrgPrice);
				let newProduct = {
					Price: value / 1.17,
					CatalogNumber: ele.CatalogNumber
				};
				agentPriceOverwriteArr.push(newProduct);
			}
			localStorage.agentPriceOverwriteArr = JSON.stringify(agentPriceOverwriteArr);
			this.setState({agentPriceOverwriteArr});

			// setTimeout(() => {
			// 	this.validateAgentReprice();
			// }, 200);
		}
		
	}

	agentRepriceDiscount = (ele, e) => {
		if(e){
			let value = "";
			value = parseFloat(e.target.value);

			let isFound = false;
			let initPrice=0;
			let agentPriceOverwriteArr = [];
			if(localStorage.agentPriceOverwriteArr){
				agentPriceOverwriteArr = JSON.parse(localStorage.agentPriceOverwriteArr);
				agentPriceOverwriteArr.map((item) => {
					if(item.CatalogNumber == ele.CatalogNumber){
						initPrice = parseFloat(ele.OrgPrice);
	
						item.Price = initPrice - (initPrice * value /100);
						item.CatalogNumber = ele.CatalogNumber;
						isFound = true;
					}
				});
			}
		
			if(!isFound){
				initPrice = parseFloat(ele.OrgPrice);
				let newProduct = {
					Price: initPrice - (initPrice * value /100),
					CatalogNumber: ele.CatalogNumber
				};
				agentPriceOverwriteArr.push(newProduct);
			}

			localStorage.agentPriceOverwriteArr = JSON.stringify(agentPriceOverwriteArr);
			this.setState({agentPriceOverwriteArr});

			// setTimeout(() => {
			// 	this.validateAgentReprice();
			// }, 200);
		}
		
	}
	agentRepriceValidate = (ele, e) => {

		//incase input has emprty string on blur
		if (e.target.value == '') {
			let agentPriceOverwriteArr = JSON.parse(localStorage.agentPriceOverwriteArr);
			agentPriceOverwriteArr.map((item) => {
				if(item.CatalogNumber == ele.CatalogNumber){
					item.Price = ele.PriceCalcNoChange;
				}
			});
			localStorage.agentPriceOverwriteArr = JSON.stringify(agentPriceOverwriteArr);
			this.setState({agentPriceOverwriteArr});

		}
	}

	validateAgentReprice = () => {
		let productsInCart = this.state.productsInCart;
		let agentPriceOverwriteArr = this.state.agentPriceOverwriteArr;
		if(productsInCart && productsInCart.length){
			productsInCart.map((prodItem,index1) => {
				agentPriceOverwriteArr.map((overWriteItem,index2) => {
					if(prodItem.Products.CatalogNumber == overWriteItem.CatalogNumber){

						//prodItem.Products.OrgPrice = prodItem.Products.OrgPrice;
						prodItem.Products.Price = overWriteItem.Price;
						prodItem.Products.RePrice = true;
					}
				});
			});

			localStorage.products = JSON.stringify(productsInCart);
			this.setState({productsInCart});
		}

	}
	changeQuantity = (id, isCart, e) => {
		if (isCart != "cart") {
			e = isCart;
		}
		//if (!isNaN(e.target.value) || e.target.value.includes(".")) {

		let productsSet = JSON.parse(localStorage.getItem('products'));
		let value = "";

		//if(e.target.value!=""){
		let prodObj = productsSet.filter(item => item.Id == id);
		if (e.target.value.includes(".") && prodObj[0].Products.Unit == "2" && prodObj[0].UnitChosen == 2 && (!this.state.user || this.state.user.Type == 2)) {
			if (e.target.value.split(".")[1] == ".5") {
				value = parseFloat(e.target.value);
			} else if (e.target.value.split(".")[1] == "") {
				value = e.target.value + "5";
				value = parseFloat(value);
			} else {
				value = parseFloat(e.target.value).toFixed(1);
			}

		} else {
			value = parseInt(e.target.value);
		}
		//}
		if (String(e.target.value) == "-1") {
			//this.deleteProduct(id);
		} else {
			let findProd = productsSet.find(item => item.Id == id);
			let actualQuan = parseFloat(findProd.Products.OnHand);
			let nextQuantity = value * parseFloat(findProd.Products.PackQuan);

			if (nextQuantity <= actualQuan || this.state.selectedMode!='1') {
				productsSet.find(item => item.Id == id).Quantity = value;
				localStorage.setItem('products', JSON.stringify(productsSet));
				if (window.innerWidth > 1000 && isCart != "cart") {
					this.setState({productsInCart: productsSet});
				} else {
					this.setState({productsInCart: productsSet});
				}
			} else {
				document.getElementById('header-popup-id').innerHTML = 'כמות מלאי אינה מספקת';
				this.setState({headerPop: true});
				setTimeout(() => {
					this.setState({headerPop: false});
				}, 3000);
			}


		}
		this.getPrice(productsSet);
		// setTimeout(() => {
		//   this.writeGlbTotal();
		// }, 100);
		//}

	}
	avoidNullInCart = (id, e) => {
		if (e.target.value == 0) {
			this.deleteProduct(id);
		}
	}
	changeUnit = (id, unitChosen) => {
		let productsSet = JSON.parse(localStorage.getItem('products'));


		productsSet.map((item) => {
			if (item.Id == id && item.UnitChosen == 2 && unitChosen == 1) {
				item.Quantity = Math.ceil(item.Quantity);
				item.UnitChosen = unitChosen;
			} else if (item.Id == id) {
				item.UnitChosen = unitChosen;
			}
		});


		//debugger;

		//productsSet.find(item => item.Id == id).UnitChosen = unitChosen;

		localStorage.setItem('products', JSON.stringify(productsSet));
		this.setState({productsInCart: productsSet});
		this.getPrice(productsSet);
	}
	getProducts = () => {
		if (localStorage.getItem('products') != "undefined") {
			this.setState({productsInCart: JSON.parse(localStorage.getItem('products'))});
		}
	}
	setMatch = (params) => {
		this.setState({
			matchId: params.Id,
			matchSubId: params.SubId
		});
	}
	toggleMenu = () => {
		this.setState({toggleMenu: !this.state.toggleMenu});
	}
	changeLang = (lang) => {
		this.setState({lang});
	}
	addSeo = (data) => {
		let seo = this.state.seo;
		seo.push(data);
		this.setState({seo});
	}
	saveSeo = (seo, paramName) => {
		let val = {
			token: localStorage.token,
			role: localStorage.role,
			itemId: seo.Id,
			paramName: paramName,
			value: seo[paramName]
		};
		$.ajax({
			url: globalServer + 'new-api/seo.php',
			type: 'POST',
			data: val,
		}).done(function (data) {
		}.bind(this)).fail(function () {
			console.log("error");
		});
	}
	editSeo = (id, paramName, e) => {
		let seo = this.state.seo;
		seo.find(x => x.Id == id)[paramName] = e.target.value;
		this.setState({seo});
	}
	addItem = () => {
		let val = {
			token: localStorage.token,
			role: localStorage.role
		};
		$.ajax({
			url: globalServer + 'new-api/site_items_add.php',
			type: 'POST',
			data: val,
		}).done(function (data) {
			if (data.result == 'success') {
				let items = this.state.items;
				items.push(JSON.parse(data.item));
				this.setState({items});
			}
		}.bind(this)).fail(function () {
			console.log("error");
		});
	}
	uploadImg = (data) => {
		let params = {
			token: localStorage.token,
			role: localStorage.role,
			Folder: data.folder,
			FileName: data.fileName,
			Img: data.img,
			ItemId: data.itemId
		};
		$.ajax({
			url: globalServer + 'new-api/upload_img_site_items.php',
			type: 'POST',
			data: params
		}).done(function (d, data) {
			let items = this.state.items;
			items.find(x => x.Id == d.itemId).Img = d.fileName;
			this.setState({items});
		}.bind(this, data)).fail(function () {
			console.log('error');
		});
	}
	editItems = (data) => {
		let items = this.state.items;
		items.find(x => x.Id == data.itemId)[data.paramName] = data.value;
		this.setState({items});
	}
	updateItems = (data) => {
		let val = {
			token: localStorage.token,
			role: localStorage.role,
			itemId: data.itemId,
			paramName: data.paramName,
			value: data.value
		};
		$.ajax({
			url: globalServer + 'new-api/site_items_edit.php',
			type: 'POST',
			data: val,
		}).done(function (data) {
		}.bind(this)).fail(function () {
			console.log("error");
		});
	}
	updateEditorItems = (data) => {
		let items = this.state.items;
		items.find(x => x.Id == data.itemId)[data.paramName] = data.value;
		this.setState({items});
		this.updateItems(data);
	}
	toggleCart = (data) => {
		// this.setState({openCart: !this.state.openCart});
	}
	toggleNotification = () => {
		this.setState({openNotification: !this.state.openNotification});


		if (!this.state.openNotification) {
			localStorage.notifications = this.state.notifications;
			let element = document.getElementById('notify');
			// element.scrollTo(0, 0);
		}
	}
	addToState = (stateName, val) => {
		let state = this.state[stateName];
		state.push(val);
		this.setState({[stateName]: state});
	}
	updateState = (stateName, id, paramName, val) => {
		let state = this.state[stateName];
		if (state.find(x => x.Id == id)) {
			state.find(x => x.Id == id)[paramName] = val;
			this.setState({[stateName]: state});
		}
	}
	deleteFromState = (stateName, id) => {
		let state = this.state[stateName].filter((element, index) => {
			return element.Id != id
		});
		this.setState({[stateName]: state});
	}

	getCategories = async () => {
		let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		let val = {};
		user ? val.priceFor = user.PriceFor : null;
		user ? val.userType = user.Type : null;
		user ? val.PriceListBase = user.PriceListBase : null;
		user ? val.userExtId = user.ExId : null;
		user ? val.userId = user.Id : null;

		localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;

		const valAjax = {
			funcName: '',
			point: 'new-api/cats_view',
			val: val
		};

		try {
			const data = await this.ajax(valAjax);

			let productSales = [
				{
					Discount: null,
					ExId: "10002602000300",
					ForExId: "10002602000300",
					ForId: "10002602000300",
					Id: 1,
					Price: "30.00",
					Quantity: 1,
					ToExId: "1000000001",
					ToId: 1000000001
				}
			];
			let productSalesDiffQuan = [
				{
					Id: 1,
					ProdId: "10002602000300",
					ProdExtId: "10002602000300",
					CatalogNum: "10002602000300",
					PriceCode: null,
					Quantity: "0",
					Price: "0"
				}
			];
			let tmpDefaults = JSON.parse(data.defaults);
			let tmpmainGlobals = JSON.parse(data.mainGlobals).mainGlobals;

			tmpDefaults.Maam = String(tmpmainGlobals.maamPerc);
			tmpDefaults.statosMail = tmpmainGlobals.statosMail;
			tmpDefaults.MaamDecimal = tmpmainGlobals.maamDecimal;
			let areaCode = false;

			if(data.myUser){
				let newUser = data.myUser;
				newUser =  JSON.parse(data.myUser);
				let isOut = false;
				if(user && !localStorage.agent){
					const getToken = getPayloadToken()
					if(localStorage.date != getToken.date.date){
						this.localStorageClear();
						setTimeout(() => location = '/', 500);
						isOut = true;
					}
				}
				if(!isOut){
					this.setState({user: JSON.parse(data.myUser)});
					localStorage.setItem('user', data.myUser);
				}
			}
			/*
			if(data.myAgent){
				localStorage.setItem('agent', data.myAgent);
			}
			*/
		
			data.myUser && JSON.parse(data.myUser).DispatchingDays ? areaCode = JSON.parse(data.myUser).DispatchingDays : null;
			
			let userArea = [];
			tmpDefaults.userArea = null;
			this.setState({
				categories: JSON.parse(data.categories),
				defaults: tmpDefaults,
				adminPass1: JSON.parse(data.defaults).AdminPass.split(',')[0],
				adminPass2: JSON.parse(data.defaults).AdminPass.split(',')[1],
				productSales: JSON.parse(data.product_sales).ProductSaless.length ? JSON.parse(data.product_sales).ProductSaless : productSales,
				productSalesDiffQuan: JSON.parse(data.product_sales_diffQuan).ProductSalesDiffquans.length ? JSON.parse(data.product_sales_diffQuan).ProductSalesDiffquans : productSalesDiffQuan,
			});
			// this.writeGlbTotal();
			
			//this.writeCategoriesLocalDb(JSON.parse(data.categories));
		} catch (err) {
			console.log('connection error catsview', err);
		}


	}
	getPrice = (element, lowPrice) => {
		let price = 0;

		if (lowPrice && lowPrice.length) {

			if (lowPrice[0].SpecialPrice) {

				price = lowPrice[0].SpecialPrice;

			} else {

				if (lowPrice[0].Discount) {

					let percent = lowPrice[0].Discount;
					let p = lowPrice[0].Price;
					price = (p - ((p * percent) / 100)).toFixed(1);

				} else {

					price = lowPrice[0].Price;

				}

			}

		} else {

			if (element.Discount) {

				let percent = element.Discount;
				let p = element.Price;
				price = (p - ((p * percent) / 100)).toFixed(1);

			} else {

				price = element.Price;

			}

		}

		return price;
	}
	glbVatCalc = (products) => {
		if (products.Vat) {
			return true;
		} else {
			return false;
		}
	}
	globalPriceCalc = (products, quantity, unitChosen) => {

		let price = 0;
		let isProductSales = [];
		let isfixedPriceSale = [];

		let appState = this.state;
		let productsQP = appState.productSalesDiffQuan.filter(item => item.ProdId == products.Id);

		let inCart = this.state.productsInCart.filter(item => item.Products.CatalogNumber == products.CatalogNumber);

		if ("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 1) {
			quantity = quantity * parseFloat(products.PackQuan);
		}

		let product;
		if (productsQP.length > 1) {
			let current = productsQP.filter(item => quantity >= item.Quantity);
			product = current[current.length - 1];
		} else {
			product = products;
		}

		let productSales = this.state.productSales.filter(item => item.ToCatalogNum == products.CatalogNumber);

		let freeProdsInCart = [];
		if (localStorage.freeProdsInCart && productSales.length) {
			freeProdsInCart = JSON.parse(localStorage.getItem('freeProdsInCart'));
			freeProdsInCart = freeProdsInCart.filter((item) => {
				return item.Products.CatalogNumber != productSales[0].ForCatalogNum
			});
			localStorage.setItem('freeProdsInCart', JSON.stringify(freeProdsInCart));
		}


		let fixedPriceSale = this.state.productSales.filter(item => item.ForCatalogNum == products.CatalogNumber && !item.ToCatalogNum);

		let free = 0;
		let prePrice = 0;
		prePrice = parseFloat(product.Price);

		let forQuanInUnits = 0;
		let toQuanInUnits = 0;
		let forQuanOrderInUnit = 0;
		let toQuanOrderInUnit = quantity;
		let isDisacrdDiscount = false;

		//if(this.state.user.Type){

		if (productSales.length > 0) {
			this.state.productsInCart.map((item) => {
				if (item.Products.CatalogNumber == productSales[0].ForCatalogNum) {
					if (productSales[0].ForUnit == "0") {
						forQuanInUnits = productSales[0].ForQuantity;
					} else {
						forQuanInUnits = productSales[0].ForQuantity * parseFloat(item.Products.PackQuan);
					}
				}
			})
			if (productSales[0].ToUnit == "0") {
				toQuanInUnits = productSales[0].ToQuantity;
			} else {
				toQuanInUnits = productSales[0].ToQuantity * parseFloat(products.PackQuan);
			}

			isProductSales = this.state.productsInCart.filter((item) => {
				if (item.UnitChosen == "0") {
					forQuanOrderInUnit = item.Quantity;
				} else {
					forQuanOrderInUnit = item.Quantity * parseFloat(item.Products.PackQuan);
				}
				if (item.Products.CatalogNumber == productSales[0].ForCatalogNum && forQuanOrderInUnit >= forQuanInUnits && toQuanOrderInUnit >= toQuanInUnits) {
					return item;
				}
			})
		}

		if (fixedPriceSale.length > 0) {
			isfixedPriceSale = this.state.productsInCart.filter((item) => {


				if (fixedPriceSale[0].ForUnit == "0" || fixedPriceSale[0].ForUnit == "2") {
					forQuanInUnits = fixedPriceSale[0].ForQuantity;
				} else {
					forQuanInUnits = fixedPriceSale[0].ForQuantity * parseFloat(item.Products.PackQuan);
				}
				//debugger;
				if (item.Products.CatalogNumber == fixedPriceSale[0].ForCatalogNum && !fixedPriceSale[0].ToCatalogNum && quantity >= forQuanInUnits) {
					return item;
				}
				//debugger;
			})
		}
//debugger;
		// делаем акцию на продукт
		let singlePrice = 0;
		let fullyPaidQuan = 0;
		let fixedPrice = 0;
		let singleQuanForFreeCalc = 0;
		let singleQuanForFreeCalc2 = 0;
		let isSameCatalogNum = false;

		if (productSales.length && isProductSales.length) {

			if (parseFloat(productSales[0].ForCatalogNum) != parseFloat(productSales[0].ToCatalogNum)) {
				if (isProductSales[0].UnitChosen == "0" || isProductSales[0].UnitChosen == "2") {
					singleQuanForFreeCalc = isProductSales[0].Quantity;
				} else {
					singleQuanForFreeCalc = isProductSales[0].Quantity * isProductSales[0].Products.PackQuan;
				}
				if (productSales[0].ForUnit == "0" || productSales[0].ForUnit == "2") {
					singleQuanForFreeCalc2 = productSales[0].ForQuantity;
				} else {
					singleQuanForFreeCalc2 = productSales[0].ForQuantity * isProductSales[0].Products.PackQuan;
				}
				free = (Math.floor(singleQuanForFreeCalc / singleQuanForFreeCalc2)) * productSales[0].ToQuantity;

			} else if (parseFloat(productSales[0].ForCatalogNum) == parseFloat(productSales[0].ToCatalogNum)) {

				isSameCatalogNum = true;
				if (productSales[0].Discount != "100") {

					if (isProductSales[0].UnitChosen == "0" || isProductSales[0].UnitChosen == "2") {
						singleQuanForFreeCalc = isProductSales[0].Quantity;
					} else {
						singleQuanForFreeCalc = isProductSales[0].Quantity * isProductSales[0].Products.PackQuan;
					}

					if (productSales[0].ForUnit == "0" || productSales[0].ForUnit == "2") {
						singleQuanForFreeCalc2 = productSales[0].ForQuantity + 1;
					} else {
						singleQuanForFreeCalc2 = productSales[0].ForQuantity * isProductSales[0].Products.PackQuan + (1 * isProductSales[0].Products.PackQuan);
					}
					free = Math.floor(singleQuanForFreeCalc / (singleQuanForFreeCalc2));
				} else {

					if (productSales[0].ForUnit == "0" || productSales[0].ForUnit == "2") {
						singleQuanForFreeCalc = productSales[0].ForQuantity;
					} else {
						singleQuanForFreeCalc = productSales[0].ForQuantity * isProductSales[0].Products.PackQuan;
					}

					if (productSales[0].ToUnit == "0" || productSales[0].ToUnit == "2") {
						singleQuanForFreeCalc2 = productSales[0].ToQuantity;
					} else {
						singleQuanForFreeCalc2 = productSales[0].ToQuantity * isProductSales[0].Products.PackQuan;
						;
					}

					singleQuanForFreeCalc = Math.floor(quantity / singleQuanForFreeCalc);
					free = singleQuanForFreeCalc2 * singleQuanForFreeCalc;

				}
			}

			if (free != 0) {
				if (productSales[0].Discount) {

					if (productSales[0].Discount != "100" || isSameCatalogNum == false) {
						if (productSales[0].ForUnit == "1") {
							free = free * parseFloat(products.PackQuan);
						}

						singlePrice = prePrice - ((prePrice * parseFloat(productSales[0].Discount)) / 100);
						price = singlePrice * free;

						if ((quantity - free) > 0) {
							price += prePrice * (quantity - free);
						}
					} else {
						price = prePrice * quantity;
						let tmpProdsInCart = this.state.productsInCart;
						if (productSales[0].ToUnit == "1") {
							free = free / parseFloat(products.PackQuan);
						}
						tmpProdsInCart.map((item) => {
							if (item.Products.CatalogNumber == productSales[0].ForCatalogNum) {
								let freeProd = {
									CategoryId: item.CategoryId,
									Id: item.Id,
									Quantity: free,
									unitChosen: productSales[0].ToUnit,
									isFree: true,
									Products: item.Products
								}
								freeProdsInCart.push(freeProd);
							}
						})
						//debugger;
						localStorage.setItem('freeProdsInCart', JSON.stringify(freeProdsInCart));
						isDisacrdDiscount = true;
					}


				} else {
					fixedPrice = parseFloat(productSales[0].Price);

					singlePrice = isProductSales[0].Products.Price;

					let free2 = free;
					if (productSales[0].ForUnit == "1") {
						free2 = free2 * parseFloat(products.PackQuan);
					}

					if ((quantity - free) > 0) {
						fullyPaidQuan = quantity - free2;
						price = (fixedPrice * free) + (fullyPaidQuan * prePrice);
					} else {
						price = fixedPrice * quantity;
					}

					//debugger;
				}
			} else {
				price = prePrice * quantity;
			}


		} else if (fixedPriceSale.length && isfixedPriceSale.length) {

			//  free = Math.floor(isProductSales[0].Quantity / (productSales[0].ForQuantity+1));
			if (isfixedPriceSale[0].UnitChosen == "0" || isfixedPriceSale[0].UnitChosen == "2") {
				singleQuanForFreeCalc = isfixedPriceSale[0].Quantity;
			} else {
				singleQuanForFreeCalc = isfixedPriceSale[0].Quantity * isfixedPriceSale[0].Products.PackQuan;
			}
			if (fixedPriceSale[0].ForUnit == "0" || fixedPriceSale[0].ForUnit == "2") {
				singleQuanForFreeCalc2 = fixedPriceSale[0].ForQuantity;
			} else {
				singleQuanForFreeCalc2 = fixedPriceSale[0].ForQuantity * isfixedPriceSale[0].Products.PackQuan;
			}
			free = Math.floor(singleQuanForFreeCalc / singleQuanForFreeCalc2);
			//debugger;
			fullyPaidQuan = quantity - (singleQuanForFreeCalc2 * free);
			singlePrice = isfixedPriceSale[0].Products.Price;

			if (fixedPriceSale[0].Price) {
				fixedPrice = parseFloat(fixedPriceSale[0].Price);
				price = (fixedPrice * free) + (fullyPaidQuan * singlePrice);
			} else {
				price = (fullyPaidQuan * singlePrice) + ((singlePrice - (singlePrice * parseFloat(fixedPriceSale[0].Discount) / 100)) * (quantity - fullyPaidQuan));
			}

			//  debugger;

		}
		if (!isProductSales.length && !isfixedPriceSale.length) {
			price = prePrice * quantity;
		}
		let priceBefore = prePrice * quantity;

		if (priceBefore < price) {
			price = priceBefore;
		}


		/*
			}else{
			  price = prePrice * quantity;
			}
			*/
		let returnArr = [];
		returnArr.push(price);

		free != 0 && (isProductSales.length || isfixedPriceSale.length) && isDisacrdDiscount == false ? returnArr.push(1) : returnArr.push(0);
		return returnArr;
	}
	toggleSearch = (state) => {
		this.setState({searchMode: state});
	}
	restoreCart = (products) => {
		localStorage.setItem('products', JSON.stringify(products));
		this.setState({productsInCart: products, openCart: true});
		document.getElementById('header-popup-id').innerHTML = 'שיחזור בוצע בהצלחה';
		this.setState({headerPop: true});
		setTimeout(() => {
			this.setState({headerPop: false});
		}, 3000);
		// this.getPrice(products);
	}
	addImgToGlbArr = (image) => {
		let images = this.state.images;
		images.push(image);
		this.setState({images});
	}
	removeImgFromGlbArr = (catalogNum) => {
		let images = this.state.images;
		images.filter((item, index) => {
			return item != catalogNum
		});
		this.setState({images});
	}
	AgentLog = (val) => {

		if (val == "in") {
			localStorage.user ? this.setState({user: JSON.parse(localStorage.user)}) : null;
		}

	}

	getLang = () => {
		let path = location.hash.split('/');
		let lang = 'he';
		if (path.includes('he')) lang = 'he';
		if (path.includes('en')) lang = 'en';

		this.setState({lang});
		this.htmlLang(lang);
	}
	getItems = () => {
		let val = {funcName: 'GetSiteData'};
		$.ajax({
			url: globalServer + 'global_items.php',
			type: 'POST',
			data: val
		}).done(function (data) {
			this.setState({
				nav: data.nav,
				constants: data.constants.Constants
			});

		}.bind(this)).fail(function () {
			console.log("error");
		});
	}

	selectLang = lang => {
		this.setState({lang});
		this.htmlLang(lang);
	}
	htmlLang = lang => {

		let htmlElement = document.querySelector("html");
		let body = document.querySelector("body");
		if (lang == 'he') {
			htmlElement.setAttribute('dir', 'rtl');
			htmlElement.setAttribute('lang', 'he');
			body.classList.remove('ru');
		} else {
			htmlElement.setAttribute('dir', 'ltr');
			htmlElement.setAttribute('lang', 'en');
			body.classList.add('ru');
		}
	}
	returnConstant = param => {
		let langConst = this.state.constants;
		let result = '';
		if (Object.keys(langConst).length) {
			result = langConst[param + '_' + this.state.lang];
		}
		return result;
	}

	setEmployee = (employee) => {
		this.setState({employee});
	}


	setView = (value) => {
		localStorage.listView = value;
		this.setState({listView: value});
	}

	writeGlbTotal = () => {


		// let totalBasket = ((priceBefore - (priceBefore*discount/100)) + deliveryPrice + ((glbVatActive - (glbVatActive * discount / 100)) * parseFloat(this.state.defaults.Maam) / 100)).toFixed(1)
		// this.setState({totalBasket})

		let priceArray = [];
		let vatArray = [];
		let noVatArray = [];
		let isVat = false;
		let discount = 0;
		let deliveryPrice = 0;


		let productsSet = [];
		localStorage.products ? productsSet = JSON.parse(localStorage.getItem('products')) : null;

		productsSet.map((element, index) => {
			priceArray.push((this.globalPriceCalc(element.Products, element.Quantity, element.UnitChosen))[0]);

			isVat = this.glbVatCalc(element.Products);
			if (!isVat) {
				vatArray.push(priceArray[priceArray.length - 1]);
			}
		});
		const reducer = (accumulator, currentValue) => accumulator + currentValue;

		let price = 0;
		let priceBefore = 0;

		if (priceArray.length) {
			priceBefore = price = priceArray.reduce(reducer);
			if (localStorage.user) {
				let user = JSON.parse(localStorage.user);
				price = priceArray.reduce(reducer);
				if (discount) {
					let percent = parseFloat(discount);
					let p = parseFloat(price);
					let prePrice = (p - ((p * percent) / 100));
					price = prePrice;
					//this.setState({discount: this.state.discount});
				}
			}
		}
		let glbVatActive = 0;
		vatArray.length ? glbVatActive = (vatArray.reduce(reducer)).toFixed(1) : null;


		let totalBasket = ((priceBefore - (priceBefore * discount / 100)) + deliveryPrice + ((glbVatActive - (glbVatActive * discount / 100)) * parseFloat(this.state.defaults.Maam) / 100)).toFixed(1)

		this.setState({totalBasket: parseFloat(totalBasket).toFixed(1)});

	}
	setSelectedMode = () =>{
		if(localStorage.selectedMode){
			if(!localStorage.role && !localStorage.agent && localStorage.user){
				localStorage.selectedMode = '1';
			}
			this.setState({selectedMode: parseInt(localStorage.selectedMode)});
			if(localStorage.returnSelectedMode){
				this.setState({returnSelectedMode: parseInt(localStorage.returnSelectedMode)});
			}
		}else{
			this.setState({selectedMode: 0});
		}
	}
	identifyHashavshevetDocType = (item) => {
		let docType = '';
		switch(item){
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
		  return docType;
	}

	render() {
		return (
				<UserContext.Provider value={this}>
						<ShopProvider>
							<AgentStatsProvider>
								<MyCalendarProvider>
										<BasicRouter {...this} />
								</MyCalendarProvider>
							</AgentStatsProvider>
						</ShopProvider>
				</UserContext.Provider>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
