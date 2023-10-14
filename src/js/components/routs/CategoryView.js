import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import UserContext from '../../UserContext';
import ContactFooter from '../tools/ContactFooter.js'
import BreadCrumbs from "../tools/BreadCrumbs";

export default class CategoryView extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}
	componentDidMount(){
		setTimeout(() => window.scrollTo(0, 0), 100);
    if(localStorage.getItem('lastUrl')){
      localStorage.removeItem('lastUrl');
    }

	}
	render(){

	let categories = [];

    let parentCategory;
    let childCategory;

    if(this.props.state.categories.length>0){
        categories = this.props.state.categories.filter(item => !item.ParentId);
    }
    let lang = this.props.state.lang;
	let breadCrumbsNav=[];
    let breadObject ={Title: 'קטלוג',TitleEng: 'Catalog', Link:"" + lang};
    breadCrumbsNav.push(breadObject);

	if (categories.length) {
		return (
			<div className="page-container category-view">
				
				<div className="heading">
					{this.state.preload ?
						<div className="spinner-wrapper">
							<div className="spinner">
								<div className="bounce1"></div>
								<div className="bounce2"></div>
								<div className="bounce3"></div>
							</div>
						</div>
					: null}
				</div>

				
				<div className="container categories">
				<BreadCrumbs breadCrumbsNav={breadCrumbsNav} title={''} searchQuery={''}  lang={lang}/>

					<div className="flex-container">
						{categories.map((element, index) => {
							return(
								<div key={index} className="col-lg-3">
									<NavLink to={ ('/category/catalog/' + element.Id + "/0/0/1/0/" + lang)}>
										<div className="wrapper">
											<img src={element.Img ? globalFileServer + 'categories/' + element.Img : globalFileServer + 'placeholder.jpg'} />
											<h2>{element.Title}</h2>
										</div>
									</NavLink>
								</div>
							);
						})}
					</div>
				</div>
        		<ContactFooter lang={lang}/>

			</div>
		)
	} else return null;
	}
}
