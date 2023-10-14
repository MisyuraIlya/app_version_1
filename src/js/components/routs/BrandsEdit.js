import ReactDOM from "react-dom";
import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import MyCropper from "../tools/MyCropper";
import SweetAlert from 'sweetalert2';

export default class BrandsEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			categories: [],
			constCategories: [],
			preload: false,
			masc: false,
			search: "",
			seo: false,
			load: false,

		}
		this.setPreload = this.setPreload.bind(this);
		this.unsetPreload = this.unsetPreload.bind(this);
		this.search = this.search.bind(this);
		this.clearSearch = this.clearSearch.bind(this);

	}
	componentDidMount(){
		this.getCategories();
		window.scrollTo(0, 0);
		setTimeout(() => window.scrollTo(0, 0), 100);
	}
	componentWillReceiveProps(nextProps){
	}

	search(e){
		let search = e.target.value;
		let categories = [];

    categories = this.state.constCategories.filter(item => item.ExtId && item.ExtId.includes(search));
    this.setState({categories, search});
	}
	clearSearch(){
		this.setState({categories: this.state.constCategories, search: ""});
	}
	getCategories = async() => {
    this.setPreload();
    const val = {
      funcName: 'GetAllBrands',
      point: 'categories'
    };
    try {
      const dataVal = await this.props.ajax(val);
      let data = JSON.parse(dataVal);
      if(data.result=='success'){
        this.setState({categories: data.brands, constCategories: data.brands, load: true});
      }
      setTimeout(this.unsetPreload(), 1000);



    } catch(err) {
      console.log('connection error GetSales');
    }

	}
	setPreload(){
		this.setState({preload: true});
	}
	unsetPreload(){
		if (this.state.preload) {
			this.setState({preload: false});
		}
	}
	updateItems = async (value, id, paramName) => {
		let categories = this.state.categories;
		categories.find(x => x.Id == id)[paramName] = value;
		this.setState({categories, constCategories: categories});

    const val = {
      funcName: 'EditBrands',
      point: 'categories',
      token: localStorage.token,
			role: localStorage.role,
			funcName: 'EditBrands',
			itemId: id,
			paramName: paramName,
			value: value
    };

    try {
      const data = await this.props.ajax(val);
    } catch(err) {
      //this.props.connectionError('connection error GetSales');
      console.log('connection error editItem');
    }

	}
	uploadImg = async (data) => {
		this.setPreload();
    const val = {
      funcName: 'uploadImg',
      point: 'categories',
      token: localStorage.token,
			role: localStorage.role,
			fileName: data.itemId + data.fileName,
			img: data.img,
			folder: data.folder,
			itemId: data.itemId
    };
debugger;
    try {
      const data = await this.props.ajax(val);

      let categories = this.state.categories;
      categories.find(x => x.Id == val.itemId).Extra1 = val.fileName;
      this.setState({categories});
      this.unsetPreload();

    } catch(err) {
      //this.props.connectionError('connection error GetSales');
      console.log('connection error GetSales');
    }

	}
	binaryUpload(e){
		this.setState({preload: true});
		let url = globalServer + 'sheet_handler.php',
		files = e.target.files,
		formData = new FormData(e.target.parentElement);
		formData.append('dir', 'excel');
		formData.append('funcName', 'binaryUpload');
		let fetchData = {
			method: 'POST',
			body: formData,
			headers: new Headers()
		};
		fetch(url, fetchData).then((resp) => resp.json())
		.then(function(data) {
			if (data.result == "success") {
				SweetAlert({
					title: 'המערכת עודכנה בהצלחה',
					type: 'success',
					timer: 3000,
					showConfirmButton: false,
				}).then(function () {
					location.reload();
				}.bind(this)).catch(SweetAlert.noop);
			}
			if (data.result == "error" || data.result == "size error") {
				SweetAlert({
					title: 'איראה שגיאה. אנא נסה שנית',
					type: 'error',
					timer: 3000,
					showConfirmButton: false,
				}).then(function () {
					location.reload();
				}.bind(this)).catch(SweetAlert.noop);
			}
			this.setState({preload: false});
		}.bind(this)).catch(function(error) {
			this.setState({preload: false});
		}.bind(this));
	}

	render(){
  	if (this.state.constCategories.length || this.state.load) {

  		return (
  			<div className="category-edit brands-edit">
  				<div className="breadcrumbs">
  					<div className="container">
  						<div className="flex-container">
  							<div className="col-lg-6">
  							</div>
  							<div className="col-lg-6">
  								<ul>
  								</ul>
  							</div>
  						</div>
  					</div>
  				</div>
  				<div className="container items-container">
  					{this.state.preload ?
  						<div className="spinner-wrapper">
  							<div className="spinner">
  								<div className="bounce1"></div>
  								<div className="bounce2"></div>
  								<div className="bounce3"></div>
  							</div>
  						</div>
  					: null}
  					<div className="add-item add-item-main">
  						<div className="flex-container">
  							<div className="col-lg-6 alon-main-container">
                  <div className="alon-container flex-container">

                  </div>

  							</div>
  							<div className="col-lg-6">
  								<div className="search">
  									<input
  										onChange={this.search}
  										value={this.state.search}
  										type="text"
  										placeholder="חיפוש..."
  									/>
  									{this.state.search ?
  										<img className="close" onClick={this.clearSearch} src={globalFileServer + "icons/close.svg"} alt=""/>
  									:
  									<img src={globalFileServer + "icons/search.svg"} alt=""/>
  									}
  								</div>
  							</div>
  						</div>
  					</div>
  					<div className="items">
  						<div className="heading">
  							<div className="flex-container">

  								<div className="col-lg-2">
  									<p>תמונה</p>
  								</div>
                  <div className="col-lg-1 product">
  									<p style={{textAlign: 'right'}}>מזהה</p>
  								</div>
  								<div className={"col-lg-3 product"}>
  									<p style={{textAlign: 'right'}}>כותרת</p>
  								</div>
  								<div className="col-lg-1">
  									<p>סטאטוס</p>
  								</div>
  								<div className="col-lg-1">
  								</div>
  							</div>
  						</div>


							<div className="items">
                {this.state.categories.map((element, index) => {
                  return(
                    <div key={index} className="item">
                      <div className="item">
                        <div className="flex-container">
                          <div className="col-lg-2 for-img">
                            <div
                              onMouseOver={() => this.state.masc != element.Id ? this.setState({masc: element.Id}) : null}
                              onMouseLeave={() => this.setState({masc: false})}
                              className={element.Extra1 ? "img-load active" : "img-load"}>

                              <Fragment>
                                {this.state.masc == element.Id && element.Extra1 ?
                                  <div className="masc">
                                    <img src={globalFileServer + 'brands/' + element.Extra1} />
                                  </div>
                                : null}
                                {element.Extra1 ?
                                  <img
                                    className="main-img"
                                    src={globalFileServer + 'brands/' + element.Extra1}
                                    onLoad={this.unsetPreload}
                                  />
                                :null}
                              </Fragment>
                              <MyCropper
                                aspectRatio={16/16} {...this}
                                itemId={element.Id}
                                folder="brands"
                              />
                            </div>
                          </div>
                          <div className={"col-lg-1 title"}>
                            <p>{element.ExtId}</p>
                          </div>
                          <div className={"col-lg-3 title"}>
                            <p>{element.Txt}</p>
                          </div>

                          <div className="col-lg-1 status">
                            {!element.Unpublished ?
                              <div onClick={(e) => this.updateItems(1, element.Id, 'Unpublished')} className="input active">
                                <img src={globalFileServer + "icons/done.svg"} alt=""/>
                              </div>
                            :
                            <div onClick={(e) => this.updateItems(null, element.Id, 'Unpublished')} className="input">
                              <img src={globalFileServer + "icons/cross-bold.svg"} alt=""/>
                            </div>
                            }
                          </div>

                        </div>
                      </div>
                    </div>
    							);
					      })}
              </div>
  					</div>
  				</div>
  			</div>
  		)
  	} else return null;
  	}
}
