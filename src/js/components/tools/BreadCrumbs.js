import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

const BreadCrumbs = params => {
	let { title,breadCrumbsNav } = params;
	return(
		<div className="breadcrumbs bread-crumbs-glb-cont">
			<div className="breadcrumbs-container">
				<div className="">
					<ul>
						<li>
							<NavLink to="/"><span>{params.lang == 'he' ? 'בית' : 'Home'}</span></NavLink>
						</li>
						{breadCrumbsNav.map((element, index) => {
							return(
								<li key={index}>
									{element.Link ?
										<NavLink to={element.Link + params.searchQuery}>{params.lang == 'he' ? element.Title : element.TitleEng}</NavLink>
										: <span>{params.lang == 'he' ? element.Title : element.TitleEng}</span>}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default BreadCrumbs;
